/*!
 * Mesh Background
 * ---------------------------------------------------------------------------
 * A real-time, procedurally generated 3D network on a near-black field:
 * thin silver edges, small white vertex lights and faint translucent facets,
 * suspended like a folded membrane. Rendered with native WebGL 1, no
 * dependencies, no build step. Classic script, so it also runs from file://.
 *
 *   <canvas id="mesh-bg" aria-hidden="true"></canvas>
 *   <script src="main.js" defer></script>
 *
 * If no #mesh-bg canvas exists, one is created and inserted behind the page.
 * Optional data-attributes on the canvas:
 *   data-seed="N"        mesh seed (different seed = different network)
 *   data-max-dpr="2"     cap for the device pixel ratio
 *   data-quality="auto"  auto | low | high
 *   data-adaptive="off"  disable the automatic resolution scaler
 *   data-fade="off"      skip the fade-in
 *   data-start="12"      start the animation clock N seconds in
 *
 * Public API: window.meshBackground = { destroy, pause, resume, advance, stats }
 */
(function () {
  'use strict';

  if (window.meshBackground) { return; }

  /* ======================================================================
   * 0. Constants
   * ==================================================================== */
  const TAU = Math.PI * 2;
  const CAMERA_DISTANCE = 9.0;
  const FOV = 36 * Math.PI / 180;
  const HALF_H = CAMERA_DISTANCE * Math.tan(FOV / 2);   // world half-height at z = 0
  const MIN_FRAME_MS = 11;                               // ~90 fps cap; 120 Hz screens render at 60
  const CLEAR = [3 / 255, 3 / 255, 3 / 255];             // #030303
  const FADE_SECONDS = 2.6;
  const MAX_PIXELS = 8e6;                                // drawing buffer never larger than ~8 megapixels
  const DEFAULT_SEED = 20;

  // Five slow travelling waves displace every point of the membrane.
  // k = spatial frequency (rad / world unit) + per-vertex phase jitter in w,
  // a = amplitude per axis (world units), w = idle angular speed (rad / s).
  const WAVES = [
    { k: [0.40, 0.16, 0.12, 0.00], a: [0.18, 0.10, 0.80], w: 0.071 },
    { k: [-0.22, 0.52, 0.16, 0.00], a: [0.14, 0.16, 0.52], w: 0.093 },
    { k: [0.58, -0.34, 0.22, 0.00], a: [0.10, 0.14, 0.42], w: 0.117 },
    { k: [1.05, 0.78, 0.30, 0.55], a: [0.04, 0.05, 0.14], w: 0.153 },
    { k: [-0.86, 1.28, 0.42, 0.90], a: [0.03, 0.04, 0.11], w: 0.181 }
  ];

  // How scrolling feeds the animation. Everything is smoothed; nothing maps
  // raw scroll position to an angle.
  const SCROLL = {
    vRef: 1500,        // px/s that maps to tanh(1) ~ 76 % response
    vMax: 9000,        // clamp for anchor jumps / programmatic scrolls
    attack: 0.10,      // energy rises with this time constant (s)
    release: 1.15,     // ...and falls back with this one
    dirAttack: 0.12,
    dirRelease: 0.55,
    speedBoost: 4.2,   // wave speed x (1 + speedBoost * energy)
    ampBoost: 0.40,    // displacement x (1 + ampBoost * energy)
    flowRate: 0.55,    // world units / s the wave pattern drifts at full scroll
    parGain: 2.7e-4,   // parallax drift per px/s
    parDecay: 1.6,
    lean: 0.05,        // max pitch lean (rad)
    leanOmega: 3.4     // spring stiffness of the lean (critically damped)
  };

  /* ======================================================================
   * 1. Small helpers
   * ==================================================================== */
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smoothstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

  function mulberry32(seed) {
    let a = seed | 0;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Smooth 2D value noise in [0, 1].
  function makeNoise2D(rng) {
    const perm = new Uint8Array(256);
    for (let i = 0; i < 256; i++) perm[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const t = perm[i]; perm[i] = perm[j]; perm[j] = t;
    }
    const P = new Uint8Array(512);
    for (let i = 0; i < 512; i++) P[i] = perm[i & 255];
    const g = new Float32Array(256);
    for (let i = 0; i < 256; i++) g[i] = rng();
    const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
    return function (x, y) {
      const xi = Math.floor(x), yi = Math.floor(y);
      const xf = x - xi, yf = y - yi;
      const X = xi & 255, Y = yi & 255;
      const v00 = g[P[P[X] + Y]], v10 = g[P[P[X + 1] + Y]];
      const v01 = g[P[P[X] + Y + 1]], v11 = g[P[P[X + 1] + Y + 1]];
      const u = fade(xf), v = fade(yf);
      return lerp(lerp(v00, v10, u), lerp(v01, v11, u), v);
    };
  }

  // Bowyer-Watson Delaunay triangulation. Returns triangles as [a, b, c] index triples.
  function delaunay(xs, ys) {
    const n = xs.length;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (let i = 0; i < n; i++) {
      if (xs[i] < minX) minX = xs[i];
      if (xs[i] > maxX) maxX = xs[i];
      if (ys[i] < minY) minY = ys[i];
      if (ys[i] > maxY) maxY = ys[i];
    }
    const s = Math.max(maxX - minX, maxY - minY, 1e-3) * 40;
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    const px = Array.from(xs), py = Array.from(ys);
    px.push(cx - s, cx + s, cx);
    py.push(cy - s, cy - s, cy + s);          // counter-clockwise super triangle

    const inCircle = (a, b, c, x, y) => {
      const adx = px[a] - x, ady = py[a] - y, bdx = px[b] - x, bdy = py[b] - y, cdx = px[c] - x, cdy = py[c] - y;
      const ad = adx * adx + ady * ady, bd = bdx * bdx + bdy * bdy, cd = cdx * cdx + cdy * cdy;
      return adx * (bdy * cd - bd * cdy) - ady * (bdx * cd - bd * cdx) + ad * (bdx * cdy - bdy * cdx) > 0;
    };

    let tris = [[n, n + 1, n + 2]];
    for (let i = 0; i < n; i++) {
      const x = px[i], y = py[i];
      const bad = [], keep = [];
      for (const t of tris) (inCircle(t[0], t[1], t[2], x, y) ? bad : keep).push(t);
      const edges = [];
      for (const t of bad) edges.push([t[0], t[1]], [t[1], t[2]], [t[2], t[0]]);
      tris = keep;
      for (const e of edges) {
        let shared = false;
        for (const f of edges) { if (f[0] === e[1] && f[1] === e[0]) { shared = true; break; } }
        if (!shared) tris.push([e[0], e[1], i]);
      }
    }
    return tris.filter((t) => t[0] < n && t[1] < n && t[2] < n);
  }

  /* ---- column-major 4x4 matrices ---------------------------------------- */
  function perspective(out, fovy, aspect, near, far) {
    const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
    out.fill(0);
    out[0] = f / aspect; out[5] = f;
    out[10] = (far + near) * nf; out[11] = -1; out[14] = 2 * far * near * nf;
    return out;
  }

  // modelView = translate(ox, oy, -D) * Rx(pitch) * Ry(yaw)
  function modelView(out, pitch, yaw, ox, oy) {
    const ca = Math.cos(pitch), sa = Math.sin(pitch), cb = Math.cos(yaw), sb = Math.sin(yaw);
    out[0] = cb;        out[1] = sa * sb;   out[2] = -ca * sb;  out[3] = 0;
    out[4] = 0;         out[5] = ca;        out[6] = sa;        out[7] = 0;
    out[8] = sb;        out[9] = -sa * cb;  out[10] = ca * cb;  out[11] = 0;
    out[12] = ox;       out[13] = oy;       out[14] = -CAMERA_DISTANCE; out[15] = 1;
    return out;
  }

  /* ======================================================================
   * 2. Procedural mesh
   *
   * Vertices live in "viewport space" (u, v in -1..1 spans the screen at
   * rest) plus a depth z. The vertex shader turns them into world positions,
   * so the same network always fills the viewport whatever the aspect ratio.
   * ==================================================================== */
  function generateMesh(o) {
    const rng = mulberry32(o.seed);
    const noise = makeNoise2D(rng);
    const asp = clamp(o.aspect, 0.4, 2.8);
    const wide = smoothstep(0.75, 1.7, asp);
    const EXT = 1.3;                     // vertices reach 30 % beyond the viewport edges
    const MAXD = 1.3;
    const FOLD = o.fold == null ? 0.5 : o.fold;

    // The mass of the network sits upper-centre on phones, centre on wide
    // screens, and thins out towards the bottom and the sides, which leaves
    // large black areas. The same focus/falloff also shapes brightness (see comp() in the shaders).
    const focus = { u: lerp(0.0, 0.10, wide), v: lerp(0.40, 0.14, wide) };
    const sigma = { u: lerp(0.56, 0.58, wide), up: lerp(0.75, 0.80, wide), down: lerp(0.60, 0.56, wide) };
    const dens = (u, v) => {
      const du = (u - focus.u) / sigma.u, dv = (v - focus.v) / (v > focus.v ? sigma.up : sigma.down);
      return (0.035 + 0.965 * Math.exp(-(du * du + dv * dv))) * (0.7 + 0.6 * noise(u * 1.7 + 3.1, v * 1.7 - 1.3));
    };

    // The same composition falloff the shaders use (comp()), evaluated per vertex so that the facet
    // fill fades along the geometry of each facet instead of along fixed screen axes.
    const compAt = (u, v) => {
      const du = (u - focus.u) / sigma.u, dv = (v - focus.v) / (v > focus.v ? sigma.up : sigma.down);
      return Math.exp(-(du * du + dv * dv));
    };

    let integral = 0;
    const G = 40, cell = (2 * EXT) / G;
    for (let i = 0; i < G; i++) {
      for (let j = 0; j < G; j++) integral += dens(-EXT + (i + 0.5) * cell, -EXT + (j + 0.5) * cell) * cell * cell * asp;
    }
    const nMain = Math.max(24, Math.round(o.density * 60 * lerp(1, 0.72, wide) * integral));

    // Two interleaved sheets: the main membrane and a fainter, deeper one that crosses it,
    // so facets overlap and layer up the way a folded, translucent surface does.
    const LAYERS = [
      { n: nMain, outliers: Math.round(8 + 3 * wide), fold: FOLD, zAmp: 4.2, zShift: -0.2, holes: 2, gain: 1.0, light: 1.0 },
      { n: Math.round(nMain * 0.32), outliers: 4, fold: FOLD * 1.15, zAmp: 3.6, zShift: -1.1, holes: 1, gain: 0.45, light: 0.5 }
    ];

    const U = [], V = [], Z = [], PU = [], PV = [], LY = [], OUT = [];
    const edgeMap = new Map();
    const keptTris = [];
    const addEdge = (a, b, kept, layer) => {
      const lo = Math.min(a, b), hi = Math.max(a, b), key = lo * 65536 + hi;
      let e = edgeMap.get(key);
      if (!e) { e = { a: lo, b: hi, kept: false, layer }; edgeMap.set(key, e); }
      if (kept) e.kept = true;
    };

    LAYERS.forEach((L, li) => {
      const base = U.length;
      const lu = [], lv = [];

      // Weighted best-candidate sampling: blue-noise spacing that shrinks where the density is high.
      const nCand = 14;
      for (let i = 0; i < L.n; i++) {
        let bu = 0, bv = 0, best = -1;
        for (let c = 0; c < (i === 0 ? 1 : nCand); c++) {
          const u = lerp(-EXT, EXT, rng()), v = lerp(-EXT, EXT, rng());
          let md = 1;
          for (let j = 0; j < i; j++) {
            const du = (u - lu[j]) * asp, dv = v - lv[j];
            const d2 = du * du + dv * dv;
            if (d2 < md) md = d2;
          }
          const score = md * dens(u, v);
          if (score > best) { best = score; bu = u; bv = v; }
        }
        lu.push(bu); lv.push(bv);
      }
      // A ring of far outliers makes long thin fans that run off the screen edges.
      for (let i = 0; i < L.outliers; i++) {
        const a = ((i + rng() * 0.8) / L.outliers) * TAU, r = 1.75 + rng() * 1.6;
        lu.push(Math.cos(a) * r * 1.15); lv.push(Math.sin(a) * r);
      }

      const n = lu.length;
      const xs = new Float64Array(n), ys = new Float64Array(n);
      for (let i = 0; i < n; i++) {
        const u = lu[i], v = lv[i], X0 = u * asp, Y0 = v;
        // depth: coherent undulation + per-vertex jitter
        Z.push(clamp((noise(u * 0.85 + 11.7 + 40 * li, v * 0.85 + 5.3 + 17 * li) - 0.5) * L.zAmp + (rng() - 0.5) * 1.7 + L.zShift, -3.6, 2.4));
        // Fold the sheet. Connectivity comes from the flat layout (u, v); the vertices are then
        // pushed around by a smooth field, so the surface crumples, foreshortens and overlaps
        // itself instead of reading as a flat, front-facing tiling.
        const near = 1 - smoothstep(1.25, 2.2, Math.hypot(u, v));               // far outliers stay put
        const du = (u - focus.u) / sigma.u, dv = (v - focus.v) / sigma.up;
        const f = L.fold * near * (0.55 + 0.45 * Math.exp(-(du * du + dv * dv)));
        PU.push(u + (f * (noise(X0 * 0.95 + 21.3 + 29 * li, Y0 * 0.95 + 7.7) - 0.5) * 2) / asp);
        PV.push(v + f * (noise(X0 * 0.95 - 13.1, Y0 * 0.95 + 31.9 + 23 * li) - 0.5) * 2);
        U.push(u); V.push(v); LY.push(li); OUT.push(i >= L.n ? 1 : 0);
        xs[i] = X0; ys[i] = Y0;
      }

      // Which facets exist: dense near the focus, with a few deliberate holes.
      const holes = [];
      for (let i = 0; i < L.holes; i++) {
        holes.push({ u: focus.u + lerp(-0.5, 0.5, rng()), v: focus.v + lerp(-0.45, 0.4, rng()), r: lerp(0.22, 0.36, rng()) });
      }
      for (const t of delaunay(xs, ys)) {
        const a = base + t[0], b = base + t[1], c = base + t[2];
        const cu = (U[a] + U[b] + U[c]) / 3, cv = (V[a] + V[b] + V[c]) / 3;
        let H = 0;
        for (const h of holes) {
          const d = Math.hypot((cu - h.u) * asp, cv - h.v) / h.r;
          H += Math.exp(-d * d);
        }
        const d = clamp(dens(cu, cv) / MAXD, 0, 1);
        const keep = rng() < clamp(0.40 + 0.75 * Math.sqrt(d) - 0.9 * H, 0.12, 0.97);
        if (keep) keptTris.push({ a, b, c, layer: li });
        addEdge(a, b, keep, li); addEdge(b, c, keep, li); addEdge(c, a, keep, li);
      }
    });

    const total = U.length;
    const keptEdges = [];
    for (const e of edgeMap.values()) {
      if (OUT[e.a] && OUT[e.b]) continue;                  // two outliers: never on screen
      if (e.kept || rng() < 0.30) keptEdges.push(e);
    }

    // Compact to the vertices that are actually used.
    const remap = new Int32Array(total).fill(-1);
    let nv = 0;
    const use = (i) => { if (remap[i] < 0) remap[i] = nv++; };
    for (const t of keptTris) { use(t.a); use(t.b); use(t.c); }
    for (const e of keptEdges) { use(e.a); use(e.b); }
    const vu = new Float32Array(nv), vv = new Float32Array(nv), vz = new Float32Array(nv);
    const vs = new Float32Array(nv), vl = new Float32Array(nv), vw = new Float32Array(nv), deg = new Int32Array(nv);
    const vlayer = new Uint8Array(nv);
    for (let i = 0; i < total; i++) {
      const k = remap[i];
      if (k < 0) continue;
      vu[k] = PU[i]; vv[k] = PV[i]; vz[k] = Z[i]; vs[k] = rng() * 2.2; vlayer[k] = LY[i];
      vw[k] = smoothstep(0.02, 0.32, compAt(PU[i], PV[i]));
    }
    for (const e of keptEdges) { deg[remap[e.a]]++; deg[remap[e.b]]++; }

    // Vertex lights: most junctions get a small one, big hubs a brighter one.
    let visible = 0, lit = 0;
    for (let i = 0; i < nv; i++) {
      const vis = Math.abs(vu[i]) < 1.12 && Math.abs(vv[i]) < 1.12;
      if (vis) visible++;
      if (!vis || deg[i] < 2) continue;
      const Lc = LAYERS[vlayer[i]], boost = 0.7 + 0.3 * Lc.light;
      let l = 0;
      if (rng() < clamp(0.62 + 0.10 * (deg[i] - 4), 0.35, 0.95) * Lc.light) l = (0.70 + 0.35 * rng()) * boost;
      if (deg[i] >= 7 && rng() < 0.85) l = (0.95 + 0.25 * rng()) * boost;
      vl[i] = l;
      if (l > 0) lit++;
    }

    const faces = keptTris.map((t) => {
      const a = remap[t.a], b = remap[t.b], c = remap[t.c];
      const cu = (vu[a] + vu[b] + vu[c]) / 3, cv = (vv[a] + vv[b] + vv[c]) / 3;
      const d = clamp(dens(cu, cv) / MAXD, 0, 1);
      let g = 0.30 + 0.70 * Math.pow(rng(), 1.4);           // a faint, connected sheet...
      if (rng() < 0.08) g = 0.95 + 0.55 * rng();            // ...with a few facets that catch more light
      g *= (0.40 + 0.60 * Math.sqrt(d)) * (1 + 0.45 * Math.max(vl[a], vl[b], vl[c])) * LAYERS[t.layer].gain;
      const spec = rng() < 0.30 ? 0.55 + 0.45 * rng() : 0.12 * rng();
      return { a, b, c, g, spec };
    });
    const edges = keptEdges.map((e) => {
      const a = remap[e.a], b = remap[e.b];
      let g = 0.16 + 0.42 * Math.pow(rng(), 1.5);
      if (rng() < 0.12) g = 0.72 + 0.28 * rng();           // selected edges: silver highlights
      g = (g + 0.10 * Math.max(vl[a], vl[b])) * (0.45 + 0.55 * LAYERS[e.layer].gain);
      return { a, b, g, wk: 0.9 + (g > 0.7 ? 0.25 : rng() * 0.12) };
    });

    return {
      aspect: asp, focus, sigma, nv, vu, vv, vz, vs, vl, vw, deg, faces, edges,
      counts: { vertices: nv, visibleVertices: visible, lights: lit, faces: faces.length, edges: edges.length }
    };
  }

  /* ---- CPU-side vertex buffers (uploaded once, animated on the GPU) -------- */
  const FACE_FLOATS = 22, EDGE_FLOATS = 14, POINT_FLOATS = 6;

  function buildGeometry(mesh, subdiv, segments) {
    const L = subdiv;
    const nvPer = ((L + 1) * (L + 2)) / 2;
    const nF = mesh.faces.length;
    const lat = (r, c) => r * (L + 1) - (r * (r - 1)) / 2 + c;

    const fv = new Float32Array(nF * nvPer * FACE_FLOATS);
    const fi = new Uint16Array(nF * L * L * 3);
    let o = 0, io = 0;
    for (let f = 0; f < nF; f++) {
      const F = mesh.faces[f], idx = [F.a, F.b, F.c], base = f * nvPer;
      for (let r = 0; r <= L; r++) {
        for (let c = 0; c <= L - r; c++) {
          const b1 = c / L, b2 = r / L, b0 = 1 - b1 - b2;
          for (let k = 0; k < 3; k++) { fv[o++] = mesh.vu[idx[k]]; fv[o++] = mesh.vv[idx[k]]; fv[o++] = mesh.vz[idx[k]]; }
          fv[o++] = mesh.vs[idx[0]]; fv[o++] = mesh.vs[idx[1]]; fv[o++] = mesh.vs[idx[2]];
          fv[o++] = mesh.vl[idx[0]]; fv[o++] = mesh.vl[idx[1]]; fv[o++] = mesh.vl[idx[2]];
          fv[o++] = b0; fv[o++] = b1; fv[o++] = F.g; fv[o++] = F.spec;
          fv[o++] = mesh.vw[idx[0]]; fv[o++] = mesh.vw[idx[1]]; fv[o++] = mesh.vw[idx[2]];
        }
      }
      for (let r = 0; r < L; r++) {
        for (let c = 0; c < L - r; c++) {
          fi[io++] = base + lat(r, c); fi[io++] = base + lat(r, c + 1); fi[io++] = base + lat(r + 1, c);
          if (c < L - r - 1) { fi[io++] = base + lat(r, c + 1); fi[io++] = base + lat(r + 1, c + 1); fi[io++] = base + lat(r + 1, c); }
        }
      }
    }

    const S = segments, ePer = 2 * (S + 1), nE = mesh.edges.length;
    const ev = new Float32Array(nE * ePer * EDGE_FLOATS);
    const ei = new Uint16Array(nE * S * 6);
    o = 0; io = 0;
    for (let e = 0; e < nE; e++) {
      const E = mesh.edges[e], base = e * ePer;
      for (let i = 0; i <= S; i++) {
        for (let side = -1; side <= 1; side += 2) {
          ev[o++] = mesh.vu[E.a]; ev[o++] = mesh.vv[E.a]; ev[o++] = mesh.vz[E.a];
          ev[o++] = mesh.vu[E.b]; ev[o++] = mesh.vv[E.b]; ev[o++] = mesh.vz[E.b];
          ev[o++] = mesh.vs[E.a]; ev[o++] = mesh.vs[E.b];
          ev[o++] = i / S; ev[o++] = side;
          ev[o++] = E.g; ev[o++] = E.wk; ev[o++] = mesh.vl[E.a]; ev[o++] = mesh.vl[E.b];
        }
      }
      for (let i = 0; i < S; i++) {
        const a = base + 2 * i, b = a + 1, c = a + 2, d = a + 3;
        ei[io++] = a; ei[io++] = b; ei[io++] = c; ei[io++] = b; ei[io++] = d; ei[io++] = c;
      }
    }

    const pts = [];
    for (let i = 0; i < mesh.nv; i++) {
      const l = mesh.vl[i];
      if (l <= 0) continue;
      pts.push(mesh.vu[i], mesh.vv[i], mesh.vz[i], mesh.vs[i], l, clamp(l * l * 1.1 - 0.15, 0, 1));
    }
    return {
      faceVerts: fv, faceIdx: fi, edgeVerts: ev, edgeIdx: ei, pointVerts: new Float32Array(pts),
      segments: S, subdiv: L
    };
  }

  /* ======================================================================
   * 3. Shaders (GLSL ES 1.00)
   * ==================================================================== */
  const VS_COMMON = `
precision highp float;
uniform mat4 uProj;
uniform mat4 uMV;
uniform vec2 uHalf;
uniform float uD;
uniform vec4 uK[5];
uniform vec4 uA[5];
uniform float uTh[5];
uniform float uAmp;

// viewport-space (u, v, z) -> rest position in model space
vec3 restPos(vec3 q) {
  float s = (uD - q.z) / uD;
  return vec3(q.x * uHalf.x * s, q.y * uHalf.y * s, q.z);
}
// smooth low-frequency displacement: a few slow travelling waves
vec3 warp(vec3 p, float seed) {
  vec3 d = vec3(0.0);
  for (int i = 0; i < 5; i++) {
    d += uA[i].xyz * sin(dot(uK[i].xyz, p) + uTh[i] + seed * uK[i].w);
  }
  return p + d * uAmp;
}
vec3 viewRot(vec3 v) { return uMV[0].xyz * v.x + uMV[1].xyz * v.y + uMV[2].xyz * v.z; }
float depthFade(float d) { return mix(1.15, 0.55, smoothstep(6.0, 12.5, d)); }
`;

  const FS_COMMON = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uFRes;
uniform float uFAspect;
uniform vec4 uFLight;
uniform vec2 uFFocus;
uniform vec3 uFSig;
uniform float uFFade;

vec2 ndcOf(vec2 frag) { return frag / uFRes * 2.0 - 1.0; }
// Two slow, soft light pools drifting across the network: parts of it catch a
// little more light while others recede almost completely into the dark.
float spots(vec2 q) {
  vec2 sc = vec2(uFAspect, 1.0);
  vec2 a = (q - uFLight.xy) * sc;
  vec2 b = (q - uFLight.zw) * sc;
  return exp(-dot(a, a) / 0.50) + 0.70 * exp(-dot(b, b) / 0.26);
}
// Composition falloff, the same focus the mesh density uses: strongest upper-centre,
// fading towards the sides and (faster) towards the bottom.
float comp(vec2 q) {
  float dx = (q.x - uFFocus.x) / uFSig.x;
  float dy = (q.y - uFFocus.y) / (q.y > uFFocus.y ? uFSig.y : uFSig.z);
  return exp(-(dx * dx + dy * dy));
}
// interleaved gradient noise: static dither that hides banding in dark gradients
float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }
`;

  const FACE_VS = VS_COMMON + `
attribute vec3 aP0;
attribute vec3 aP1;
attribute vec3 aP2;
attribute vec3 aSeeds;
attribute vec3 aVL;
attribute vec4 aBF;       // b0, b1, gain, sheen
attribute vec3 aW;        // per-vertex composition weight (fill fades away from the focus)
varying float vS;
varying float vW;
varying vec3 vBary;
varying vec3 vN;
varying vec3 vV;
varying vec4 vF;
void main() {
  vec3 W0 = restPos(aP0);
  vec3 W1 = restPos(aP1);
  vec3 W2 = restPos(aP2);
  float b0 = aBF.x;
  float b1 = aBF.y;
  float b2 = 1.0 - b0 - b1;
  vec3 r = W0 * b0 + W1 * b1 + W2 * b2;
  float seed = dot(aSeeds, vec3(b0, b1, b2));
  vec3 P = warp(r, seed);
  vec3 Pu = warp(r + (W1 - W0) * 0.03, seed);
  vec3 Pv = warp(r + (W2 - W0) * 0.03, seed);
  vec4 mv = uMV * vec4(P, 1.0);
  vN = viewRot(cross(Pu - P, Pv - P));
  vV = -mv.xyz;
  vBary = vec3(b0, b1, b2);
  vS = clamp(seed / 2.2, 0.0, 1.0);
  vW = dot(aW, vec3(b0, b1, b2));
  vF = vec4(aBF.z, aBF.w, dot(aVL, vec3(b0, b1, b2)), depthFade(-mv.z));
  gl_Position = uProj * mv;
}
`;

  const FACE_FS = FS_COMMON + `
uniform vec3 uFKey;
varying float vS;
varying float vW;
varying vec3 vBary;
varying vec3 vN;
varying vec3 vV;
varying vec4 vF;
void main() {
  vec3 n = vN * inversesqrt(max(dot(vN, vN), 1e-12));
  vec3 v = vV * inversesqrt(max(dot(vV, vV), 1e-12));
  float ndv = abs(dot(n, v));
  float diff = abs(dot(n, uFKey));
  vec3 h = normalize(uFKey + v);
  float sheen = pow(abs(dot(n, h)), 30.0);
  float rim = pow(max(1.0 - ndv, 0.0), 3.0);
  float m = min(min(vBary.x, vBary.y), vBary.z);
  float edgeK = 1.0 - smoothstep(0.0, 0.22, m);
  float g = vF.x;
  float lum = g * (0.108 + 0.240 * diff * diff);          // body: soft diffuse from the key light
  lum += g * (0.50 * sheen * vF.y + 0.28 * rim);           // metallic sheen, and brighter when seen edge-on
  lum *= (0.74 + 0.52 * vS) * (1.0 + 0.22 * edgeK);        // gentle gradient across the facet
  lum += g * vF.z * 0.06;                                  // a little light spills from lit vertices
  vec2 q = ndcOf(gl_FragCoord.xy);
  lum *= (0.62 + 0.45 * spots(q)) * vW * vF.w;                                          // fill vanishes far from the focus, along each facet
  lum = 0.36 * (1.0 - exp(-lum / 0.36)) * uFFade;                                       // soft knee: facets never go white
  vec3 col = vec3(0.815) * lum * 0.94;
  col += (ign(gl_FragCoord.xy) - 0.5) / 255.0 * smoothstep(0.0, 0.004, lum);
  gl_FragColor = vec4(col, clamp(lum * 1.5, 0.0, 0.65));
}
`;

  const EDGE_VS = VS_COMMON + `
attribute vec3 aA;
attribute vec3 aB;
attribute vec2 aS;
attribute vec2 aT;        // t along the edge, side (-1 / +1)
attribute vec4 aE;        // gain, width factor, light at A, light at B
uniform vec2 uRes;
uniform float uLineW;
uniform float uSegDt;
uniform vec3 uKey;
varying vec4 vInfo;       // signed distance from centre (px), half width (px), brightness
vec3 edgePoint(vec3 WA, vec3 WB, float t) {
  return warp(mix(WA, WB, t), mix(aS.x, aS.y, t));
}
vec2 toPx(vec4 c) { return c.xy / c.w * 0.5 * uRes; }
void main() {
  vec3 WA = restPos(aA);
  vec3 WB = restPos(aB);
  float t = aT.x;
  vec3 p = edgePoint(WA, WB, t);
  vec3 pa = edgePoint(WA, WB, max(t - uSegDt, 0.0));
  vec3 pb = edgePoint(WA, WB, min(t + uSegDt, 1.0));
  vec4 mv = uMV * vec4(p, 1.0);
  vec4 c = uProj * mv;
  vec2 dir = toPx(uProj * (uMV * vec4(pb, 1.0))) - toPx(uProj * (uMV * vec4(pa, 1.0)));
  float dl = length(dir);
  dir = dl > 1e-4 ? dir / dl : vec2(1.0, 0.0);
  vec2 nrm = vec2(-dir.y, dir.x);
  float hw = 0.5 * uLineW * aE.y;
  float ext = hw + 1.0;
  gl_Position = vec4(c.xy + nrm * aT.y * ext / (0.5 * uRes) * c.w, c.z, c.w);

  // anisotropic highlight on the 3D tangent: edges catch light depending on their orientation
  vec3 tg = viewRot(pb - pa);
  tg = tg * inversesqrt(max(dot(tg, tg), 1e-12));
  float tl = dot(tg, uKey);
  float sinTL = sqrt(max(0.0, 1.0 - tl * tl));
  vec3 V = normalize(-mv.xyz);
  float th = dot(tg, normalize(uKey + V));
  float sinTH = sqrt(max(0.0, 1.0 - th * th));
  float spec = pow(sinTH, 24.0);
  float hub = aE.z * exp(-t * 5.0) + aE.w * exp(-(1.0 - t) * 5.0);
  float bright = aE.x * (0.55 + 0.45 * sinTL) + 0.55 * spec * (0.25 + aE.x) + 0.30 * hub;
  bright *= 1.85 * depthFade(-mv.z);
  bright *= 0.78 + 0.22 * sqrt(max(sin(3.14159265 * t), 0.0));
  vInfo = vec4(aT.y * ext, hw, bright, 0.0);
}
`;

  const EDGE_FS = FS_COMMON + `
varying vec4 vInfo;
void main() {
  float cov = clamp(vInfo.y + 0.5 - abs(vInfo.x), 0.0, 1.0);
  cov = cov * cov * (3.0 - 2.0 * cov);
  vec2 q = ndcOf(gl_FragCoord.xy);
  float I = cov * vInfo.z * (0.45 + 0.70 * spots(q)) * (0.30 + 0.70 * comp(q)) * uFFade;
  gl_FragColor = vec4(vec3(0.815) * I * 0.94, 1.0);
}
`;

  const POINT_VS = VS_COMMON + `
attribute vec3 aP;
attribute float aSeed;
attribute vec2 aL;        // intensity, size class
uniform float uPt;
varying vec3 vP;
void main() {
  vec3 p = warp(restPos(aP), aSeed);
  vec4 mv = uMV * vec4(p, 1.0);
  gl_Position = uProj * mv;
  float persp = uD / max(-mv.z, 1.0);
  float size = uPt * (0.8 + 1.5 * aL.y) * (0.85 + 0.3 * persp);
  gl_PointSize = size;
  vP = vec3(aL.x * depthFade(-mv.z), size, aSeed);
}
`;

  const POINT_FS = FS_COMMON + `
uniform float uFTw;
varying vec3 vP;
void main() {
  vec2 c = gl_PointCoord * 2.0 - 1.0;
  float rn = length(c);
  float r = rn * 0.5 * vP.y;
  float coreR = 0.5 * vP.y * 0.34;
  float core = 1.0 - smoothstep(coreR - 0.7, coreR + 0.7, r);
  float halo = exp(-(r * r) / (coreR * coreR * 7.0)) * 0.20 * (1.0 - smoothstep(0.65, 1.0, rn));
  float tw = 1.0 + 0.10 * sin(uFTw + vP.z * 9.0);
  vec2 q = ndcOf(gl_FragCoord.xy);
  float I = (core + halo) * vP.x * tw * (0.78 + 0.22 * min(spots(q), 1.0)) * (0.72 + 0.28 * comp(q)) * uFFade;
  gl_FragColor = vec4(vec3(0.90) * I * 0.94, 1.0);
}
`;

  /* ======================================================================
   * 4. Boot: find / create the canvas, read options
   * ==================================================================== */
  const nav = window.navigator || {};
  let canvas = document.getElementById('mesh-bg');
  let createdCanvas = false;
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'mesh-bg';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:fixed;left:0;top:0;width:100%;height:100%;z-index:-1;pointer-events:none;display:block;';
    (document.body || document.documentElement).insertBefore(canvas, (document.body || document.documentElement).firstChild);
    createdCanvas = true;
  } else {
    // The canvas must never intercept the pointer, whatever the stylesheet says.
    canvas.style.pointerEvents = 'none';
    // If the stylesheet is missing, apply the layer rules inline: a canvas left at its default size would
    // otherwise feed its own drawing-buffer size back into the layout.
    let pos = 'fixed';
    try { pos = window.getComputedStyle(canvas).position; } catch (e) { /* keep the default */ }
    if (pos === 'static') canvas.style.cssText += ';position:fixed;left:0;top:0;width:100%;height:100%;z-index:-1;display:block;';
  }

  const ds = canvas.dataset || {};
  const num = (v, d) => { const n = parseFloat(v); return isFinite(n) ? n : d; };
  const coarse = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
  const weak = coarse && ((nav.deviceMemory && nav.deviceMemory <= 4) || (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4));
  const qualityOpt = ds.quality || 'auto';
  const lite = qualityOpt === 'low' || (qualityOpt === 'auto' && weak);
  const opts = {
    seed: num(ds.seed, DEFAULT_SEED) | 0,
    maxDpr: num(ds.maxDpr, lite ? 1.5 : 2),
    adaptive: ds.adaptive !== 'off',
    fade: ds.fade !== 'off',
    start: num(ds.start, 0),
    density: 1,                    // the composition never depends on the quality tier; lite only trims GPU work
    subdiv: lite ? 3 : 4,
    segments: lite ? 8 : 12
  };

  /* ======================================================================
   * 5. State
   * ==================================================================== */
  let gl = null;
  let res = null;                  // GPU resources (programs + buffers)
  let mesh = null, geo = null;
  let destroyed = false, contextLost = false, userPaused = false, running = false;
  let reduced = false;
  let rafId = 0, lastFrame = 0, adaptClock = 0, slowStrikes = 0;
  const quality = { scale: 1 };
  const view = { cssW: 1, cssH: 1, w: 1, h: 1, aspect: 1, dpr: 1 };
  const perf = { frames: 0, ema: 16.7 };

  const proj = new Float32Array(16), mv = new Float32Array(16);
  const KUNI = new Float32Array(20), AUNI = new Float32Array(20), TH = new Float32Array(5);
  WAVES.forEach((w, i) => {
    KUNI.set(w.k, i * 4);
    AUNI.set([w.a[0], w.a[1], w.a[2], 0], i * 4);
  });
  const KEY = (() => { const x = -0.42, y = 0.58, z = 0.70, l = Math.hypot(x, y, z); return [x / l, y / l, z / l]; })();

  const sim = {
    theta: new Float64Array(5), swayT: 0, lightT: 0, tw: 0,
    energy: 0, dir: 0, parY: 0, lean: 0, leanV: 0,
    speed: 1, amp: 1, fade: opts.fade ? 0 : 1, light: [0, 0, 0, 0]
  };
  {
    const r = mulberry32(opts.seed * 7919 + 13);
    for (let i = 0; i < 5; i++) sim.theta[i] = (r() * TAU + WAVES[i].w * opts.start) % TAU;
    sim.swayT = opts.start; sim.lightT = opts.start; sim.tw = (opts.start * 0.7) % TAU;
  }

  /* ---- scroll input: one passive listener, any scroller, no layout reads ---- */
  const scroll = {
    acc: 0,
    last: new WeakMap(),
    onScroll(e) {
      const t = e.target;
      const isDoc = t === document || t === document.documentElement || t === document.body || t === window;
      const y = isDoc ? (window.pageYOffset || document.documentElement.scrollTop || 0) : t.scrollTop;
      const key = isDoc ? document : t;
      const prev = scroll.last.get(key);
      scroll.last.set(key, y);
      if (prev !== undefined && !reduced) scroll.acc += y - prev;
    },
    take() { const v = scroll.acc; scroll.acc = 0; return v; }
  };

  /* ======================================================================
   * 6. GPU resources
   * ==================================================================== */
  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(s);
      gl.deleteShader(s);
      throw new Error('shader compile failed: ' + log);
    }
    return s;
  }

  function makeProgram(vsSrc, fsSrc) {
    const vs = compile(gl.VERTEX_SHADER, vsSrc), fs = compile(gl.FRAGMENT_SHADER, fsSrc);
    const program = gl.createProgram();
    gl.attachShader(program, vs); gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs); gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error('program link failed: ' + log);
    }
    const uniforms = {}, attribs = {};
    for (let i = 0, n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); i < n; i++) {
      const info = gl.getActiveUniform(program, i);
      uniforms[info.name.replace(/\[0\]$/, '')] = gl.getUniformLocation(program, info.name);
    }
    for (let i = 0, n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES); i < n; i++) {
      const info = gl.getActiveAttrib(program, i);
      attribs[info.name] = gl.getAttribLocation(program, info.name);
    }
    return { program, uniforms, attribs };
  }

  function makeBuffer(target, data) {
    const b = gl.createBuffer();
    gl.bindBuffer(target, b);
    gl.bufferData(target, data, gl.STATIC_DRAW);
    return b;
  }

  // [attribute, size, float offset] for each interleaved layout
  const FACE_LAYOUT = [['aP0', 3, 0], ['aP1', 3, 3], ['aP2', 3, 6], ['aSeeds', 3, 9], ['aVL', 3, 12], ['aBF', 4, 15], ['aW', 3, 19]];
  const EDGE_LAYOUT = [['aA', 3, 0], ['aB', 3, 3], ['aS', 2, 6], ['aT', 2, 8], ['aE', 4, 10]];
  const POINT_LAYOUT = [['aP', 3, 0], ['aSeed', 1, 3], ['aL', 2, 4]];

  function createResources() {
    res = {
      faces: makeProgram(FACE_VS, FACE_FS),
      edges: makeProgram(EDGE_VS, EDGE_FS),
      points: makeProgram(POINT_VS, POINT_FS)
    };
    res.maxPoint = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)[1] || 64;   // read once, not per frame
    uploadGeometry();
  }

  function uploadGeometry() {
    if (res.buf) { for (const k in res.buf) gl.deleteBuffer(res.buf[k]); }
    res.buf = {
      fv: makeBuffer(gl.ARRAY_BUFFER, geo.faceVerts), fi: makeBuffer(gl.ELEMENT_ARRAY_BUFFER, geo.faceIdx),
      ev: makeBuffer(gl.ARRAY_BUFFER, geo.edgeVerts), ei: makeBuffer(gl.ELEMENT_ARRAY_BUFFER, geo.edgeIdx),
      pv: makeBuffer(gl.ARRAY_BUFFER, geo.pointVerts.length ? geo.pointVerts : new Float32Array(POINT_FLOATS))
    };
    res.pointCount = geo.pointVerts.length / POINT_FLOATS;
  }

  function disposeResources() {
    if (!gl || !res) { res = null; return; }
    if (res.buf) { for (const k in res.buf) gl.deleteBuffer(res.buf[k]); }
    ['faces', 'edges', 'points'].forEach((k) => { if (res[k]) gl.deleteProgram(res[k].program); });
    res = null;
  }

  // The network is generated for one of three canonical screen shapes (phone portrait, square-ish,
  // landscape) and then stretched to the real viewport, which is cheap because vertices live in
  // viewport space. Every phone, a resized window, or a mobile toolbar sliding in keeps the same
  // composition; only a real change of shape (rotation) builds a new network.
  // `shift` is added to the seed per shape, so each shape uses the layout that composes best for it.
  const SHAPES = [
    { aspect: 0.561, shift: 0 },
    { aspect: 1.0, shift: -16 },
    { aspect: 1.6, shift: 10 }
  ];
  function shapeFor(aspect) {
    let best = SHAPES[0], bd = Infinity;
    for (let i = 0; i < SHAPES.length; i++) {
      const d = Math.abs(Math.log(aspect / SHAPES[i].aspect));
      if (d < bd) { bd = d; best = SHAPES[i]; }
    }
    return best;
  }

  function buildMesh() {
    const shape = shapeFor(view.aspect);
    mesh = generateMesh({ seed: opts.seed + shape.shift, aspect: shape.aspect, density: opts.density });
    let sub = opts.subdiv;
    while (mesh.faces.length * ((sub + 1) * (sub + 2) / 2) > 65000 && sub > 1) sub--;
    let seg = opts.segments;
    while (mesh.edges.length * 2 * (seg + 1) > 65000 && seg > 2) seg--;
    geo = buildGeometry(mesh, sub, seg);
  }

  function setUniforms(p, v) {
    const u = p.uniforms;
    if (u.uProj) gl.uniformMatrix4fv(u.uProj, false, proj);
    if (u.uMV) gl.uniformMatrix4fv(u.uMV, false, mv);
    if (u.uHalf) gl.uniform2f(u.uHalf, HALF_H * view.aspect, HALF_H);
    if (u.uD) gl.uniform1f(u.uD, CAMERA_DISTANCE);
    if (u.uK) gl.uniform4fv(u.uK, KUNI);
    if (u.uA) gl.uniform4fv(u.uA, AUNI);
    if (u.uTh) gl.uniform1fv(u.uTh, TH);
    if (u.uAmp) gl.uniform1f(u.uAmp, sim.amp);
    if (u.uRes) gl.uniform2f(u.uRes, view.w, view.h);
    if (u.uKey) gl.uniform3f(u.uKey, KEY[0], KEY[1], KEY[2]);
    if (u.uLineW) gl.uniform1f(u.uLineW, v.lineW);
    if (u.uSegDt) gl.uniform1f(u.uSegDt, 0.5 / geo.segments);
    if (u.uPt) gl.uniform1f(u.uPt, v.pt);
    if (u.uFRes) gl.uniform2f(u.uFRes, view.w, view.h);
    if (u.uFAspect) gl.uniform1f(u.uFAspect, view.aspect);
    if (u.uFLight) gl.uniform4fv(u.uFLight, sim.light);
    if (u.uFFocus) gl.uniform2f(u.uFFocus, mesh.focus.u, mesh.focus.v);
    if (u.uFSig) gl.uniform3f(u.uFSig, mesh.sigma.u, mesh.sigma.up, mesh.sigma.down);
    if (u.uFFade) gl.uniform1f(u.uFFade, v.fade);
    if (u.uFKey) gl.uniform3f(u.uFKey, KEY[0], KEY[1], KEY[2]);
    if (u.uFTw) gl.uniform1f(u.uFTw, sim.tw);
  }

  function bindLayout(p, buffer, layout, floats) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const enabled = [];
    for (let i = 0; i < layout.length; i++) {
      const loc = p.attribs[layout[i][0]];
      if (loc === undefined || loc < 0) continue;
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, layout[i][1], gl.FLOAT, false, floats * 4, layout[i][2] * 4);
      enabled.push(loc);
    }
    return enabled;
  }

  function render() {
    if (!gl || !res || contextLost || destroyed) return;
    const fadeE = sim.fade * sim.fade * (3 - 2 * sim.fade);
    const dprEff = view.w / view.cssW;
    const v = {
      fade: fadeE,
      lineW: clamp(1.05 + 0.28 * (dprEff - 1), 1.0, 1.7),       // device px, full width
      // dots stay proportionate to the screen: a little smaller on phones than on a laptop
      pt: Math.min(6.4 * Math.max(dprEff, 1) * clamp(Math.sqrt(view.cssW * view.cssH) / 1000, 0.72, 1), res.maxPoint)
    };
    gl.viewport(0, 0, view.w, view.h);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.clearColor(CLEAR[0], CLEAR[1], CLEAR[2], 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);

    // 1. translucent facets (premultiplied "over")
    let p = res.faces, en;
    gl.useProgram(p.program); setUniforms(p, v);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    en = bindLayout(p, res.buf.fv, FACE_LAYOUT, FACE_FLOATS);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, res.buf.fi);
    gl.drawElements(gl.TRIANGLES, geo.faceIdx.length, gl.UNSIGNED_SHORT, 0);
    en.forEach((l) => gl.disableVertexAttribArray(l));

    // 2. thin edges (additive)
    p = res.edges;
    gl.useProgram(p.program); setUniforms(p, v);
    gl.blendFunc(gl.ONE, gl.ONE);
    en = bindLayout(p, res.buf.ev, EDGE_LAYOUT, EDGE_FLOATS);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, res.buf.ei);
    gl.drawElements(gl.TRIANGLES, geo.edgeIdx.length, gl.UNSIGNED_SHORT, 0);
    en.forEach((l) => gl.disableVertexAttribArray(l));

    // 3. vertex lights (additive)
    if (res.pointCount > 0) {
      p = res.points;
      gl.useProgram(p.program); setUniforms(p, v);
      en = bindLayout(p, res.buf.pv, POINT_LAYOUT, POINT_FLOATS);
      gl.drawArrays(gl.POINTS, 0, res.pointCount);
      en.forEach((l) => gl.disableVertexAttribArray(l));
    }
  }

  /* ======================================================================
   * 7. Simulation (CPU side: a handful of scalars per frame)
   * ==================================================================== */
  function simulate(dt, rawDt) {
    const s = sim, S = SCROLL;
    const delta = scroll.take();
    // Velocity uses the real time since the last frame (dt itself is clamped for stability), so a
    // slow frame can never inflate the scroll speed.
    const vel = clamp(delta / Math.max(rawDt || dt, 1 / 240), -S.vMax, S.vMax);   // px/s, signed (+ = scrolling down)
    const target = Math.tanh(vel / S.vRef);                       // soft-limited -1..1
    const aT = Math.abs(target);

    // Energy envelope: quick to rise, slow to fall -> smooth return to idle.
    s.energy += (aT - s.energy) * (1 - Math.exp(-dt / (aT > s.energy ? S.attack : S.release)));
    // Signed direction, shorter tail.
    s.dir += (target - s.dir) * (1 - Math.exp(-dt / (Math.abs(target) > Math.abs(s.dir) ? S.dirAttack : S.dirRelease)));

    const e = s.energy;
    s.speed = 1 + S.speedBoost * e;
    s.amp = 1 + S.ampBoost * e;

    // Wave phases are *integrated*, so speed changes never make the mesh jump.
    const dY = s.dir * S.flowRate * dt;                           // pattern drifts with the scroll
    for (let i = 0; i < 5; i++) {
      const w = WAVES[i];
      s.theta[i] = (s.theta[i] + w.w * dt * s.speed - w.k[1] * dY) % TAU;
      if (s.theta[i] < 0) s.theta[i] += TAU;
      TH[i] = s.theta[i];
    }

    // Leaky-integrator parallax and a critically damped lean.
    const vc = S.vRef * target;
    s.parY += (vc * S.parGain - S.parDecay * s.parY) * dt;
    const w0 = S.leanOmega, leanTarget = -s.dir * S.lean;
    s.leanV += (-w0 * w0 * (s.lean - leanTarget) - 2 * w0 * s.leanV) * dt;
    s.lean += s.leanV * dt;

    // Idle sway of the whole membrane (slow; speeds up a little with scrolling).
    s.swayT += dt * (1 + 1.2 * e);
    const t = s.swayT;
    const yaw = 0.050 * Math.sin(0.047 * t + 0.9) + 0.022 * Math.sin(0.081 * t + 2.4);
    const pitch = 0.028 * Math.sin(0.058 * t + 0.3) + s.lean;
    const ox = 0.14 * Math.sin(0.043 * t + 1.7);
    const oy = 0.10 * Math.sin(0.037 * t + 3.1) + s.parY;
    modelView(mv, pitch, yaw, ox, oy);

    // Light pools drift across the network.
    s.lightT += dt * (0.8 + 0.5 * s.speed);
    const lt = s.lightT;
    s.light[0] = 0.12 + 0.50 * Math.sin(0.071 * lt + 1.1);
    s.light[1] = 0.22 + 0.34 * Math.sin(0.053 * lt + 0.3);
    s.light[2] = -0.25 + 0.75 * Math.sin(0.043 * lt + 2.2);
    s.light[3] = -0.10 + 0.55 * Math.sin(0.061 * lt + 4.0);
    s.tw = (s.tw + dt * 0.7) % TAU;

    if (s.fade < 1) s.fade = Math.min(1, s.fade + dt / FADE_SECONDS);
  }

  /* ======================================================================
   * 8. Sizing
   * ==================================================================== */
  function measure() {
    const cssW = canvas.clientWidth || window.innerWidth || 1;
    const cssH = canvas.clientHeight || window.innerHeight || 1;
    let dpr = Math.min(window.devicePixelRatio || 1, opts.maxDpr) * quality.scale;
    dpr = Math.min(dpr, Math.sqrt(MAX_PIXELS / (cssW * cssH)));      // sanity cap on the drawing buffer
    return { cssW, cssH, dpr, w: Math.max(2, Math.round(cssW * dpr)), h: Math.max(2, Math.round(cssH * dpr)) };
  }

  function resize(force) {
    if (!gl || destroyed) return;
    const m = measure();
    if (!force && m.w === view.w && m.h === view.h && canvas.width === m.w) return;
    canvas.width = m.w; canvas.height = m.h;
    view.cssW = m.cssW; view.cssH = m.cssH; view.w = m.w; view.h = m.h; view.dpr = m.dpr;
    view.aspect = m.cssW / m.cssH;
    perspective(proj, FOV, view.aspect, 0.5, 80);
    perf.ema = 16.7;
    // A different screen shape (phone rotated, window reshaped a lot) gets a matching network.
    if (mesh && shapeFor(view.aspect).aspect !== mesh.aspect) {
      buildMesh();
      if (res && !contextLost) uploadGeometry();
      sim.fade = Math.min(sim.fade, opts.fade ? 0.2 : 1);
    }
    render();                                   // draw straight away: resizing clears the canvas, so never wait a frame
  }

  let resizeQueued = false;
  function queueResize() {
    if (resizeQueued || destroyed) return;
    resizeQueued = true;
    requestAnimationFrame(() => { resizeQueued = false; resize(false); });
  }

  /* ======================================================================
   * 9. Frame loop, visibility, reduced motion, context loss
   * ==================================================================== */
  function frame(now) {
    rafId = running ? requestAnimationFrame(frame) : 0;
    const elapsed = now - lastFrame;
    if (elapsed < MIN_FRAME_MS) return;
    lastFrame = now;
    simulate(Math.min(elapsed / 1000, 0.1), elapsed / 1000);
    render();

    perf.frames++;
    perf.ema += (elapsed - perf.ema) * 0.08;
    if (opts.adaptive) {                                          // lighter resolution on slow devices
      adaptClock += elapsed;
      if (adaptClock > 2500) {
        adaptClock = 0;
        slowStrikes = perf.ema > 26 ? slowStrikes + 1 : 0;
        if (slowStrikes >= 2 && quality.scale > 0.56) {            // slow for ~5 s in a row, not a one-off hiccup
          slowStrikes = 0;
          quality.scale = Math.max(0.56, quality.scale * 0.82);
          resize(true);
        }
      }
    }
  }

  function syncRunning() {
    const should = !destroyed && !contextLost && !userPaused && !reduced && !document.hidden;
    if (should && !running) {
      running = true;
      lastFrame = performance.now();
      scroll.take();
      rafId = requestAnimationFrame(frame);
    } else if (!should && running) {
      running = false;
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    }
  }

  const onVisibility = () => { perf.ema = 16.7; adaptClock = 0; slowStrikes = 0; syncRunning(); };
  const onResize = () => queueResize();
  const onLost = (e) => { e.preventDefault(); contextLost = true; syncRunning(); };
  const onRestored = () => {
    try {
      contextLost = false;
      res = null;
      createResources();
      resize(true);
      if (!running) render();
    } catch (err) { fail(err); return; }
    syncRunning();
  };

  const mql = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  const onMotion = () => {
    reduced = !!(mql && mql.matches);
    if (reduced) { sim.fade = 1; scroll.take(); }
    syncRunning();
    if (reduced && !running) render();
  };

  let ro = null;
  function fail(err) {
    if (window.console && console.warn) console.warn('[mesh-bg] WebGL unavailable - using the static fallback.', err);
    teardown();
    document.documentElement.classList.add('mesh-bg-fallback');
    if (createdCanvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
  }

  /* ======================================================================
   * 10. Public API + teardown
   * ==================================================================== */
  function teardown() {
    destroyed = true;
    syncRunning();
    document.removeEventListener('scroll', scroll.onScroll, true);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibility);
    canvas.removeEventListener('webglcontextlost', onLost);
    canvas.removeEventListener('webglcontextrestored', onRestored);
    if (ro) { ro.disconnect(); ro = null; }
    if (mql) { if (mql.removeEventListener) mql.removeEventListener('change', onMotion); else if (mql.removeListener) mql.removeListener(onMotion); }
    if (gl) {
      try { disposeResources(); } catch (e) { /* context may already be gone */ }
      const lose = gl.getExtension && gl.getExtension('WEBGL_lose_context');
      if (lose) { try { lose.loseContext(); } catch (e) { /* ignore */ } }
    }
    gl = null;
  }

  function destroy() {
    teardown();
    if (createdCanvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    if (window.meshBackground === api) { try { delete window.meshBackground; } catch (e) { window.meshBackground = undefined; } }
  }

  function advance(seconds) {            // deterministic stepping for tests / stills
    if (!gl || destroyed) return;
    let left = Math.max(0, seconds || 0);
    while (left > 0) { const d = Math.min(1 / 30, left); simulate(d); left -= d; }
    render();
  }

  const api = {
    destroy: destroy,
    pause() { userPaused = true; syncRunning(); },
    resume() { userPaused = false; syncRunning(); },
    advance: advance,
    // For scrollers that move content with transforms and never fire native scroll events:
    // feed them the pixel delta of each tick. Native scrolling (and Lenis) needs no wiring.
    addScroll(px) { if (!destroyed && !reduced && isFinite(px)) scroll.acc += px; },
    stats() {
      return {
        running: running, destroyed: destroyed, contextLost: contextLost, reducedMotion: reduced,
        frames: perf.frames, frameMs: Math.round(perf.ema * 10) / 10,
        energy: sim.energy, direction: sim.dir, speed: sim.speed, amplitude: sim.amp, parallax: sim.parY, lean: sim.lean,
        resolutionScale: quality.scale, width: view.w, height: view.h, aspect: view.aspect,
        mesh: mesh ? mesh.counts : null,
        gpu: geo ? { faceTriangles: geo.faceIdx.length / 3, edgeTriangles: geo.edgeIdx.length / 3, points: res ? res.pointCount : 0 } : null
      };
    }
  };

  /* ======================================================================
   * 11. Go
   * ==================================================================== */
  try {
    gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power', preserveDrawingBuffer: false }) ||
         canvas.getContext('experimental-webgl', { alpha: false, antialias: false, depth: false, stencil: false });
    if (!gl) throw new Error('WebGL is not available');
    const m = measure();
    view.cssW = m.cssW; view.cssH = m.cssH; view.aspect = m.cssW / m.cssH;
    view.w = m.w; view.h = m.h; canvas.width = m.w; canvas.height = m.h;
    perspective(proj, FOV, view.aspect, 0.5, 80);
    buildMesh();
    createResources();
    reduced = !!(mql && mql.matches);
    if (reduced) sim.fade = 1;
    simulate(1e-4);
  } catch (err) {
    fail(err);
    return;
  }

  window.meshBackground = api;
  scroll.last.set(document, window.pageYOffset || 0);          // baseline, so a restored scroll position is not a "jump"
  document.addEventListener('scroll', scroll.onScroll, { capture: true, passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  canvas.addEventListener('webglcontextlost', onLost, false);
  canvas.addEventListener('webglcontextrestored', onRestored, false);
  if (window.ResizeObserver) { ro = new ResizeObserver(queueResize); ro.observe(canvas); }
  if (mql) { if (mql.addEventListener) mql.addEventListener('change', onMotion); else if (mql.addListener) mql.addListener(onMotion); }

  render();
  syncRunning();
})();