import React from 'react';
import CyberCoreCanvas from './experiments/CyberCoreCanvas';
import ChromaticShaderCanvas from './experiments/ChromaticShaderCanvas';
import ParticleFieldCanvas from './experiments/ParticleFieldCanvas';
import KineticTypeCanvas from './experiments/KineticTypeCanvas';
import ParametricHudCanvas from './experiments/ParametricHudCanvas';
import VoxelPhysicsCanvas from './experiments/VoxelPhysicsCanvas';

export default function ExperimentPreview({
  experiment,
  isDetail = false,
  interactive = true,
  className = ""
}) {
  if (!experiment) return null;

  switch (experiment.type) {
    case 'three-kinetic-core':
      return (
        <CyberCoreCanvas
          isDetail={isDetail}
          interactive={interactive}
          className={className}
        />
      );

    case 'glsl-chromatic-wave':
      return (
        <ChromaticShaderCanvas
          isDetail={isDetail}
          interactive={interactive}
          className={className}
        />
      );

    case 'three-particle-field':
      return (
        <ParticleFieldCanvas
          isDetail={isDetail}
          interactive={interactive}
          className={className}
        />
      );

    case 'gsap-kinetic-type':
      return (
        <KineticTypeCanvas
          isDetail={isDetail}
          interactive={interactive}
          className={className}
        />
      );

    case 'css-parametric-hud':
      return (
        <ParametricHudCanvas
          isDetail={isDetail}
          interactive={interactive}
          className={className}
        />
      );

    case 'unity-voxel-physics':
      return (
        <VoxelPhysicsCanvas
          isDetail={isDetail}
          interactive={interactive}
          className={className}
        />
      );

    default:
      return (
        <div className={`relative w-full h-full min-h-[220px] bg-[#0E0E10] border border-white/10 flex flex-col items-center justify-center p-6 text-center font-mono ${className}`}>
          <div className="text-[#FF1E27] text-2xl font-bold mb-2">[{experiment.number}]</div>
          <div className="text-white text-sm font-bold tracking-wider uppercase mb-1">{experiment.title}</div>
          <div className="text-stone-400 text-xs">{experiment.technology}</div>
          <div className="mt-3 px-2 py-0.5 border border-[#FF1E27]/40 text-[10px] text-[#FF1E27] uppercase">
            STATUS: {experiment.status}
          </div>
        </div>
      );
  }
}
