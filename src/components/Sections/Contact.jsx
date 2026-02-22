import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" style={{ padding: '100px 40px', background: 'var(--comic-gray)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', border: '4px solid #000', padding: '40px', boxShadow: '15px 15px 0px #000' }}>
                <div style={{ marginBottom: '40px' }}>
                    <span className="caption-box" style={{ background: '#000', color: '#fff' }}>HAVE A CASE?</span>
                    <h2 className="section-title" data-text="CONTACT" style={{ fontSize: '4rem', color: '#000' }}>CONTACT</h2>
                </div>

                <form style={{ display: 'grid', gap: '20px' }}>
                    <input
                        type="text" placeholder="NAME / CODENAME"
                        style={{ border: '3px solid #000', padding: '15px', fontFamily: 'var(--font-body)', outline: 'none' }}
                    />
                    <input
                        type="email" placeholder="SIGNAL CHANNEL (EMAIL)"
                        style={{ border: '3px solid #000', padding: '15px', fontFamily: 'var(--font-body)', outline: 'none' }}
                    />
                    <textarea
                        placeholder="THE MISSION DETAILS..." rows="5"
                        style={{ border: '3px solid #000', padding: '15px', fontFamily: 'var(--font-body)', outline: 'none' }}
                    />
                    <button className="btn-comic" style={{ width: '100%', fontSize: '1.8rem' }}>SEND TRANSMISSION</button>
                </form>

                <div style={{ marginTop: '40px', textAlign: 'center', fontFamily: 'var(--font-marker)' }}>
                    "TO BE CONTINUED..."
                </div>
            </div>
        </section>
    );
};

export default Contact;
