import React from 'react';
import { Gauge } from 'lucide-react';

export default function TelemetryHUD({ speed, gear, rpm, theme = 'dark' }) {
  const isDark = theme === 'dark';
  const rpmSegments = Array.from({ length: 10 }, (_, i) => i + 1);
  const activeSegments = Math.round((rpm / 8500) * 10);

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-3 sm:left-6 z-30 flex items-center gap-2 sm:gap-4 glass-panel px-3 sm:px-5 py-2 sm:py-3 rounded-2xl border border-slate-300/80 dark:border-white/10 shadow-2xl backdrop-blur-md transition-all duration-300">
      
      {/* Speedometer */}
      <div className="flex items-center gap-2 sm:gap-3 pr-2.5 sm:pr-4 border-r border-slate-300/80 dark:border-white/10">
        <div className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[#15803d] dark:text-[#45db7d]">
          <Gauge className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div>
          <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            VELOCITY
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {Math.round(speed)}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#15803d] dark:text-[#45db7d] font-bold">
              KM/H
            </span>
          </div>
        </div>
      </div>

      {/* Gear Indicator */}
      <div className="flex items-center gap-1.5 sm:gap-2 pr-2.5 sm:pr-4 border-r border-slate-300/80 dark:border-white/10">
        <div>
          <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            GEAR
          </div>
          <div className="w-7 h-7 sm:w-9 sm:h-8 rounded-lg bg-slate-200 dark:bg-black/60 border border-slate-300 dark:border-[#45db7d]/40 flex items-center justify-center font-mono font-black text-sm sm:text-lg text-[#15803d] dark:text-[#45db7d] shadow-inner">
            {gear}
          </div>
        </div>
      </div>

      {/* RPM Tachometer */}
      <div className="hidden sm:flex flex-col gap-1 pr-4 border-r border-slate-300/80 dark:border-white/10 min-w-[110px]">
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 dark:text-slate-400">
          <span>TACHOMETER</span>
          <span className="text-slate-900 dark:text-white font-bold">{rpm} RPM</span>
        </div>
        <div className="flex items-center gap-1 h-2.5">
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
                      : isDark
                        ? 'bg-[#45db7d] shadow-xs shadow-[#45db7d]'
                        : 'bg-emerald-600 shadow-xs shadow-emerald-500'
                    : 'bg-slate-300 dark:bg-white/10'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Engine Status */}
      <div className="hidden md:flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#16a34a] dark:bg-[#45db7d] animate-ping" />
        <div>
          <div className="text-[9px] font-mono uppercase text-slate-500 dark:text-slate-400">ENGINE STATE</div>
          <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">GSAP + LENIS</div>
        </div>
      </div>

    </div>
  );
}
