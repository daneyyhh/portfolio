'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, MotionValue } from 'framer-motion';
import { Product } from '@/data/products';
import ProductTextOverlays from './ProductTextOverlays';

interface Props {
    product: Product;
}

export default function ProductControllerScroll({ product }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Preload Images
    useEffect(() => {
        const frameCount = 200;
        const loadedImages: HTMLImageElement[] = new Array(frameCount).fill(null);
        let loadedCount = 0;
        const folder = product.folderPath;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = `${folder}/${i}.jpg`;
            img.onload = () => {
                loadedCount++;
                loadedImages[i - 1] = img;
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                    setIsLoaded(true);
                }
            };
        }
    }, [product.folderPath]);

    const renderCanvas = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        // Resize canvas to match window or container size
        // For performance, we can set canvas width/height to window.innerWidth/Height
        // But we need to handle High DPI
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Only set size if it changed to avoid clearing canvas
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        }

        // Draw "contain" logic
        const cw = rect.width;
        const ch = rect.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const scale = Math.min(cw / iw, ch / ih);
        const x = (cw - iw * scale) / 2;
        const y = (ch - ih * scale) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, x, y, iw * scale, ih * scale);
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded) return;
        const frameCount = 200;
        const frameIndex = Math.min(frameCount - 1, Math.floor(latest * (frameCount - 1)));
        requestAnimationFrame(() => renderCanvas(frameIndex));
    });

    // Initial draw when loaded
    useEffect(() => {
        if (isLoaded) {
            renderCanvas(0);
        }
    }, [isLoaded]);

    return (
        <div ref={containerRef} className="h-[500vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain"
                    style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
                />
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/50">
                        Loading Assets...
                    </div>
                )}

                <ProductTextOverlays product={product} scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}
