import React, { useRef, useEffect, useState } from 'react';

const VERTEX_SHADER_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_aberration;

void main() {
  // Normalize coordinates (-1.0 to 1.0)
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
  vec2 mouse = (u_mouse * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
  
  float dist = length(uv - mouse);
  float wave = sin(dist * 14.0 - u_time * 3.2) * 0.05;
  
  // Dynamic chromatic aberration split
  float split = u_aberration * 0.03;
  vec2 rUv = uv + vec2(wave * (1.0 + split), 0.0);
  vec2 gUv = uv + vec2(0.0, wave);
  vec2 bUv = uv - vec2(wave * (1.0 + split), 0.0);

  // Spectral intensity calculations
  float r = sin(length(rUv) * 6.0 - u_time * 1.5) * 0.5 + 0.5;
  float g = sin(length(gUv) * 6.0 - u_time * 1.5 + 0.8) * 0.2 + 0.2;
  float b = cos(length(bUv) * 7.0 - u_time * 1.5 + 1.6) * 0.4 + 0.3;

  // Dark laboratory contrast with signature red highlights
  vec3 color = vec3(
    r * 1.0 + wave * 2.0,
    g * 0.2,
    b * 0.3
  );

  // Border fade / vignette
  float vignette = smoothstep(1.5, 0.4, length(uv));
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function ChromaticShaderCanvas({
  isDetail = false,
  interactive = true,
  className = ""
}) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const isVisibleRef = useRef(true);

  const [aberration, setAberration] = useState(1.5);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Visibility Observer to pause when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const gl = canvas.getContext('webgl', { powerPreference: 'high-performance' });
    if (!gl) return;

    // Helper: compile shader
    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Full screen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const aberLoc = gl.getUniformLocation(program, 'u_aberration');

    let mouseX = canvas.clientWidth / 2;
    let mouseY = canvas.clientHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? rect.width / 2;
      const cy = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? rect.height / 2;
      targetMouseX = cx - rect.left;
      targetMouseY = rect.height - (cy - rect.top);
    };

    if (interactive) {
      canvas.addEventListener('mousemove', handlePointerMove, { passive: true });
      canvas.addEventListener('touchmove', handlePointerMove, { passive: true });
    }

    const resizeCanvas = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Render loop
    const startTime = performance.now();
    let frameCount = 0;
    let lastFpsTime = startTime;

    const render = (timeNow) => {
      animFrameRef.current = requestAnimationFrame(render);
      if (!isVisibleRef.current) return;

      frameCount++;
      if (timeNow - lastFpsTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (timeNow - lastFpsTime)));
        frameCount = 0;
        lastFpsTime = timeNow;
      }

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      const elapsed = (timeNow - startTime) * 0.001;

      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, mouseX, mouseY);
      gl.uniform1f(timeLoc, elapsed);
      gl.uniform1f(aberLoc, aberration);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        canvas.removeEventListener('mousemove', handlePointerMove);
        canvas.removeEventListener('touchmove', handlePointerMove);
      }
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
    };
  }, [interactive, aberration]);

  return (
    <div className={`relative w-full h-full min-h-[220px] overflow-hidden select-none bg-[#0A0A0A] ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full absolute inset-0 cursor-crosshair" />

      {/* Telemetry Indicator */}
      <div className="absolute top-2 left-2 pointer-events-none z-10 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#0A0A0A]/80 border border-white/10 font-mono text-[9px] text-[#FF1E27] tracking-wider uppercase backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
          <span>GLSL SHADER // {fps} FPS</span>
        </span>
      </div>

      {isDetail && (
        <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 bg-[#0A0A0A]/90 border border-white/10 p-2.5 backdrop-blur-md font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-stone-300">ABERRATION INTENSITY:</span>
            {[1.0, 1.8, 2.5].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setAberration(lvl)}
                className={`px-2 py-0.5 border text-[10px] uppercase font-bold transition-colors ${
                  aberration === lvl ? 'border-[#FF1E27] bg-[#FF1E27] text-white' : 'border-white/15 text-stone-300 hover:border-white/30'
                }`}
              >
                {lvl}×
              </button>
            ))}
          </div>
          <span className="text-[10px] text-stone-400">MOVE CURSOR TO DISTORT CHROMATIC WAVES</span>
        </div>
      )}
    </div>
  );
}
