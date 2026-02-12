import React from 'react';

const About = () => {
    return (
        <section id="about" className="gp-about">
            <div className="container">
                <div className="gp-about-grid">
                    <div className="gp-about-left">
                        <div className="gp-mini">Who I Am</div>
                        <h2 className="gp-h2">Passionate Developer & Creative Coder</h2>
                    </div>
                    <div className="gp-about-right">
                        <p className="gp-lead">
                            I'm a passionate developer with a love for web development, gaming, and creative coding.
                            I enjoy building immersive experiences through FiveM scripting, crafting elegant web
                            solutions, and exploring innovative technologies. Whether it's developing server-side
                            scripts, creating engaging web interfaces, or working on academic projects, I'm always
                            eager to learn and push the boundaries of what's possible.
                        </p>

                        {/* Skills Marquee */}
                        <div className="marquee gp-skill-marquee" aria-hidden="true">
                            <div className="marquee-track">
                                <span>C++ •</span><span>Lua •</span><span>C# •</span><span>Python •</span>
                                <span>Unity •</span><span>Unreal •</span><span>Docker •</span><span>Git •</span>
                                <span>React •</span><span>GSAP •</span><span>Three.js •</span><span>Node.js •</span>
                                {/* Duplicated for loop */}
                                <span>C++ •</span><span>Lua •</span><span>C# •</span><span>Python •</span>
                                <span>Unity •</span><span>Unreal •</span><span>Docker •</span><span>Git •</span>
                                <span>React •</span><span>GSAP •</span><span>Three.js •</span><span>Node.js •</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
