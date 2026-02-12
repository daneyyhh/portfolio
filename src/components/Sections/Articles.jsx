import React from 'react';

const Articles = () => {
    return (
        <section id="articles" className="gp-cases">
            <div className="container">
                <div className="gp-cases-top">
                    <div className="gp-cases-meta">
                        <div className="gp-mini">Articles</div>
                    </div>
                </div>

                <div className="gp-case-list">
                    {/* Article 1 */}
                    <article className="gp-case gp-article-1" data-case>
                        <div className="gp-case-head">
                            <div className="gp-case-title marquee" aria-hidden="true">
                                <div className="marquee-track">
                                    <span>THE ILLUMINATI •</span><span>THE ILLUMINATI •</span><span>THE ILLUMINATI •</span><span>THE ILLUMINATI •</span>
                                    <span>THE ILLUMINATI •</span><span>THE ILLUMINATI •</span><span>THE ILLUMINATI •</span><span>THE ILLUMINATI •</span>
                                </div>
                            </div>
                        </div>

                        <a className="gp-case-hit" href="https://github.com/daneyyhh/illuminati-article" target="_blank" rel="noreferrer">
                            <div className="gp-case-body">
                                <div className="gp-case-tags">
                                    <span>History</span><span>Myths</span><span>Conspiracy</span><span>Analysis</span>
                                </div>
                                <div className="gp-case-actions">
                                    <span className="gp-chip">Read Article</span>
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

export default Articles;
