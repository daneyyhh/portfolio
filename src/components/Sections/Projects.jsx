import React from 'react';

const Projects = () => {
    return (
        <section id="cases" className="gp-cases">
            <div className="container">
                <div className="gp-cases-top">
                    <div className="gp-cases-meta">
                        <div className="gp-mini">Cases (3) • Archive (0)</div>
                    </div>
                </div>

                <div className="gp-case-list">
                    {/* Project: FiveM Resources */}
                    <article className="gp-case gp-case-1" data-case>
                        <div className="gp-case-head">
                            <div className="gp-case-title marquee" aria-hidden="true">
                                <div className="marquee-track">
                                    <span>FiveM Resources •</span><span>FiveM Resources •</span><span>FiveM Resources •</span><span>FiveM Resources •</span>
                                    <span>FiveM Resources •</span><span>FiveM Resources •</span><span>FiveM Resources •</span><span>FiveM Resources •</span>
                                </div>
                            </div>
                        </div>

                        <a className="gp-case-hit" href="https://github.com/daneyyhh/fivem-resources" target="_blank" rel="noreferrer">
                            <div className="gp-case-body">
                                <div className="gp-case-tags">
                                    <span>LUA</span><span>SQL</span><span>UI</span><span>Optimized Networking</span>
                                </div>
                                <div className="gp-case-actions">
                                    <span className="gp-chip">View Project</span>
                                    <span className="gp-chip">Details</span>
                                </div>
                            </div>
                        </a>
                    </article>

                    {/* Project: Astro Bot */}
                    <article className="gp-case gp-case-2" data-case>
                        <div className="gp-case-head">
                            <div className="gp-case-title marquee" aria-hidden="true">
                                <div className="marquee-track">
                                    <span>Astro Bot •</span><span>Astro Bot •</span><span>Astro Bot •</span><span>Astro Bot •</span>
                                    <span>Astro Bot •</span><span>Astro Bot •</span><span>Astro Bot •</span><span>Astro Bot •</span>
                                </div>
                            </div>
                        </div>

                        <a className="gp-case-hit" href="https://github.com/daneyyhh/astrobot-discord" target="_blank" rel="noreferrer">
                            <div className="gp-case-body">
                                <div className="gp-case-tags">
                                    <span>Python</span><span>Discord.py</span><span>Automation</span><span>Community</span>
                                </div>
                                <div className="gp-case-actions">
                                    <span className="gp-chip">View Project</span>
                                    <span className="gp-chip">Details</span>
                                </div>
                            </div>
                        </a>
                    </article>

                    {/* Project: Haunted House */}
                    <article className="gp-case gp-case-4" data-case>
                        <div className="gp-case-head">
                            <div className="gp-case-title marquee" aria-hidden="true">
                                <div className="marquee-track">
                                    <span>HAUNTED HOUSE •</span><span>HAUNTED HOUSE •</span><span>HAUNTED HOUSE
                                        •</span><span>HAUNTED HOUSE •</span>
                                    <span>HAUNTED HOUSE •</span><span>HAUNTED HOUSE •</span><span>HAUNTED HOUSE
                                        •</span><span>HAUNTED HOUSE •</span>
                                </div>
                            </div>
                        </div>

                        <a className="gp-case-hit"
                            href="https://play.unity.com/en/games/4a806e53-26ef-47ef-aa0d-d41d09e9e12d/reuben"
                            target="_blank" rel="noreferrer">
                            <div className="gp-case-body">
                                <div className="gp-case-tags">
                                    <span>Unity</span><span>C#</span><span>3D</span><span>WebGL</span>
                                </div>
                                <div className="gp-case-actions">
                                    <span className="gp-chip">Play Game</span>
                                    <span className="gp-chip">Details</span>
                                </div>
                            </div>
                        </a>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default Projects;
