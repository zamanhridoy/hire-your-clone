"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Users,
  ChevronRight,
  Brain,
  Zap,
  Shield,
  BarChart3,
  Headphones,
  RefreshCw,
  Settings,
  MessageSquare,
  Database,
  GitBranch,
  Workflow,
  Bot,
  ArrowRight,
  Eye,
  Wrench,
  TrendingUp,
  UserCheck,
  Clock,
  AlertTriangle,
  CheckCheck,
  Activity,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   AI AGENTS — Animated Circuit-to-Clone SVG
   ═══════════════════════════════════════════════════════════ */

function AiCloneSvg() {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <defs>
        <linearGradient id="clone-core" x1="120" y1="40" x2="200" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818cf8" />
          <stop offset="0.5" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#c084fc" />
        </linearGradient>
        <linearGradient id="data-stream" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#818cf8" stopOpacity="0" />
          <stop offset="0.5" stopColor="#818cf8" />
          <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="glow" cx="160" cy="120" r="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818cf8" stopOpacity="0.15" />
          <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
        </radialGradient>
        <filter id="soft-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <circle cx="160" cy="120" r="100" fill="url(#glow)" />

      {/* Hexagonal grid pattern */}
      {[
        { x: 60, y: 30 }, { x: 100, y: 30 }, { x: 140, y: 30 }, { x: 180, y: 30 }, { x: 220, y: 30 }, { x: 260, y: 30 },
        { x: 80, y: 56 }, { x: 120, y: 56 }, { x: 160, y: 56 }, { x: 200, y: 56 }, { x: 240, y: 56 },
        { x: 60, y: 82 }, { x: 100, y: 82 }, { x: 200, y: 82 }, { x: 260, y: 82 },
        { x: 80, y: 160 }, { x: 120, y: 160 }, { x: 200, y: 160 }, { x: 240, y: 160 },
        { x: 60, y: 186 }, { x: 100, y: 186 }, { x: 140, y: 186 }, { x: 180, y: 186 }, { x: 220, y: 186 }, { x: 260, y: 186 },
      ].map((h, i) => (
        <motion.path
          key={`hex-${i}`}
          d={`M${h.x},${h.y - 8} L${h.x + 9},${h.y - 4} L${h.x + 9},${h.y + 4} L${h.x},${h.y + 8} L${h.x - 9},${h.y + 4} L${h.x - 9},${h.y - 4}Z`}
          stroke="#818cf8" strokeWidth="0.5" fill="none" opacity="0.15"
          initial={{ opacity: 0 }} whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }} transition={{ delay: i * 0.02 }}
        />
      ))}

      {/* Central avatar silhouette */}
      <motion.g filter="url(#soft-glow)"
        initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Head */}
        <circle cx="160" cy="90" r="22" stroke="url(#clone-core)" strokeWidth="2" fill="none" />
        {/* Inner face circuit lines */}
        <circle cx="152" cy="86" r="3" stroke="#a78bfa" strokeWidth="1.2" fill="none" />
        <circle cx="168" cy="86" r="3" stroke="#a78bfa" strokeWidth="1.2" fill="none" />
        <path d="M154,97 Q160,101 166,97" stroke="#a78bfa" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* Body frame */}
        <path d="M138,112 L142,108 L160,108 L178,108 L182,112 L182,150 Q182,158 174,158 L146,158 Q138,158 138,150Z"
          stroke="url(#clone-core)" strokeWidth="2" fill="none" />
        {/* Chest circuit board */}
        <rect x="150" y="118" width="20" height="14" rx="3" stroke="#818cf8" strokeWidth="1" fill="none" opacity="0.6" />
        <circle cx="155" cy="125" r="2" fill="#818cf8" opacity="0.5" />
        <circle cx="165" cy="125" r="2" fill="#a78bfa" opacity="0.5" />
        <line x1="155" y1="125" x2="165" y2="125" stroke="#818cf8" strokeWidth="0.5" opacity="0.4" />
        {/* Vertical spine line */}
        <line x1="160" y1="108" x2="160" y2="158" stroke="#818cf8" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 3" />
      </motion.g>

      {/* Pulsing core */}
      <motion.circle
        cx="160" cy="125" r="6" fill="#818cf8"
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="160" cy="125" r="12" stroke="#818cf8" strokeWidth="0.5" fill="none"
        animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.3, 1.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
      />

      {/* Left data input streams — documents/data flowing in */}
      {[
        { startX: 20, startY: 80, endX: 136, endY: 118, delay: 0.5 },
        { startX: 30, startY: 120, endX: 136, endY: 130, delay: 0.7 },
        { startX: 20, startY: 155, endX: 136, endY: 145, delay: 0.9 },
      ].map((s, i) => (
        <g key={`left-${i}`}>
          {/* Source icon */}
          <motion.rect
            x={s.startX - 12} y={s.startY - 8} width="24" height="16" rx="3"
            fill="#1e1b4b" stroke="#818cf8" strokeWidth="1"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: s.delay }}
          />
          <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: s.delay + 0.1 }}>
            <line x1={s.startX - 6} y1={s.startY - 3} x2={s.startX + 6} y2={s.startY - 3} stroke="#818cf8" strokeWidth="0.8" opacity="0.6" />
            <line x1={s.startX - 6} y1={s.startY + 1} x2={s.startX + 3} y2={s.startY + 1} stroke="#818cf8" strokeWidth="0.8" opacity="0.4" />
          </motion.g>
          {/* Animated data particle stream */}
          <motion.circle r="2" fill="#818cf8"
            initial={{ opacity: 0 }}
            animate={{
              cx: [s.startX + 14, (s.startX + s.endX) / 2, s.endX],
              cy: [s.startY, (s.startY + s.endY) / 2, s.endY],
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          />
          <motion.circle r="1.5" fill="#c084fc"
            animate={{
              cx: [s.startX + 14, (s.startX + s.endX) / 2, s.endX],
              cy: [s.startY, (s.startY + s.endY) / 2, s.endY],
              opacity: [0, 0.6, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: s.delay + 0.4, ease: "easeInOut" }}
          />
          {/* Path trace */}
          <motion.path
            d={`M${s.startX + 14},${s.startY} Q${(s.startX + s.endX) / 2},${s.startY} ${s.endX},${s.endY}`}
            stroke="#818cf8" strokeWidth="0.5" fill="none" opacity="0.2" strokeDasharray="3 4"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 1, delay: s.delay }}
          />
        </g>
      ))}

      {/* Right output streams — actions going out */}
      {[
        { startX: 184, startY: 118, endX: 290, endY: 80, delay: 1.1, label: "Email" },
        { startX: 184, startY: 130, endX: 300, endY: 125, delay: 1.3, label: "CRM" },
        { startX: 184, startY: 145, endX: 290, endY: 160, delay: 1.5, label: "Tasks" },
      ].map((s, i) => (
        <g key={`right-${i}`}>
          {/* Target icon */}
          <motion.rect
            x={s.endX - 12} y={s.endY - 8} width="28" height="16" rx="3"
            fill="#1e1b4b" stroke="#c084fc" strokeWidth="1"
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: s.delay }}
          />
          <motion.text
            x={s.endX + 2} y={s.endY + 3} fontSize="6" fill="#c084fc" textAnchor="middle" fontFamily="monospace"
            initial={{ opacity: 0 }} whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }} transition={{ delay: s.delay + 0.1 }}
          >
            {s.label}
          </motion.text>
          {/* Animated output particles */}
          <motion.circle r="2" fill="#c084fc"
            animate={{
              cx: [s.startX, (s.startX + s.endX) / 2, s.endX - 14],
              cy: [s.startY, (s.startY + s.endY) / 2, s.endY],
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: s.delay + 0.2, ease: "easeInOut" }}
          />
          <motion.path
            d={`M${s.startX},${s.startY} Q${(s.startX + s.endX) / 2},${s.endY} ${s.endX - 14},${s.endY}`}
            stroke="#c084fc" strokeWidth="0.5" fill="none" opacity="0.2" strokeDasharray="3 4"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 1, delay: s.delay }}
          />
        </g>
      ))}

      {/* Labels */}
      <motion.text x="20" y="60" fontSize="7" fill="#818cf8" fontWeight="600" letterSpacing="1" fontFamily="monospace"
        initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }} transition={{ delay: 1.8 }}
      >YOUR DATA</motion.text>
      <motion.text x="265" y="60" fontSize="7" fill="#c084fc" fontWeight="600" letterSpacing="1" fontFamily="monospace"
        initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }} transition={{ delay: 2 }}
      >ACTIONS</motion.text>

      {/* Bottom status bar */}
      <motion.g initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 2.2 }}
      >
        <rect x="100" y="210" width="120" height="22" rx="11" fill="#1e1b4b" stroke="#818cf8" strokeWidth="0.5" />
        <circle cx="114" cy="221" r="4" fill="#22c55e" opacity="0.8" />
        <motion.circle cx="114" cy="221" r="4" fill="#22c55e"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <text x="124" y="224" fontSize="7" fill="#a5b4fc" fontFamily="monospace">CLONE ACTIVE</text>
      </motion.g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   AI AGENTS — Interactive Capability Tabs
   ═══════════════════════════════════════════════════════════ */

