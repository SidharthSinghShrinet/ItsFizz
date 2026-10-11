import React from 'react';
import { Gauge, Activity, Navigation, Compass } from 'lucide-react';

export default function TelemetryHUD({ speed, gear, rpm, progress }) {
  // RPM segments 1 to 10
  const rpmSegments = Array.from({ length: 10 }, (_, i) => i + 1);
  const activeSegments = Math.round((rpm / 8500) * 10);

  return (
    <div className="absolute bottom-6 left-6 z-20 hidden md:flex items-center gap-4 glass-panel px-5 py-3 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
      
      {/* Speedometer */}
      <div className="flex items-center gap-3 pr-4 border-r border-white/10">
        <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#45db7d]">
          <Gauge className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">VELOCITY</div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-2xl font-black text-white tracking-tight">
              {Math.round(speed)}
            </span>
            <span className="text-[11px] font-mono text-[#45db7d] font-bold">KM/H</span>
          </div>
        </div>
      </div>

      {/* Gear Indicator */}
      <div className="flex items-center gap-2 pr-4 border-r border-white/10">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">GEAR</div>
          <div className="w-9 h-8 rounded-lg bg-black/60 border border-[#45db7d]/40 flex items-center justify-center font-mono font-black text-lg text-[#45db7d] shadow-inner">
            {gear}
          </div>
        </div>
      </div>

      {/* RPM Tachometer */}
      <div className="flex flex-col gap-1 pr-4 border-r border-white/10 min-w-[120px]">
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
          <span>TACHOMETER</span>
          <span className="text-white font-bold">{rpm} RPM</span>
        </div>
        <div className="flex items-center gap-1 h-3">
          {rpmSegments.map((seg) => {
            const isActive = seg <= activeSegments;
            const isRedline = seg >= 8;
            return (
              <div
                key={seg}
                className={`flex-1 h-full rounded-xs transition-colors duration-100 ${
                  isActive
                    ? isRedline 
                      ? 'bg-rose-500 shadow-xs shadow-rose-500' 
                      : 'bg-[#45db7d] shadow-xs shadow-[#45db7d]'
                    : 'bg-white/10'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Physics / Interpolation Status */}
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#45db7d] animate-ping" />
        <div>
          <div className="text-[10px] font-mono uppercase text-slate-400">ENGINE STATE</div>
          <div className="text-xs font-mono font-bold text-white">GSAP SCRUB 1.0</div>
        </div>
      </div>

    </div>
  );
}
