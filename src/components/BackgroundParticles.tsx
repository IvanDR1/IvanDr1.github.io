import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];

    const COUNT = 350;

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 🧲 REPULSIÓN CON IMPULSO (tipo "golpe físico")
        if (dist < 180) {
          const force = (180 - dist) / 180;

          // empuje fuerte pero corto
          const impulseX = (dx / dist) * force * 1.2;
          const impulseY = (dy / dist) * force * 1.2;

          p.vx += impulseX;
          p.vy += impulseY;
        }

        // 🧠 INERCIA (clave del efecto)
        // baja fricción = más "deslizamiento"
        p.vx *= 0.97;
        p.vy *= 0.97;

        // límite de velocidad suave (evita explosiones)
        const maxSpeed = 2.2;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // rebote suave en bordes
        if (p.x < 0 || p.x > width) p.vx *= -0.9;
        if (p.y < 0 || p.y > height) p.vy *= -0.9;
      }

      // conexiones ligeras
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = 1 - dist / 100;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,0,0,${alpha * 0.05})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // partículas
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.12)";
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    draw();

    const moveMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}