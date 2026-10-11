'use client';

import * as React from 'react';
import { useEffect, useId, useRef } from 'react';

// Official OriginKit predictive-arc --base source (CLI 0.2.25).
// Preserves OriginKit's wave math in a reference-sized coordinate system.
// The grayscale ramp follows the reference's dark / light / dark luminance.

const MAX_DPR = 2;

const VERT_SRC = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG_SRC = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  uRes;
uniform vec2  uWaveSpan;
uniform float uTime, uDpr, uCell, uDot;
uniform float uPeak, uHeight, uThick, uFall;
uniform vec3  uBg, uBase, uAccent, uHigh;
uniform vec2  uMouse;
uniform float uMouseRadius, uMouseStrength;

void main(){
  float cs = max(uCell, 2.0);
  vec2 ci = floor(gl_FragCoord.xy / cs);
  vec2 cc = (ci + 0.5) * cs;

  float x = cc.x / uDpr;
  float y = (uRes.y - cc.y) / uDpr;
  float w = uRes.x / uDpr;
  float h = uRes.y / uDpr;

  float normX = (x - w * 0.5) / (w * 0.75);
  float curveY = h * uPeak + normX * normX * (h * uHeight);
  float mdx = x - uMouse.x;
  float influence = uMouseStrength * exp(-(mdx * mdx) / (2.0 * uMouseRadius * uMouseRadius + 1.0));
  // Retain the original arc response, with a small travel limit in this short box.
  curveY += clamp(uMouse.y - curveY, -h * 0.12, h * 0.12) * influence;
  float dist = abs(y - curveY);
  // Scale the original 140 / 80 pixel envelope with the reference height.
  float th = (140.0 + (1.0 - abs(normX)) * 80.0) * uThick * h / uWaveSpan.y;

  vec3 col = uBg;
  if (dist < th) {
    float i = 1.0 - dist / th;
    vec2 wavePos = vec2(x / w, y / h) * uWaveSpan;
    float waveX = sin(wavePos.x * 0.015 + uTime);
    float waveY = cos(wavePos.y * 0.02 + uTime);
    i *= 0.7 + waveX * waveY * 0.3;
    i *= max(0.0, 1.0 - pow(abs(normX), uFall));

    if (i > 0.02) {
      // Keep a real gutter even at the brightest peaks; never fuse cells.
      float side = min(uDot * i * uDpr, max(1.0, cs - 2.0 * uDpr));
      vec2 d = abs(gl_FragCoord.xy - cc);
      float cov = 1.0 - smoothstep(side * 0.5 - 0.5, side * 0.5 + 0.5, max(d.x, d.y));

      // Preserve the reference's dark-to-light ramp for both its red palette
      // and this grayscale palette, whose named base/accent brightness is reversed.
      vec3 luma = vec3(0.2126, 0.7152, 0.0722);
      float reverseRamp = step(dot(uAccent, luma), dot(uBase, luma));
      vec3 lowInk = mix(uBase, uAccent, reverseRamp);
      vec3 highInk = mix(uAccent, uBase, reverseRamp);
      vec3 ink = mix(lowInk, highInk, clamp(pow(i, 1.1), 0.0, 1.0));
      ink = mix(ink, uHigh, smoothstep(0.72, 1.0, i));
      col = mix(uBg, ink, cov * clamp(i * 1.6, 0.0, 1.0));
    }
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function parseColor(
  input: string | undefined,
  fb: [number, number, number]
): [number, number, number] {
  if (!input) return fb;
  const str = String(input).trim();
  if (str.charAt(0) === '#') {
    let hex = str.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r / 255, g / 255, b / 255];
    }
    return fb;
  }
  const m = str.match(/[\d.]+/g);
  if (m && m.length >= 3) {
    return [
      Math.min(255, parseFloat(m[0])) / 255,
      Math.min(255, parseFloat(m[1])) / 255,
      Math.min(255, parseFloat(m[2])) / 255,
    ];
  }
  return fb;
}

function num(v: unknown, fb: number): number {
  return typeof v === 'number' && isFinite(v) ? v : fb;
}

