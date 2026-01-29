import * as THREE from 'three';

export function initLoader3D() {
    const loaderContainer = document.querySelector('.loader');
    if (!loaderContainer) return;

    // Check if canvas already exists
    if (document.getElementById('loader-3d-canvas')) return;

    // Create Canvas specifically for loader 3D
    const canvas = document.createElement('canvas');
    canvas.id = 'loader-3d-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '50%';
    canvas.style.left = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
    canvas.style.zIndex = '10003'; // Higher than loader bg
    canvas.style.pointerEvents = 'none';

    // Insert into loader
    loaderContainer.appendChild(canvas);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(400, 400);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Group to rotate
    const group = new THREE.Group();
    scene.add(group);

    // Object 1: Wireframe Icosahedron
    const geometry = new THREE.IcosahedronGeometry(1.2, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0x3B82F6,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);

    // Object 2: Inner core
    const coreGeo = new THREE.OctahedronGeometry(0.6, 0);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Object 3: Ring
    const ringGeo = new THREE.TorusGeometry(1.8, 0.05, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x3B82F6, transparent: true, opacity: 0.3 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    group.add(ring);

    // Animation Loop
    let frameId;
    const animate = () => {
        if (loaderContainer.style.display === 'none' || getComputedStyle(loaderContainer).opacity === '0') {
            cancelAnimationFrame(frameId);
            return;
        }

        group.rotation.x += 0.005;
        group.rotation.y += 0.01;

        core.rotation.x -= 0.02;
        core.rotation.y -= 0.02;

        ring.rotation.x = Math.PI / 2 + Math.sin(Date.now() * 0.001) * 0.2;
        ring.rotation.y = Math.cos(Date.now() * 0.001) * 0.2;

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
    };

    animate();
}
