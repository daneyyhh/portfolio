import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSkillsMarquee() {
    console.log("Initializing Advanced Skills Marquee...");

    const container = document.querySelector('.skills-marquee');
    if (!container) return;

    // Clear existing content to rebuild strictly per specs
    container.innerHTML = '';

    const skills = ["Unity", "React", "GSAP", "Three.js", "C#", "C++", "Python", "Lua", "Docker", "Git"];

    // Create Wrapper for infinite scroll
    const wrapper = document.createElement('div');
    wrapper.classList.add('skills-track');
    container.appendChild(wrapper);

    // Create Items - Duplicate enough times to fill screen + buffer
    // For seamless loop, we need at least 2 sets, maybe 3 for safety on wide screens
    const loopCount = 4;

    for (let i = 0; i < loopCount; i++) {
        skills.forEach(skill => {
            const item = document.createElement('div');
            item.classList.add('skill-item');
            item.innerText = skill;
            wrapper.appendChild(item);
        });
    }

    // GSAP Horizontal Loop Logic
    // Using xPercent for responsive movement

    const items = wrapper.querySelectorAll('.skill-item');
    const totalWidth = wrapper.scrollWidth;

    // We want to move the track to the left indefinitely
    // Simple approach: Animate x of wrapper

    // BUT user asked for specific ScrollTrigger control (speed 0.5x, reverse up)
    // Seamless loop helper is best, but let's build a robust timeline manually

    let activeTween;
    let currentScale = 1;
    let direction = -1; // -1 = left, 1 = right

    // Calculate single set width
    // Just animate the whole track and reset modifier

    const speed = 100; // pixels per second base

    const horizontalLoop = (items, config) => {
        items = gsap.utils.toArray(items);
        config = config || {};
        let tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
            length = items.length,
            startX = items[0].offsetLeft,
            times = [],
            widths = [],
            xPercents = [],
            curIndex = 0,
            pixelsPerSecond = (config.speed || 1) * 100,
            snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 244.1px, and the next 244.3px, swapping result in 244.2. 
            totalWidth, curX, distanceToStart, distanceToLoop, item, i;

        gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
            xPercent: (i, el) => {
                let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
                return xPercents[i];
            }
        });
        gsap.set(items, { x: 0 });

        totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
        for (i = 0; i < length; i++) {
            item = items[i];
            curX = xPercents[i] / 100 * widths[i];
            distanceToStart = item.offsetLeft + curX - startX;
            distanceToLoop = distanceToStart + totalWidth * gsap.getProperty(item, "scaleX");
            tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
                .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
                .add("label" + i, distanceToStart / pixelsPerSecond);
            times[i] = distanceToStart / pixelsPerSecond;
        }
        function toIndex(index, vars) {
            vars = vars || {};
            (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
            let newIndex = gsap.utils.wrap(0, length, index),
                time = times[newIndex];
            if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
                vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
                time += tl.duration() * (index > curIndex ? 1 : -1);
            }
            curIndex = newIndex;
            vars.overwrite = true;
            return tl.tweenTo(time, vars);
        }
        tl.next = vars => toIndex(curIndex + 1, vars);
        tl.previous = vars => toIndex(curIndex - 1, vars);
        tl.current = () => curIndex;
        tl.toIndex = (index, vars) => toIndex(index, vars);
        tl.times = times;
        tl.progress(1, true).progress(0, true); // pre-render for performance
        if (config.reversed) {
            tl.vars.onReverseComplete();
            tl.reverse();
        }
        return tl;
    };

    // Initialize Loop
    const loop = horizontalLoop(items, {
        speed: 1, // Base speed
        repeat: -1,
        paddingRight: 100 // Gap
    });

    // ScrollTrigger Control
    ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
            // Speed up on scroll down, reverse up
            const velocity = self.getVelocity();
            const timeScale = velocity > 0 ? 1.5 : -1.5; // Reverse on up scroll

            // Limit scale so it doesn't go crazy
            if (Math.abs(velocity) < 5) {
                gsap.to(loop, { timeScale: 1, duration: 0.5 }); // Return to normal
            } else {
                gsap.to(loop, { timeScale: timeScale, duration: 0.5 });
            }
        }
    });

    // Pause on Hover
    container.addEventListener('mouseenter', () => {
        gsap.to(loop, { timeScale: 0, duration: 0.3 });
        items.forEach(item => item.classList.add('hovered'));
    });
    container.addEventListener('mouseleave', () => {
        gsap.to(loop, { timeScale: 1, duration: 0.3 });
        items.forEach(item => item.classList.remove('hovered'));
    });
}
