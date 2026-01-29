import * as THREE from 'three';

export function initLoader3D() {
    const loaderContainer = document.querySelector('.loader');
    if (!loaderContainer) return;

    // Create Canvas specifically for loader 3D
    const canvas = document.createElement('canvas');
    canvas.id = 'loader-3d-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '50%';
    canvas.style.left = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
    canvas.style.zIndex = '1'; // Behind text if any, or main feature
    canvas.style.pointerEvents = 'none';

    // Insert into loader, but ensure it doesn't break flex layout (absolute positioning handles this)
    loaderContainer.appendChild(canvas);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000); // Fixed aspect for loader
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(400, 400); // Fixed size for the spinner
    renderer.setPixelRatio(window.devicePixelRatio);

    // Object: Wireframe Icosahedron
    const geometry = new THREE.IcosahedronGeometry(1, 1); // Detail 1
    const material = new THREE.MeshBasicMaterial({
        color: 0x3B82F6, // Accent color
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Inner core
    const coreGeo = new THREE.IcosahedronGeometry(0.5, 0);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Animation Loop
    let frameId;
    const animate = () => {
        if (!loaderContainer.offsetParent && loaderContainer.style.display === 'none') {
            // Stop loop if loader is hidden
            cancelAnimationFrame(frameId);
            return;
        }

        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;

        core.rotation.x -= 0.02;
        core.rotation.y -= 0.02;

        // Pulse effect
        const time = Date.now() * 0.002;
        const scale = 1 + Math.sin(time) * 0.1;
        sphere.scale.set(scale, scale, scale);

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
    };

    animate();
}
