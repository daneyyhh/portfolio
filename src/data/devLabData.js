/**
 * REUBG DEV LAB — EXPERIMENT DATA REGISTRY
 * 
 * Data-driven architecture for technical experiments, prototypes, 
 * shaders, and creative engineering sandboxes.
 * 
 * Supported Statuses: "EXPERIMENT" | "IN DEVELOPMENT" | "ARCHIVED"
 * Supported Categories: "THREE.JS" | "GSAP" | "WEBGL" | "CSS" | "SHADERS" | "INTERACTIONS" | "PROTOTYPES" | "GAME / UNITY"
 */

export const devLabExperiments = [
  {
    id: "exp-01",
    number: "01",
    title: "CYBER KINETIC CORE",
    shortDescription: "Interactive WebGL 3D wireframe lattice with dynamic geodesic displacement, normal distortion, and lighting response.",
    description: "A real-time Three.js exploration into dynamic vertex displacement, multi-layered wireframe polyhedra, and cursor-reactive lighting. Explores real-time mesh deformation and procedural glow shaders with zero external asset dependencies.",
    category: "THREE.JS",
    technology: "Three.js / WebGL / BufferGeometry",
    status: "EXPERIMENT",
    purpose: "Testing performance boundaries of procedural multi-layer wireframe deformation and real-time point light tracking in modern browser viewports.",
    demoUrl: null,
    sourceUrl: "https://github.com/daneyyhh/portfolio",
    type: "three-kinetic-core",
    tags: ["WebGL", "Three.js", "Matrix Deformation", "Dynamic Normals"],
    metrics: {
      drawCalls: "4",
      geometry: "Icosahedron 320v",
      pipeline: "Standard Mesh / Emissive Core",
      renderEngine: "WebGLRenderer (Power-Preference: High)"
    },
    codeSnippet: `// Procedural Vertex Distortion Loop
const geometry = new THREE.IcosahedronGeometry(1.6, 2);
const positionAttribute = geometry.attributes.position;
const time = clock.getElapsedTime();

for (let i = 0; i < positionAttribute.count; i++) {
  const vx = positionAttribute.getX(i);
  const vy = positionAttribute.getY(i);
  const vz = positionAttribute.getZ(i);
  
  // Geodesic wave pulse
  const distance = Math.sqrt(vx * vx + vy * vy + vz * vz);
  const displacement = Math.sin(distance * 3.5 - time * 2.0) * 0.12;
  
  positionAttribute.setXYZ(
    i,
    vx * (1 + displacement),
    vy * (1 + displacement),
    vz * (1 + displacement)
  );
}
geometry.computeVertexNormals();
geometry.attributes.position.needsUpdate = true;`
  },
  {
    id: "exp-02",
    number: "02",
    title: "CHROMATIC WAVE SHADER",
    shortDescription: "Custom WebGL GLSL fragment shader generating liquid light refraction with cursor-driven chromatic RGB separation.",
    description: "Mathematical wave simulation running on the GPU via raw GLSL shaders. Cursor coordinates drive wave origin, frequency harmonics, and chromatic fringe aberration across red, green, and blue color channels.",
    category: "SHADERS",
    technology: "GLSL / WebGL / Fragment Shader",
    status: "EXPERIMENT",
    purpose: "Investigating GPU-accelerated liquid light distortion and optical dispersion using sinusoidal math functions with zero texture memory overhead.",
    demoUrl: null,
    sourceUrl: "https://github.com/daneyyhh/portfolio",
    type: "glsl-chromatic-wave",
    tags: ["GLSL", "Fragment Shader", "RGB Split", "Procedural Fluid"],
    metrics: {
      uniforms: "u_time, u_resolution, u_mouse",
      shadingModel: "Per-Pixel Chromatic Dispersion",
      fragmentPrecision: "highp float",
      memoryUsage: "< 2MB VRAM"
    },
    codeSnippet: `// GLSL Fragment Shader: Chromatic Dispersion
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
  vec2 mouse = (u_mouse * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
  
  float dist = length(uv - mouse);
  float wave = sin(dist * 12.0 - u_time * 3.0) * 0.04;
  
  // Independent RGB spectral channel sampling
  float r = sin((uv.x + wave * 1.2) * 8.0 + u_time) * 0.5 + 0.5;
  float g = sin((uv.y + wave * 0.9) * 8.0 + u_time * 0.8) * 0.5 + 0.5;
  float b = cos((length(uv) + wave * 1.5) * 8.0 - u_time) * 0.5 + 0.5;
  
  gl_FragColor = vec4(r * 0.95, g * 0.15, b * 0.2, 1.0);
}`
  },
  {
    id: "exp-03",
    number: "03",
    title: "VECTOR PARTICLE FIELD",
    shortDescription: "1,200 particle nodes forming an interactive mathematical attractor grid with cursor repulsion and spring physics.",
    description: "High-performance vector field simulation. A dense matrix of 1,200 points reacts to cursor velocity and proximity, deflecting outwards with spring resistance and dampening back to rest coordinates.",
    category: "WEBGL",
    technology: "Three.js Points / Vector Math / Spring Dynamics",
    status: "EXPERIMENT",
    purpose: "Testing real-time particle buffer calculations and smooth spring damping curves without Web Worker latency, sustaining 60 FPS in interactive viewports.",
    demoUrl: null,
    sourceUrl: "https://github.com/daneyyhh/portfolio",
    type: "three-particle-field",
    tags: ["Particle Dynamics", "Vector Physics", "Spring Damper", "BufferAttribute"],
    metrics: {
      particleCount: "1,200 nodes",
      interactionRadius: "180px",
      springConstant: "k = 0.08",
      dampingRatio: "c = 0.85"
    },
    codeSnippet: `// Particle Vector Repulsion & Spring Restitution
const dx = particle.x - mouse.x;
const dy = particle.y - mouse.y;
const distance = Math.hypot(dx, dy);

if (distance < repulsionRadius) {
  const force = (1 - distance / repulsionRadius) * maxImpulse;
  particle.vx += (dx / distance) * force;
  particle.vy += (dy / distance) * force;
}

// Hooke's Law spring force towards anchor origin
particle.vx += (particle.originX - particle.x) * springK;
particle.vy += (particle.originY - particle.y) * springK;
particle.vx *= friction;
particle.vy *= friction;
particle.x += particle.vx;
particle.y += particle.vy;`
  },
  {
    id: "exp-04",
    number: "04",
    title: "KINETIC TIMELINE & TYPE",
    shortDescription: "Kinetic typography mechanics exploring stepped staggered character reveals, velocity tracking, and scrubbable timeline.",
    description: "An interactive animation laboratory exploring GSAP timeline mechanics. Features sliced typographic masks, scrubbable time progress, interactive velocity distortion, and cubic bezier acceleration curve analysis.",
    category: "GSAP",
    technology: "GSAP 3 / Kinetic SVG / Motion Timeline",
    status: "IN DEVELOPMENT",
    purpose: "Prototyping high-precision editorial typography choreography with bidirectional timeline scrubbing and micro-interaction states.",
    demoUrl: null,
    sourceUrl: "https://github.com/daneyyhh/portfolio",
    type: "gsap-kinetic-type",
    tags: ["GSAP 3", "Timeline Orchestration", "Kinetic Type", "Scrubber"],
    metrics: {
      engine: "GSAP v3.14.2",
      frameStepping: "RAF Synchronized",
      timelineDuration: "2.4s loop",
      scrubLatency: "< 5ms"
    },
    codeSnippet: `// GSAP Master Timeline Choreography
const masterTl = gsap.timeline({ repeat: -1, yoyo: true });

masterTl
  .to(".type-char", {
    y: (i) => Math.sin(i * 0.4) * -35,
    rotateX: 45,
    stagger: { each: 0.04, from: "center" },
    duration: 0.8,
    ease: "power3.out"
  })
  .to(".mask-slice", {
    scaleX: 1.15,
    skewX: -12,
    duration: 0.6,
    ease: "expo.inOut"
  }, "-=0.4");`
  },
  {
    id: "exp-05",
    number: "05",
    title: "PARAMETRIC HUD MATRIX",
    shortDescription: "Cybernetic telemetry interface built with modern CSS Grid, dynamic CSS custom properties, and radar sweeps.",
    description: "Pushing modern CSS layout boundaries. A technical laboratory HUD featuring multi-axis grid overlays, CSS Houdini/variables bound to pointer movement, circular radar sweeps, and monospace data readouts with zero external runtime libraries.",
    category: "CSS",
    technology: "CSS Grid / CSS Custom Properties / Conic Gradients",
    status: "EXPERIMENT",
    purpose: "Exploring how far modern CSS custom properties and grid sub-structures can replace Canvas/JS for complex scientific telemetry dashboards.",
    demoUrl: null,
    sourceUrl: "https://github.com/daneyyhh/portfolio",
    type: "css-parametric-hud",
    tags: ["CSS Grid", "CSS Variables", "Conic Gradient", "Zero-JS Layout"],
    metrics: {
      domFootprint: "Minimal SVG/Divs",
      cssFeatures: "Subgrid, Conic-Gradients, CSS Vars",
      gpuOffload: "transform: translate3d",
      cpuLoad: "< 1%"
    },
    codeSnippet: `/* Dynamic Pointer Coordinates Driven by CSS Variables */
.hud-reticle {
  --reticle-x: calc(var(--pointer-x) * 1px);
  --reticle-y: calc(var(--pointer-y) * 1px);
  transform: translate3d(var(--reticle-x), var(--reticle-y), 0);
  background: conic-gradient(
    from var(--radar-angle),
    rgba(255, 30, 39, 0.4) 0deg,
    transparent 60deg,
    transparent 360deg
  );
  border: 1px solid rgba(255, 30, 39, 0.3);
}`
  },
  {
    id: "exp-06",
    number: "06",
    title: "RAYMARCHED VOXEL PHYSIC",
    shortDescription: "Interactive 3D voxel sandbox prototype exploring Unity/WebGL physics simulation mechanics and orbital gravity pulses.",
    description: "Reflecting Reuben's BCA Game Development training in Unity 3D and C# gameplay mechanics. An interactive 3D voxel sandbox with rigid-body collisions, gravity impulse pulses, camera orbit controls, and real-time physics telemetry.",
    category: "GAME / UNITY",
    technology: "WebGL / Three.js Simulation / Physics Mechanics",
    status: "IN DEVELOPMENT",
    purpose: "Prototyping gameplay physics mechanics, impulse propagation, and dynamic voxel fragmentation for browser-based interactive 3D experiences.",
    demoUrl: null,
    sourceUrl: "https://github.com/daneyyhh/portfolio",
    type: "unity-voxel-physics",
    tags: ["Game Development", "Physics Impulses", "Voxel Engine", "Orbit Controls"],
    metrics: {
      physicsMode: "Semi-Implicit Euler",
      voxelUnits: "64 active voxels",
      collisionDetection: "AABB Spatial Partition",
      impulseForce: "F = m * a (shockwave)"
    },
    codeSnippet: `// Voxel Impulse Physics Engine (C# / WebGL Concept)
public void ApplyShockwave(Vector3 epicenter, float force) {
  foreach (var voxel in activeVoxels) {
    Vector3 direction = voxel.transform.position - epicenter;
    float distance = direction.magnitude;
    if (distance < shockwaveRadius) {
      float attenuation = 1.0f - (distance / shockwaveRadius);
      voxel.rigidBody.AddExplosionForce(force * attenuation, epicenter, shockwaveRadius);
      voxel.SetHighlightState(true);
    }
  }
}`
  }
];
