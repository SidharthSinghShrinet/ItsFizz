import React from 'react';
import { Gauge } from 'lucide-react';

export default function TelemetryHUD({ speed, gear, rpm, theme = 'dark' }) {
  const isDark = theme === 'dark';
  const rpmSegments = Array.from({ length: 10 }, (_, i) => i + 1);
  const activeSegments = Math.round((rpm / 8500) * 10);

  return (
    <div 
      className="flex items-center justify-between sm:justify-center gap-2 sm:gap-6 px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-2xl mx-auto max-w-3xl shadow-lg transition-colors duration-200"
      style={{
        backgroundColor: isDark ? 'rgba(18, 22, 34, 0.9)' : 'rgba(255, 255, 255, 0.98)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #cbd5e1',
        backdropFilter: 'blur(16px)'
      }}
    >
      
      {/* Speedometer */}
      <div 
        className="flex items-center gap-2 sm:gap-3 pr-2.5 sm:pr-4 border-r"
        style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#e2e8f0' }}
      >
        <div 
          className="p-1.5 rounded-lg border"
          style={{
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1',
            color: isDark ? '#45db7d' : '#15803d'
          }}
        >
          <Gauge className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div>
          <div 
            className="text-[9px] font-mono uppercase tracking-wider font-bold"
            style={{ color: isDark ? '#94a3b8' : '#475569' }}
          >
            VELOCITY
          </div>
          <div className="flex items-baseline gap-1">
            <span 
              className="font-mono text-lg sm:text-2xl font-black tracking-tight"
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            >
              {Math.round(speed)}
            </span>
            <span 
              className="text-[10px] sm:text-[11px] font-mono font-bold"
              style={{ color: isDark ? '#45db7d' : '#15803d' }}
            >
              KM/H
            </span>
          </div>
        </div>
      </div>

      {/* Gear Indicator */}
      <div 
        className="flex items-center gap-2 pr-2.5 sm:pr-4 border-r"
        style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#e2e8f0' }}
      >
        <div>
          <div 
            className="text-[9px] font-mono uppercase tracking-wider font-bold"
            style={{ color: isDark ? '#94a3b8' : '#475569' }}
          >
            GEAR
          </div>
          <div 
            className="w-7 h-6 sm:w-8 sm:h-7 rounded-lg border flex items-center justify-center font-mono font-black text-sm sm:text-base shadow-inner"
            style={{
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.6)' : '#f1f5f9',
              borderColor: isDark ? 'rgba(69, 219, 125, 0.4)' : '#cbd5e1',
              color: isDark ? '#45db7d' : '#15803d'
            }}
          >
            {gear}
          </div>
        </div>
      </div>

      {/* RPM Tachometer */}
      <div 
        className="hidden sm:flex flex-col gap-1 pr-4 border-r min-w-[120px]"
        style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#e2e8f0' }}
      >
        <div className="flex justify-between items-center text-[9px] font-mono font-bold">
          <span style={{ color: isDark ? '#94a3b8' : '#475569' }}>TACHOMETER</span>
          <span style={{ color: isDark ? '#ffffff' : '#0f172a' }}>{rpm} RPM</span>
        </div>
        <div className="flex items-center gap-1 h-2">
          {rpmSegments.map((seg) => {
            const isActive = seg <= activeSegments;
            const isRedline = seg >= 8;
            return (
              <div
                key={seg}
                className="flex-1 h-full rounded-xs transition-colors duration-100"
                style={{
                  backgroundColor: isActive
                    ? (isRedline ? '#f43f5e' : (isDark ? '#45db7d' : '#16a34a'))
                    : (isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1')
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Engine State */}
      <div className="flex items-center gap-2">
        <div 
          className="w-2 h-2 rounded-full animate-ping"
          style={{ backgroundColor: isDark ? '#45db7d' : '#16a34a' }}
        />
        <div>
          <div 
            className="text-[9px] font-mono uppercase font-bold"
            style={{ color: isDark ? '#94a3b8' : '#475569' }}
          >
            ENGINE STATE
          </div>
          <div 
            className="text-[11px] sm:text-xs font-mono font-black"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            GSAP + LENIS
          </div>
        </div>
      </div>

    </div>
  );
}
