
const dist = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance, maxDist, minVal, maxVal) => {
    const val = maxVal - Math.abs((maxVal * distance) / maxDist);
    return Math.max(minVal, val + minVal);
};

export class TextPressure {
    constructor(containerElement, options = {}) {
        console.log('TextPressure: Constructor called');
        this.container = containerElement;
        this.options = {
            text: 'Compressa',
            fontFamily: 'Compressa VF',
            fontUrl: 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',
            width: true,
            weight: true,
            italic: true,
            alpha: false,
            flex: true,
            stroke: false,
            scale: false,
            textColor: '#FFFFFF',
            strokeColor: '#FF0000',
            className: '',
            minFontSize: 24,
            ...options
        };

        this.titleRef = null;
        this.spans = [];
        this.mouse = { x: 0, y: 0 };
        this.cursor = { x: 0, y: 0 };
        this.fontSize = this.options.minFontSize;
        this.scaleY = 1;
        this.lineHeight = 1;
        this.rafId = null;

        this.init();
    }

    init() {
        this.injectStyles();
        this.buildDOM();
        this.bindEvents();
        this.setSize(); // Initial sizing
        this.animate();
    }

    injectStyles() {
        if (document.getElementById('text-pressure-font-style')) return;

        const style = document.createElement('style');
        style.id = 'text-pressure-font-style';
        style.textContent = `
            @font-face {
                font-family: '${this.options.fontFamily}';
                src: url('${this.options.fontUrl}');
                font-style: normal;
            }
            .text-pressure-title {
                color: ${this.options.textColor};
                font-family: '${this.options.fontFamily}', sans-serif;
                text-transform: uppercase;
                margin: 0;
                text-align: center;
                user-select: none;
                white-space: nowrap;
                font-weight: 100;
                width: 100%;
                transform-origin: center top;
            }
            .text-pressure-title span {
                display: inline-block;
                color: ${this.options.stroke ? 'transparent' : this.options.textColor};
                position: relative;
                transition: opacity 0.1s; /* smooth alpha */
            }
            .text-pressure-title.stroke span::after {
                content: attr(data-char);
                position: absolute;
                left: 0;
                top: 0;
                color: transparent;
                z-index: -1;
                -webkit-text-stroke-width: 3px;
                -webkit-text-stroke-color: ${this.options.strokeColor};
            }
            .text-pressure-container {
                position: relative;
                width: 100%;
                height: 100%;
                background: transparent;
                display: flex;
                flex-direction: column;
                justify-content: center; /* Center Vertically if needed */
            }
        `;
        document.head.appendChild(style);
    }

    buildDOM() {
        // Clear container
        this.container.innerHTML = '';
        this.container.classList.add('text-pressure-container');
        if (this.options.className) {
            this.container.classList.add(this.options.className);
        }

        this.titleRef = document.createElement('h1');
        this.titleRef.className = `text-pressure-title ${this.options.stroke ? 'stroke' : ''}`;

        const chars = this.options.text.split('');
        chars.forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.dataset.char = char;
            this.spans.push(span);
            this.titleRef.appendChild(span);
        });

        this.container.appendChild(this.titleRef);
    }

    bindEvents() {
        const handleMouseMove = (e) => {
            this.cursor.x = e.clientX;
            this.cursor.y = e.clientY;
        };
        const handleTouchMove = (e) => {
            const t = e.touches[0];
            this.cursor.x = t.clientX;
            this.cursor.y = t.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('resize', this.onResize.bind(this));

        // Initial cursor position (center of container)
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = rect.left + rect.width / 2;
        this.mouse.y = rect.top + rect.height / 2;
        this.cursor.x = this.mouse.x;
        this.cursor.y = this.mouse.y;

        // Cleanup method if needed later
        this.cleanup = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('resize', this.onResize.bind(this));
            cancelAnimationFrame(this.rafId);
        };
    }

    onResize() {
        // Debounce if needed, but for now simple call
        this.setSize();
    }

    setSize() {
        if (!this.container || !this.titleRef) return;

        const { width: containerW, height: containerH } = this.container.getBoundingClientRect();
        const chars = this.options.text.split(''); // or this.spans.length

        // Logic from original: width / (chars.length / 2)
        let newFontSize = containerW / (chars.length / 2);
        newFontSize = Math.max(newFontSize, this.options.minFontSize);

        this.fontSize = newFontSize;
        this.scaleY = 1;
        this.lineHeight = 1;

        // Apply font size first to measure height correctly
        this.titleRef.style.fontSize = `${this.fontSize}px`;
        this.titleRef.style.lineHeight = `${this.lineHeight}`;

        requestAnimationFrame(() => {
            if (!this.titleRef) return;
            const textRect = this.titleRef.getBoundingClientRect();

            if (this.options.scale && textRect.height > 0) {
                const yRatio = containerH / textRect.height;
                this.scaleY = yRatio;
                this.lineHeight = yRatio;
                this.titleRef.style.transform = `scale(1, ${this.scaleY})`;
            }
        });
    }

    animate() {
        // Smooth mouse movement
        this.mouse.x += (this.cursor.x - this.mouse.x) / 15;
        this.mouse.y += (this.cursor.y - this.mouse.y) / 15;

        if (this.titleRef) {
            const titleRect = this.titleRef.getBoundingClientRect();
            const maxDist = titleRect.width / 2; // Radius of influence

            this.spans.forEach(span => {
                const rect = span.getBoundingClientRect();
                const charCenter = {
                    x: rect.x + rect.width / 2,
                    y: rect.y + rect.height / 2
                };

                const d = dist(this.mouse, charCenter);

                const wdth = this.options.width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
                const wght = this.options.weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
                const italVal = this.options.italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : 0;
                const alphaVal = this.options.alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : 1;

                const newFontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;

                if (span.style.fontVariationSettings !== newFontVariationSettings) {
                    span.style.fontVariationSettings = newFontVariationSettings;
                }
                if (this.options.alpha && span.style.opacity !== alphaVal) {
                    span.style.opacity = alphaVal;
                }
            });
        }

        this.rafId = requestAnimationFrame(this.animate.bind(this));
    }
}
