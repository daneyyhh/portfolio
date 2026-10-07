import React, { useState, useEffect, useRef } from 'react';
import QRCodeLib from 'qrcode';
import gsap from 'gsap';
import {
  ArrowUpRight,
  ArrowDown,
  User,
  Share2,
  Copy,
  Check,
  FileText,
  Mail,
  Play,
  Pause
} from 'lucide-react';

const BRAND_INFO = {
  name: 'REUBEN BINU GEORGE',
  brand: 'REUBG',
  brandSuffix: 'DEV',
  handle: '@reubg.dev',
  tagline: 'Full-Stack Developer  ·  Game Developer',
  subTagline: 'AI Enthusiast  ·  Creator',
  status: 'AVAILABLE FOR WORK',
  age: 22,
  country: 'INDIA',
  flag: '🇮🇳',
  coordinates: {
    lat: '9.4981° N',
    lon: '76.3388° E',
    region: 'ALAPPUZHA, KL',
    country: 'INDIA',
  },
  email: 'reuben@reubg.in',
  canonicalUrl: 'https://reubg.in/link',
  portfolioUrl: 'https://reubg.in',
  githubUrl: 'https://github.com/daneyyhh',
  linkedinUrl: 'https://linkedin.com/in/reubeng',
  coffeeUrl: 'https://buymeacoffee.com/reubg.dev',
  resumeUrl: '/Reuben-Binu-George-CV.pdf',
  signature: 'SAME HUMAN   \\   DIFFERENT DIMENSION',
};

const LINK_CARDS = [
  {
    id: 'portfolio',
    number: '01',
    title: 'PORTFOLIO',
    description: 'Explore my work, projects and case studies',
    href: 'https://reubg.in',
    arrow: '↗',
    iconType: 'portfolio',
    thumbnail: '/brand/thumb_portfolio.jpg',
  },
  {
    id: 'github',
    number: '02',
    title: 'GITHUB',
    description: 'Open-source projects, experiments and more',
    href: 'https://github.com/daneyyhh',
    arrow: '↗',
    iconType: 'github',
    thumbnail: '/brand/thumb_github.jpg',
  },
  {
    id: 'linkedin',
    number: '03',
    title: 'LINKEDIN',
    description: 'Professional profile and career updates',
    href: 'https://linkedin.com/in/reubeng',
    arrow: '↗',
    iconType: 'linkedin',
    thumbnail: '/brand/thumb_linkedin.jpg',
  },
  {
    id: 'resume',
    number: '04',
    title: 'RESUME',
    description: 'Download my latest CV',
    href: '/Reuben-Binu-George-CV.pdf',
    arrow: '↓',
    iconType: 'resume',
    isDownload: true,
    thumbnail: '/brand/thumb_resume.jpg',
  },
  {
    id: 'coffee',
    number: '05',
    title: 'BUY ME A COFFEE',
    description: 'Support my work and future projects',
    href: 'https://buymeacoffee.com/reubg.dev',
    arrow: '↗',
    iconType: 'coffee',
    thumbnail: '/brand/thumb_coffee.jpg',
  },
  {
    id: 'contact',
    number: '06',
    title: 'CONTACT',
    description: 'Have a project, opportunity or a crazy idea?',
    href: 'mailto:reuben@reubg.in',
    arrow: '↗',
    iconType: 'contact',
    thumbnail: '/brand/thumb_contact.jpg',
  },
];

const CURRENTLY_ITEMS = [
  { action: 'Building', target: 'MERN projects' },
  { action: 'Learning', target: 'Artificial Intelligence' },
  { action: 'Exploring', target: 'WebGL / Three.js' },
  { action: 'Playing', target: 'COD' },
  { action: 'Listening', target: '< Spotify >' },
];

