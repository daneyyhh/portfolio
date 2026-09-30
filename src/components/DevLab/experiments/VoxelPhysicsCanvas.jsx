import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Zap, RotateCcw } from 'lucide-react';

export default function VoxelPhysicsCanvas({
  isDetail = false,
  interactive = true,
  className = ""
}) {
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const triggerImpulseRef = useRef(null);
  const resetVoxelsRef = useRef(null);
  const isVisibleRef = useRef(true);

  const [fps, setFps] = useState(60);
  const [activeImpulseCount, setActiveImpulseCount] = useState(0);

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
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 6.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const redAccentLight = new THREE.PointLight(0xFF1E27, 3.0, 10);
    redAccentLight.position.set(0, 0, 0);
    scene.add(redAccentLight);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 4x4x4 Voxel Structure (64 voxels)
    const gridSize = 4;
    const spacing = 0.55;
    const boxSize = 0.42;
    const boxGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);

    const standardMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f1f,
      roughness: 0.3,
      metalness: 0.7
    });

    const highlightMat = new THREE.MeshStandardMaterial({
      color: 0xFF1E27,
      emissive: 0xFF1E27,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8
    });

    const voxels = [];

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          const ox = (x - (gridSize - 1) / 2) * spacing;
          const oy = (y - (gridSize - 1) / 2) * spacing;
          const oz = (z - (gridSize - 1) / 2) * spacing;

          const isCore = Math.abs(ox) < 0.3 && Math.abs(oy) < 0.3 && Math.abs(oz) < 0.3;
          const mesh = new THREE.Mesh(boxGeo, isCore ? highlightMat : standardMat);
          mesh.position.set(ox, oy, oz);
          mainGroup.add(mesh);

          voxels.push({
            mesh,
            origin: new THREE.Vector3(ox, oy, oz),
            velocity: new THREE.Vector3(0, 0, 0),
            rotSpeed: new THREE.Vector3(
              (Math.random() - 0.5) * 0.05,
              (Math.random() - 0.5) * 0.05,
              (Math.random() - 0.5) * 0.05
            )
          });
        }
      }
    }

    // Shockwave Impulse Function
    triggerImpulseRef.current = () => {
      setActiveImpulseCount((c) => c + 1);
      const forceMag = 0.22;
      for (const v of voxels) {
        const dir = new THREE.Vector3().copy(v.mesh.position);
        if (dir.lengthSq() < 0.001) dir.set(0, 1, 0);
        dir.normalize();
        v.velocity.add(dir.multiplyScalar(forceMag * (0.8 + Math.random() * 0.4)));
        v.rotSpeed.set(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        );
      }
    };

    resetVoxelsRef.current = () => {
      for (const v of voxels) {
        v.velocity.set(0, 0, 0);
        v.mesh.position.copy(v.origin);
        v.mesh.rotation.set(0, 0, 0);
      }
    };

    // Pointer Interaction (drag to rotate)
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onPointerDown = (e) => {
      if (!interactive) return;
      isDragging = true;
      prevX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      prevY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;
    };

    const onPointerMove = (e) => {
      if (!interactive) return;
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;

      if (isDragging) {
        const dx = clientX - prevX;
        const dy = clientY - prevY;
        targetRotY += dx * 0.01;
        targetRotX += dy * 0.01;
        prevX = clientX;
        prevY = clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    container.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    container.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Physics Animation Loop
    let frameCount = 0;
    let lastFpsTime = performance.now();

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

      if (!isDragging) {
        targetRotY += 0.006;
      }

      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.06;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.06;

      const springK = 0.04;
      const damping = 0.88;

      for (const v of voxels) {
        // Spring pull back toward origin
        const displacement = new THREE.Vector3().subVectors(v.origin, v.mesh.position);
        v.velocity.add(displacement.multiplyScalar(springK));
        v.velocity.multiplyScalar(damping);
        v.mesh.position.add(v.velocity);

        v.mesh.rotation.x += v.rotSpeed.x;
        v.mesh.rotation.y += v.rotSpeed.y;
        v.mesh.rotation.z += v.rotSpeed.z;
        v.rotSpeed.multiplyScalar(0.96);
      }

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
      container.removeEventListener('mousedown', onPointerDown);
      container.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      container.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      boxGeo.dispose();
      standardMat.dispose();
      highlightMat.dispose();
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div className={`relative w-full h-full min-h-[220px] overflow-hidden select-none bg-[#0A0A0A] ${className}`}>
      <div ref={containerRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Telemetry Tag */}
      <div className="absolute top-2 left-2 pointer-events-none z-10 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#0A0A0A]/80 border border-white/10 font-mono text-[9px] text-[#FF1E27] tracking-wider uppercase backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
          <span>UNITY / VOXEL PHYSICS // {fps} FPS</span>
        </span>
      </div>

      {/* Impulse Action Trigger Button (Available in both preview and detail) */}
      <div className="absolute top-2 right-2 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (triggerImpulseRef.current) triggerImpulseRef.current();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FF1E27] text-white hover:bg-[#E00208] text-[10px] font-mono font-bold tracking-wider uppercase transition-all shadow-md active:scale-95"
          title="Apply physics impulse shockwave"
        >
          <Zap size={12} />
          <span>IMPULSE</span>
        </button>
      </div>

      {isDetail && (
        <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 bg-[#0A0A0A]/90 border border-white/10 p-2.5 backdrop-blur-md font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (triggerImpulseRef.current) triggerImpulseRef.current();
              }}
              className="px-3 py-1 bg-[#FF1E27] text-white text-[11px] font-bold uppercase transition-colors hover:bg-[#E00208] flex items-center gap-1.5"
            >
              <Zap size={13} />
              <span>SHOCKWAVE PULSE</span>
            </button>
            <button
              onClick={() => {
                if (resetVoxelsRef.current) resetVoxelsRef.current();
              }}
              className="px-2.5 py-1 border border-white/15 bg-white/5 text-stone-300 hover:border-white/30 text-[11px] font-bold uppercase transition-colors flex items-center gap-1"
            >
              <RotateCcw size={12} />
              <span>RESTORE</span>
            </button>
          </div>
          <span className="text-[10px] text-stone-400">DRAG TO ORBIT // CLICK IMPULSE TO SCATTER VOXELS</span>
        </div>
      )}
    </div>
  );
}
