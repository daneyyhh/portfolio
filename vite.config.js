import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        target: 'es2020',
        cssCodeSplit: true,
        chunkSizeWarningLimit: 900,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('three') || id.includes('@react-three')) {
                            return 'vendor-three';
                        }
                        if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) {
                            return 'vendor-animation';
                        }
                        if (id.includes('lucide-react')) {
                            return 'vendor-icons';
                        }
                    }
                }
            }
        }
    }
})

