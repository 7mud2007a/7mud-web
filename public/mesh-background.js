/*!
 * Calm WebGL atmosphere
 * Soft monochrome light fields with very slow drift.
 * No scroll-linked motion, mesh deformation, or resize-driven animation.
 */
(function () {
  "use strict";
  if (window.meshBackground) return;

  const canvas = document.getElementById("mesh-bg");
  if (!canvas) return;
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power"
  });
  if (!gl) {
    canvas.style.display = "none";
    return;
  }

  const vertexSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision mediump float;
    varying vec2 v_uv;
    uniform vec2 u_resolution;
    uniform float u_time;

    float blob(vec2 p, vec2 center, vec2 scale) {
      vec2 d = (p - center) * scale;
      return exp(-dot(d, d));
    }

    void main() {
      vec2 uv = v_uv;
      vec2 p = uv - 0.5;
      p.x *= u_resolution.x / max(u_resolution.y, 1.0);

      float t = u_time * 0.035;
      float lightA = blob(p, vec2(-0.24 + sin(t) * 0.10, 0.20 + cos(t * 0.8) * 0.06), vec2(1.35, 1.55));
      float lightB = blob(p, vec2(0.30 + cos(t * 0.7) * 0.08, -0.18 + sin(t * 0.9) * 0.07), vec2(1.55, 1.25));
      float lightC = blob(p, vec2(0.02 + sin(t * 0.55) * 0.12, 0.02 + cos(t * 0.6) * 0.08), vec2(1.8, 1.8));

      float glow = lightA * 0.030 + lightB * 0.024 + lightC * 0.012;
      float vignette = smoothstep(1.05, 0.12, length(p * vec2(0.8, 1.0)));
      float grain = fract(sin(dot(gl_FragCoord.xy + u_time, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;

      vec3 base = vec3(0.011, 0.011, 0.012);
      vec3 silver = vec3(0.72, 0.75, 0.80);
      vec3 color = base + silver * glow * (0.72 + 0.28 * vignette);
      color += vec3(grain * 0.0012);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertex = compile(gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) {
    canvas.style.display = "none";
    return;
  }

  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    canvas.style.display = "none";
    return;
  }

  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const timeLocation = gl.getUniformLocation(program, "u_time");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let frame = 0;
  let start = 0;
  let paused = document.hidden;
  let lastRender = 0;
  const maxDpr = Math.min(Number(canvas.dataset.maxDpr) || 1.25, 1.5);

  function resize() {
    // Use the stable small viewport unit; ignore mobile browser toolbar scroll changes.
    const w = Math.max(1, Math.round(window.innerWidth));
    const h = Math.max(1, Math.round(window.innerHeight));
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const nextW = Math.round(w * dpr);
    const nextH = Math.round(h * dpr);
    if (nextW === width && nextH === height) return;
    width = nextW;
    height = nextH;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
    gl.uniform2f(resolutionLocation, width, height);
  }

  function render(now) {
    if (paused) return;
    if (!start) start = now;
    if (now - lastRender < 32) {
      frame = requestAnimationFrame(render);
      return;
    }
    lastRender = now;
    const elapsed = reducedMotion ? 0 : (now - start) / 1000;
    gl.uniform1f(timeLocation, elapsed);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    frame = requestAnimationFrame(render);
  }

  function pause() {
    paused = true;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  }
  function resume() {
    if (!paused) return;
    paused = false;
    lastRender = 0;
    frame = requestAnimationFrame(render);
  }
  function onVisibility() {
    if (document.hidden) pause();
    else resume();
  }

  resize();
  gl.uniform1f(timeLocation, 0);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("orientationchange", resize, { passive: true });
  if (!reducedMotion && !paused) frame = requestAnimationFrame(render);

  window.meshBackground = {
    pause,
    resume,
    destroy() {
      pause();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      delete window.meshBackground;
    },
    stats() {
      return { width, height, paused, reducedMotion, mode: "calm-atmosphere" };
    }
  };
})();
