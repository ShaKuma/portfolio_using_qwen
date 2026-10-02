import { useEffect, useRef } from 'react';

export default function DataFlowAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Data points flowing through the network
    interface DataPoint {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      progress: number;
      speed: number;
      size: number;
      color: string;
    }

    const dataPoints: DataPoint[] = [];
    const colors = ['#7c3aed', '#06b6d4', '#8b5cf6', '#22d3ee'];

    // Create flowing data points
    const createDataPoint = () => {
      const startX = -20;
      const startY = Math.random() * canvas.height;
      const endX = canvas.width + 20;
      const endY = Math.random() * canvas.height;

      dataPoints.push({
        x: startX,
        y: startY,
        targetX: endX,
        targetY: endY,
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
        size: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new data points occasionally
      if (Math.random() < 0.03 && dataPoints.length < 30) {
        createDataPoint();
      }

      // Update and draw data points
      dataPoints.forEach((point, index) => {
        point.progress += point.speed;

        // Calculate current position using bezier curve
        const t = point.progress;
        const controlX = canvas.width / 2;
        const controlY = canvas.height / 2 + Math.sin(t * Math.PI) * 50;

        point.x = (1 - t) * (1 - t) * -20 + 2 * (1 - t) * t * controlX + t * t * (canvas.width + 20);
        point.y = (1 - t) * (1 - t) * point.y + 2 * (1 - t) * t * controlY + t * t * point.targetY;

        // Draw trail
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.size * 3);
        gradient.addColorStop(0, point.color + '80');
        gradient.addColorStop(1, point.color + '00');

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.fill();

        // Remove if out of bounds
        if (point.progress >= 1) {
          dataPoints.splice(index, 1);
        }
      });

      // Draw network nodes
      const nodeCount = 5;
      const nodeSpacing = canvas.width / (nodeCount + 1);

      for (let i = 1; i <= nodeCount; i++) {
        const x = i * nodeSpacing;
        const y = canvas.height / 2 + Math.sin(Date.now() * 0.001 + i) * 20;

        // Draw node glow
        const nodeGradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
        nodeGradient.addColorStop(0, 'rgba(124, 58, 237, 0.3)');
        nodeGradient.addColorStop(1, 'rgba(124, 58, 237, 0)');

        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fillStyle = nodeGradient;
        ctx.fill();

        // Draw node core
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#7c3aed';
        ctx.fill();

        // Draw connections to next node
        if (i < nodeCount) {
          const nextX = (i + 1) * nodeSpacing;
          const nextY = canvas.height / 2 + Math.sin(Date.now() * 0.001 + i + 1) * 20;

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nextX, nextY);
          ctx.strokeStyle = 'rgba(124, 58, 237, 0.2)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
