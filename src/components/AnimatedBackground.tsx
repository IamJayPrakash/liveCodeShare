'use client';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    gsap?: typeof import('gsap');
  }
}
import PropTypes from 'prop-types';
import Script from 'next/script';

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
  title: string;
  subtitle: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children, title, subtitle }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let width: number, height: number;
    let largeHeader: HTMLDivElement | null,
      canvas: HTMLCanvasElement | null,
      ctx: CanvasRenderingContext2D | null;
    interface Point {
      x: number;
      y: number;
      originX: number;
      originY: number;
      closest?: Point[];
      circle?: { draw: () => void; active?: number };
      active?: number;
    }

    interface Target {
      x: number;
      y: number;
    }
    let points: Point[], target: Target;
    let animateHeader = true;

    // Initialize header
    function initHeader() {
      width = window.innerWidth;
      height = window.innerHeight;
      target = { x: width / 2, y: height / 2 };

      largeHeader = headerRef.current;
      if (largeHeader) largeHeader.style.height = `${height}px`;

      canvas = canvasRef.current;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
      }

      // Create points
      points = [];
      for (let x = 0; x < width; x += width / 20) {
        for (let y = 0; y < height; y += height / 20) {
          const px = x + (Math.random() * width) / 20;
          const py = y + (Math.random() * height) / 20;
          const p = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }

      // For each point find the 5 closest points
      points.forEach((p1) => {
        const closest: Point[] = [];
        points.forEach((p2) => {
          if (p1 !== p2) {
            let placed = false;
            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (!closest[k]) {
                  closest[k] = p2;
                  placed = true;
                } else if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }
          }
        });
        p1.closest = closest;
      });

      // Assign a circle to each point
      points.forEach((point) => {
        const c = new Circle(point, 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
        point.circle = c;
      });
    }

    // Event handling
    function addListeners() {
      if (!('ontouchstart' in window)) {
        window.addEventListener('mousemove', mouseMove);
      }
      window.addEventListener('scroll', scrollCheck);
      window.addEventListener('resize', resize);
    }

    function mouseMove(e: MouseEvent) {
      const posx: number =
        e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      const posy: number =
        e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      target.x = posx;
      target.y = posy;
    }

    function scrollCheck() {
      animateHeader = document.body.scrollTop <= height;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (largeHeader) largeHeader.style.height = `${height}px`;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }

    // Animation
    function initAnimation() {
      animate();
      points.forEach(shiftPoint);
    }

    function animate() {
      if (animateHeader && ctx) {
        ctx.clearRect(0, 0, width, height);
        points.forEach((point) => {
          if (Math.abs(getDistance(target, point)) < 4000) {
            point.active = 0.3;
            if (point.circle) {
              point.circle.active = 0.6;
            }
          } else if (Math.abs(getDistance(target, point)) < 20000) {
            point.active = 0.1;
            if (point.circle) {
              point.circle.active = 0.3;
            }
          } else if (Math.abs(getDistance(target, point)) < 40000) {
            point.active = 0.02;
            if (point.circle) {
              point.circle.active = 0.1;
            }
          } else {
            point.active = 0;
            if (point.circle) {
              point.circle.active = 0;
            }
          }

          drawLines(point);
          point.circle?.draw();
        });
      }
      requestAnimationFrame(animate);
    }

    function shiftPoint(p: Point) {
      if (window.gsap) {
        window.gsap.to(p, 1 + Math.random(), {
          x: p.originX - 50 + Math.random() * 100,
          y: p.originY - 50 + Math.random() * 100,
          ease: 'circ.inOut',
          onComplete: () => shiftPoint(p),
        } as GSAPTweenVars);
      }
    }

    // Canvas manipulation
    function drawLines(p: Point) {
      if (!p.active || !ctx) return;
      p.closest?.forEach((closePoint: Point) => {
        ctx?.beginPath();
        ctx?.moveTo(p.x, p.y);
        ctx?.lineTo(closePoint.x, closePoint.y);
        if (ctx) {
          ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
          ctx.stroke();
        }
      });
    }

    class Circle {
      pos: Point;
      radius: number;
      color: string;
      active?: number;

      constructor(pos: Point, rad: number, color: string) {
        this.pos = pos;
        this.radius = rad;
        this.color = color;
      }

      draw() {
        if (!this.active || !ctx) return;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(156,217,249,${this.active})`;
        ctx.fill();
      }
    }

    // Util
    function getDistance(p1: Point | Target, p2: Point | Target) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    // Initialize once the GSAP script is loaded
    const checkGSAP = () => {
      if (window.gsap) {
        initHeader();
        initAnimation();
        addListeners();
      } else {
        setTimeout(checkGSAP, 100);
      }
    };

    checkGSAP();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('scroll', scrollCheck);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        strategy="afterInteractive"
      />
      <div ref={headerRef} className="relative w-full min-h-screen bg-primary overflow-hidden">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
          <h1 className="text-4xl md:text-5xl text-primary-foreground font-bold">
            {title} <span className="font-thin">{subtitle}</span>
          </h1>
          {children}
        </div>
      </div>
    </>
  );
};

AnimatedBackground.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default AnimatedBackground;
