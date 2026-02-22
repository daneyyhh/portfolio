import React from 'react';
import { motion } from 'framer-motion';

const panels = [
    { text: "ANOTHER BUG DETECTED!", action: "GASP!", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80" },
    { text: "INJECTING CLEAN CODE...", action: "ZZAP!", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80" },
    { text: "SYSTEM RESTORED!", action: "HUZZAH!", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80" },
];

const ComicStrip = () => {
    return (
        <section id="strip" className="comic-strip-section" style={{ padding: '80px 20px', background: '#000', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px', maxWidth: '1400px', margin: '0 auto' }}>
                {panels.map((panel, i) => (
                    <motion.div
                        key={i}
                        className="comic-panel"
                        initial={{ rotate: i % 2 === 0 ? -2 : 2, opacity: 0, y: 30 }}
                        whileInView={{ rotate: 0, opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        style={{ height: '400px', position: 'relative', background: '#fff' }}
                    >
                        <img src={panel.img} alt="Battle" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.2)' }} />
                        <div className="caption-box" style={{ position: 'absolute', top: 20, left: 20, maxWidth: '80%' }}>
                            {panel.text}
                        </div>
                        <div className="comic-click-effect" style={{ position: 'absolute', bottom: 20, right: 20, fontSize: '2rem' }}>
                            {panel.action}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ComicStrip;
