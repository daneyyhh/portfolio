import React from 'react';
import './style.css';
import Cursor from './Cursor';
import ProjectCard3D from './ProjectCard3D';

const App = () => {
    return (
        <div>
            <Cursor />

            <main style={{ padding: '8rem 2rem', background: '#050505', minHeight: '100vh', color: 'white' }}>
                <h1 className="hover-target" data-magnetic="true" style={{ marginBottom: '4rem', fontSize: '4rem' }}>
                    Portfolio Demo
                </h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                    <ProjectCard3D
                        title="Cyberpunk 2077"
                        desc="Immersive open world RPG built with REDengine 4."
                        image="https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                    />
                    <ProjectCard3D
                        title="Neon Racer"
                        desc="High-speed rhythm game with reactive audio visualizers."
                        image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                    />
                </div>

                <button
                    className="hover-target"
                    data-magnetic="true"
                    style={{
                        marginTop: '4rem', padding: '1rem 2rem',
                        background: 'transparent', border: '1px solid #00ff88', color: '#00ff88',
                        fontSize: '1.2rem', cursor: 'none'
                    }}
                >
                    Get In Touch
                </button>
            </main>
        </div>
    );
};

export default App;