function clampN(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

interface Props {
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  background?: string;
  baseColor?: string;
  accentColor?: string;
  highlight?: string;
  density?: number;
  dotSize?: number;
  speed?: number;
  arch?: ArchGroup;
  pointer?: PointerGroup;
}

type ArchGroup = { peak?: number; archHeight?: number; thickness?: number; falloff?: number };
const ARCH_DEFAULTS: Required<ArchGroup> = {
  peak: 35,
  archHeight: 70,
  thickness: 100,
  falloff: 250,
};

type PointerGroup = { enabled?: boolean; radius?: number; strength?: number };
const POINTER_DEFAULTS: Required<PointerGroup> = { enabled: true, radius: 220, strength: 60 };

function __OriginkitBase_PredictiveArc(props: Props) {
  const {
    style,
    background = '#030303',
    baseColor = '#FF0000',
    accentColor = '#FF9898',
    highlight = '#FF0000',
    density = 78,
    dotSize = 102,
    speed = 100,
    arch,
    pointer,
    width,
    height,
  } = props;

  const arch_ = { ...ARCH_DEFAULTS, ...(arch || {}) };
  const pointer_ = { ...POINTER_DEFAULTS, ...(pointer || {}) };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);
  const redrawRef = useRef<(() => void) | null>(null);
  const fallbackId = useId();

  const vRef = useRef<Record<string, number | string | boolean>>({});
  vRef.current = {
    bg: background,
    base: baseColor,
    accent: accentColor,
    high: highlight,
    density: Math.round(clampN(num(density, 160), 16, 320)),
    dotSize: clampN(num(dotSize, 100), 20, 400) / 100,
    speed: clampN(num(speed, 50), 0, 100) / 50,
    peak: clampN(num(arch_.peak, 35), 0, 100) / 100,
    archHeight: clampN(num(arch_.archHeight, 70), 0, 300) / 100,
    thickness: clampN(num(arch_.thickness, 100), 20, 400) / 100,
    falloff: clampN(num(arch_.falloff, 250), 50, 600) / 100,
    pointerEnabled: pointer_.enabled !== false,
    pointerRadius: clampN(num(pointer_.radius, 220), 40, 600),
    pointerStrength: clampN(num(pointer_.strength, 60), 0, 100) / 100,
  };

  const pointerStateRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    active: 0,
    targetActive: 0,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || reducedMotionRef.current || pointer_.enabled === false) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ps = pointerStateRef.current;
    // Both pointer and shader positions use CSS pixels measured from the top.
    ps.targetX = e.clientX - rect.left;
    ps.targetY = e.clientY - rect.top;
    ps.targetActive = 1;
  };

  const handlePointerLeave = () => {
    pointerStateRef.current.targetActive = 0;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const initialSize = container.getBoundingClientRect();
    let canvasSize = { w: initialSize.width, h: initialSize.height };

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = motionPreference.matches;
    let inViewport = false;
    let disposed = false;
    let contextLost = false;
    let failed = false;
    let gl: WebGLRenderingContext | null = null;
    let vs: WebGLShader | null = null;
    let fs: WebGLShader | null = null;
    let prog: WebGLProgram | null = null;
    let buf: WebGLBuffer | null = null;
    let locs: Record<string, WebGLUniformLocation | null> = {};
    let raf: number | null = null;
    let last = performance.now();
    let clock = 0;

    const stop = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    };

    const release = () => {
      if (gl && !gl.isContextLost()) {
        if (buf) gl.deleteBuffer(buf);
        if (prog) gl.deleteProgram(prog);
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
      }
      buf = null;
      prog = null;
      vs = null;
      fs = null;
      locs = {};
      canvas.style.visibility = 'hidden';
    };

    const initialize = () => {
      if (prog) return true;
      if (failed || contextLost) return false;
      try {
        gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false });
        if (!gl) {
          failed = true;
          return false;
        }
        vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
        fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
        if (!vs || !fs) throw new Error('Shader unavailable');
        prog = gl.createProgram();
        if (!prog) throw new Error('Program unavailable');
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('Link failed');
        gl.useProgram(prog);
        buf = gl.createBuffer();
        if (!buf) throw new Error('Buffer unavailable');
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const aPos = gl.getAttribLocation(prog, 'a_pos');
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
        return true;
      } catch {
        failed = true;
        release();
        return false;
      }
    };

    const u = (name: string) => {
      if (!(name in locs)) locs[name] = gl!.getUniformLocation(prog!, name);
      return locs[name];
    };

    const render = (now: number) => {
      raf = null;
      if (!gl || !prog || disposed || contextLost || !inViewport || document.hidden) return;
      const reducedMotion = reducedMotionRef.current;
      const dt = reducedMotion ? 0 : Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;
      const v = vRef.current;

      clock = (clock + dt * 0.9 * (v.speed as number)) % 6283;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const { w: cw, h: ch } = canvasSize;
      if (!cw || !ch) return;
      const bw = Math.max(1, Math.round(cw * dpr));
      const bh = Math.max(1, Math.round(ch * dpr));
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      gl.viewport(0, 0, bw, bh);

      // Density controls the display-pixel grid, not the wave composition.
      // Both axes share one cell pitch, keeping dots square at every ratio.
      const pitchCss = Math.min(bw, bh) / dpr / (v.density as number);

      const ps = pointerStateRef.current;
      const posLerp = 1 - Math.exp(-dt * 12);
      const activeLerp = 1 - Math.exp(-dt * 6);
      ps.x += (ps.targetX - ps.x) * posLerp;
      ps.y += (ps.targetY - ps.y) * posLerp;
      ps.active += (ps.targetActive - ps.active) * activeLerp;

      gl.uniform2f(u('uRes'), bw, bh);
      gl.uniform2f(u('uWaveSpan'), clampN(cw * 1.5, 640, 1200), 700);
      gl.uniform1f(u('uTime'), clock);
      gl.uniform1f(u('uDpr'), dpr);
      gl.uniform1f(u('uCell'), Math.max(2, pitchCss * dpr));
      gl.uniform1f(u('uDot'), pitchCss * 1.2 * (v.dotSize as number));
      gl.uniform1f(u('uPeak'), v.peak as number);
      gl.uniform1f(u('uHeight'), v.archHeight as number);
      gl.uniform1f(u('uThick'), v.thickness as number);
      gl.uniform1f(u('uFall'), v.falloff as number);
      gl.uniform2f(u('uMouse'), ps.x, ps.y);
      gl.uniform1f(u('uMouseRadius'), v.pointerRadius as number);
      gl.uniform1f(
        u('uMouseStrength'),
        v.pointerEnabled && !reducedMotion ? (v.pointerStrength as number) * ps.active : 0
      );
      const cg = parseColor(v.bg as string, [0.012, 0.012, 0.012]);
      const cb = parseColor(v.base as string, [0.169, 0.055, 0.369]);
      const ca = parseColor(v.accent as string, [0.627, 0.314, 1.0]);
      const chh = parseColor(v.high as string, [1, 1, 1]);
      gl.uniform3f(u('uBg'), cg[0], cg[1], cg[2]);
      gl.uniform3f(u('uBase'), cb[0], cb[1], cb[2]);
      gl.uniform3f(u('uAccent'), ca[0], ca[1], ca[2]);
      gl.uniform3f(u('uHigh'), chh[0], chh[1], chh[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.style.visibility = 'visible';
      if (!reducedMotion) raf = requestAnimationFrame(render);
    };

    const reconcile = () => {
      stop();
      if (
        disposed ||
        contextLost ||
        !inViewport ||
        document.hidden ||
        !canvasSize.w ||
        !canvasSize.h
      )
        return;
      if (!initialize()) return;
      last = performance.now();
      render(last);
    };
    redrawRef.current = reconcile;

    const handleMotionChange = () => {
      reducedMotionRef.current = motionPreference.matches;
      const ps = pointerStateRef.current;
      ps.active = ps.targetActive = 0;
      reconcile();
    };
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      stop();
      release();
    };
    const handleContextRestored = () => {
      contextLost = false;
      failed = false;
      reconcile();
    };

    // No WebGL allocation or rendering until this footer enters the viewport.
    const intersection = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      if (!inViewport) pointerStateRef.current.targetActive = 0;
      reconcile();
    });
    const resize = new ResizeObserver(([entry]) => {
      canvasSize = { w: entry.contentRect.width, h: entry.contentRect.height };
      reconcile();
    });
    const handleWindowResize = () => {
      const rect = container.getBoundingClientRect();
      canvasSize = { w: rect.width, h: rect.height };
      reconcile();
    };
    intersection.observe(container);
    resize.observe(container);
    document.addEventListener('visibilitychange', reconcile);
    window.addEventListener('resize', handleWindowResize);
    motionPreference.addEventListener('change', handleMotionChange);
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      disposed = true;
      redrawRef.current = null;
      stop();
      intersection.disconnect();
      resize.disconnect();
      document.removeEventListener('visibilitychange', reconcile);
      window.removeEventListener('resize', handleWindowResize);
      motionPreference.removeEventListener('change', handleMotionChange);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      release();
    };
  }, []);

  // Props must also redraw the static frame when reduced motion is enabled.
  useEffect(() => {
    redrawRef.current?.();
  }, [
    background,
    baseColor,
    accentColor,
    highlight,
    density,
    dotSize,
    speed,
    arch_.peak,
    arch_.archHeight,
    arch_.thickness,
    arch_.falloff,
    pointer_.enabled,
    pointer_.radius,
    pointer_.strength,
  ]);

  return (
    <div
      ref={containerRef}
      data-predictive-arc
      aria-hidden="true"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background,
        minWidth: 0,
        minHeight: 0,
        width: typeof width === 'number' && width > 0 ? width : '100%',
        height: typeof height === 'number' && height > 0 ? height : '100%',
        touchAction: 'pan-y pinch-zoom',
        ...style,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
    >
      {/* A small static square-dot band remains if WebGL is unavailable/lost. */}
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <defs>
          <pattern id={`${fallbackId}-dots`} width="7" height="7" patternUnits="userSpaceOnUse">
            <rect x="2.25" y="2.25" width="2.5" height="2.5" fill={baseColor} />
          </pattern>
          <linearGradient id={`${fallbackId}-fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.43" stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" stopOpacity="0.45" />
          </linearGradient>
          <mask id={`${fallbackId}-band`}>
            <rect width="100%" height="100%" fill={`url(#${fallbackId}-fade)`} />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${fallbackId}-dots)`}
          mask={`url(#${fallbackId}-band)`}
        />
      </svg>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          visibility: 'hidden',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

const __originkitPresetProps = {
  overrides: {
    arch: {
      peak: 100,
      falloff: 600,
      thickness: 206,
      archHeight: 0,
    },
    pointer: {
      radius: 236,
      enabled: true,
      strength: 34,
    },
  },
  __curationVersion: 1,
};

export default function PredictiveArc(props: Props) {
  return <__OriginkitBase_PredictiveArc {...__originkitPresetProps.overrides} {...props} />;
}