const aiCapabilities = [
  {
    id: "ingest",
    tab: "Ingest",
    icon: Database,
    title: "Feed It Everything",
    desc: "Your agent absorbs your emails, documents, SOPs, past decisions, and communication patterns. It doesn't just store data — it understands context, tone, and priorities.",
    highlights: ["Email threads & templates", "Documents & SOPs", "CRM history & contacts", "Calendar patterns"],
    stat: "10K+",
    statLabel: "data points per clone",
  },
  {
    id: "reason",
    tab: "Reason",
    icon: Brain,
    title: "Think Like You",
    desc: "Using your decision history as training data, the agent learns your logic trees, your preferences, and how you'd handle edge cases — then applies them autonomously.",
    highlights: ["Decision tree mapping", "Priority weighting", "Edge case handling", "Contextual judgment"],
    stat: "94%",
    statLabel: "decision accuracy",
  },
  {
    id: "execute",
    tab: "Execute",
    icon: Workflow,
    title: "Act On Your Behalf",
    desc: "Connected to your tools via API hooks, your clone drafts emails, updates CRMs, schedules meetings, triages tasks, and manages workflows — all in your voice.",
    highlights: ["Draft & send emails", "CRM updates & logging", "Task triage & routing", "Meeting scheduling"],
    stat: "40hrs",
    statLabel: "saved per week",
  },
  {
    id: "evolve",
    tab: "Evolve",
    icon: GitBranch,
    title: "Get Sharper Daily",
    desc: "Every correction, approval, and override feeds back into the model. Your VA flags drift, tunes responses, and runs A/B tests so the clone improves continuously.",
    highlights: ["Feedback loop training", "Drift detection", "A/B response testing", "Weekly accuracy audits"],
    stat: "2.3%",
    statLabel: "weekly improvement",
  },
];

/* ═══════════════════════════════════════════════════════════
   VA COMMAND CENTER — Animated SVG
   ═══════════════════════════════════════════════════════════ */

