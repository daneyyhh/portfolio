import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Text, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

const FloatingPanel = ({ position, color, rotation }) => {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh position={position} rotation={rotation}>
                <boxGeometry args={[1.5, 2, 0.1]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.1}
                    roughness={0.8}
                    emissive={color}
                    emissiveIntensity={0.2}
                />
                {/* Comic Border Look */}
                <lineSegments>
                    <edgesGeometry args={[new THREE.BoxGeometry(1.5, 2, 0.1)]} />
                    <lineBasicMaterial color="black" linewidth={2} />
                </lineSegments>
            </mesh>
        </Float>
    );
};

const ComicParticles = () => {
    const count = 50;
    const mesh = useRef();
    const light = useRef();

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const time = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = (Math.random() - 0.5) * 50;
            const y = (Math.random() - 0.5) * 50;
            const z = (Math.random() - 0.5) * 50;

            temp.push({ time, factor, speed, x, y, z });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { time, factor, speed, x, y, z } = particle;
            const t = (time += speed);
            particle.time = t;
            dummy.position.set(
                x + Math.cos(t / 10) * factor / 20,
                y + Math.sin(t / 10) * factor / 20,
                z + Math.cos(t / 10) * factor / 20
            );
            dummy.rotation.set(t, t, t);
            dummy.scale.set(0.2, 0.2, 0.2);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#ffde00" metalness={0.5} roughness={0.2} />
        </instancedMesh>
    );
};

const Scene = () => {
    const { camera } = useThree();
    const scrollRef = useRef(0);

    useFrame(() => {
        // Sync scroll
        scrollRef.current = THREE.MathUtils.lerp(scrollRef.current, window.scrollY, 0.05);

        // Move camera based on scroll
        camera.position.y = -scrollRef.current * 0.01;

        // Dynamic FOV for warp effect
        camera.fov = 45 + (scrollRef.current * 0.005);
        camera.updateProjectionMatrix();
    });

    return (
        <>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <Environment preset="city" />

            {/* Floating Comic Panels */}
            {Array.from({ length: 15 }).map((_, i) => (
                <FloatingPanel
                    key={i}
                    position={[
                        (Math.random() - 0.5) * 15,
                        (Math.random() - 0.5) * 50 - 5,
                        (Math.random() - 0.5) * 10 - 5
                    ]}
                    color={['#ffde00', '#ff00ea', '#00f3ff', '#ff0000'][i % 4]}
                    rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
                />
            ))}

            <ComicParticles />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </>
    );
};

const ComicBackground = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none',
            background: 'white' // Matches comic theme
        }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <Scene />
            </Canvas>
        </div>
    );
};

export default ComicBackground;
