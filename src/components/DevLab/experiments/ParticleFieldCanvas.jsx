import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function ParticleFieldCanvas({
  isDetail = false,
  interactive = true,
  className = ""
}) {
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const isVisibleRef = useRef(true);

  const [fps, setFps] = useState(60);
  const [forceMode, setForceMode] = useState('REPEL'); // 'REPEL' | 'ATTRACT'
  const [nodeCount, setNodeCount] = useState(1200);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    container.appendChild(renderer.domElement);

    // Particle Matrix Data
    const count = nodeCount;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const origins = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Arrange particles in an organized mathematical lattice with organic dispersion
    const cols = Math.floor(Math.sqrt(count * (width / height)));
    const rows = Math.ceil(count / cols);
    const spacingX = 5.0 / cols;
    const spacingY = 3.2 / rows;

    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const ox = (col - cols / 2) * spacingX + (Math.random() - 0.5) * 0.05;
      const oy = (row - rows / 2) * spacingY + (Math.random() - 0.5) * 0.05;
      const oz = (Math.random() - 0.5) * 0.2;

      origins[i * 3] = ox;
      origins[i * 3 + 1] = oy;
      origins[i * 3 + 2] = oz;

      positions[i * 3] = ox;
      positions[i * 3 + 1] = oy;
      positions[i * 3 + 2] = oz;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;

      // Color scheme: #FF1E27 accents and off-white nodes
      if (Math.random() > 0.8) {
        colors[i * 3] = 1.0; // R (255)
        colors[i * 3 + 1] = 0.12; // G (30)
        colors[i * 3 + 2] = 0.15; // B (39)
      } else {
        colors[i * 3] = 0.7;
        colors[i * 3 + 1] = 0.7;
        colors[i * 3 + 2] = 0.7;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // Mouse Tracking in 3D Space
    const mouse3D = new THREE.Vector3(999, 999, 0);

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const cx = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      const cy = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;
      
      const normX = ((cx - rect.left) / rect.width) * 2 - 1;
      const normY = -(((cy - rect.top) / rect.height) * 2 - 1);

      // Project into world coordinates at z=0 plane
      mouse3D.set(normX * 2.5, normY * 1.6, 0);
    };

    const onPointerLeave = () => {
      mouse3D.set(999, 999, 0);
    };

    if (interactive) {
      container.addEventListener('mousemove', onPointerMove, { passive: true });
      container.addEventListener('mouseleave', onPointerLeave, { passive: true });
      container.addEventListener('touchmove', onPointerMove, { passive: true });
      container.addEventListener('touchend', onPointerLeave, { passive: true });
    }

    // Animation & Physics Loop
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsTime = lastTime;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      const now = performance.now();
      frameCount++;
      if (now - lastFpsTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsTime)));
        frameCount = 0;
        lastFpsTime = now;
      }

      const posAttr = geometry.attributes.position;
      const posArr = posAttr.array;
      const radius = 0.95;
      const springK = 0.06;
      const friction = 0.86;
      const forceDirection = forceMode === 'REPEL' ? 1 : -1;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const px = posArr[i3];
        const py = posArr[i3 + 1];
        const pz = posArr[i3 + 2];

        const ox = origins[i3];
        const oy = origins[i3 + 1];
        const oz = origins[i3 + 2];

        // Cursor distance
        const dx = px - mouse3D.x;
        const dy = py - mouse3D.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          const force = (1 - dist / radius) * 0.12 * forceDirection;
          const angle = Math.atan2(dy, dx);
          velocities[i3] += Math.cos(angle) * force;
          velocities[i3 + 1] += Math.sin(angle) * force;
          velocities[i3 + 2] += (Math.random() - 0.5) * force * 0.8;
        }

        // Spring force pulling back to original position (Hooke's Law)
        velocities[i3] += (ox - px) * springK;
        velocities[i3 + 1] += (oy - py) * springK;
        velocities[i3 + 2] += (oz - pz) * springK;

        // Apply friction
        velocities[i3] *= friction;
        velocities[i3 + 1] *= friction;
        velocities[i3 + 2] *= friction;

        // Update positions
        posArr[i3] += velocities[i3];
        posArr[i3 + 1] += velocities[i3 + 1];
        posArr[i3 + 2] += velocities[i3 + 2];
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('mousemove', onPointerMove);
        container.removeEventListener('mouseleave', onPointerLeave);
        container.removeEventListener('touchmove', onPointerMove);
        container.removeEventListener('touchend', onPointerLeave);
      }
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [interactive, forceMode, nodeCount]);

  return (
    <div className={`relative w-full h-full min-h-[220px] overflow-hidden select-none bg-[#0A0A0A] ${className}`}>
      <div ref={containerRef} className="w-full h-full absolute inset-0 cursor-crosshair" />

      {/* Telemetry Tag */}
      <div className="absolute top-2 left-2 pointer-events-none z-10 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#0A0A0A]/80 border border-white/10 font-mono text-[9px] text-[#FF1E27] tracking-wider uppercase backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
          <span>WEBGL PARTICLES // {fps} FPS // {nodeCount} NODES</span>
        </span>
      </div>

      {isDetail && (
        <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 bg-[#0A0A0A]/90 border border-white/10 p-2.5 backdrop-blur-md font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-stone-300">VECTOR FORCE:</span>
            <button
              onClick={() => setForceMode('REPEL')}
              className={`px-2 py-0.5 border text-[10px] uppercase font-bold transition-colors ${
                forceMode === 'REPEL' ? 'border-[#FF1E27] bg-[#FF1E27] text-white' : 'border-white/15 text-stone-300 hover:border-white/30'
              }`}
            >
              REPULSION
            </button>
            <button
              onClick={() => setForceMode('ATTRACT')}
              className={`px-2 py-0.5 border text-[10px] uppercase font-bold transition-colors ${
                forceMode === 'ATTRACT' ? 'border-[#FF1E27] bg-[#FF1E27] text-white' : 'border-white/15 text-stone-300 hover:border-white/30'
              }`}
            >
              ATTRACTION
            </button>
          </div>
          <span className="text-[10px] text-stone-400">MOVE CURSOR OVER PARTICLES TO DEFLECT VECTOR FIELD</span>
        </div>
      )}
    </div>
  );
}
