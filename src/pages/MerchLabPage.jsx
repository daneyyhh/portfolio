import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Globe, Mail, Calendar, Bell, Check, X } from 'lucide-react';
import { personalData } from '../data/portfolioData';

const EASE = [0.16, 1, 0.3, 1];

export default function MerchLabPage() {
  const prefersReduced = useReducedMotion();
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [reminderEmail, setReminderEmail] = useState('');
  const [reminderSubmitted, setReminderSubmitted] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'MERCH LAB // REUBG DEV';
    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle;
    };
  }, []);

  // Handle escape key to close reminder modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setReminderModalOpen(false);
      }
    };
    if (reminderModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [reminderModalOpen]);

  // Handle email reminder submission
  const handleSendEmailReminder = (e) => {
    e.preventDefault();
    if (!reminderEmail || !reminderEmail.includes('@')) return;

    const subject = encodeURIComponent('[REUBG MERCH LAB] Reminder / Drop Dispatch Request (Concept 2026)');
    const body = encodeURIComponent(
      `Hi Reuben,\n\nPlease add my email address to the confidential Merch Lab release notification dispatch list.\n\nNotification Email: ${reminderEmail}\nRequested via: https://reubg.in/merch-lab\nDate: ${new Date().toLocaleDateString()}\n\nLooking forward to the release!`
    );

    // Open user's default email client
    window.location.href = `mailto:${personalData.email}?subject=${subject}&body=${body}`;
    setReminderSubmitted(true);
  };

  // Download calendar .ics reminder file with email alert trigger
  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//reubg.in//Merch Lab Reminder//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:merch-lab-${Date.now()}@reubg.in`,
      'DTSTAMP:20260101T000000Z',
      'DTSTART:20261101T100000Z',
      'DTEND:20261101T120000Z',
      'SUMMARY:REUBG MERCH LAB — Concept 2026 Drop',
      'DESCRIPTION:Reminder: The confidential REUBG MERCH LAB drop is now live. Check availability and blueprints at https://reubg.in/merch-lab',
      'LOCATION:https://reubg.in/merch-lab',
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT24H',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: REUBG MERCH LAB release goes live tomorrow.',
      'END:VALARM',
      'BEGIN:VALARM',
      'TRIGGER:-PT1H',
      'ACTION:EMAIL',
      'DESCRIPTION:Reminder: REUBG MERCH LAB drop is releasing soon.',
      'SUMMARY:REUBG MERCH LAB Release Notification',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'merch-lab-2026-reminder.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex flex-col justify-between relative bg-[#EDECE6] text-[#111111] overflow-hidden selection:bg-[#FF1E27] selection:text-white font-sans">
      
      {/* ─────────────────────────────────────────────────────────────
          CINEMATIC STUDIO BACKDROP (RAW ARCHITECTURAL SCENE)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-cover bg-right lg:bg-center pointer-events-none"
        style={{
          backgroundImage: `url('/images/merch-lab-backdrop.jpg')`,
        }}
        aria-hidden="true"
      />

      {/* Subtle responsive gradient overlay to ensure 100% typography contrast on smaller screens */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#EDECE6] via-[#EDECE6]/90 to-transparent lg:via-[#EDECE6]/40 pointer-events-none"
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────
          ARCHITECTURAL CONCRETE PILLAR TYPOGRAPHY (CENTER/RIGHT)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="hidden xl:block absolute right-[10%] top-[45%] -translate-y-1/2 font-mono text-[11px] text-[#555552]/70 uppercase tracking-[0.25em] space-y-1.5 select-none pointer-events-none z-10"
        aria-hidden="true"
      >
        <div>CODE</div>
        <div>CREATE</div>
        <div>EXPLORE</div>
        <div>REPEAT</div>
        <div className="w-5 h-0.5 bg-[#FF1E27] mt-1.5" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PRIMARY EDITORIAL CONTENT (LEFT COLUMN)
      ───────────────────────────────────────────────────────────── */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 pt-8 sm:pt-12 md:pt-14 pb-8 flex-1 flex flex-col justify-center">
        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-xl lg:max-w-2xl space-y-6 sm:space-y-7"
        >
          {/* Top Label: 08 — MERCH LAB */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-widest uppercase">
            <span className="text-[#FF1E27] font-bold">08</span>
            <span className="w-10 sm:w-14 h-px bg-[#111111]/30" />
            <span className="text-[#111111] font-bold">MERCH LAB</span>
          </div>

          {/* Massive Editorial Headline: Solid MERCH + Outlined LAB */}
          <div className="space-y-0 select-none">
            {/* MERCH: Solid Black Ultra-Heavy Industrial Display */}
            <h1 className="font-archivo text-6xl sm:text-7xl md:text-8xl lg:text-[7.25rem] xl:text-[8.5rem] tracking-tight text-[#111111] leading-[0.84] uppercase block">
              MERCH
            </h1>

            {/* LAB: Hollow Outline Sans-Serif */}
            <div
              className="font-archivo text-6xl sm:text-7xl md:text-8xl lg:text-[7.25rem] xl:text-[8.5rem] tracking-tight leading-[0.84] uppercase block text-transparent"
              style={{
                WebkitTextStroke: '2.5px #111111',
                paintOrder: 'stroke fill',
              }}
            >
              LAB
            </div>
          </div>

          {/* Subheading: UNDER DEVELOPMENT . */}
          <div className="font-mono text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.25em] text-[#111111] flex items-center gap-1.5 pt-0.5">
            <span>UNDER DEVELOPMENT</span>
            <span className="inline-block w-1.5 h-1.5 bg-[#FF1E27] shrink-0" />
          </div>

          {/* Narrative Body Copy */}
          <div className="space-y-1 font-sans text-sm sm:text-base text-[#383733] font-normal leading-relaxed pt-1 max-w-lg">
            <p>A new chapter is in the works.</p>
            <p>Designed for the same mindset.</p>
            <p>Stay tuned.</p>
          </div>

          {/* Action Row: Pill Button + Circle (+) + Stacked Text */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            {/* FOLLOW UPDATES Rounded Pill Button — Opens Email Reminder Modal */}
            <button
              type="button"
              onClick={() => {
                setReminderSubmitted(false);
                setReminderModalOpen(true);
              }}
              className="group inline-flex items-center gap-3.5 px-6 py-3 bg-[#111111] hover:bg-[#FF1E27] text-white text-xs font-mono font-bold tracking-wider uppercase rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              aria-label="Set email reminder for Merch Lab updates"
            >
              <span>FOLLOW UPDATES</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Circular (+) Button */}
            <button
              type="button"
              onClick={() => setManifestoOpen(!manifestoOpen)}
              className="w-10 h-10 rounded-full border border-[#111111]/30 hover:border-[#111111] hover:bg-[#111111] hover:text-white flex items-center justify-center text-[#111111] transition-all duration-200 cursor-pointer"
              title="Atelier statement"
              aria-label="Toggle atelier statement"
            >
              <Plus size={16} className={`transition-transform duration-300 ${manifestoOpen ? 'rotate-45' : ''}`} />
            </button>

            {/* Stacked Small Monospace Statement */}
            <div className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#111111] leading-tight select-none">
              <div>SAME</div>
              <div>MINDSET.</div>
              <div>DIFFERENT</div>
              <div>MEDIUM.</div>
            </div>
          </div>

          {/* Expandable Atelier Philosophy Drawer */}
          <AnimatePresence>
            {manifestoOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-[#EDECE6]/95 border border-[#111111]/20 font-mono text-xs text-[#2A2925] space-y-2 max-w-lg shadow-sm">
                  <div className="flex items-center justify-between text-[10px] text-[#FF1E27] font-bold tracking-widest uppercase">
                    <span>ATELIER SPEC // 2026</span>
                    <span>RESTRICTED ACCESS</span>
                  </div>
                  <p className="font-sans leading-relaxed">
                    Translating procedural craft, computational precision, and engineering discipline into tangible reality. Undergoing rigorous material tests until release criteria are met.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Left Metadata Bar Below Separator Line */}
          <div className="pt-6 sm:pt-7 border-t border-[#111111]/20 space-y-1 font-mono text-[10px] sm:text-xs uppercase tracking-widest select-none">
            <div className="font-bold text-[#111111]">
              CONCEPT &nbsp;/&nbsp; 2026
            </div>
            <div className="text-[#555552]">
              MORE DETAILS SOON.
            </div>
          </div>
        </motion.div>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          FULL-WIDTH BOTTOM EDITORIAL STRIP / TICKER
      ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-20 border-t border-[#111111]/15 bg-[#EDECE6]/90 backdrop-blur-sm px-4 sm:px-6 md:px-12 py-4 font-mono text-[10px] sm:text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
          
          {/* Left Block: REUBG DEV / MERCH LAB with horizontal line */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <div className="font-bold uppercase tracking-wider text-[#111111] leading-tight">
              <div>REUBG DEV</div>
              <div>MERCH LAB</div>
            </div>
            <span className="hidden sm:inline-block w-16 md:w-24 h-px bg-[#111111]/30" />
          </div>

          {/* Center Block: CODE / CREATE / EXPLORE / REPEAT. */}
          <div className="tracking-[0.2em] uppercase font-bold text-[#111111] text-xs sm:text-sm text-center">
            <span>CODE &nbsp;/&nbsp; CREATE &nbsp;/&nbsp; EXPLORE &nbsp;/&nbsp; </span>
            <span className="text-[#FF1E27]">REPEAT.</span>
          </div>

          {/* Right Block: CONCEPT / 2026 / IN DEVELOPMENT with Globe */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 self-end md:self-auto">
            <div className="text-right uppercase font-semibold text-[#111111] leading-tight text-[10px] sm:text-xs">
              <div>CONCEPT / 2026</div>
              <div className="text-[#555552]">IN DEVELOPMENT</div>
            </div>
            <span className="w-8 sm:w-12 h-px bg-[#111111]/30 hidden sm:inline-block" />
            <Globe size={18} className="text-[#111111] stroke-[1.5]" />
          </div>

        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          EMAIL REMINDER MODAL DIALOG
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {reminderModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReminderModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="relative w-full max-w-lg bg-[#EDECE6] border-2 border-[#111111] shadow-2xl p-6 sm:p-8 font-mono z-10 space-y-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="reminder-modal-title"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-[#111111]/15 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-[#FF1E27] tracking-widest">
                    <Bell size={12} />
                    <span>08 // LAUNCH NOTIFICATION</span>
                  </div>
                  <h2 id="reminder-modal-title" className="font-archivo text-xl sm:text-2xl text-[#111111] uppercase tracking-tight">
                    GET REMINDER IN MAIL
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setReminderModalOpen(false)}
                  className="p-1.5 text-[#111111] hover:text-[#FF1E27] border border-[#111111]/20 hover:border-[#111111] transition-colors cursor-pointer"
                  aria-label="Close reminder modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Explanatory Narrative */}
              <div className="font-sans text-xs sm:text-sm text-[#383733] leading-relaxed space-y-1">
                <p>
                  Receive an email dispatch the moment production tolerances are met and the first <strong>Concept 2026</strong> drop goes live.
                </p>
                <p className="text-[11px] font-mono text-[#555552]">
                  Strictly zero marketing spam. Direct developer release dispatches only.
                </p>
              </div>

              {/* Input Form */}
              {!reminderSubmitted ? (
                <form onSubmit={handleSendEmailReminder} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="reminder-email" className="block text-[10px] uppercase tracking-wider text-[#111111] font-bold">
                      YOUR EMAIL ADDRESS:
                    </label>
                    <div className="relative flex items-center">
                      <Mail size={16} className="absolute left-3.5 text-stone-500 pointer-events-none" />
                      <input
                        id="reminder-email"
                        type="email"
                        required
                        value={reminderEmail}
                        onChange={(e) => setReminderEmail(e.target.value)}
                        placeholder="developer@domain.com"
                        className="w-full bg-white border border-[#111111] pl-10 pr-4 py-3 text-xs font-mono text-[#111111] placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#FF1E27] focus:border-[#FF1E27] transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-3 py-3.5 px-6 bg-[#111111] hover:bg-[#FF1E27] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <span>SET MAIL REMINDER</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-white border border-[#111111] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#111111] uppercase">
                    <Check size={16} className="text-[#FF1E27]" />
                    <span>REMINDER REQUEST PREPARED</span>
                  </div>
                  <p className="text-xs text-[#383733] font-sans leading-relaxed">
                    We've opened your mail client to dispatch your request to <strong>{personalData.email}</strong>. Once sent, your address is queued for the 2026 launch dispatch.
                  </p>
                </div>
              )}

              {/* Additional Reminder Options */}
              <div className="pt-3 border-t border-[#111111]/15 space-y-2.5">
                <div className="text-[10px] uppercase tracking-widest text-[#555552] font-bold">
                  ALTERNATIVE CALENDAR & MAIL OPTIONS:
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Calendar Reminder (.ics with email alarm) */}
                  <button
                    type="button"
                    onClick={handleDownloadIcs}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-3 border border-[#111111]/30 hover:border-[#111111] hover:bg-white text-[10px] font-mono font-bold tracking-wider uppercase text-[#111111] transition-colors cursor-pointer"
                    title="Download .ics calendar event with alarm"
                  >
                    <Calendar size={13} className="text-[#FF1E27]" />
                    <span>ADD CALENDAR ALARM (.ICS)</span>
                  </button>

                  {/* Direct mailto link */}
                  <a
                    href={`mailto:${personalData.email}?subject=${encodeURIComponent('[MERCH LAB] Drop Notification 2026')}&body=${encodeURIComponent('Hi Reuben,\nPlease notify me via email when Merch Lab drops.\n\nThank you!')}`}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-3 border border-[#111111]/30 hover:border-[#111111] hover:bg-white text-[10px] font-mono font-bold tracking-wider uppercase text-[#111111] transition-colors cursor-pointer"
                  >
                    <Mail size={13} className="text-[#FF1E27]" />
                    <span>DIRECT MAIL CLIENT</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
