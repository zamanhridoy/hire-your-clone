"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Bot, Users, Zap, Shield, BarChart3, Clock } from "lucide-react";

/* ── Typing text effect (lightweight, setTimeout-based) ── */

const roles = ["Founder", "Operator", "Consultant", "Agency Owner", "Executive"];

function TypingRoles() {
  const containerRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const word = roles[indexRef.current];
      if (!deleting) {
        charIndex++;
        el!.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          timeout = setTimeout(tick, 2000);
          return;
        }
        timeout = setTimeout(tick, 80);
      } else {
        charIndex--;
        el!.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          indexRef.current = (indexRef.current + 1) % roles.length;
          timeout = setTimeout(tick, 400);
          return;
        }
        timeout = setTimeout(tick, 40);
      }
    }

    timeout = setTimeout(tick, 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className="inline-flex items-baseline">
      <span ref={containerRef} className="bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />
      <span className="inline-block w-0.75 h-[0.85em] bg-indigo-500 ml-1 rounded-full animate-pulse" />
    </span>
  );
}

/* ── Static orbit visualization (pure CSS, no motion) ── */

const orbitNodes = [
  { icon: Bot,       label: "AI Agent",   color: "from-indigo-400 to-indigo-600", angle: 0,   ring: 47 },
  { icon: Users,     label: "Your VA",    color: "from-purple-400 to-purple-600", angle: 120, ring: 47 },
  { icon: Zap,       label: "Automation", color: "from-pink-400 to-pink-600",     angle: 240, ring: 47 },
  { icon: Shield,    label: "Quality",    color: "from-violet-400 to-violet-600", angle: 60,  ring: 38 },
  { icon: BarChart3, label: "Analytics",  color: "from-fuchsia-400 to-fuchsia-600", angle: 180, ring: 38 },
  { icon: Clock,     label: "24/7",       color: "from-blue-400 to-blue-600",     angle: 300, ring: 38 },
];

function OrbitVisualization() {
  return (
    <div className="relative w-full aspect-square">
      {/* Orbit rings — CSS only */}
      <div className="absolute inset-6 rounded-full border border-dashed border-indigo-300/20" />
      <div className="absolute inset-16 rounded-full border border-purple-300/20" />
      <div className="absolute inset-28 rounded-full border border-dashed border-pink-300/15" />

      {/* Center core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/25">
          <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 md:w-14 md:h-14">
            <path d="M24,8 Q34,8 36,18 Q38,26 32,30 L32,38 L16,38 L16,30 Q10,26 12,18 Q14,8 24,8Z"
              stroke="white" strokeWidth="1.5" fill="none" />
            <path d="M20,18 L24,22 L28,18" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M18,24 L24,28 L30,24" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
            <circle cx="24" cy="22" r="2" fill="white" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Orbiting icon nodes — static positioned */}
      {orbitNodes.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        const x = 50 + node.ring * Math.cos(rad);
        const y = 50 + node.ring * Math.sin(rad);
        const Icon = node.icon;

        return (
          <div
            key={i}
            className="absolute group"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
          >
            <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl bg-linear-to-br ${node.color} flex items-center justify-center shadow-lg cursor-default transition-transform hover:scale-110`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="text-[10px] font-bold text-slate-600 bg-white/90 px-2 py-1 rounded-md shadow-sm whitespace-nowrap">{node.label}</span>
            </div>
          </div>
        );
      })}

      {/* Connection lines (static SVG) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {orbitNodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = 50 + node.ring * Math.cos(rad);
          const y = 50 + node.ring * Math.sin(rad);
          return (
            <line key={i} x1="50" y1="50" x2={x} y2={y}
              stroke="rgba(129,140,248,0.12)" strokeWidth="0.3" strokeDasharray="1.5 2" />
          );
        })}
      </svg>
    </div>
  );
}

/* ── Stat cards ── */

const statCards = [
  { value: "40hrs", label: "Saved per week", x: "left-4 md:left-8", y: "top-[22%]" },
  { value: "94%", label: "Decision accuracy", x: "right-4 md:right-8", y: "top-[28%]" },
  { value: "24/7", label: "Clone uptime", x: "left-8 md:left-16", y: "bottom-[22%]" },
  { value: "<30s", label: "VA handoff time", x: "right-8 md:right-16", y: "bottom-[28%]" },
];

/* ── HERO COMPONENT ── */

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: Text content */}
          <div className="lg:basis-[65%] lg:max-w-[65%] text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-up">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                AI + Human VA Hybrid
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1] animate-fade-up [animation-delay:100ms]">
              Clone Yourself.
              <br />
              Scale as a{" "}
              <TypingRoles />
            </h1>

            <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-up [animation-delay:250ms]">
              We build a bespoke AI agent trained on <em>your</em> data and pair it with a
              dedicated VA who monitors, intervenes, and optimizes — so you can scale
              without losing your edge.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-up [animation-delay:400ms]">
              <a
                href="#booking"
                className="px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-colors shadow-xl hover:shadow-2xl flex items-center gap-2 group"
              >
                Book a Free Discovery Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="px-8 py-4 glass text-slate-600 rounded-full font-semibold hover:bg-white/80 transition-all shadow-lg"
              >
                Explore Services
              </a>
            </div>

            {/* Trust line */}
            <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start animate-fade-up [animation-delay:600ms]">
              <div className="flex -space-x-2">
                {["bg-indigo-400", "bg-purple-400", "bg-pink-400", "bg-violet-400"].map((bg, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center`}>
                    <span className="text-[10px] font-bold text-white">{String.fromCharCode(65 + i)}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-slate-600">50+ clones</span> deployed for businesses worldwide
              </p>
            </div>
          </div>

          {/* Right: Orbit visualization */}
          <div className="w-full max-w-xs lg:basis-[35%] lg:max-w-[35%] shrink-0 animate-fade-up [animation-delay:300ms]">
            <OrbitVisualization />
          </div>
        </div>
      </div>

      {/* Floating stat cards — CSS animated */}
      {statCards.map((card) => (
        <div
          key={card.value}
          className={`absolute ${card.x} ${card.y} z-20 hidden lg:block animate-fade-up [animation-delay:800ms]`}
        >
          <div className="glass px-4 py-3 rounded-xl shadow-lg cursor-default hover:shadow-xl hover:bg-white/70 transition-all floating">
            <p className="text-lg font-black text-slate-900 tracking-tight">{card.value}</p>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{card.label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
