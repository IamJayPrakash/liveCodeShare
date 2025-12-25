'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
  title: string;
  subtitle: string;
}

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  closest?: Point[];
  circle?: Circle;
  active?: number;
}

interface Target {
  x: number;
  y: number;
}

class Circle {
  pos: Point;
  radius: number;
  color: string;
  active?: number;
  ctx: CanvasRenderingContext2D;

  constructor(pos: Point, rad: number, color: string, ctx: CanvasRenderingContext2D) {
    this.pos = pos;
    this.radius = rad;
    this.color = color;
    this.ctx = ctx;
  }

  draw() {
    if (!this.active || !this.ctx) return;
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = `rgba(156,217,249,${this.active})`;
    this.ctx.fill();
  }
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children, title, subtitle }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = containerRef.current?.offsetHeight || window.innerHeight;
    let points: Point[] = [];
    let target: Target = { x: width / 2, y: height / 2 };
    let animateHeader = true;
    let animationFrameId: number;

    function getDistance(p1: Point | Target, p2: Point | Target) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    function initHeader() {
      width = window.innerWidth;
      height = containerRef.current?.offsetHeight || window.innerHeight;
      target = { x: width / 2, y: height / 2 };

      canvas!.width = width;
      canvas!.height = height;

      points = [];
      for (let x = 0; x < width; x += width / 20) {
        for (let y = 0; y < height; y += height / 20) {
          const px = x + (Math.random() * width) / 20;
          const py = y + (Math.random() * height) / 20;
          points.push({ x: px, originX: px, y: py, originY: py });
        }
      }

      for (let i = 0; i < points.length; i++) {
        const closest: Point[] = [];
        const p1 = points[i];
        for (let j = 0; j < points.length; j++) {
          const p2 = points[j];
          if (p1 !== p2) {
            if (closest.length < 5) {
              closest.push(p2);
            } else {
              for (let k = 0; k < 5; k++) {
                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2;
                  break;
                }
              }
            }
          }
        }
        p1.closest = closest;
        p1.circle = new Circle(p1, 2 + Math.random() * 2, 'rgba(255,255,255,0.3)', ctx!);
      }
    }

    function shiftPoint(p: Point) {
      gsap.to(p, {
        duration: 1 + Math.random(),
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: 'circ.inOut',
        onComplete: () => shiftPoint(p),
      });
    }

    function drawLines(p: Point) {
      if (!p.active || !ctx) return;
      p.closest?.forEach((closePoint) => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(closePoint.x, closePoint.y);
        ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
        ctx.stroke();
      });
    }

    function animate() {
      if (animateHeader && ctx) {
        ctx.clearRect(0, 0, width, height);
        points.forEach((point) => {
          const dist = getDistance(target, point);
          if (Math.abs(dist) < 4000) {
            point.active = 0.3;
            if (point.circle) point.circle.active = 0.6;
          } else if (Math.abs(dist) < 20000) {
            point.active = 0.1;
            if (point.circle) point.circle.active = 0.3;
          } else if (Math.abs(dist) < 40000) {
            point.active = 0.02;
            if (point.circle) point.circle.active = 0.1;
          } else {
            point.active = 0;
            if (point.circle) point.circle.active = 0;
          }

          drawLines(point);
          point.circle?.draw();
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    function mouseMove(e: MouseEvent) {
      target.x = e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      target.y = e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    function scrollCheck() {
      animateHeader = document.body.scrollTop <= height;
    }

    function resize() {
      initHeader();
    }

    initHeader();
    animate();
    points.forEach(shiftPoint);

    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', mouseMove);
    }
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('scroll', scrollCheck);
      window.removeEventListener('resize', resize);
      gsap.killTweensOf(points);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[500px] bg-primary overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full px-4">
        <h2 className="text-4xl md:text-5xl text-primary-foreground font-bold mb-4">
          {title} <span className="font-thin">{subtitle}</span>
        </h2>
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
