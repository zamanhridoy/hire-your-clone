"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   Subtle ambient gradient blobs for admin pages
   ═══════════════════════════════════════════════════════════ */

const blobs = [
  { size: 400, x: "5%",  y: "0%",  color: "rgba(129,140,248,0.12)", dur: 20 },
  { size: 350, x: "70%", y: "10%", color: "rgba(167,139,250,0.10)", dur: 24 },
  { size: 300, x: "80%", y: "60%", color: "rgba(192,132,252,0.09)", dur: 18 },
  { size: 320, x: "10%", y: "70%", color: "rgba(129,140,248,0.09)", dur: 22 },
];

function AmbientBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[100px]"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            backgroundColor: b.color,
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, i % 2 === 0 ? 20 : -20, 0],
            y: [0, i % 2 === 0 ? -15 : 15, 0],
          }}
          transition={{
            duration: b.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Faint dot grid
   ═══════════════════════════════════════════════════════════ */

function DotGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.09]"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(100,116,139,0.8) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   Noise texture
   ═══════════════════════════════════════════════════════════ */

function NoiseTexture() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   Soft mouse glow (very subtle for admin)
   ═══════════════════════════════════════════════════════════ */

function AdminMouseGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 40, damping: 30 });
  const sy = useSpring(y, { stiffness: 40, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 w-[500px] h-[500px] rounded-full"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, rgba(129,140,248,0.10) 0%, transparent 70%)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   Floating rings — subtle hollow circles drifting
   ═══════════════════════════════════════════════════════════ */

const rings = [
  { x: "15%", y: "20%", size: 60, dur: 20, delay: 0 },
  { x: "80%", y: "15%", size: 45, dur: 24, delay: 2 },
  { x: "70%", y: "65%", size: 55, dur: 18, delay: 1 },
  { x: "25%", y: "75%", size: 40, dur: 22, delay: 3 },
  { x: "50%", y: "40%", size: 50, dur: 26, delay: 1.5 },
];

function FloatingRings() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {rings.map((r, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-slate-400/15"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
          animate={{
            y: [0, -12, 0, 10, 0],
            x: [0, i % 2 === 0 ? 8 : -8, 0],
            scale: [1, 1.08, 1],
            opacity: [0.12, 0.25, 0.12],
          }}
          transition={{
            duration: r.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: r.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Soft gradient waves — horizontal bands
   ═══════════════════════════════════════════════════════════ */

function GradientWaves() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute w-full"
          style={{
            height: 120,
            top: `${35 + i * 30}%`,
            background: `linear-gradient(90deg, transparent 0%, rgba(129,140,248,${0.05 + i * 0.015}) 40%, rgba(167,139,250,${0.04 + i * 0.015}) 60%, transparent 100%)`,
            filter: "blur(50px)",
          }}
          animate={{
            x: ["-5%", "5%", "-5%"],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 16 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 3,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Pulse dots — soft glowing dots that breathe
   ═══════════════════════════════════════════════════════════ */

const pulseDots = [
  { x: "25%", y: "18%", delay: 0 },
  { x: "72%", y: "30%", delay: 2 },
  { x: "40%", y: "55%", delay: 1 },
  { x: "85%", y: "70%", delay: 3 },
  { x: "15%", y: "80%", delay: 4 },
];

function PulseDots() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {pulseDots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ left: d.x, top: d.y, width: 5, height: 5 }}
          animate={{
            boxShadow: [
              "0 0 0px 0px rgba(129,140,248,0)",
              "0 0 20px 8px rgba(129,140,248,0.25)",
              "0 0 0px 0px rgba(129,140,248,0)",
            ],
            backgroundColor: [
              "rgba(129,140,248,0.15)",
              "rgba(129,140,248,0.5)",
              "rgba(129,140,248,0.15)",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: d.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Floating crosses — small + shapes
   ═══════════════════════════════════════════════════════════ */

const crosses = [
  { x: "20%", y: "12%", size: 10, dur: 18, delay: 0 },
  { x: "78%", y: "22%", size: 8,  dur: 22, delay: 1.5 },
  { x: "60%", y: "50%", size: 12, dur: 16, delay: 3 },
  { x: "10%", y: "60%", size: 9,  dur: 20, delay: 0.5 },
  { x: "88%", y: "85%", size: 10, dur: 24, delay: 2 },
  { x: "35%", y: "88%", size: 8,  dur: 19, delay: 4 },
];

function FloatingCrosses() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {crosses.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: c.x, top: c.y, width: c.size, height: c.size }}
          animate={{
            y: [0, -10, 0, 8, 0],
            rotate: [0, 45, 0],
            opacity: [0.1, 0.22, 0.1],
          }}
          transition={{
            duration: c.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: c.delay,
          }}
        >
          <svg viewBox="0 0 12 12" className="w-full h-full">
            <line x1="6" y1="1" x2="6" y2="11" stroke="rgba(100,116,139,0.6)" strokeWidth="1" />
            <line x1="1" y1="6" x2="11" y2="6" stroke="rgba(100,116,139,0.6)" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Subtle vignette
   ═══════════════════════════════════════════════════════════ */

function AdminVignette() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 50%, rgba(148,163,184,0.15) 100%)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   Export
   ═══════════════════════════════════════════════════════════ */

export default function AdminBg() {
  return (
    <>
      <AdminVignette />
      <NoiseTexture />
      <DotGrid />
      <GradientWaves />
      <AmbientBlobs />
      <FloatingRings />
      <FloatingCrosses />
      <PulseDots />
      <AdminMouseGlow />
    </>
  );
}