function VaCommandCenterSvg() {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <defs>
        <linearGradient id="va-grad" x1="100" y1="20" x2="220" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c084fc" /><stop offset="1" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="screen-grad" x1="80" y1="100" x2="240" y2="230" gradientUnits="userSpaceOnUse">
          <stop stopColor="#faf5ff" /><stop offset="1" stopColor="#fdf2f8" />
        </linearGradient>
        <radialGradient id="va-glow" cx="160" cy="140" r="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c084fc" stopOpacity="0.08" /><stop offset="1" stopColor="#c084fc" stopOpacity="0" />
        </radialGradient>
        <filter id="va-soft"><feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ambient glow */}
      <circle cx="160" cy="140" r="130" fill="url(#va-glow)" />

      {/* ── Central VA operator ── */}
      <motion.g filter="url(#va-soft)"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Head */}
        <circle cx="160" cy="42" r="18" fill="url(#va-grad)" />
        {/* Headset arc */}
        <path d="M142,38 Q142,24 160,24 Q178,24 178,38" stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="142" cy="40" r="4" fill="#7c3aed" />
        <circle cx="178" cy="40" r="4" fill="#7c3aed" />
        {/* Microphone */}
        <line x1="142" y1="44" x2="142" y2="52" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="142" cy="54" r="2" fill="#7c3aed" />
        {/* Body */}
        <path d="M136,66 L140,62 L160,60 L180,62 L184,66 L184,82 Q184,86 180,86 L140,86 Q136,86 136,82Z"
          fill="url(#va-grad)" opacity="0.9" />
      </motion.g>

      {/* ── Main monitor screen ── */}
      <motion.g
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}
      >
        <rect x="70" y="96" width="180" height="120" rx="10" fill="url(#screen-grad)" stroke="#e9d5ff" strokeWidth="1.5" />
        {/* Title bar */}
        <rect x="70" y="96" width="180" height="18" rx="10" fill="#f3e8ff" />
        <circle cx="84" cy="105" r="3" fill="#f472b6" />
        <circle cx="94" cy="105" r="3" fill="#c084fc" />
        <circle cx="104" cy="105" r="3" fill="#e9d5ff" />
        <rect x="180" y="101" width="56" height="8" rx="4" fill="#e9d5ff" />

        {/* ── Dashboard content ── */}

        {/* Clone status rows */}
        {[
          { y: 122, name: "Clone #1", color: "#22c55e", status: "Active" },
          { y: 138, name: "Clone #2", color: "#22c55e", status: "Active" },
          { y: 154, name: "Clone #3", color: "#f59e0b", status: "Review" },
        ].map((row, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.7 + i * 0.12 }}
          >
            <rect x="80" y={row.y} width="160" height="12" rx="3" fill="white" stroke="#f3e8ff" strokeWidth="0.5" />
            <circle cx="88" cy={row.y + 6} r="2.5" fill={row.color} />
            <text x="96" y={row.y + 9} fontSize="6" fill="#64748b" fontFamily="system-ui">{row.name}</text>
            <text x="218" y={row.y + 9} fontSize="5" fill={row.color} fontFamily="monospace" textAnchor="end">{row.status}</text>
          </motion.g>
        ))}

        {/* Mini chart area */}
        <motion.g
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 1.1 }}
        >
          <rect x="80" y="172" width="72" height="36" rx="4" fill="white" stroke="#f3e8ff" strokeWidth="0.5" />
          <text x="86" y="182" fontSize="5" fill="#a78bfa" fontWeight="600" fontFamily="system-ui">Accuracy</text>
          {/* Sparkline */}
          <motion.path
            d="M86,200 L94,196 L102,198 L110,192 L118,194 L126,188 L134,184 L142,186 L146,182"
            stroke="#c084fc" strokeWidth="1.5" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.2, delay: 1.3 }}
          />
        </motion.g>

        {/* Interventions counter */}
        <motion.g
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 1.2 }}
        >
          <rect x="160" y="172" width="80" height="36" rx="4" fill="white" stroke="#f3e8ff" strokeWidth="0.5" />
          <text x="166" y="182" fontSize="5" fill="#f472b6" fontWeight="600" fontFamily="system-ui">Interventions</text>
          <text x="200" y="200" fontSize="16" fill="#7c3aed" fontWeight="800" textAnchor="middle" fontFamily="system-ui">3</text>
          <text x="216" y="200" fontSize="6" fill="#a78bfa" fontFamily="system-ui">/wk</text>
        </motion.g>
      </motion.g>

      {/* ── Floating alert badges ── */}
      {/* Left: flagged item */}
      <motion.g
        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ delay: 1.4, type: "spring" }}
      >
        <rect x="8" y="120" width="52" height="28" rx="6" fill="white" stroke="#fde68a" strokeWidth="1" />
        <circle cx="20" cy="130" r="5" fill="#fef3c7" />
        <text x="20" y="132" fontSize="6" fill="#f59e0b" textAnchor="middle" fontWeight="700">!</text>
        <text x="30" y="131" fontSize="5" fill="#92400e" fontFamily="system-ui">Flagged</text>
        <text x="30" y="140" fontSize="4.5" fill="#b45309" fontFamily="system-ui">Tone drift</text>
      </motion.g>

      {/* Right: approved item */}
      <motion.g
        initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ delay: 1.5, type: "spring" }}
      >
        <rect x="260" y="130" width="52" height="28" rx="6" fill="white" stroke="#bbf7d0" strokeWidth="1" />
        <circle cx="272" cy="140" r="5" fill="#dcfce7" />
        <path d="M269,140 L271,142 L275,137" stroke="#22c55e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <text x="282" y="141" fontSize="5" fill="#166534" fontFamily="system-ui">Fixed</text>
        <text x="282" y="150" fontSize="4.5" fill="#15803d" fontFamily="system-ui">Re-trained</text>
      </motion.g>

      {/* Connection lines from badges to screen */}
      <motion.path d="M60,134 Q68,134 70,134" stroke="#fde68a" strokeWidth="0.8" strokeDasharray="2 2"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ delay: 1.6 }}
      />
      <motion.path d="M260,144 Q255,144 250,144" stroke="#bbf7d0" strokeWidth="0.8" strokeDasharray="2 2"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ delay: 1.7 }}
      />

      {/* ── Bottom status strip ── */}
      <motion.g initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 1.8 }}
      >
        <rect x="90" y="228" width="140" height="24" rx="12" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="0.8" />
        <circle cx="106" cy="240" r="4" fill="#c084fc" />
        <motion.circle cx="106" cy="240" r="4" fill="#c084fc"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x="116" y="243" fontSize="7" fill="#7c3aed" fontWeight="600" fontFamily="monospace">VA ON DUTY</text>
      </motion.g>

      {/* Subtle orbiting dot */}
      <motion.circle r="2" fill="#e879f9"
        animate={{
          cx: [100, 160, 220, 160, 100],
          cy: [90, 85, 90, 95, 90],
          opacity: [0, 0.6, 0, 0.6, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   VA — Interactive responsibility data
   ═══════════════════════════════════════════════════════════ */

const vaResponsibilities = [
  {
    icon: Eye,
    title: "Monitor",
    headline: "Eyes On Every Output",
    desc: "Your VA reviews every interaction your clone handles — flagging tone drift, factual errors, and edge cases before they reach your clients.",
    details: ["Real-time output scanning", "Tone & brand consistency", "Error interception", "Escalation routing"],
    metric: "99.2%",
    metricLabel: "issues caught before delivery",
  },
  {
    icon: Wrench,
    title: "Intervene",
    headline: "Step In, Seamlessly",
    desc: "When the AI hits its limits — ambiguity, emotional nuance, high-stakes decisions — your VA takes over in real-time. No gaps, no excuses.",
    details: ["Live handoff protocol", "Context-aware takeover", "Client never notices", "Full interaction log"],
    metric: "<30s",
    metricLabel: "average handoff time",
  },
  {
    icon: TrendingUp,
    title: "Optimize",
    headline: "Sharper Every Week",
    desc: "Weekly performance audits, A/B tests on responses, and retraining recommendations. Your VA turns every mistake into a permanent improvement.",
    details: ["Weekly accuracy reports", "Response A/B testing", "Retraining proposals", "ROI tracking"],
    metric: "15%",
    metricLabel: "monthly performance lift",
  },
  {
    icon: UserCheck,
    title: "Align",
    headline: "Always In Sync With You",
    desc: "Priorities change. Your VA updates the clone's behavior in real-time — new products, shifting tone, updated SOPs — without downtime.",
    details: ["Priority syncs on demand", "SOP & knowledge updates", "Tone recalibration", "Zero-downtime changes"],
    metric: "24/7",
    metricLabel: "availability & responsiveness",
  },
];

/* ═══════════════════════════════════════════════════════════
   PROCESS STEPS DATA — Interactive
   ═══════════════════════════════════════════════════════════ */

const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    subtitle: "Day 1",
    desc: "We jump on a call to understand your world — your workflows, communication style, decision patterns, and the tools you already use.",
    details: ["Map your daily workflows", "Identify automation opportunities", "Audit existing tools & data", "Define clone personality & tone"],
    deliverable: "Personalised clone blueprint document",
    color: "#818cf8",
    bgColor: "#eef2ff",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    step: "02",
    title: "Build & Train",
    subtitle: "Week 1–2",
    desc: "We ingest your data, build your custom AI agent, train it on your logic, and wire it into your tools. Rigorous testing ensures accuracy before anything goes live.",
    details: ["Ingest docs, emails, SOPs", "Train decision-making model", "Connect APIs & integrations", "Run accuracy test suite"],
    deliverable: "Fully trained AI clone + test report",
    color: "#a78bfa",
    bgColor: "#f5f3ff",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    step: "03",
    title: "Assign Your VA",
    subtitle: "Week 2",
    desc: "We match you with a dedicated Virtual Assistant trained on your clone's capabilities. They become the human layer between AI output and your clients.",
    details: ["Hand-picked VA matching", "Clone operation training", "Escalation protocol setup", "Communication channel sync"],
    deliverable: "Dedicated VA assigned + onboarding complete",
    color: "#c084fc",
    bgColor: "#faf5ff",
    gradient: "from-purple-500 to-fuchsia-500",
  },
  {
    step: "04",
    title: "Go Live & Scale",
    subtitle: "Week 3+",
    desc: "Your clone goes live. The VA monitors, intervenes, and optimizes. You focus on what matters while we handle quality and continuous improvement.",
    details: ["Soft launch with guardrails", "Real-time VA monitoring", "Weekly performance reports", "Continuous model improvement"],
    deliverable: "Live clone + weekly optimization reports",
    color: "#e879f9",
    bgColor: "#fdf4ff",
    gradient: "from-fuchsia-500 to-pink-500",
  },
];

/* ═══════════════════════════════════════════════════════════
   VA RESPONSIBILITY CARD — Expandable
   ═══════════════════════════════════════════════════════════ */

function VaResponsibilityCard({ item, index }: { item: typeof vaResponsibilities[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.1 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/20 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0 group-hover:bg-purple-500/25 transition-colors">
            <Icon className="w-4.5 h-4.5 text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">{item.headline}</h4>
              <ChevronRight className={`w-4 h-4 text-purple-400/50 transition-transform ${open ? "rotate-90" : ""}`} />
            </div>
            <p className="text-xs text-purple-300/50 font-mono uppercase tracking-wider">{item.title}</p>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pt-3 pb-4 ml-12">
              <p className="text-sm text-purple-200/60 leading-relaxed mb-4">{item.desc}</p>
              <div className="grid grid-cols-2 gap-1.5 mb-4">
                {item.details.map((d) => (
                  <div key={d} className="flex items-center gap-2 text-xs text-purple-300/70 py-1.5 px-3 rounded-lg bg-white/3 border border-white/5">
                    <span className="w-1 h-1 rounded-full bg-purple-400 shrink-0" />
                    {d}
                  </div>
                ))}
              </div>
              <div className="flex items-end gap-2 p-3 rounded-lg bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/10">
                <span className="text-2xl font-black text-white tracking-tight">{item.metric}</span>
                <span className="text-xs text-purple-300/50 font-medium pb-0.5">{item.metricLabel}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROCESS SCENE SVGs — one per step
   ═══════════════════════════════════════════════════════════ */

function ProcessScene({ index }: { index: number }) {
  if (index === 0) return <DiscoveryScene />;
  if (index === 1) return <BuildScene />;
  if (index === 2) return <AssignScene />;
  return <LaunchScene />;
}

function DiscoveryScene() {
  return (
    <svg viewBox="0 0 400 260" fill="none" className="w-full h-auto">
      <defs>
        <linearGradient id="disc-g" x1="100" y1="40" x2="300" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818cf8" /><stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      {/* Video call frame */}
      <motion.rect x="60" y="30" width="280" height="180" rx="16" fill="white" stroke="#e0e7ff" strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} />
      <rect x="60" y="30" width="280" height="24" rx="16" fill="#eef2ff" />
      <circle cx="78" cy="42" r="4" fill="#f87171" /><circle cx="90" cy="42" r="4" fill="#fbbf24" /><circle cx="102" cy="42" r="4" fill="#34d399" />
      {/* Person 1 */}
      <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
        <rect x="80" y="66" width="120" height="80" rx="8" fill="#eef2ff" />
        <circle cx="140" cy="96" r="14" fill="url(#disc-g)" />
        <path d="M120,130 Q120,118 140,118 Q160,118 160,130" fill="url(#disc-g)" opacity="0.6" />
        <text x="140" y="150" fontSize="7" fill="#818cf8" textAnchor="middle" fontWeight="600">You</text>
      </motion.g>
      {/* Person 2 */}
      <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
        <rect x="210" y="66" width="120" height="80" rx="8" fill="#f5f3ff" />
        <circle cx="270" cy="96" r="14" fill="#a78bfa" />
        <path d="M250,130 Q250,118 270,118 Q290,118 290,130" fill="#a78bfa" opacity="0.6" />
        <text x="270" y="150" fontSize="7" fill="#a78bfa" textAnchor="middle" fontWeight="600">Our Team</text>
      </motion.g>
      {/* Chat bubbles */}
      <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <rect x="80" y="160" width="100" height="20" rx="10" fill="#818cf8" opacity="0.1" />
        <rect x="88" y="167" width="50" height="3" rx="1.5" fill="#818cf8" opacity="0.3" />
        <rect x="88" y="173" width="30" height="3" rx="1.5" fill="#818cf8" opacity="0.2" />
      </motion.g>
      <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
        <rect x="220" y="160" width="100" height="20" rx="10" fill="#a78bfa" opacity="0.1" />
        <rect x="228" y="167" width="60" height="3" rx="1.5" fill="#a78bfa" opacity="0.3" />
        <rect x="228" y="173" width="35" height="3" rx="1.5" fill="#a78bfa" opacity="0.2" />
      </motion.g>
      {/* Floating data icons */}
      {[
        { x: 24, y: 60, d: 0.6 }, { x: 24, y: 100, d: 0.9 }, { x: 24, y: 140, d: 1.2 },
        { x: 370, y: 70, d: 0.7 }, { x: 370, y: 110, d: 1.0 },
      ].map((p, i) => (
        <motion.rect key={i} x={p.x - 10} y={p.y - 6} width="20" height="12" rx="3"
          fill="#eef2ff" stroke="#c7d2fe" strokeWidth="0.5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: p.d }}
        />
      ))}
      {/* Pulsing record dot */}
      <motion.circle cx="320" cy="42" r="4" fill="#ef4444"
        animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
      />
      <text x="310" y="45" fontSize="5" fill="#ef4444" textAnchor="end" fontWeight="600">REC</text>
      {/* Bottom label */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        <rect x="140" y="226" width="120" height="22" rx="11" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="0.5" />
        <text x="200" y="240" fontSize="7" fill="#818cf8" textAnchor="middle" fontWeight="600" fontFamily="monospace">DISCOVERY IN PROGRESS</text>
      </motion.g>
    </svg>
  );
}

function BuildScene() {
  return (
    <svg viewBox="0 0 400 260" fill="none" className="w-full h-auto">
      {/* Terminal window */}
      <motion.rect x="50" y="20" width="300" height="200" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="1"
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} />
      <rect x="50" y="20" width="300" height="22" rx="14" fill="#1e293b" />
      <circle cx="66" cy="31" r="3.5" fill="#f87171" /><circle cx="77" cy="31" r="3.5" fill="#fbbf24" /><circle cx="88" cy="31" r="3.5" fill="#34d399" />
      <text x="200" y="34" fontSize="6" fill="#64748b" textAnchor="middle" fontFamily="monospace">clone-builder v2.4</text>
      {/* Terminal lines */}
      {[
        { y: 54, text: "$ ingesting data sources...", color: "#818cf8", delay: 0.3 },
        { y: 68, text: "  ✓ 2,847 emails processed", color: "#34d399", delay: 0.6 },
        { y: 82, text: "  ✓ 156 documents indexed", color: "#34d399", delay: 0.9 },
        { y: 96, text: "  ✓ 43 SOPs mapped", color: "#34d399", delay: 1.2 },
        { y: 114, text: "$ training decision model...", color: "#a78bfa", delay: 1.5 },
        { y: 128, text: "  epoch 1/50 ████████░░ 80%", color: "#fbbf24", delay: 1.8 },
        { y: 146, text: "$ connecting integrations...", color: "#c084fc", delay: 2.1 },
        { y: 160, text: "  ✓ Gmail API linked", color: "#34d399", delay: 2.4 },
        { y: 174, text: "  ✓ HubSpot CRM synced", color: "#34d399", delay: 2.7 },
      ].map((line, i) => (
        <motion.text key={i} x="66" y={line.y} fontSize="7" fill={line.color} fontFamily="monospace"
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: line.delay, duration: 0.3 }}
        >{line.text}</motion.text>
      ))}
      {/* Blinking cursor */}
      <motion.rect x="66" y="186" width="5" height="10" rx="1" fill="#818cf8"
        animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
      />
      {/* Progress bar overlay */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
        <rect x="140" y="232" width="120" height="20" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
        <motion.rect x="142" y="234" width="0" height="16" rx="8" fill="url(#build-prog)"
          animate={{ width: 116 }} transition={{ duration: 3, delay: 1.8, ease: "easeOut" }}
        />
        <text x="200" y="245" fontSize="6" fill="white" textAnchor="middle" fontFamily="monospace" fontWeight="600">TRAINING</text>
      </motion.g>
      <defs>
        <linearGradient id="build-prog" x1="142" y1="0" x2="258" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818cf8" /><stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AssignScene() {
  return (
    <svg viewBox="0 0 400 260" fill="none" className="w-full h-auto">
      {/* VA Profile card */}
      <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <rect x="100" y="24" width="200" height="120" rx="16" fill="white" stroke="#e9d5ff" strokeWidth="1.5" />
        {/* Avatar */}
        <circle cx="200" cy="60" r="22" fill="#c084fc" />
        <circle cx="200" cy="52" r="8" fill="white" opacity="0.4" />
        <path d="M184,72 Q184,64 200,64 Q216,64 216,72" fill="white" opacity="0.3" />
        {/* Check badge */}
        <motion.g animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <circle cx="218" cy="48" r="8" fill="#22c55e" />
          <path d="M214,48 L217,51 L222,45" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </motion.g>
        <text x="200" y="100" fontSize="9" fill="#1e293b" textAnchor="middle" fontWeight="700">Sarah M.</text>
        <text x="200" y="112" fontSize="6" fill="#a78bfa" textAnchor="middle" fontWeight="600">Senior VA Specialist</text>
        {/* Skill tags */}
        {["Email Mgmt", "CRM Ops", "QA"].map((tag, i) => (
          <rect key={tag} x={120 + i * 62} y={120} width="55" height="14" rx="7" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="0.5" />
        ))}
        {["Email Mgmt", "CRM Ops", "QA"].map((tag, i) => (
          <text key={`t-${tag}`} x={147 + i * 62} y={130} fontSize="5" fill="#7c3aed" textAnchor="middle" fontWeight="600">{tag}</text>
        ))}
      </motion.g>
      {/* Match score */}
      <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, type: "spring" }}>
        <rect x="155" y="156" width="90" height="32" rx="16" fill="#22c55e" />
        <text x="200" y="176" fontSize="10" fill="white" textAnchor="middle" fontWeight="800">98% Match</text>
      </motion.g>
      {/* Connection lines to services */}
      {[
        { x: 80, y: 200, label: "Your Clone" },
        { x: 200, y: 210, label: "Escalations" },
        { x: 320, y: 200, label: "Your Clients" },
      ].map((n, i) => (
        <motion.g key={n.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.15 }}>
          <motion.line x1="200" y1="188" x2={n.x} y2={n.y} stroke="#c084fc" strokeWidth="1" strokeDasharray="4 3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2 + i * 0.15, duration: 0.5 }}
          />
          <rect x={n.x - 32} y={n.y} width="64" height="24" rx="8" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="0.8" />
          <text x={n.x} y={n.y + 15} fontSize="6" fill="#7c3aed" textAnchor="middle" fontWeight="600">{n.label}</text>
        </motion.g>
      ))}
    </svg>
  );
}

