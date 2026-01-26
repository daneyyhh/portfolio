import * as THREE from 'three';

let scene, camera, renderer, stars, starGeo;
let scrollSpeed = 0;
let targetSpeed = 0;

export function init3DBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-3d';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1'; // Behind everything
    canvas.style.pointerEvents = 'none';
    document.body.prepend(canvas);

    scene = new THREE.Scene();
    // Dark fog for depth
    scene.fog = new THREE.FogExp2(0x050505, 0.002);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create Stars
    const starCount = 6000;
    starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const velocities = [];

    for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 600; // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 600; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 600; // z
        velocities.push(0);
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Simple white sprite for stars
    const sprite = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
    const starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite,
        transparent: true,
        alphaTest: 0.5
    });

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    // Scroll listener to warp speed
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const delta = Math.abs(currentScrollY - lastScrollY);
        targetSpeed = Math.min(delta * 0.5, 20); // Cap max speed
        lastScrollY = currentScrollY;
    });

    // Resize
    window.addEventListener('resize', onWindowResize, false);

    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    // Lerp speed back to idle
    targetSpeed *= 0.95;
    scrollSpeed += (targetSpeed - scrollSpeed) * 0.1;

    // Base speed + scroll boost
    const speed = 0.5 + scrollSpeed;

    const positions = starGeo.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        // Move stars "down" (y-axis in this rotation setup corresponds to depth feel)
        positions[i + 1] -= speed; // Y is depth due to camera rotation

        if (positions[i + 1] < -300) {
            positions[i + 1] = 300;
        }
    }
    starGeo.attributes.position.needsUpdate = true;
    stars.rotation.y += 0.0005; // Gentle rotation

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
