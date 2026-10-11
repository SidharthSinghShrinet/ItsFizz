import React from 'react';
import { Sliders, Palette, Zap, Gauge, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const COLORS = [
  { id: 'orange', name: 'Papaya Orange', class: 'bg-[#ff8000] border-[#ff8000]' },
  { id: 'emerald', name: 'Emerald Acid', class: 'bg-[#45db7d] border-[#45db7d]' },
  { id: 'cyan', name: 'Cyber Cyan', class: 'bg-[#6ac9ff] border-[#6ac9ff]' },
  { id: 'purple', name: 'Hyper Purple', class: 'bg-[#c084fc] border-[#c084fc]' },
  { id: 'monochrome', name: 'Stealth Carbon', class: 'bg-zinc-500 border-zinc-500' }
];

const PRESETS = [
  { value: 0.3, label: 'Instant (0.3s)' },
  { value: 1.0, label: 'Standard (1.0s)' },
  { value: 1.8, label: 'Cinematic (1.8s)' }
];

export default function InteractiveControls({ 
  theme = 'dark',
  carColor, 
  onSelectColor, 
  scrubSmoothness, 
  onSelectScrub,
  scrollProgress,
  onScrubProgress
}) {
  const isDark = theme === 'dark';

  const triggerCelebration = () => {
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#45db7d', '#def54f', '#6ac9ff', '#fa7328']
    });
  };

  return (
    <section className="relative z-20 py-12 sm:py-16 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <div className="glass-panel rounded-3xl p-5 sm:p-8 border border-slate-300/80 dark:border-white/10 shadow-2xl transition-all duration-300">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#15803d] dark:text-[#45db7d] font-bold uppercase tracking-wider mb-1">
              <Sliders className="w-4 h-4" />
              <span>DYNAMIC INTERACTION WORKBENCH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
              Fine-Tune Motion Physics & Livery
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Real-time parameter manipulation powered by GSAP ScrollTrigger interpolation.
            </p>
          </div>

          <button
            onClick={triggerCelebration}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#45db7d] to-[#10b981] text-black font-bold text-xs sm:text-sm shadow-lg shadow-[#45db7d]/20 hover:scale-105 active:scale-95 transition-all self-start md:self-auto cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            <span>Launch Apex Confetti</span>
          </button>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          
          {/* 1. Supercar Livery Selector */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
              <Palette className="w-4 h-4 text-[#15803d] dark:text-[#45db7d]" />
              <span className="font-bold">SUPERCAR LIVERY COLOR</span>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              {COLORS.map((col) => (
                <button
                  key={col.id}
                  onClick={() => onSelectColor(col.id)}
                  title={col.name}
                  className={`w-9 h-9 rounded-xl transition-all duration-200 border-2 flex items-center justify-center cursor-pointer ${
                    carColor === col.id 
                      ? 'scale-115 ring-4 ring-[#45db7d]/40 shadow-lg' 
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  } ${col.class}`}
                />
              ))}
            </div>
            <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Active: <span className="text-[#15803d] dark:text-[#45db7d] capitalize font-bold">{carColor}</span>
            </p>
          </div>

          {/* 2. GSAP Scrub Inertia Presets */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
              <Gauge className="w-4 h-4 text-amber-600 dark:text-[#def54f]" />
              <span className="font-bold">GSAP SCRUB INTERPOLATION</span>
            </div>
            <div className="flex items-center gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => onSelectScrub(preset.value)}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                    scrubSmoothness === preset.value
                      ? 'bg-amber-400 dark:bg-[#def54f] text-black border-amber-400 dark:border-[#def54f] shadow-md shadow-yellow-500/20'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Current Dampening: <span className="text-amber-600 dark:text-[#def54f] font-bold">{scrubSmoothness}s inertia</span>
            </p>
          </div>

          {/* 3. Manual Scroll Scrubber Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-sky-600 dark:text-[#6ac9ff]" />
                <span className="font-bold">MANUAL SCRUB TESTER</span>
              </div>
              <span className="text-sky-600 dark:text-[#6ac9ff] font-bold">{Math.round(scrollProgress * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={scrollProgress}
              onChange={(e) => onScrubProgress(parseFloat(e.target.value))}
              className="w-full h-2 rounded-lg bg-slate-200 dark:bg-white/10 accent-[#15803d] dark:accent-[#45db7d] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0% Pit Lane</span>
              <span>50% Mid Sector</span>
              <span>100% Finish</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
