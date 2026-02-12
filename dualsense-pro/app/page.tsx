'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductControllerScroll from '@/components/ProductControllerScroll';

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const activeProduct = products[currentIndex];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentIndex]);

    const nextProduct = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const prevProduct = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-500 overflow-x-hidden">
            <Navbar />

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeProduct.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                    style={{
                        background: activeProduct.gradient,
                    }}
                >
                    {/* Scroll Scrollytelling Section */}
                    <ProductControllerScroll product={activeProduct} />

                    {/* Product Details Section */}
                    <section className="relative z-10 py-32 px-6 bg-black/80 backdrop-blur-3xl -mt-[100vh]">
                        <div className="container mx-auto max-w-6xl">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
                            >
                                <div>
                                    <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                                        {activeProduct.detailsSection.title}
                                    </h3>
                                    <p className="text-xl text-gray-300 leading-relaxed mb-8">
                                        {activeProduct.detailsSection.description}
                                    </p>
                                    <ul className="space-y-4">
                                        {activeProduct.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-lg">
                                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-black border border-white/10 p-8 flex items-center justify-center">
                                    {/* Placeholder for detail image since we might not have it */}
                                    <div className="text-center">
                                        <span className="text-6xl mb-4 block">🎮</span>
                                        <span className="text-gray-500 uppercase tracking-widest text-sm">
                                            {activeProduct.detailsSection.imageAlt}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Stats / Freshness Section */}
                    <section className="relative z-10 py-32 px-6 bg-black">
                        <div className="container mx-auto max-w-6xl">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                                {activeProduct.stats.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center"
                                    >
                                        <div className="text-5xl font-black mb-2 text-white">{stat.val}</div>
                                        <div className="text-sm uppercase tracking-widest text-gray-500">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="text-center max-w-4xl mx-auto"
                            >
                                <h3 className="text-3xl md:text-5xl font-bold mb-6">
                                    {activeProduct.freshnessSection.title}
                                </h3>
                                <p className="text-xl text-gray-400">
                                    {activeProduct.freshnessSection.description}
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Buy Now Section */}
                    <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-black to-gray-900">
                        <div className="container mx-auto max-w-4xl bg-white/5 border border-white/10 rounded-3xl p-12 text-center backdrop-blur-sm">
                            <h2 className="text-6xl font-black mb-4">{activeProduct.buyNowSection.price}</h2>
                            <p className="text-gray-400 mb-8">{activeProduct.buyNowSection.unit}</p>

                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                {activeProduct.buyNowSection.processingParams.map((param, i) => (
                                    <span key={i} className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-mono">
                                        {param}
                                    </span>
                                ))}
                            </div>

                            <button className="w-full md:w-auto px-12 py-4 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                                Add to Cart
                            </button>

                            <p className="mt-8 text-sm text-gray-500">
                                {activeProduct.buyNowSection.deliveryPromise} • {activeProduct.buyNowSection.returnPolicy}
                            </p>
                        </div>
                    </section>

                    {/* Next Variant CTA */}
                    <div
                        className="relative z-10 h-[40vh] flex items-center justify-center bg-zinc-900 cursor-pointer overflow-hidden group"
                        onClick={nextProduct}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <div className="text-center relative z-10">
                            <p className="text-gray-500 text-sm tracking-[0.5em] mb-4 uppercase">Next Variant</p>
                            <h2 className="text-4xl md:text-6xl font-black italic group-hover:text-blue-500 transition-colors">
                                {products[(currentIndex + 1) % products.length].name} &rarr;
                            </h2>
                        </div>
                    </div>

                    <Footer />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-black/50 backdrop-blur-xl p-2 rounded-full border border-white/10">
                {products.map((p, i) => (
                    <button
                        key={p.id}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-white w-8' : 'bg-white/30 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>

            <button
                onClick={prevProduct}
                className="fixed left-8 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur transition-colors hidden md:block"
            >
                ←
            </button>
            <button
                onClick={nextProduct}
                className="fixed right-8 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur transition-colors hidden md:block"
            >
                →
            </button>

        </main>
    );
}
