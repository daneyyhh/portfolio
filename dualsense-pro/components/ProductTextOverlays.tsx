'use client';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { Product } from '@/data/products';

interface Props {
    product: Product;
    scrollYProgress: MotionValue<number>;
}

export default function ProductTextOverlays({ product, scrollYProgress }: Props) {
    // Section 1: 0-25%
    const s1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const s1Y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    // Section 2: 25-50%
    const s2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
    const s2Y = useTransform(scrollYProgress, [0.2, 0.3, 0.5], [50, 0, -50]);

    // Section 3: 50-75%
    const s3Opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
    const s3Y = useTransform(scrollYProgress, [0.45, 0.55, 0.75], [50, 0, -50]);

    // Section 4: 75-100%
    const s4Opacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);
    const s4Y = useTransform(scrollYProgress, [0.7, 0.8], [50, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center px-4">
            {/* Section 1 */}
            <motion.div style={{ opacity: s1Opacity, y: s1Y }} className="absolute">
                <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter">
                    {product.section1.title}
                </h1>
                <p className="text-2xl md:text-3xl font-light text-white/80">
                    {product.section1.subtitle}
                </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div style={{ opacity: s2Opacity, y: s2Y }} className="absolute max-w-4xl">
                <h2 className="text-5xl md:text-7xl font-bold mb-4">
                    {product.section2.title}
                </h2>
                <p className="text-xl md:text-2xl text-white/70">
                    {product.section2.subtitle}
                </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div style={{ opacity: s3Opacity, y: s3Y }} className="absolute max-w-4xl">
                <h2 className="text-5xl md:text-7xl font-bold mb-4">
                    {product.section3.title}
                </h2>
                <p className="text-xl md:text-2xl text-white/70">
                    {product.section3.subtitle}
                </p>
            </motion.div>

            {/* Section 4 */}
            <motion.div style={{ opacity: s4Opacity, y: s4Y }} className="absolute max-w-4xl">
                <h2 className="text-5xl md:text-7xl font-bold mb-4">
                    {product.section4.title}
                </h2>
                <p className="text-xl md:text-2xl text-white/70">
                    {product.section4.subtitle}
                </p>
            </motion.div>
        </div>
    );
}
