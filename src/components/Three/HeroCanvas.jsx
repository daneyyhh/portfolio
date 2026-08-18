import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function HeroCanvas({ engineerMode }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const neonLimeLight = new THREE.PointLight(0xccff00, 3, 20);
    neonLimeLight.position.set(3, 4, 5);
    scene.add(neonLimeLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 4, 20);
    purpleLight.position.set(-4, -3, 3);
    scene.add(purpleLight);

    // Group for Centerpiece
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Outer Wireframe Polyhedron
    const outerGeo = new THREE.IcosahedronGeometry(2, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0xccff00,
      wireframe: true,
      emissive: 0xccff00,
      emissiveIntensity: 0.2,
      roughness: 0.2,
      metalness: 0.8
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerMesh);

    // 2. Inner Glowing Core Polyhedron
    const innerGeo = new THREE.OctahedronGeometry(1.1, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 3. Orbiting Particle Ring
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 3.2 + (Math.random() - 0.5) * 0.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xccff00,
      transparent: true,
      opacity: 0.8
    });
    const particleRing = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleRing);

    // Mouse Parallax Effect
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotations
      outerMesh.rotation.x = elapsedTime * 0.2;
      outerMesh.rotation.y = elapsedTime * 0.3;

      innerMesh.rotation.x = -elapsedTime * 0.4;
      innerMesh.rotation.y = -elapsedTime * 0.5;

      particleRing.rotation.y = elapsedTime * 0.15;

      // Parallax smooth interpolation
      mainGroup.rotation.y += (mouseX * 0.5 - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (-mouseY * 0.5 - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[350px]">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
      {engineerMode && (
        <div className="absolute bottom-4 left-4 z-10 font-mono text-[10px] text-[#ccff00] bg-black/80 border border-[#ccff00]/30 px-3 py-1.5 rounded-sm">
          <span>WEBGL 3D // 60 FPS // THREE.JS SHADER CORE</span>
        </div>
      )}
    </div>
  );
}