const SYSTEM_STATUS_ITEMS = [
  { id: 'portfolio', service: 'portfolio', status: 'online', state: 'ok' },
  { id: 'github', service: 'github', status: 'active', state: 'ok' },
  { id: 'linkedin', service: 'linkedin', status: 'active', state: 'ok' },
  { id: 'resume', service: 'resume', status: 'ready', state: 'ok' },
  { id: 'buymeacoffee', service: 'buymeacoffee', status: 'ready', state: 'ok' },
  { id: 'next-project', service: 'next-project', status: '72%', state: 'progress' },
];

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://instagram.com/reubg.dev' },
  { name: 'X', href: 'https://x.com/reubg_dev' },
  { name: 'YouTube', href: 'https://youtube.com/@reubgdev' },
  { name: 'GitHub', href: 'https://github.com/daneyyhh' },
];

export default function LinkBioPage() {
  const [qrUrl, setQrUrl] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedVcf, setSavedVcf] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressSecs, setProgressSecs] = useState(137);
  const totalSecs = 200;
  const cardsRef = useRef(null);

  useEffect(() => {
    document.title = "REUBG DEV — Reuben Binu George";
    window.scrollTo(0, 0);

    QRCodeLib.toDataURL(
      BRAND_INFO.canonicalUrl,
      { width: 280, margin: 1, color: { dark: '#000000', light: '#FFFFFF' } },
      (err, url) => {
        if (!err && url) setQrUrl(url);
      }
    );

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('[data-card]');
      gsap.fromTo(cards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: 'power3.out' });
    }
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgressSecs((prev) => (prev >= totalSecs ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleDownloadVcf = () => {
    const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${BRAND_INFO.name}\nORG:REUBG DEV\nTITLE:${BRAND_INFO.tagline}\nEMAIL;TYPE=INTERNET,PREF:${BRAND_INFO.email}\nURL;TYPE=PREF:${BRAND_INFO.canonicalUrl}\nURL;TYPE=PORTFOLIO:${BRAND_INFO.portfolioUrl}\nX-SOCIALPROFILE;TYPE=github:${BRAND_INFO.githubUrl}\nX-SOCIALPROFILE;TYPE=instagram:https://instagram.com/reubg.dev\nEND:VCARD`;
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Reuben_Binu_George.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSavedVcf(true);
    setTimeout(() => setSavedVcf(false), 2000);
  };

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'REUBG DEV', url: BRAND_INFO.canonicalUrl });
        return;
      } catch (e) {}
    }
    await navigator.clipboard.writeText(BRAND_INFO.canonicalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${s % 60 < 10 ? '0' : ''}${s % 60}`;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF0000] selection:text-white font-sans overflow-x-hidden">
      <div className="max-w-[1480px] mx-auto min-h-screen flex flex-col justify-between">
        
        {/* 3-Column Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 items-stretch">
          
          {/* Column 1: Left Technical Rail with Massive Moon */}
          <aside className="hidden lg:flex lg:col-span-3 relative h-full min-h-[820px] flex-col justify-between py-8 px-6 border-r border-white/10 font-mono select-none overflow-hidden bg-black">
            {/* Massive Planet Bleed */}
            <div className="absolute -left-[45%] top-[2%] w-[220%] h-[92%] pointer-events-none select-none z-0">
              <img
                src="/brand/tall_earth_orbit.jpg"
                alt="Orbital Planetary Surface"
                className="w-full h-full object-contain object-left filter contrast-125 brightness-115 opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
            </div>

            {/* Top Manifesto */}
            <div className="relative z-10 space-y-6">
              <div className="text-[11px] tracking-widest text-neutral-400 uppercase font-bold">
                REUBG.IN / LINK
              </div>
              <div className="pt-2">
                <div className="border-l border-white/25 pl-3.5 space-y-1 text-[11px] font-bold tracking-[0.2em] text-neutral-200">
                  <div>CODE</div>
                  <div>CREATE</div>
                  <div>PLAY</div>
                  <div>LEARN</div>
                  <div>REPEAT</div>
                </div>
                <div className="w-5 h-[2px] bg-[#FF0000] mt-3 ml-3.5" />
              </div>
            </div>

            {/* Middle Coordinates */}
            <div className="relative z-10 my-auto py-12 space-y-1 pl-1 text-[11px] text-neutral-400">
              <div className="text-neutral-500 text-xs font-bold mb-2">+</div>
              <div className="text-white font-bold tracking-wider">{BRAND_INFO.coordinates.lat}</div>
              <div className="text-white font-bold tracking-wider">{BRAND_INFO.coordinates.lon}</div>
              <div className="text-neutral-400 text-[10px] tracking-wider pt-1">{BRAND_INFO.coordinates.region}</div>
              <div className="text-neutral-500 text-[10px] tracking-widest">{BRAND_INFO.coordinates.country}</div>
            </div>

            {/* Bottom Mission */}
            <div className="relative z-10 space-y-6 pb-4">
              <div className="text-neutral-500 text-xs tracking-[0.4em] mb-4">[&nbsp; &nbsp; &nbsp; &nbsp;]</div>
              <div className="border-l border-white/25 pl-3.5 space-y-1 text-[11px] font-bold tracking-[0.2em] text-neutral-200">
                <div>BUILDING</div>
                <div>A BETTER</div>
                <div>VERSION</div>
                <div>OF</div>
                <div>TOMORROW</div>
              </div>
              <div className="w-5 h-[2px] bg-[#FF0000] mt-3 ml-3.5" />
            </div>
          </aside>

          {/* Column 2: Center Hero & Interactive Links */}
          <div className="lg:col-span-6 py-6 px-4 sm:px-6 md:px-8 space-y-6">
            <div className="block lg:hidden text-[11px] font-mono tracking-widest text-neutral-500 uppercase text-center pb-2 border-b border-white/5">
              REUBG.IN / LINK
            </div>

            {/* Profile Section */}
            <header className="relative w-full flex flex-col items-center text-center select-none pt-2 pb-4">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-3xl sm:text-4xl md:text-[42px] font-black tracking-tight text-white">REUBG</span>
                <span className="bg-[#FF0000] text-white px-2.5 py-0.5 text-2xl sm:text-3xl md:text-[34px] font-black tracking-wider leading-none">DEV</span>
              </div>

              {/* Portrait */}
              <div className="relative my-2 inline-flex items-center justify-center">
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-neutral-600 text-xs tracking-widest hidden sm:block">··</div>
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex items-center gap-3 hidden sm:flex">
                  <span className="text-neutral-600 text-xs tracking-widest">··</span>
                  <span className="w-2.5 h-2.5 bg-[#FF0000] inline-block shadow-[0_0_8px_rgba(255,0,0,0.6)]" />
                </div>
                <div className="relative p-2.5">
                  <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-white/40" />
                  <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-white/40" />
                  <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-white/40" />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-white/40" />
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52 overflow-hidden bg-neutral-950 rounded-sm">
                    <img src="/reuben-portrait.jpg" alt="Reuben Binu George" className="w-full h-full object-cover grayscale contrast-115" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2 font-mono">
                <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-[0.25em] text-white uppercase">{BRAND_INFO.name}</h1>
                <div className="space-y-1 text-xs text-neutral-400">
                  <div>{BRAND_INFO.tagline}</div>
                  <div>{BRAND_INFO.subTagline}</div>
                </div>
              </div>

              <div className="mt-5 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/15 bg-neutral-950/80 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
                  </span>
                  <span className="text-white font-medium">{BRAND_INFO.status}</span>
                </div>
                <span className="text-white/20">|</span>
                <span className="text-white">{BRAND_INFO.age}</span>
                <span className="text-white/20">|</span>
                <div className="flex items-center gap-1.5 text-white">
                  <span>{BRAND_INFO.country}</span>
                  <span>{BRAND_INFO.flag}</span>
                </div>
                <span className="text-neutral-500">·</span>
              </div>
            </header>

            {/* The 6 Link Cards */}
            <div id="links" ref={cardsRef} className="grid grid-cols-1 gap-2.5 sm:gap-3 w-full">
              {LINK_CARDS.map((card) => (
                <div key={card.id} data-card className="group relative block w-full text-left">
                  <a
                    href={card.href}
                    download={card.isDownload ? 'Reuben-Binu-George-CV.pdf' : undefined}
                    target={!card.isDownload && card.id !== 'contact' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="relative flex items-stretch w-full min-h-[72px] sm:min-h-[76px] bg-[#0c0c0c]/95 hover:bg-[#121212] border border-white/10 hover:border-[#FF0000]/70 rounded-sm transition-all duration-300 overflow-hidden"
                  >
                    <div className="w-12 sm:w-14 shrink-0 flex items-center justify-center border-r border-white/10 font-mono font-bold text-xs sm:text-sm text-neutral-400 group-hover:text-[#FF0000] bg-black/40">
                      {card.number}
                    </div>
                    <div className="flex-1 py-3 px-3.5 sm:px-4 flex items-center gap-3.5 z-10 min-w-0 pr-24 sm:pr-28">
                      {card.iconType === 'coffee' ? (
                        <div className="w-8 h-8 rounded-sm bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">☕</div>
                      ) : card.iconType === 'resume' ? (
                        <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0"><FileText className="w-4 h-4 text-white group-hover:text-[#FF0000]" /></div>
                      ) : card.iconType === 'contact' ? (
                        <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0"><Mail className="w-4 h-4 text-white group-hover:text-[#FF0000]" /></div>
                      ) : (
                        <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0"><ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#FF0000]" /></div>
                      )}
                      <div className="min-w-0 space-y-0.5">
                        <h2 className="text-xs sm:text-sm md:text-[15px] font-black tracking-wider text-white uppercase truncate">{card.title}</h2>
                        <p className="text-[11px] sm:text-xs text-neutral-400 truncate font-mono">{card.description}</p>
                      </div>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-28 sm:w-36 md:w-44 overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0c] via-[#0c0c0c]/70 to-transparent z-10" />
                      <img src={card.thumbnail} alt={card.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-75 transition-opacity" />
                      <div className="absolute top-3.5 right-3.5 z-20 text-[#FF0000] font-bold">
                        {card.arrow === '↓' ? <ArrowDown className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Mobile View: Widgets */}
            <div className="block lg:hidden pt-8 space-y-8 border-t border-white/10 font-mono">
              <div className="space-y-3">
                <div className="text-xs font-bold text-neutral-300">// CURRENTLY</div>
                <div className="space-y-2 text-xs">
                  {CURRENTLY_ITEMS.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-neutral-300">
                      <span className="text-[#FF0000] text-[10px]">▶</span>
                      <span className="text-neutral-400 w-20">{item.action}</span>
                      <span className="text-white font-medium">{item.target}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Right Widgets Rail */}
          <aside className="hidden lg:block lg:col-span-3 py-6 px-5 border-l border-white/10 font-mono select-none space-y-8">
            <div className="flex items-center justify-end text-[11px] text-neutral-400 tracking-wider">
              <span>[&nbsp;</span>
              <a href="https://reubg.in" className="hover:text-white">PORTFOLIO</a>
              <span className="mx-2 text-neutral-600">/</span>
              <a href="#links" className="text-white font-semibold">LINKS</a>
              <span className="mx-2 text-neutral-600">/</span>
              <a href="mailto:reuben@reubg.in" className="hover:text-white">CONTACT</a>
              <span>&nbsp;]</span>
            </div>

            {/* // CURRENTLY */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-neutral-300 tracking-wider">// CURRENTLY</div>
              <div className="space-y-2 text-xs">
                {CURRENTLY_ITEMS.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-neutral-300">
                    <span className="text-[#FF0000] text-[10px]">▶</span>
                    <span className="text-neutral-400 w-20">{item.action}</span>
                    <span className="text-white font-medium">{item.target}</span>
                  </div>
                ))}
              </div>

              {/* Spotify Player */}
              <div className="mt-3 p-3 bg-[#111111]/90 border border-white/10 rounded-sm">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="relative w-11 h-11 shrink-0 rounded-sm overflow-hidden border border-white/10">
                    <img src="/brand/thumb_the_weeknd.jpg" alt="The Weeknd" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      {isPlaying ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-[#FF0000] fill-current" />}
                    </div>
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="text-neutral-200 text-[11px] font-sans font-medium truncate">The Weeknd - Blinding Lights</div>
                    <div className="mt-2 space-y-1">
                      <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF0000]" style={{ width: `${(progressSecs / totalSecs) * 100}%` }} />
                      </div>
                      <div className="text-[10px] text-neutral-500 text-right">{formatTime(progressSecs)} / {formatTime(totalSecs)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* // SYSTEM STATUS */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-neutral-300 tracking-wider">// SYSTEM STATUS</div>
              <div className="p-4 bg-[#0a0a0a] border border-white/10 rounded-sm text-xs space-y-2">
                <div className="flex items-center gap-1.5 pb-2 text-xs">
                  <span className="text-[#22c55e] font-bold">$ reubg</span>
                  <span className="text-neutral-400">--status</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  {SYSTEM_STATUS_ITEMS.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-500">{item.state === 'progress' ? '[→]' : '[✓]'}</span>
                        <span className="text-neutral-300 w-24">{item.service}</span>
                      </div>
                      {item.state === 'progress' ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[#FF0000] font-black text-xs">||||||||||</span>
                          <span className="text-neutral-300 text-[11px]">{item.status}</span>
                        </div>
                      ) : (
                        <span className="text-[#22c55e]">{item.status}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* // QUICK SHARE */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-neutral-300 tracking-wider">// QUICK SHARE</div>
              <div className="flex flex-col items-center p-5 bg-[#0a0a0a] border border-white/10 rounded-sm text-center">
                <div className="relative p-2.5 mb-3">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#FF0000]" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#FF0000]" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#FF0000]" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#FF0000]" />
                  <div className="w-32 h-32 bg-white p-2 rounded-sm flex items-center justify-center">
                    {qrUrl ? <img src={qrUrl} alt="QR Code" className="w-full h-full object-contain" /> : <div className="w-full h-full bg-neutral-200" />}
                  </div>
                </div>
                <div className="text-xs font-bold text-white tracking-widest uppercase">SCAN MY CARD</div>
                <div className="text-[11px] text-neutral-500">Save my details instantly</div>
              </div>

              <div className="space-y-2.5 pt-1">
                <button onClick={handleDownloadVcf} className="w-full flex items-center justify-between p-3.5 bg-[#0e0e0e] hover:bg-[#141414] border border-white/10 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center"><User className="w-4 h-4 text-white" /></div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-white uppercase tracking-wider">{savedVcf ? 'CARD SAVED' : 'ADD TO CONTACTS'}</div>
                      <div className="text-[10px] text-neutral-500">Download vCard</div>
                    </div>
                  </div>
                  {savedVcf ? <Check className="w-4 h-4 text-[#FF0000]" /> : <ArrowDown className="w-4 h-4 text-neutral-400" />}
                </button>

                <button onClick={handleShareLink} className="w-full flex items-center justify-between p-3.5 bg-[#0e0e0e] hover:bg-[#141414] border border-white/10 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center"><Share2 className="w-4 h-4 text-white" /></div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-white uppercase tracking-wider">{copiedLink ? 'LINK COPIED' : 'SHARE LINK'}</div>
                      <div className="text-[10px] text-neutral-500">reubg.in/link</div>
                    </div>
                  </div>
                  {copiedLink ? <Check className="w-4 h-4 text-[#FF0000]" /> : <Copy className="w-4 h-4 text-neutral-400" />}
                </button>
              </div>
            </div>
          </aside>

        </div>

        {/* Global Footer */}
        <footer className="w-full py-5 px-6 border-t border-white/10 font-mono bg-black">
          <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {s.name}
                  </a>
                ))}
              </div>
              <a href="https://instagram.com/reubg.dev" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000]">{BRAND_INFO.handle}</a>
            </div>
            <div className="flex items-center gap-2 tracking-widest text-[11px] sm:text-xs">
              <span>{BRAND_INFO.signature}</span>
              <span className="w-2.5 h-[2px] bg-[#FF0000] inline-block" />
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}