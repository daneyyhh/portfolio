import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
            <div className="section-inner">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <span className="section-label">CHAPTER FOUR</span>
                    <h2 className="section-title">THE <span className="rdr-red">TELEGRAPH</span></h2>
                </motion.div>

                <div className="contact-grid">
                    {/* Left: Info */}
                    <div className="contact-info">
                        <motion.h3
                            style={{ fontFamily: 'var(--font-heading)', color: 'var(--rdr-red)', fontSize: '1.8rem', marginBottom: '20px' }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            SEND WORD
                        </motion.h3>
                        <p style={{ fontSize: '1.2rem', color: 'var(--rdr-muted)', marginBottom: '40px' }}>
                            Have a mission or a bounty to discuss? Reach out and I'll ride as fast as I can.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <span className="rdr-label" style={{ fontSize: '0.8rem' }}>POSTAL ADDRESS</span>
                                <p style={{ fontSize: '1.1rem' }}>ftreuben1520@gmail.com</p>
                            </div>
                            <div>
                                <span className="rdr-label" style={{ fontSize: '0.8rem' }}>THE TRAIL</span>
                                <p style={{ fontSize: '1.1rem' }}>github.com/daneyyhh</p>
                            </div>
                        </div>

                        <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '10px', height: '10px', background: 'var(--rdr-red)', borderRadius: '50%' }} />
                            <span style={{ fontFamily: 'var(--font-typewriter)', fontSize: '0.8rem', color: 'var(--rdr-muted)' }}>STATUS: AVAILABLE FOR BOUNTIES</span>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="contact-form-wrap">
                        {success ? (
                            <motion.div
                                className="success-message"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ textAlign: 'center', padding: '40px', border: '1px solid var(--rdr-red)' }}
                            >
                                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '2rem', marginBottom: '10px' }}>TELEGRAPH DELIVERED</h3>
                                <p style={{ color: 'var(--rdr-muted)', marginBottom: '24px' }}>Expect a rider on the double.</p>
                                <button className="btn-outline-rdr" onClick={() => setSuccess(false)}>SEND ANOTHER WORD</button>
                            </motion.div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <input
                                        type="text" placeholder="YOUR NAME" className="contact-input" required
                                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                    />
                                    <input
                                        type="email" placeholder="YOUR EMAIL" className="contact-input" required
                                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>
                                <input
                                    type="text" placeholder="THE SUBJECT" className="contact-input"
                                    value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                                />
                                <textarea
                                    placeholder="YOUR MESSAGE" className="contact-input" rows="5" required
                                    style={{ resize: 'none' }}
                                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                                />
                                <button type="submit" className="btn-rdr contact-submit" disabled={sending}>
                                    {sending ? 'SENDING TELEGRAPH...' : 'SEND TELEGRAPH'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <footer className="site-footer">
                    <p>© 1899 REUBEN PORTFOLIO — BUILT WITH GRIT AND CODE.</p>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
