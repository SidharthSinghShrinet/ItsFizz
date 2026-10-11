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

export default function ArchitectureSection() {
  return (
    <section className="relative z-20 py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#45db7d]/10 text-[#45db7d] border border-[#45db7d]/30 text-xs font-mono font-bold mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>TECHNICAL ARCHITECTURE & SPECIFICATIONS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight">
          Engineered for 60FPS Native Velocity
        </h2>
        <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
          How the scroll-driven hero animation fulfills every functional requirement with uncompromising smoothness and modern web standards.
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {HIGHLIGHTS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-[#45db7d]/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#45db7d] mb-5 group-hover:scale-110 group-hover:bg-[#45db7d]/20 transition-all duration-300">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-heading">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Code Snippet Walkthrough Card */}
      <div className="mt-8 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Code2 className="w-5 h-5 text-[#def54f]" />
            <span className="font-mono text-sm font-bold text-white">ScrollTrigger Pipeline Implementation</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">React + GSAP Core</span>
        </div>
        <pre className="text-xs sm:text-sm font-mono text-slate-300 bg-black/60 p-5 rounded-2xl overflow-x-auto border border-white/5">
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
