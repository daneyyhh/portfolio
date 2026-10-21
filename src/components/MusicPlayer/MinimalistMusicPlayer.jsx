import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MUSIC_LIBRARY, ARTISTS } from '../../data/musicLibrary';

export default function MinimalistMusicPlayer({ className = '' }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const audioRef = useRef(null);
  const timelineRef = useRef(null);
  const currentTrack = MUSIC_LIBRARY[currentTrackIndex] || MUSIC_LIBRARY[0];

  // Helper to format seconds into MM:SS
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Playback control
  const startPlayback = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      setErrorMessage('');
      await audioRef.current.play();
      setIsPlaying(true);
      setHasStartedOnce(true);
    } catch (err) {
      console.warn('Playback deferred or blocked:', err);
      setIsPlaying(false);
    }
  }, []);

  const pausePlayback = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  }, [isPlaying, pausePlayback, startPlayback]);

  // Track switching
  const selectTrack = (index) => {
    if (index === currentTrackIndex) {
      togglePlayback();
      return;
    }
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setDragTime(0);
    // If already started listening, immediately play the selected track
    if (hasStartedOnce) {
      setTimeout(() => {
        startPlayback();
      }, 50);
    }
  };

  const advanceToNextTrack = useCallback(() => {
    const nextIndex = (currentTrackIndex + 1) % MUSIC_LIBRARY.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);
    setDragTime(0);
    setTimeout(() => {
      startPlayback();
    }, 100);
  }, [currentTrackIndex, startPlayback]);

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (!audioRef.current || isDragging) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    const dur = audioRef.current.duration;
    if (dur && !isNaN(dur) && isFinite(dur)) {
      setDuration(dur);
    }
  };

  const handleEnded = () => {
    advanceToNextTrack();
  };

  const handleError = () => {
    setErrorMessage('Track stream unavailable, transitioning...');
    setTimeout(() => {
      advanceToNextTrack();
    }, 1500);
  };

  // Timeline seeking calculation
  const calculateSeekTime = (clientX) => {
    if (!timelineRef.current) return 0;
    const rect = timelineRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const targetDuration = duration || 30;
    return pos * targetDuration;
  };

  const handleTimelinePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    const newTime = calculateSeekTime(e.clientX);
    setDragTime(newTime);

    const onPointerMove = (moveEvent) => {
      const movedTime = calculateSeekTime(moveEvent.clientX);
      setDragTime(movedTime);
    };

    const onPointerUp = (upEvent) => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      setIsDragging(false);

      const finalTime = calculateSeekTime(upEvent.clientX);
      if (audioRef.current) {
        audioRef.current.currentTime = finalTime;
        setCurrentTime(finalTime);
      }
      if (!isPlaying) {
        startPlayback();
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Timeline keyboard accessibility
  const handleTimelineKeyDown = (e) => {
    if (!audioRef.current) return;
    const step = 2;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      const newTime = Math.min(duration, (audioRef.current.currentTime || 0) + step);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      const newTime = Math.max(0, (audioRef.current.currentTime || 0) - step);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    } else if (e.key === ' ') {
      e.preventDefault();
      togglePlayback();
    }
  };

  // Visual percentages
  const activeTime = isDragging ? dragTime : currentTime;
  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (activeTime / duration) * 100)) : 0;

  return (
    <div className={`w-full font-mono select-none ${className}`}>
      {/* Hidden Real HTML5 Audio Source */}
      <audio
        ref={audioRef}
        src={currentTrack.previewUrl}
        preload="metadata"
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
          setIsBuffering(false);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        onError={handleError}
      />

      {/* REUBG.DEV Minimalist Player Box */}
      <div
        onClick={togglePlayback}
        className="group relative bg-[#FAF9F5] text-black border border-[#E2E0D8] rounded-sm p-3.5 shadow-sm transition-all duration-200 cursor-pointer hover:border-black/30"
        title={isPlaying ? "Click anywhere to pause" : "Click anywhere to play"}
      >
        {/* Top Section: Album Artwork + Song Title & Artist */}
        <div className="flex items-center gap-3">
          {/* Small Album Artwork */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              advanceToNextTrack();
            }}
            title="Click artwork to skip to next track"
            className="relative w-12 h-12 shrink-0 rounded-sm overflow-hidden bg-neutral-200 border border-black/10 transition-transform duration-200 active:scale-95"
          >
            <img
              src={currentTrack.artwork}
              alt={`${currentTrack.title} by ${currentTrack.artist}`}
              className="w-full h-full object-cover transition-opacity duration-300"
              loading="eager"
            />
            {/* Subtle glow/active border indicator */}
            {isPlaying && (
              <div className="absolute inset-0 border border-[#FF0000]/60 pointer-events-none" />
            )}
          </div>

          {/* Song Metadata */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="font-sans font-semibold text-[13px] text-black tracking-tight truncate leading-tight">
              {currentTrack.title}
            </div>
            <div className="text-[11px] text-neutral-600 font-mono tracking-normal truncate mt-0.5">
              {currentTrack.artist}
            </div>
          </div>
        </div>

        {/* Thin Playback Progress Timeline (Click or Drag to Seek) */}
        <div
          ref={timelineRef}
          role="slider"
          aria-label="Track playback progress timeline"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(activeTime)}
          tabIndex={0}
          onKeyDown={handleTimelineKeyDown}
          onPointerDown={handleTimelinePointerDown}
          onClick={(e) => e.stopPropagation()}
          className="relative mt-3 pt-1.5 pb-2 cursor-pointer group/timeline"
        >
          {/* Background track line */}
          <div className="w-full h-[2px] bg-[#E0DED6] rounded-full overflow-hidden transition-all duration-150 group-hover/timeline:h-[3px]">
            {/* Signal-red Progress Bar */}
            <div
              className="h-full bg-[#FF0000] transition-[width] duration-75 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Signal-red Interactive Thumb (appears on hover or while dragging) */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#FF0000] rounded-full shadow-sm transition-opacity duration-150 pointer-events-none ${
              isDragging ? 'opacity-100 scale-110' : 'opacity-0 group-hover/timeline:opacity-100'
            }`}
            style={{ left: `${progressPercent}%` }}
          />
        </div>

        {/* Timestamps Row: Current Time & Total Duration */}
        <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono tracking-wider -mt-1">
          <span>{formatTime(activeTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Bottom Status Row: NOW PLAYING • ANIMATED BARS */}
        <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center justify-between text-[10px] tracking-wider font-mono">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                isPlaying
                  ? 'bg-[#FF0000] animate-pulse'
                  : 'bg-neutral-400'
              }`}
            />
            <span className="font-semibold text-black">
              {isBuffering
                ? 'BUFFERING'
                : isPlaying
                ? 'NOW PLAYING'
                : hasStartedOnce
                ? 'PAUSED'
                : 'CLICK TO PLAY'}
            </span>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-500 text-[9px]">
              {currentTrackIndex + 1}/15
            </span>
          </div>

          {/* Animated Equalizer Bars */}
          <div className="flex items-end gap-[2.5px] h-3.5 px-0.5">
            <span
              className={`w-[2px] bg-[#FF0000] rounded-full transition-all duration-150 ${
                isPlaying ? 'animate-eq-1 h-3.5' : 'h-[3px] bg-neutral-400'
              }`}
            />
            <span
              className={`w-[2px] bg-[#FF0000] rounded-full transition-all duration-150 ${
                isPlaying ? 'animate-eq-2 h-2.5' : 'h-[3px] bg-neutral-400'
              }`}
            />
            <span
              className={`w-[2px] bg-[#FF0000] rounded-full transition-all duration-150 ${
                isPlaying ? 'animate-eq-3 h-3' : 'h-[3px] bg-neutral-400'
              }`}
            />
            <span
              className={`w-[2px] bg-[#FF0000] rounded-full transition-all duration-150 ${
                isPlaying ? 'animate-eq-4 h-2' : 'h-[3px] bg-neutral-400'
              }`}
            />
          </div>
        </div>

        {/* Error message alert if any */}
        {errorMessage && (
          <div className="mt-1 text-[9px] text-[#FF0000] truncate">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Discrete 15-Track Library Accordion / Switcher */}
      <div className="mt-1.5">
        <button
          type="button"
          onClick={() => setIsLibraryOpen(!isLibraryOpen)}
          className="w-full flex items-center justify-between py-1.5 px-2 text-[10px] text-neutral-400 hover:text-white transition-colors duration-150 tracking-wider"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-[#FF0000] text-[8px]">■</span>
            <span>MUSIC COLLECTION ({MUSIC_LIBRARY.length})</span>
          </span>
          <span className="text-[9px] text-neutral-500 font-mono">
            {isLibraryOpen ? '[ HIDE ]' : '[ VIEW ALL ]'}
          </span>
        </button>

        {isLibraryOpen && (
          <div className="mt-1 p-2 bg-[#0E0E0E] border border-white/10 rounded-sm space-y-2 text-xs max-h-60 overflow-y-auto">
            {ARTISTS.map((artist) => {
              const artistTracks = MUSIC_LIBRARY.filter((t) => t.artist === artist);
              return (
                <div key={artist} className="space-y-1">
                  <div className="text-[9px] font-bold text-neutral-400 tracking-wider uppercase border-b border-white/5 pb-0.5">
                    // {artist}
                  </div>
                  <div className="space-y-0.5">
                    {artistTracks.map((track) => {
                      const trackIdx = MUSIC_LIBRARY.findIndex((t) => t.id === track.id);
                      const isCurrent = trackIdx === currentTrackIndex;
                      return (
                        <div
                          key={track.id}
                          onClick={() => selectTrack(trackIdx)}
                          className={`flex items-center justify-between p-1.5 rounded cursor-pointer transition-colors ${
                            isCurrent
                              ? 'bg-white/10 text-white font-medium'
                              : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`text-[9px] ${
                                isCurrent ? 'text-[#FF0000] font-bold' : 'text-neutral-600'
                              }`}
                            >
                              {isCurrent ? '▶' : '·'}
                            </span>
                            <span className="truncate text-[11px]">{track.title}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] text-neutral-500 font-mono">
                              {track.fullDuration}
                            </span>
                            <a
                              href={track.spotifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              title="Open in Spotify"
                              className="text-[9px] text-neutral-600 hover:text-[#1DB954] transition-colors"
                            >
                              ↗
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
