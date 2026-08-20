import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function PersistentCanvas({ scrollProgress = 0 }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(2.5, 0, 7);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Main Architectural Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Dark Irregular Rock Core
    const rockGeo = new THREE.DodecahedronGeometry(1.2, 1);
    // Deform vertices slightly to make it feel like an irregular dark rock core
    const pos = rockGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const vz = pos.getZ(i);
      pos.setXYZ(
        i,
        vx + (Math.sin(vy * 3) * 0.1),
        vy + (Math.cos(vz * 3) * 0.1),
        vz + (Math.sin(vx * 3) * 0.1)
      );
    }
    rockGeo.computeVertexNormals();

    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.8,
      metalness: 0.2
    });
    const rockCore = new THREE.Mesh(rockGeo, rockMat);
    mainGroup.add(rockCore);

    // 2. Transparent Glass Structure Enclosure
    const glassGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
      ior: 1.5
    });
    const glassCube = new THREE.Mesh(glassGeo, glassMat);
    mainGroup.add(glassCube);

    // 3. Metallic Outer Frame Wireframe
    const frameGeo = new THREE.BoxGeometry(2.42, 2.42, 2.42);
    const frameEdges = new THREE.EdgesGeometry(frameGeo);
    const frameMat = new THREE.LineBasicMaterial({ color: 0x111111, linewidth: 2 });
    const frameWireframe = new THREE.LineSegments(frameEdges, frameMat);
    mainGroup.add(frameWireframe);

    // 4. Floating Spheres
    const spheresGroup = new THREE.Group();
    const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.9 });

    for (let i = 0; i < 6; i++) {
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      const angle = (i / 6) * Math.PI * 2;
      sphere.position.set(Math.cos(angle) * 3.5, (Math.random() - 0.5) * 1.5, Math.sin(angle) * 3.5);
      spheresGroup.add(sphere);
    }
    mainGroup.add(spheresGroup);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll Position Tracking
    let targetCameraY = 0;
    let targetCameraZ = 7;
    let targetRotationY = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? scrollY / totalHeight : 0;

      // Dynamic Camera Path & 3D Morphing along scroll progress
      targetCameraY = -progress * 4;
      targetCameraZ = 7 - progress * 2;
      targetRotationY = progress * Math.PI * 4;

      // Fragment separation during process section (progress ~ 0.3 to 0.5)
      if (progress > 0.3 && progress < 0.6) {
        const factor = (progress - 0.3) * 3.3;
        glassCube.scale.set(1 + factor * 0.4, 1 + factor * 0.4, 1 + factor * 0.4);
      } else {
        glassCube.scale.set(1, 1, 1);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous Idle Rotations
      rockCore.rotation.x = elapsedTime * 0.15;
      rockCore.rotation.y = elapsedTime * 0.2;
      glassCube.rotation.x = -elapsedTime * 0.1;
      glassCube.rotation.y = elapsedTime * 0.15;
      spheresGroup.rotation.y = elapsedTime * 0.3;

      // Smooth camera interpolation
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.position.z += (targetCameraZ - camera.position.z) * 0.05;

      // Parallax offset
      mainGroup.rotation.y = targetRotationY + mouseX * 0.3;
      mainGroup.rotation.x = mouseY * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-85">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