function LaunchScene() {
  return (
    <svg viewBox="0 0 400 260" fill="none" className="w-full h-auto">
      <defs>
        <linearGradient id="launch-g" x1="100" y1="60" x2="300" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e879f9" /><stop offset="1" stopColor="#f472b6" />
        </linearGradient>
      </defs>
      {/* Dashboard frame */}
      <motion.rect x="40" y="20" width="320" height="200" rx="14" fill="white" stroke="#fce7f3" strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
      />
      <rect x="40" y="20" width="320" height="22" rx="14" fill="#fdf4ff" />
      <circle cx="56" cy="31" r="3.5" fill="#f87171" /><circle cx="67" cy="31" r="3.5" fill="#fbbf24" /><circle cx="78" cy="31" r="3.5" fill="#34d399" />
      <text x="200" y="34" fontSize="6" fill="#a855f7" textAnchor="middle" fontWeight="600" fontFamily="monospace">Clone Dashboard — LIVE</text>
      {/* Stat cards */}
      {[
        { x: 56, label: "Handled", value: "847", color: "#22c55e" },
        { x: 152, label: "Accuracy", value: "96.2%", color: "#a78bfa" },
        { x: 248, label: "Saved", value: "42hrs", color: "#e879f9" },
      ].map((s, i) => (
        <motion.g key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.15 }}>
          <rect x={s.x} y="52" width="96" height="44" rx="8" fill={`${s.color}08`} stroke={`${s.color}22`} strokeWidth="0.8" />
          <text x={s.x + 48} y="72" fontSize="14" fill={s.color} textAnchor="middle" fontWeight="800">{s.value}</text>
          <text x={s.x + 48} y="86" fontSize="6" fill="#94a3b8" textAnchor="middle" fontWeight="600">{s.label}</text>
        </motion.g>
      ))}
      {/* Live chart */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <rect x="56" y="106" width="288" height="80" rx="8" fill="#fdf4ff" stroke="#fce7f3" strokeWidth="0.5" />
        <text x="68" y="120" fontSize="6" fill="#a855f7" fontWeight="600">Performance (7 days)</text>
        <motion.path
          d="M72,170 L102,158 L132,162 L162,148 L192,152 L222,138 L252,142 L282,128 L312,120 L330,116"
          stroke="url(#launch-g)" strokeWidth="2" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
        />
        {/* Dot on end */}
        <motion.circle cx="330" cy="116" r="3" fill="#e879f9"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.7, type: "spring" }}
        />
        <motion.circle cx="330" cy="116" r="3" fill="#e879f9"
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: 3 }}
        />
      </motion.g>
      {/* Live activity feed */}
      {[
        { y: 196, text: "Clone replied to 3 emails", time: "2m ago", color: "#22c55e" },
        { y: 208, text: "VA approved CRM update", time: "5m ago", color: "#a78bfa" },
      ].map((item, i) => (
        <motion.g key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 + i * 0.2 }}>
          <circle cx="64" cy={item.y} r="2.5" fill={item.color} />
          <text x="72" y={item.y + 3} fontSize="5.5" fill="#475569" fontFamily="system-ui">{item.text}</text>
          <text x="336" y={item.y + 3} fontSize="5" fill="#94a3b8" textAnchor="end" fontFamily="monospace">{item.time}</text>
        </motion.g>
      ))}
      {/* Bottom status */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        <rect x="130" y="232" width="140" height="22" rx="11" fill="#fdf4ff" stroke="#fce7f3" strokeWidth="0.5" />
        <motion.circle cx="148" cy="243" r="4" fill="#22c55e"
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
        />
        <text x="158" y="246" fontSize="7" fill="#a855f7" fontWeight="600" fontFamily="monospace">CLONE IS LIVE</text>
      </motion.g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROCESS — Interactive step selector component
   ═══════════════════════════════════════════════════════════ */

function ProcessInteractive() {
  const [active, setActive] = useState(0);
  const step = processSteps[active];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* ── Horizontal step selector (top) ── */}
      <div className="relative mb-10">
        {/* Progress track */}
        <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-slate-200 rounded-full" />
        <motion.div
          className="hidden md:block absolute top-6 left-0 h-0.5 rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
          animate={{ width: `${(active / (processSteps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        <div className="grid grid-cols-4 gap-2 md:gap-0 relative">
          {processSteps.map((s, i) => (
            <button
              key={s.step}
              onClick={() => setActive(i)}
              className="flex flex-col items-center group outline-none"
            >
              {/* Node */}
              <motion.div
                animate={{
                  scale: active === i ? 1.15 : 1,
                  borderColor: active === i ? s.color : "#e2e8f0",
                  backgroundColor: active === i ? s.color : "#ffffff",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-md relative z-10 cursor-pointer"
              >
                <span
                  className="text-sm font-black transition-colors"
                  style={{ color: active === i ? "white" : s.color }}
                >
                  {s.step}
                </span>
              </motion.div>
              {/* Pulse on active */}
              {active === i && (
                <motion.div
                  className="absolute top-0 w-12 h-12 rounded-full"
                  style={{ borderColor: s.color, borderWidth: 2 }}
                  animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              {/* Label */}
              <span className={`mt-3 text-xs font-bold transition-colors text-center leading-tight ${
                active === i ? "text-slate-900" : "text-slate-400"
              }`}>
                {s.title}
              </span>
              <span className={`text-[10px] font-mono transition-colors ${
                active === i ? "text-slate-500" : "text-slate-300"
              }`}>
                {s.subtitle}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="rounded-3xl glass bg-white/60 border border-white/30 overflow-hidden shadow-lg">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-0 min-h-[380px]">

          {/* Left — Scene SVG */}
          <div className="bg-linear-to-br from-slate-50 to-white p-6 md:p-10 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <ProcessScene index={active} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — Details */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Timeline + title */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ color: step.color, backgroundColor: step.bgColor }}
                  >
                    {step.subtitle}
                  </span>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{step.desc}</p>

                {/* Checklist */}
                <div className="space-y-2.5 mb-6">
                  {step.details.map((d, i) => (
                    <motion.div
                      key={d}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 300 }}
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: step.bgColor }}
                      >
                        <svg viewBox="0 0 12 12" className="w-3 h-3">
                          <motion.path
                            d="M2.5,6 L5,8.5 L9.5,3.5"
                            stroke={step.color}
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
                          />
                        </svg>
                      </motion.div>
                      <span className="text-sm text-slate-600 font-medium">{d}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Deliverable callout */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3 p-4 rounded-xl border"
                  style={{ backgroundColor: `${step.color}06`, borderColor: `${step.color}18` }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: step.bgColor }}>
                    <svg viewBox="0 0 16 16" className="w-4 h-4">
                      <path d="M3,8 L7,12 L13,4" stroke={step.color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Deliverable</p>
                    <p className="text-sm font-semibold text-slate-700">{step.deliverable}</p>
                  </div>
                </motion.div>

                {/* Navigation arrows */}
                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={() => setActive(Math.max(0, active - 1))}
                    disabled={active === 0}
                    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-500 rotate-180" />
                  </button>
                  <button
                    onClick={() => setActive(Math.min(processSteps.length - 1, active + 1))}
                    disabled={active === processSteps.length - 1}
                    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                  <span className="text-xs text-slate-400 font-mono ml-2">
                    {active + 1} / {processSteps.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);
  const cap = aiCapabilities[activeTab];

  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6">

        {/* ── Section Header ── */}
        <div className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Zap className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">What We Offer</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            The Ultimate Scaling Hybrid
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            We don&apos;t just give you AI. We give you a complete workforce solution
            that combines speed with human intuition.
          </motion.p>
        </div>

        {/* ══════════════════════════════════════════════════
           AI AGENTS — Dark immersive card
           ══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="max-w-6xl mx-auto mb-20 rounded-4xl overflow-hidden relative"
        >
          {/* Dark gradient background */}
          <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900" />
          {/* Mesh gradient overlays */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]" />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10">
            {/* Top bar */}
            <div className="flex items-center justify-between px-8 md:px-12 pt-10 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">Service 01</p>
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Bespoke AI Agents</h3>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-indigo-300">Live Demo</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Left — SVG illustration */}
              <div className="flex items-center justify-center px-8 md:px-12 py-8">
                <div className="w-full max-w-sm">
                  <AiCloneSvg />
                </div>
              </div>

              {/* Right — Interactive tabs */}
              <div className="px-8 md:px-12 pb-10 pt-4">
                <p className="text-indigo-200/70 mb-8 leading-relaxed text-sm md:text-base">
                  Not a chatbot. A digital replica of <span className="text-white font-semibold">you</span> — trained on
                  your data, wired into your tools, managed by a human VA.
                </p>

                {/* Tab strip */}
                <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/5 mb-6">
                  {aiCapabilities.map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveTab(i)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                        activeTab === i
                          ? "bg-indigo-500/20 text-indigo-300 shadow-lg shadow-indigo-500/10"
                          : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <c.icon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{c.tab}</span>
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cap.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h4 className="text-xl font-bold text-white mb-2">{cap.title}</h4>
                    <p className="text-sm text-indigo-200/60 leading-relaxed mb-5">{cap.desc}</p>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {cap.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-indigo-300/80 py-1.5 px-3 rounded-lg bg-white/3 border border-white/5">
                          <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                          {h}
                        </div>
                      ))}
                    </div>

                    {/* Stat callout */}
                    <div className="flex items-end gap-3 p-4 rounded-xl bg-linear-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/10">
                      <span className="text-3xl font-black text-white tracking-tight">{cap.stat}</span>
                      <span className="text-xs text-indigo-300/60 font-medium pb-1">{cap.statLabel}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
           EXPERT VA MANAGEMENT — Warm immersive card
           ══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="max-w-6xl mx-auto mb-32 rounded-4xl overflow-hidden relative"
        >
          {/* Warm gradient background */}
          <div className="absolute inset-0 bg-linear-to-br from-purple-950 via-fuchsia-950 to-rose-950" />
          {/* Mesh glows */}
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-600/8 rounded-full blur-[100px]" />
          {/* Dot grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10">
            {/* Top bar */}
            <div className="flex items-center justify-between px-8 md:px-12 pt-10 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">Service 02</p>
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Expert Human Management</h3>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-3">
                {[
                  { label: "3 VAs Online", color: "bg-green-400" },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5">
                    <span className={`w-2 h-2 rounded-full ${badge.color} animate-pulse`} />
                    <span className="text-xs font-mono text-purple-300">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Left — Interactive responsibility cards */}
              <div className="px-8 md:px-12 pb-10 pt-4">
                <p className="text-purple-200/70 mb-8 leading-relaxed text-sm md:text-base">
                  Every clone is paired with a dedicated VA who <span className="text-white font-semibold">watches, intervenes, optimizes, and aligns</span> —
                  so your AI never operates unchecked.
                </p>

                <div className="space-y-3">
                  {vaResponsibilities.map((r, i) => (
                    <VaResponsibilityCard key={r.title} item={r} index={i} />
                  ))}
                </div>
              </div>

              {/* Right — SVG command center */}
              <div className="flex items-center justify-center px-8 md:px-12 py-8">
                <div className="w-full max-w-sm">
                  <VaCommandCenterSvg />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
           VA + AI BRIDGE — "We provide the VA" section
           ══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto mb-32"
        >
          {/* Glass card */}
          <div className="rounded-3xl glass bg-linear-to-br from-white/60 to-indigo-50/40 border border-white/30 overflow-hidden">
            <div className="px-8 md:px-14 py-14">
              {/* Header */}
              <div className="text-center mb-12">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/60 border border-indigo-200/40 mb-6"
                >
                  <Shield className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">The Complete Package</span>
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight"
                >
                  We Provide the VA<br className="hidden md:block" /> Who Manages Your Agent
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.3 }}
                  className="text-slate-500 max-w-2xl mx-auto leading-relaxed"
                >
                  You don&apos;t hire the AI and figure it out alone. We assign a trained, dedicated
                  Virtual Assistant who runs your clone like a member of your team — so you never
                  have to babysit the technology.
                </motion.p>
              </div>

              {/* Visual bridge: AI ↔ VA ↔ You */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 mb-14">
                {/* AI Agent node */}
                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.3, type: "spring" }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/20">
                    <Bot className="w-9 h-9 text-white" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">Your AI Clone</span>
                  <span className="text-xs text-slate-400">Works 24/7</span>
                </motion.div>

                {/* Connector arrow */}
                <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.5 }}
                  className="hidden md:block w-20"
                >
                  <svg viewBox="0 0 80 40" fill="none" className="w-full">
                    <path d="M4,20 H64" stroke="#c7d2fe" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M58,14 L66,20 L58,26" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="34" y="12" fontSize="7" fill="#a5b4fc" textAnchor="middle" fontWeight="600" fontFamily="system-ui">reports to</text>
                  </svg>
                </motion.div>
                {/* Mobile arrow */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.5 }}
                  className="md:hidden"
                >
                  <svg viewBox="0 0 40 50" fill="none" className="w-8">
                    <path d="M20,4 V38" stroke="#c7d2fe" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M14,32 L20,40 L26,32" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>

                {/* VA node — highlighted center */}
                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.4, type: "spring" }}
                  className="flex flex-col items-center gap-3 relative"
                >
                  {/* Glow ring */}
                  <div className="absolute -inset-4 rounded-3xl bg-linear-to-br from-purple-200/30 to-pink-200/30 blur-xl -z-10" />
                  <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/25 ring-4 ring-purple-200/30">
                    <Headphones className="w-11 h-11 text-white" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">Your Dedicated VA</span>
                  <span className="text-xs text-purple-500 font-semibold">Provided by us</span>
                </motion.div>

                {/* Connector arrow */}
                <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.6 }}
                  className="hidden md:block w-20"
                >
                  <svg viewBox="0 0 80 40" fill="none" className="w-full">
                    <path d="M4,20 H64" stroke="#e9d5ff" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M58,14 L66,20 L58,26" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="34" y="12" fontSize="7" fill="#c4b5fd" textAnchor="middle" fontWeight="600" fontFamily="system-ui">delivers to</text>
                  </svg>
                </motion.div>
                {/* Mobile arrow */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.6 }}
                  className="md:hidden"
                >
                  <svg viewBox="0 0 40 50" fill="none" className="w-8">
                    <path d="M20,4 V38" stroke="#e9d5ff" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M14,32 L20,40 L26,32" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>

                {/* You node */}
                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.5, type: "spring" }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl">
                    <UserCheck className="w-9 h-9 text-white" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">You</span>
                  <span className="text-xs text-slate-400">Focus on growth</span>
                </motion.div>
              </div>

              {/* Benefit pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: Clock,
                    title: "Zero Setup on Your End",
                    desc: "We recruit, train, and assign the VA. You just show up for the onboarding call.",
                  },
                  {
                    icon: Activity,
                    title: "Always Monitored",
                    desc: "Your VA watches the agent in real-time — catching errors, refining tone, handling escalations.",
                  },
                  {
                    icon: CheckCheck,
                    title: "One Point of Contact",
                    desc: "Your VA is your single point of contact for everything — agent updates, reports, and changes.",
                  },
                ].map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="p-5 rounded-2xl bg-white/60 border border-white/40 hover:shadow-lg hover:bg-white/80 transition-all"
                  >
                    <b.icon className="w-6 h-6 text-purple-500 mb-3" />
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{b.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
           HOW IT WORKS — Interactive step selector
           ══════════════════════════════════════════════════ */}
        <div id="how-it-works" className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <RefreshCw className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">The Process</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            >From Call to Clone in 3 Weeks</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >Click through each step to see exactly what happens — no ambiguity, no filler.</motion.p>
          </div>

          <ProcessInteractive />

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="text-center mt-14"
          >
            <a href="#booking"
              className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl group text-lg"
            >
              Start Your Clone Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-xs text-slate-400 mt-4 font-medium">Free discovery call — no commitment required</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
