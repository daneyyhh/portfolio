import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [status, setStatus] = useState('idle'); // idle | sending | sent

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => setStatus('sent'), 1800);
    };

    return (
        <section id="contact" className="contact-section">
            <div className="section-inner">
                {/* Section label */}
                <motion.div
                    className="section-eyebrow"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <span className="eyebrow-line" />
                    CHAPTER 04
                    <span className="eyebrow-line" />
                </motion.div>

                <div className="contact-grid">
                    {/* Left: Headline */}
                    <div className="contact-left">
                        <motion.h2
                            className="section-title"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            LET'S<br />
                            <span className="title-accent">TALK</span>
                        </motion.h2>

                        <motion.p
                            className="contact-desc"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.7 }}
                        >
                            Have a project in mind? Want to collaborate on a FiveM server,
                            Unity game, or web app? Fire a transmission — I read everything.
                        </motion.p>

                        <motion.div
                            className="contact-channels"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                        >
                            <a href="mailto:ftreuben1520@gmail.com" className="channel-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                ftreuben1520@gmail.com
                            </a>
                            <a
                                href="https://github.com/daneyyhh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="channel-btn"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" /></svg>
                                github.com/daneyyhh
                            </a>
                        </motion.div>

                        {/* Status indicator */}
                        <div className="contact-status-row">
                            <span className="status-dot online" />
                            <span className="status-txt">Available for freelance &amp; collabs</span>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <motion.div
                        className="contact-right"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        {status === 'sent' ? (
                            <div className="form-success">
                                <div className="success-icon">✓</div>
                                <h3>Transmission Received!</h3>
                                <p>I'll get back to you ASAP. Stay frosty.</p>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="cf-name">Name</label>
                                        <input
                                            id="cf-name"
                                            type="text"
                                            placeholder="Your name"
                                            required
                                            autoComplete="name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cf-email">Email</label>
                                        <input
                                            id="cf-email"
                                            type="email"
                                            placeholder="your@email.com"
                                            required
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cf-subject">Subject</label>
                                    <input
                                        id="cf-subject"
                                        type="text"
                                        placeholder="What's this about?"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cf-message">Message</label>
                                    <textarea
                                        id="cf-message"
                                        rows="5"
                                        placeholder="Tell me about your project..."
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="form-submit"
                                    disabled={status === 'sending'}
                                >
                                    {status === 'sending' ? (
                                        <span className="sending-anim">Sending<span className="dots">...</span></span>
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
