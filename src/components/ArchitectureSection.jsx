import React from 'react';
import { Cpu, Layers, ShieldCheck, Zap, Terminal, Code2 } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Layers,
    title: 'Pinning & Scrub Virtualization',
    desc: 'ScrollTrigger locks viewport track for 240vh of scroll distance while pinning the stage smoothly without page jumping or layout jitter.'
  },
  {
    icon: Cpu,
    title: 'GPU Transform Pipeline',
    desc: 'Uses 100% composite-only CSS transforms (translate3d, scale3d, will-change: transform) eliminating layout reflows and paint thrashing.'
  },
  {
    icon: Zap,
    title: 'Kinetic Letter Collision Engine',
    desc: 'Pre-calculates letter geometry on initialization and resize. Letter ignition happens via direct opacity and shadow triggers without DOM querying.'
  },
  {
    icon: ShieldCheck,
    title: 'Interpolated Motion Dampening',
    desc: 'Scroll progress scrub uses spring damping (1.0s inertia) to ensure ultra-fluid acceleration and deceleration regardless of scroll device.'
  }
];

export default function ArchitectureSection({ theme = 'dark' }) {
  return (
    <section className="relative z-20 py-16 sm:py-20 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto">
      
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#45db7d]/15 text-[#15803d] dark:text-[#45db7d] border border-[#45db7d]/30 text-xs font-mono font-bold mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>TECHNICAL ARCHITECTURE & SPECIFICATIONS</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
          Engineered for 60FPS Native Velocity
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-xs sm:text-base leading-relaxed">
          How the scroll-driven hero animation fulfills every functional requirement with uncompromising smoothness and modern web standards.
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {HIGHLIGHTS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="bg-white dark:bg-[#121622]/80 p-5 sm:p-8 rounded-3xl border border-slate-300 dark:border-white/10 hover:border-[#45db7d]/50 shadow-sm transition-all duration-300 group"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#15803d] dark:text-[#45db7d] mb-4 sm:mb-5 group-hover:scale-110 group-hover:bg-[#45db7d]/20 transition-all duration-300">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 font-heading">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Code Snippet Walkthrough Card */}
      <div className="mt-6 sm:mt-8 bg-white dark:bg-[#121622]/80 rounded-3xl p-5 sm:p-8 border border-slate-300 dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-[#def54f]" />
            <span className="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              ScrollTrigger Pipeline Implementation
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-500">React + GSAP Core</span>
        </div>
        <pre className="text-[11px] sm:text-sm font-mono text-emerald-400 dark:text-slate-300 bg-slate-950 p-4 sm:p-5 rounded-2xl overflow-x-auto border border-white/5">
{`gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',
    end: '+=240%',
    pin: trackRef.current,
    scrub: 1.0, // Buttery smooth motion dampening
    onUpdate: (self) => {
      const progress = self.progress;
      const currentX = progress * maxDistance;
      
      // Hardware accelerated transform without layout reflow
      gsap.set(carRef.current, { x: currentX, force3D: true });
      gsap.set(trailRef.current, { width: currentX + carOffset, force3D: true });
      
      // Real-time letter ignition collision check
      ignitePassedLetters(currentX);
    }
  }
});`}
        </pre>
      </div>

    </section>
  );
}
