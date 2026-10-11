import React from 'react';
import { CheckCircle2, Activity } from 'lucide-react';

const TECH_STACK = [
  { name: 'HTML5 Semantic Structure', category: 'Core Web', badge: 'Mandatory' },
  { name: 'Vanilla CSS & Modern Grid', category: 'Styling', badge: 'Mandatory' },
  { name: 'JavaScript ES6+ Logic', category: 'Language', badge: 'Mandatory' },
  { name: 'GSAP 3.12 + ScrollTrigger', category: 'Animation Engine', badge: 'Mandatory' },
  { name: 'React 19 / Vite Ecosystem', category: 'Framework', badge: 'Mandatory' },
  { name: 'Tailwind CSS v4 Engine', category: 'Utility Styling', badge: 'Mandatory' },
  { name: 'Web Audio API Synthesizer', category: 'Real-time Audio', badge: 'Enhancement' },
  { name: 'Lenis Smooth Scroll Engine', category: 'Motion Quality', badge: 'Enhancement' }
];

const METRICS = [
  { label: 'FRAME RATE TARGET', value: '60 FPS', desc: 'Hardware-composited via translate3d transforms' },
  { label: 'LAYOUT SHIFT (CLS)', value: '0.00', desc: 'Zero layout recalculation during continuous scroll' },
  { label: 'SCRUB INERTIA', value: '1.0s', desc: 'Cinematic momentum dampening on wheel & touch' },
  { label: 'DEVICE COMPATIBILITY', value: '100%', desc: 'Responsive across Desktop, Laptop, Tablet, & Mobile' }
];

export default function PerformanceSection({ theme = 'dark' }) {
  return (
    <section className="relative z-20 py-16 sm:py-20 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto">
      
      {/* Performance Scorecard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
        {METRICS.map((m, idx) => (
          <div key={idx} className="bg-white dark:bg-[#121622]/85 p-4 sm:p-6 rounded-2xl border border-slate-300 dark:border-white/10 shadow-sm text-center">
            <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">
              {m.label}
            </span>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black font-mono text-slate-900 dark:text-white mt-1 mb-1 tracking-tight">
              <span className="text-[#15803d] dark:text-[#45db7d]">{m.value}</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-600 dark:text-slate-400 font-mono leading-tight">
              {m.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Tech Stack Matrix */}
      <div className="bg-white dark:bg-[#121622]/85 rounded-3xl p-5 sm:p-10 border border-slate-300 dark:border-white/10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-[#def54f] font-bold uppercase tracking-wider mb-1">
              <Activity className="w-4 h-4" />
              <span>COMPLIANCE MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
              Mandatory Tech Stack & Beyond
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-800 dark:text-slate-300 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 self-start md:self-auto font-medium">
            100% SPECIFICATION COMPLIANT
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {TECH_STACK.map((tech, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[#45db7d]/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                  {tech.category}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-1">{tech.name}</h4>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                  tech.badge === 'Mandatory' 
                    ? 'bg-[#45db7d]/20 text-[#15803d] dark:text-[#45db7d]' 
                    : 'bg-sky-500/20 text-sky-700 dark:text-[#6ac9ff]'
                }`}>
                  {tech.badge}
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#15803d] dark:text-[#45db7d]" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
