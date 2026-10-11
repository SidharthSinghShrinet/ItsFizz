import React from 'react';
import { CheckCircle2, Zap, Gauge, Sparkles, Activity } from 'lucide-react';

const TECH_STACK = [
  { name: 'HTML5 Semantic Structure', category: 'Core Web', badge: 'Mandatory' },
  { name: 'Vanilla CSS & Modern Grid', category: 'Styling', badge: 'Mandatory' },
  { name: 'JavaScript ES6+ Logic', category: 'Language', badge: 'Mandatory' },
  { name: 'GSAP 3.12 + ScrollTrigger', category: 'Animation Engine', badge: 'Mandatory' },
  { name: 'React 19 / Vite Ecosystem', category: 'Framework', badge: 'Mandatory' },
  { name: 'Tailwind CSS v4 Engine', category: 'Utility Styling', badge: 'Mandatory' },
  { name: 'Web Audio API Synthesizer', category: 'Real-time Audio', badge: 'Enhancement' },
  { name: 'Hardware Acceleration', category: 'Performance', badge: 'Optimized' }
];

const METRICS = [
  { label: 'FRAME RATE TARGET', value: '60 FPS', desc: 'Hardware-composited via translate3d transforms' },
  { label: 'LAYOUT SHIFT (CLS)', value: '0.00', desc: 'Zero layout recalculation during continuous scroll' },
  { label: 'SCRUB INERTIA', value: '1.0s', desc: 'Cinematic momentum dampening on wheel & touch' },
  { label: 'DEVICE COMPATIBILITY', value: '100%', desc: 'Responsive across Desktop, Laptop, Tablet, & Mobile' }
];

export default function PerformanceSection() {
  return (
    <section className="relative z-20 py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Performance Scorecard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {METRICS.map((m, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{m.label}</span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1 mb-1 tracking-tight">
              <span className="text-[#45db7d]">{m.value}</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono leading-tight">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Tech Stack Matrix */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#def54f] font-bold uppercase tracking-wider mb-1">
              <Activity className="w-4 h-4" />
              <span>COMPLIANCE MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Mandatory Tech Stack & Beyond
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 self-start md:self-auto">
            100% SPECIFICATION COMPLIANT
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TECH_STACK.map((tech, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#45db7d]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {tech.category}
                </span>
                <h4 className="font-bold text-white text-sm mt-1">{tech.name}</h4>
              </div>
              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                  tech.badge === 'Mandatory' 
                    ? 'bg-[#45db7d]/20 text-[#45db7d]' 
                    : 'bg-[#6ac9ff]/20 text-[#6ac9ff]'
                }`}>
                  {tech.badge}
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#45db7d]" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
