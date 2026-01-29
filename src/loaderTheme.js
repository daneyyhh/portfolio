import gsap from 'gsap';

export function initThemeLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    // Inject Terminal HTML into loader
    loader.innerHTML = `
        <div class="terminal-loader">
            <div class="terminal-text">Initializing System...</div>
            <div class="terminal-progress-bar">
                <div class="terminal-progress-fill"></div>
            </div>
            <div class="terminal-status">
                <div class="status-line">Loaded: Core Modules</div>
                <div class="status-line">Loaded: Graphics Engine</div>
                <div class="status-line">Loaded: User Interface</div>
            </div>
        </div>
    `;

    const fill = loader.querySelector('.terminal-progress-fill');
    const statusLines = loader.querySelectorAll('.status-line');
    const text = loader.querySelector('.terminal-text');

    // CSS Injection for loader directly here for self-containment or could go in css
    // But since I can't edit CSS easily without traversing line numbers, I'll add inline styles or style block
    const style = document.createElement('style');
    style.innerHTML = `
        .terminal-loader {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'Space Mono', monospace; // Matches theme
            color: #fff;
            z-index: 10005;
        }
        .terminal-text {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            animation: blink 1s infinite;
        }
        .terminal-progress-bar {
            width: 300px;
            height: 4px;
            background: rgba(255,255,255,0.1);
            border-radius: 2px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.2);
            position: relative;
        }
        .terminal-progress-fill {
            height: 100%;
            width: 0%;
            background: #fff; /* White or Theme Color */
            box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }
        .terminal-status {
            margin-top: 1rem;
            font-size: 0.8rem;
            color: #888;
            height: 60px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 300px;
        }
        .status-line {
            opacity: 0;
            margin-bottom: 2px;
        }
        @keyframes blink {
            50% { opacity: 0.5; }
        }
    `;
    loader.appendChild(style);

    // Timeline Sequence
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loader.style.display = 'none';
                    loader.innerHTML = ''; // Clean up
                }
            });
        }
    });

    tl.to(fill, { width: '30%', duration: 0.5, ease: 'power1.inOut' })
        .to(statusLines[0], { opacity: 1, duration: 0.1 }, "-=0.2")
        .to(fill, { width: '60%', duration: 0.7, ease: 'power1.inOut' })
        .to(statusLines[1], { opacity: 1, duration: 0.1 }, "-=0.3")
        .to(fill, { width: '90%', duration: 0.8, ease: 'power1.inOut' })
        .to(statusLines[2], { opacity: 1, duration: 0.1 }, "-=0.2")
        .to(fill, { width: '100%', duration: 0.3, ease: 'power1.inOut' })
        .to(text, { textContent: "SYSTEM READY", color: "#4ade80", duration: 0.1 }); // Green
}
