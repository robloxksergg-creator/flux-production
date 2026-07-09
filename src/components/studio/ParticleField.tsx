import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  tw: number; // twinkle phase
};

type Shooting = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  len: number;
};

export default function ParticleField({
  density = 180,
  fixed = true,
}: {
  density?: number;
  fixed?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let shooters: Shooting[] = [];
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = fixed ? null : canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const count = Math.round(density * (width * height) / (1280 * 800));
      particles = Array.from({ length: Math.max(density, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.6 + 0.3,
        a: Math.random() * 0.6 + 0.2,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onLeave = () => (mouseRef.current.active = false);

    const spawnShooter = () => {
      const fromLeft = Math.random() < 0.5;
      const y = Math.random() * height * 0.6;
      const speed = 8 + Math.random() * 6;
      const angle = (Math.PI / 6) + Math.random() * (Math.PI / 8); // ~30-52deg
      const vx = (fromLeft ? 1 : -1) * Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      shooters.push({
        x: fromLeft ? -20 : width + 20,
        y,
        vx,
        vy,
        life: 0,
        maxLife: 90 + Math.random() * 40,
        len: 120 + Math.random() * 100,
      });
    };

    let shooterTimer = 0;
    let nextShooterAt = 60 + Math.random() * 120;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const { x: mx, y: my, active } = mouseRef.current;

      // stars
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        if (active) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist2 = dx * dx + dy * dy;
          const R = 180;
          if (dist2 < R * R) {
            const dist = Math.sqrt(dist2) || 1;
            const f = (R - dist) / R;
            p.x += (dx / dist) * f * 2.2;
            p.y += (dy / dist) * f * 2.2;
          }
        }

        p.tw += 0.03;
        const twinkle = 0.65 + Math.sin(p.tw) * 0.35;
        const alpha = p.a * twinkle;

        ctx.beginPath();
        ctx.fillStyle = `rgba(180, 245, 220, ${alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // occasional glow for bigger stars
        if (p.r > 1.4) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(120, 200, 255, ${alpha * 0.15})`;
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // connections (only nearby to keep perf)
      const maxConn = 140;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > maxConn || Math.abs(dy) > maxConn) continue;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxConn) {
            ctx.strokeStyle = `rgba(120, 200, 255, ${(1 - d / maxConn) * 0.08})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // shooting stars
      shooterTimer++;
      if (shooterTimer >= nextShooterAt) {
        shooterTimer = 0;
        nextShooterAt = 90 + Math.random() * 240;
        spawnShooter();
        if (Math.random() < 0.25) spawnShooter();
      }

      shooters = shooters.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        const t = s.life / s.maxLife;
        const alpha = Math.sin(Math.min(1, t) * Math.PI); // fade in/out

        const tailX = s.x - (s.vx / Math.hypot(s.vx, s.vy)) * s.len;
        const tailY = s.y - (s.vy / Math.hypot(s.vx, s.vy)) * s.len;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, "rgba(180, 245, 220, 0)");
        grad.addColorStop(1, `rgba(200, 255, 240, ${0.9 * alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // head
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(120, 240, 200, ${alpha * 0.5})`;
        ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
        ctx.fill();

        return (
          s.life < s.maxLife &&
          s.x > -200 &&
          s.x < width + 200 &&
          s.y < height + 200
        );
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [density, fixed]);

  return (
    <canvas
      ref={canvasRef}
      className={
        fixed
          ? "fixed inset-0 h-full w-full pointer-events-none z-0"
          : "absolute inset-0 h-full w-full pointer-events-none"
      }
      aria-hidden
    />
  );
}
