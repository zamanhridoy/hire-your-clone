/* Pure CSS background — zero JS, zero animation loops */

export default function InteractiveBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient orbs — GPU-composited, no JS */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
        style={{ background: "rgba(129,140,248,0.5)" }}
      />
      <div
        className="absolute top-1/4 -right-32 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
        style={{ background: "rgba(192,132,252,0.5)" }}
      />
      <div
        className="absolute -bottom-32 left-1/3 w-[450px] h-[450px] rounded-full blur-[120px] opacity-15"
        style={{ background: "rgba(167,139,250,0.4)" }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(129,140,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(2,6,23,0.35) 100%)",
        }}
      />
    </div>
  );
}
