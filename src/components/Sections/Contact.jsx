import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => { setSending(false); setSuccess(true); }, 2000);
    };

    return (
        <section id="contact" className="contact-section" style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="section-inner">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <span className="section-label">CHAPTER IV — TRANSMISSION</span>
                        <h2 className="section-title">THE <span style={{ color: 'var(--tera-red)' }}>COMMUNIQUE</span></h2>
                    </motion.div>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {success ? (
                        <div style={{ textAlign: 'center', padding: '60px', background: 'rgba(228, 31, 38, 0.05)', border: '1px solid var(--tera-red)' }}>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '10px' }}>SIGNAL DELIVERED</h3>
                            <p style={{ color: 'var(--tera-muted)' }}>The outlaw has received your message. Expect a response in the mist.</p>
                            <button className="val-cta" style={{ marginTop: '30px' }} onClick={() => setSuccess(false)}>SEND ANOTHER</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                <input
                                    type="text" placeholder="NAME" required className="contact-input"
                                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                />
                                <input
                                    type="email" placeholder="EMAIL" required className="contact-input"
                                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                            <textarea
                                placeholder="YOUR MESSAGE" rows="6" required className="contact-input"
                                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                            />
                            <button type="submit" disabled={sending} className="val-cta" style={{ alignSelf: 'center', padding: '15px 60px', fontSize: '1rem' }}>
                                {sending ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
