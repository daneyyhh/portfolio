import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => { setSending(false); setSuccess(true); }, 2000);
    };

    return (
        <section id="contact" className="contact-section">
            <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>
                <motion.div {...fadeUp(0)} className="section-eyebrow light">
                    <span className="eyebrow-line light" />
                    Chapter 04 — Talk
                    <span className="eyebrow-line light" />
                </motion.div>

                <div className="contact-grid">
                    {/* Left */}
                    <div>
                        <motion.h2 {...fadeUp(0)} className="section-title on-dark" style={{ marginBottom: 0 }}>
                            START<br />
                            <span className="title-yellow">NOW</span>
                        </motion.h2>

                        <motion.p {...fadeUp(0.1)} className="contact-desc">
                            Got a project, idea, or mission? Drop a message and let's build something legendary together.
                        </motion.p>

                        <motion.div {...fadeUp(0.16)} className="contact-channels">
                            <a href="mailto:ftreuben1520@gmail.com" className="channel-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                ftreuben1520@gmail.com
                            </a>
                            <a href="https://github.com/daneyyhh" target="_blank" rel="noopener noreferrer" className="channel-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" /></svg>
                                github.com/daneyyhh
                            </a>
                        </motion.div>

                        <motion.div {...fadeUp(0.22)} className="contact-status-row">
                            <span className="status-dot online" />
                            Available for new missions right now
                        </motion.div>
                    </div>

                    {/* Right: Form */}
                    <motion.div
                        className="contact-right"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        {success ? (
                            <div className="form-success">
                                <div className="success-icon">✓</div>
                                <h3>Message Sent!</h3>
                                <p>Thanks for reaching out. I'll respond on the double.</p>
                                <button className="btn-yellow" onClick={() => setSuccess(false)}>
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="contact-name">Name</label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            placeholder="Your name"
                                            required
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contact-email">Email</label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            placeholder="your@email.com"
                                            required
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-subject">Subject</label>
                                    <input
                                        id="contact-subject"
                                        type="text"
                                        placeholder="What's this about?"
                                        value={form.subject}
                                        onChange={e => setForm({ ...form, subject: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-message">Message</label>
                                    <textarea
                                        id="contact-message"
                                        rows={5}
                                        placeholder="Tell me about your project or idea..."
                                        required
                                        value={form.message}
                                        onChange={e => setForm({ ...form, message: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="form-submit" disabled={sending}>
                                    {sending ? (
                                        <>Sending<span className="dots" /></>
                                    ) : (
                                        <>
                                            Send Message
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
