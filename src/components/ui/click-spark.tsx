'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/*
 * React Bits — MIT + Commons Clause License Condition v1.0
 * Copyright (c) 2026 David Haz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, and distribute the Software as part of an
 * application, website, or product, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * Commons Clause Restriction:
 * You may use this Software, including for any commercial purpose, so long as
 * you do not sell, sublicense, or redistribute the components themselves-whether
 * alone, in a bundle, or as a ported version.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
  children: ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

// Adapted from React Bits: https://reactbits.dev/animations/click-spark
// Keep its radial strokes/easing, with a viewport overlay and an on-demand loop.
export default function ClickSpark({
  sparkColor = 'var(--foreground)',
  sparkSize = 9,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 450,
  easing = 'ease-out',
  extraScale = 1,
  children,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let sparks: Spark[] = [];
    let animationId: number | null = null;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const clear = () => {
      if (animationId !== null) cancelAnimationFrame(animationId);
      animationId = null;
      sparks = [];
      ctx.clearRect(0, 0, width, height);
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const nextPixelRatio = window.devicePixelRatio || 1;
      if (rect.width === width && rect.height === height && nextPixelRatio === pixelRatio) return;
      clear();
      width = rect.width;
      height = rect.height;
      pixelRatio = nextPixelRatio;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const ease = (t: number) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    };

    const draw = (timestamp: number) => {
      animationId = null;
      ctx.clearRect(0, 0, width, height);
      // Resolve the existing CSS theme token, including a theme change mid-burst.
      ctx.strokeStyle = getComputedStyle(canvas).color;
      ctx.lineWidth = 2;
      sparks = sparks.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const eased = ease(Math.max(0, elapsed) / duration);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });
      if (sparks.length > 0) animationId = requestAnimationFrame(draw);
    };

    const handleClick = (event: MouseEvent) => {
      // Browser click events cover mouse clicks and completed touch taps, not swipes.
      // Ignore keyboard/programmatic activation, which has no pointer location.
      if (motionPreference.matches || event.detail === 0 || event.button !== 0) return;
      resizeCanvas();
      const rect = canvas.getBoundingClientRect();
      const now = performance.now();
      sparks.push(...Array.from({ length: sparkCount }, (_, i) => ({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
      })));
      if (animationId === null) animationId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(canvas);
    // Capture also covers portaled menus/dialogs and handlers that stop bubbling.
    document.addEventListener('click', handleClick, { capture: true, passive: true });
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('scroll', clear, { capture: true, passive: true });
    motionPreference.addEventListener('change', clear);

    return () => {
      clear();
      observer.disconnect();
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('scroll', clear, true);
      motionPreference.removeEventListener('change', clear);
    };
  }, [sparkSize, sparkRadius, sparkCount, duration, easing, extraScale]);

  return (
    <>
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        data-click-spark=""
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 100,
          color: sparkColor,
        }}
      />
    </>
  );
}
