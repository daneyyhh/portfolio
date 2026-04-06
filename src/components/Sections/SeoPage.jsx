import React from 'react';
import { motion } from 'framer-motion';
import '../style.css';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

const SeoPage = () => {
    return (
        <div className="seo-page">
            {/* ── HERO SECTION ── */}
            <section className="seo-hero">
                <div className="seo-hero-bg"></div>
                <div className="seo-hero-content">
                    <motion.h1 {...fadeUp(0)} className="seo-hero-title">
                        Affordable SEO Services for Australian Businesses
                    </motion.h1>
                    <motion.p {...fadeUp(0.1)} className="seo-hero-desc">
                        We are Honeycomb — an award-winning digital marketing agency based in India, delivering proven, affordable SEO strategies for businesses across Australia. From Sydney and Melbourne to Brisbane, Perth, and Adelaide, we help Australian businesses grow their organic presence and attract quality leads.
                    </motion.p>
                    <motion.div {...fadeUp(0.2)} className="seo-hero-ctas">
                        <a href="#audit" className="seo-cta-primary">Get a Free SEO Audit</a>
                        <a href="#consultation" className="seo-cta-secondary">Book a Free Consultation</a>
                    </motion.div>
                </div>
            </section>

            {/* ── WHY CHOOSE US ── */}
            <section className="seo-why">
                <div className="seo-section-inner">
                    <motion.h2 {...fadeUp(0)} className="seo-section-title">
                        Why Australian Businesses Choose Honeycomb for SEO
                    </motion.h2>
                    <motion.p {...fadeUp(0.05)} className="seo-section-subtitle">
                        With 16+ years of global digital marketing experience, Honeycomb provides Australian businesses with premium SEO expertise at a fraction of the cost of local agencies.
                    </motion.p>
                    <div className="seo-why-grid">
                        {[
                            'India-based agency with proven expertise in Google Australia\'s search algorithms and Australian market trends',
                            'Up to 60% more cost-effective than hiring a local Australian SEO agency — with no compromise on quality',
                            'Custom SEO strategies designed around your Australian audience, business goals, and competitive landscape',
                            'Transparent monthly reporting — keyword rankings, traffic growth, and conversion metrics',
                            'Specialists in Local SEO, eCommerce SEO, Technical SEO, and Content-led growth',
                            '16+ years of experience with a 60% long-term client retention rate across global markets',
                        ].map((item, i) => (
                            <motion.div key={i} {...fadeUp(0.1 + i * 0.05)} className="seo-why-card">
                                <div className="seo-why-check">✓</div>
                                <p>{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SERVICES SECTION ── */}
            <section className="seo-services">
                <div className="seo-section-inner">
                    <motion.h2 {...fadeUp(0)} className="seo-section-title">
                        Our SEO Services for Australian Businesses
                    </motion.h2>
                    <motion.p {...fadeUp(0.05)} className="seo-section-subtitle">
                        As a trusted SEO partner for businesses across Australia, we deliver end-to-end SEO solutions designed to improve your Google Australia rankings, grow organic traffic, and convert visitors into customers.
                    </motion.p>
                    <div className="seo-services-grid">
                        {[
                            {
                                title: 'Local SEO for Australia',
                                desc: 'Get found by local customers across Australia. We optimise your Google Business Profile, build local citations, and develop location-specific content to help your business rank in local searches in Sydney, Melbourne, Brisbane, Perth, Adelaide, and beyond.',
                            },
                            {
                                title: 'On-Page SEO for Australia',
                                desc: 'We optimise every element of your website — title tags, meta descriptions, content structure, and internal linking to match what your Australian audience is actively searching for on Google.',
                            },
                            {
                                title: 'Technical SEO for Australia',
                                desc: 'We perform in-depth technical audits and fix issues affecting your Google Australia rankings — including Core Web Vitals, mobile usability, site speed, crawl errors, and structured data.',
                            },
                            {
                                title: 'Content Marketing & Blogging',
                                desc: 'We create compelling, keyword-rich content tailored for Australian audiences — blogs, landing pages, and guides that build your brand\'s authority and drive consistent organic traffic from Google Australia.',
                            },
                            {
                                title: 'Link Building for Australia',
                                desc: 'We build authoritative backlinks from reputable Australian websites, industry publications, and business directories to grow your domain authority and strengthen your competitive position on Google Australia.',
                            },
                            {
                                title: 'eCommerce SEO for Australia',
                                desc: 'We help Australian online stores increase organic revenue by optimising product pages, category architecture, schema markup, and shopping feeds for high-intent Australian shoppers on Google.',
                            },
                            {
                                title: 'SEO Consulting for Australia',
                                desc: 'Our SEO consultants work directly with your Australian team to design a bespoke, data-driven SEO strategy — tailored to your industry, competitors, and growth ambitions.',
                            },
                        ].map((service, i) => (
                            <motion.div key={i} {...fadeUp(0.1 + i * 0.05)} className="seo-service-card">
                                <div className="seo-service-icon">{i + 1}</div>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── STATS BAR ── */}
            <section className="seo-stats">
                <div className="seo-section-inner">
                    <motion.h2 {...fadeUp(0)} className="seo-stats-title">
                        Trusted by Businesses Worldwide
                    </motion.h2>
                    <div className="seo-stats-row">
                        {[
                            { val: '17+', lbl: 'Years of Experience' },
                            { val: '500+', lbl: 'Projects Delivered' },
                            { val: '60%', lbl: 'Long-Term Client Retention' },
                            { val: '10+', lbl: 'Countries Served' },
                        ].map((stat, i) => (
                            <motion.div key={i} {...fadeUp(0.1 + i * 0.1)} className="seo-stat-item">
                                <span className="seo-stat-val">{stat.val}</span>
                                <span className="seo-stat-lbl">{stat.lbl}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ SECTION ── */}
            <section className="seo-faq">
                <div className="seo-section-inner">
                    <motion.h2 {...fadeUp(0)} className="seo-section-title">
                        Frequently Asked Questions – SEO Services for Australian Businesses
                    </motion.h2>
                    <div className="seo-faq-list">
                        {[
                            {
                                q: 'How can an India-based agency provide effective SEO for Australian businesses?',
                                a: 'SEO is completely location-independent. Our team understands Google Australia\'s ranking signals, Australian search behaviour, and local keyword trends. We\'ve delivered strong SEO results for clients in multiple countries, and Australia is a key market we actively serve.',
                            },
                            {
                                q: 'How much do your SEO services cost for Australian businesses?',
                                a: 'Our SEO packages for Australian clients are typically priced between AUD $400 to AUD $1,800 per month — considerably more affordable than most Australian agencies. Every package is customised to your goals, competition level, and budget.',
                            },
                            {
                                q: 'How long before we see SEO results in Australia?',
                                a: 'Most Australian clients begin seeing meaningful improvements in Google rankings and organic traffic within 3 to 6 months. More competitive sectors, such as real estate, finance, or legal, may require additional time. We focus on sustainable, long-term results, not shortcuts.',
                            },
                            {
                                q: 'Do you offer Local SEO targeting specific Australian cities?',
                                a: 'Yes. We deliver city-specific Local SEO for Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Gold Coast, Hobart, and more, helping your business rank in Google Maps and local \'near me\' search results in your target locations.',
                            },
                            {
                                q: 'What Australian industries do you have SEO experience with?',
                                a: 'We have worked with Australian-focused businesses across e-commerce, retail, hospitality, healthcare, real estate, education, legal services, professional services, and SaaS. All strategies are tailored to your industry and competitive environment.',
                            },
                            {
                                q: 'Will I receive regular updates on my Australian SEO campaign?',
                                a: 'Yes. We provide detailed monthly reports covering keyword rankings, organic traffic, backlink growth, and strategic recommendations, along with a dedicated account manager for ongoing communication and strategy reviews.',
                            },
                        ].map((faq, i) => (
                            <motion.div key={i} {...fadeUp(0.1 + i * 0.05)} className="seo-faq-item">
                                <details>
                                    <summary>{faq.q}</summary>
                                    <p>{faq.a}</p>
                                </details>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA SECTION ── */}
            <section className="seo-cta-section">
                <div className="seo-section-inner">
                    <motion.h2 {...fadeUp(0)} className="seo-cta-title">
                        Ready to Grow Your Australian Business with SEO?
                    </motion.h2>
                    <motion.p {...fadeUp(0.05)} className="seo-cta-desc">
                        Whether you're a local business targeting customers in Sydney or Melbourne, or a national brand looking to dominate Google Australia, Honeycomb delivers the strategy, expertise, and value to get you there. Let's build your organic growth story today.
                    </motion.p>
                    <motion.div {...fadeUp(0.1)} className="seo-cta-buttons">
                        <a href="#audit" className="seo-cta-primary">Get a Free SEO Audit</a>
                        <a href="#consultation" className="seo-cta-secondary">Book a Free Strategy Call</a>
                    </motion.div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="seo-footer">
                <div className="seo-section-inner">
                    <p>Honeycomb Creative Support | vani@honeycombindia.net | +91 90352 90915 | <a href="https://honeycombindia.net">honeycombindia.net</a></p>
                </div>
            </footer>
        </div>
    );
};

export default SeoPage;
