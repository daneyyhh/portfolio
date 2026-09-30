import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function CyberCoreCanvas({
  isDetail = false,
  interactive = true,
  wireframeMode = true,
  speedMultiplier = 1,
  className = ""
}) {
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const rendererRef = useRef(null);
  const isVisibleRef = useRef(true);

  const [fps, setFps] = useState(60);
  const [wireframeState, setWireframeState] = useState(wireframeMode);
  const [speedState, setSpeedState] = useState(speedMultiplier);

  useEffect(() => {
    setWireframeState(wireframeMode);
  }, [wireframeMode]);

  useEffect(() => {
    setSpeedState(speedMultiplier);
  }, [speedMultiplier]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Visibility Observer to pause RAF when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 200;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting (Strict Palette: #FF1E27 Red, White Warm Ambient)
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0xFF1E27, 2.5, 15);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Outer Deformable Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(1.6, 2);
    // Preserve original positions for math wave deformation
    const originalPositions = outerGeo.attributes.position.array.slice();

    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      wireframe: true,
      roughness: 0.3,
      metalness: 0.8
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    rootGroup.add(outerMesh);

    // 2. Inner Glowing Core
    const innerGeo = new THREE.OctahedronGeometry(0.85, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xFF1E27,
      emissive: 0xFF1E27,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    rootGroup.add(innerMesh);

    // 3. Orbiting Particle Lattice Ring
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const r = 2.4 + (Math.sin(i * 0.3) * 0.2);
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = Math.sin(i * 0.4) * 0.4;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xFF1E27,
      size: 0.045,
      transparent: true,
      opacity: 0.75
    });
    const particleRing = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particleRing);

    // Pointer Interaction Handling
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;
      
      const normX = ((clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((clientY - rect.top) / rect.height - 0.5) * 2;

      pointLight.position.x = normX * 4;
      pointLight.position.y = -normY * 4;

      if (isDragging) {
        const deltaX = clientX - previousPointerX;
        const deltaY = clientY - previousPointerY;
        targetRotationY += deltaX * 0.012;
        targetRotationX += deltaY * 0.012;
        previousPointerX = clientX;
        previousPointerY = clientY;
      } else if (!isDetail) {
        // Subtle tilt when hovering card preview
        targetRotationY = normX * 0.5;
        targetRotationX = normY * 0.4;
      }
    };

    const onPointerDown = (e) => {
      if (!interactive) return;
      isDragging = true;
      previousPointerX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      previousPointerY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    if (interactive) {
      container.addEventListener('mousemove', onPointerMove, { passive: true });
      container.addEventListener('mousedown', onPointerDown, { passive: true });
      window.addEventListener('mouseup', onPointerUp);
      container.addEventListener('touchmove', onPointerMove, { passive: true });
      container.addEventListener('touchstart', onPointerDown, { passive: true });
      window.addEventListener('touchend', onPointerUp);
    }

    // Animation Loop with FPS Counter
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const now = performance.now();
      frameCount++;
      if (now - lastFpsUpdate >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = now;
      }

      const elapsed = clock.getElapsedTime() * speedState;

      // Update wireframe property dynamically
      outerMat.wireframe = wireframeState;

      // Procedural Vertex Deformation on Outer Mesh
      const pos = outerGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];
        const dist = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const wave = Math.sin(dist * 3.5 - elapsed * 2.2) * 0.08;
        pos.setXYZ(i, ox * (1 + wave), oy * (1 + wave), oz * (1 + wave));
      }
      outerGeo.computeVertexNormals();
      pos.needsUpdate = true;

      // Automatic Orbit & Interactive Inertia
      if (!isDragging) {
        targetRotationY += 0.008 * speedState;
      }
      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.08;
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.08;

      innerMesh.rotation.x = -elapsed * 0.8;
      innerMesh.rotation.y = elapsed * 0.9;
      particleRing.rotation.y = elapsed * 0.35;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Thorough Resource Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('mousemove', onPointerMove);
        container.removeEventListener('mousedown', onPointerDown);
        window.removeEventListener('mouseup', onPointerUp);
        container.removeEventListener('touchmove', onPointerMove);
        container.removeEventListener('touchstart', onPointerDown);
        window.removeEventListener('touchend', onPointerUp);
      }
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [interactive, isDetail, wireframeState, speedState]);

  return (
    <div className={`relative w-full h-full min-h-[220px] overflow-hidden select-none ${className}`}>
      <div ref={containerRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />
      
      {/* HUD Telemetry Overlay */}
      <div className="absolute top-2 left-2 pointer-events-none z-10 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#0A0A0A]/80 border border-white/10 font-mono text-[9px] text-[#FF1E27] tracking-wider uppercase backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
          <span>THREE.JS // {fps} FPS</span>
        </span>
      </div>

      {isDetail && (
        <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 bg-[#0A0A0A]/90 border border-white/10 p-2.5 backdrop-blur-md font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setWireframeState((v) => !v)}
              className={`px-2.5 py-1 text-[11px] border font-bold uppercase transition-colors ${
                wireframeState
                  ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
                  : 'bg-white/5 text-stone-300 border-white/15 hover:border-white/30'
              }`}
            >
              WIREFRAME: {wireframeState ? 'ON' : 'OFF'}
            </button>
            <div className="flex items-center gap-1.5 text-[11px] text-stone-300">
              <span>SPEED:</span>
              <button
                onClick={() => setSpeedState(1)}
                className={`px-1.5 py-0.5 border text-[10px] ${speedState === 1 ? 'border-[#FF1E27] text-[#FF1E27]' : 'border-white/15'}`}
              >
                1×
              </button>
              <button
                onClick={() => setSpeedState(2)}
                className={`px-1.5 py-0.5 border text-[10px] ${speedState === 2 ? 'border-[#FF1E27] text-[#FF1E27]' : 'border-white/15'}`}
              >
                2×
              </button>
            </div>
          </div>
          <span className="text-[10px] text-stone-400">DRAG TO ORBIT // CURSOR DIRECTS LIGHT</span>
        </div>
      )}
    </div>
  );
}
