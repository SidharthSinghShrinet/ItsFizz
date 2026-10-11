import React from 'react';
import { Sliders, Palette, Zap, Gauge, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const COLORS = [
  { id: 'orange', name: 'Papaya Orange', class: 'bg-[#ff8000] border-[#ff8000]' },
  { id: 'emerald', name: 'Emerald Acid', class: 'bg-[#45db7d] border-[#45db7d]' },
  { id: 'cyan', name: 'Cyber Cyan', class: 'bg-[#6ac9ff] border-[#6ac9ff]' },
  { id: 'purple', name: 'Hyper Purple', class: 'bg-[#c084fc] border-[#c084fc]' },
  { id: 'monochrome', name: 'Stealth Carbon', class: 'bg-zinc-400 border-zinc-400' }
];

const PRESETS = [
  { value: 0.3, label: 'Instant (0.3s)' },
  { value: 1.0, label: 'Standard (1.0s)' },
  { value: 1.8, label: 'Cinematic (1.8s)' }
];

export default function InteractiveControls({ 
  carColor, 
  onSelectColor, 
  scrubSmoothness, 
  onSelectScrub,
  scrollProgress,
  onScrubProgress
}) {

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#45db7d', '#def54f', '#6ac9ff', '#fa7328']
    });
  };

  return (
    <section className="relative z-20 py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#45db7d] font-bold uppercase tracking-wider mb-1">
              <Sliders className="w-4 h-4" />
              <span>DYNAMIC INTERACTION WORKBENCH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Fine-Tune Motion Physics & Livery
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Real-time parameter manipulation powered by GSAP ScrollTrigger interpolation.
            </p>
          </div>

          <button
            onClick={triggerCelebration}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#45db7d] to-[#10b981] text-black font-bold text-sm shadow-lg shadow-[#45db7d]/20 hover:scale-105 active:scale-95 transition-all self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            <span>Launch Apex Confetti</span>
          </button>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          
          {/* 1. Supercar Livery Selector */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Palette className="w-4 h-4 text-[#45db7d]" />
              <span className="font-bold">SUPERCAR LIVERY COLOR</span>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              {COLORS.map((col) => (
                <button
                  key={col.id}
                  onClick={() => onSelectColor(col.id)}
                  title={col.name}
                  className={`w-9 h-9 rounded-xl transition-all duration-200 border-2 flex items-center justify-center ${
                    carColor === col.id 
                      ? 'scale-115 ring-4 ring-[#45db7d]/30 shadow-lg' 
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  } ${col.class}`}
                />
              ))}
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              Active: <span className="text-[#45db7d] capitalize font-bold">{carColor}</span>
            </p>
          </div>

          {/* 2. GSAP Scrub Inertia Presets */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Gauge className="w-4 h-4 text-[#def54f]" />
              <span className="font-bold">GSAP SCRUB INTERPOLATION</span>
            </div>
            <div className="flex items-center gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => onSelectScrub(preset.value)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all border ${
                    scrubSmoothness === preset.value
                      ? 'bg-[#def54f] text-black border-[#def54f] shadow-md shadow-[#def54f]/20'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              Current Dampening: <span className="text-[#def54f] font-bold">{scrubSmoothness}s inertia</span>
            </p>
          </div>

          {/* 3. Manual Scroll Scrubber Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#6ac9ff]" />
                <span className="font-bold">MANUAL SCRUB TESTER</span>
              </div>
              <span className="text-[#6ac9ff] font-bold">{Math.round(scrollProgress * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={scrollProgress}
              onChange={(e) => onScrubProgress(parseFloat(e.target.value))}
              className="w-full h-2 rounded-lg bg-white/10 accent-[#45db7d] cursor-pointer"
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
