import React from 'react';
import { Volume2, VolumeX, Play, RotateCcw, Zap, Sun, Moon } from 'lucide-react';

export default function Navbar({ 
  theme = 'dark',
  onToggleTheme,
  isMuted, 
  onToggleMute, 
  onAutoPlay, 
  isPlayingAuto, 
  onResetScroll,
  scrollProgress 
}) {
  const isDark = theme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 transition-all duration-300">
      <div 
        className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-3.5 sm:px-5 py-2 sm:py-2.5 shadow-xl transition-colors duration-200"
        style={{
          backgroundColor: isDark ? 'rgba(18, 22, 34, 0.92)' : 'rgba(255, 255, 255, 0.98)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(203, 213, 225, 0.95)',
          backdropFilter: 'blur(16px)'
        }}
      >
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#45db7d] to-[#10b981] flex items-center justify-center text-black font-black text-lg sm:text-xl shadow-lg shadow-[#45db7d]/30 shrink-0">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-black stroke-black" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span 
                className="font-extrabold text-base sm:text-lg tracking-wider font-heading transition-colors"
                style={{ color: isDark ? '#ffffff' : '#0f172a' }}
              >
                ITZFIZZ
              </span>
              <span className={`text-[9px] sm:text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full border ${
                isDark 
                  ? 'bg-[#45db7d]/15 text-[#45db7d] border-[#45db7d]/30' 
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold'
              }`}>
                MOTION LAB
              </span>
            </div>
            <p 
              className="text-[10px] sm:text-[11px] font-mono hidden md:block transition-colors"
              style={{ color: isDark ? '#94a3b8' : '#475569' }}
            >
              Scroll-Driven Supercar Engine
            </p>
          </div>
        </div>

        {/* Center Progress Pill */}
        <div 
          className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full border transition-colors"
          style={{
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1'
          }}
        >
          <span 
            className="text-xs font-mono font-bold"
            style={{ color: isDark ? '#94a3b8' : '#334155' }}
          >
            TRACK PROGRESS
          </span>
          <div className="w-32 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-[#10b981] via-[#45db7d] to-[#0284c7] transition-all duration-150 ease-out"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span 
            className="text-xs font-mono font-black w-10 text-right"
            style={{ color: isDark ? '#45db7d' : '#047857' }}
          >
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* Interactive Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
          
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1',
              color: isDark ? '#ffffff' : '#0f172a'
            }}
            title={isDark ? "Switch to High-Contrast Light Mode" : "Switch to Futuristic Dark Mode"}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-700 hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* Audio Engine Button */}
          <button
            onClick={onToggleMute}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold transition-all duration-200 border cursor-pointer"
            style={{
              backgroundColor: !isMuted 
                ? (isDark ? 'rgba(69, 219, 125, 0.18)' : '#dcfce7')
                : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'),
              borderColor: !isMuted 
                ? (isDark ? 'rgba(69, 219, 125, 0.5)' : '#86efac')
                : (isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1'),
              color: !isMuted 
                ? (isDark ? '#45db7d' : '#15803d')
                : (isDark ? '#94a3b8' : '#1e293b')
            }}
            title={isMuted ? "Unmute Engine Audio" : "Mute Engine Audio"}
          >
            {!isMuted ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse text-[#15803d] dark:text-[#45db7d]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
            <span className="hidden sm:inline font-bold">{!isMuted ? 'V8 SOUND' : 'AUDIO OFF'}</span>
          </button>

          {/* Auto Cruise */}
          <button
            onClick={onAutoPlay}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-black transition-all duration-200 border cursor-pointer"
            style={{
              backgroundColor: isPlayingAuto 
                ? '#def54f' 
                : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'),
              borderColor: isPlayingAuto 
                ? '#def54f' 
                : (isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1'),
              color: isPlayingAuto ? '#000000' : (isDark ? '#ffffff' : '#0f172a')
            }}
            title="Auto-cruise through the scroll experience"
          >
            <Play className={`w-3.5 h-3.5 ${isPlayingAuto ? 'fill-black' : ''}`} />
            <span className="hidden sm:inline">{isPlayingAuto ? 'CRUISING...' : 'AUTO CRUISE'}</span>
          </button>

          {/* Reset Position */}
          <button
            onClick={onResetScroll}
            className="p-1.5 sm:p-2 rounded-xl border transition-colors cursor-pointer"
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1',
              color: isDark ? '#94a3b8' : '#1e293b'
            }}
            title="Reset to Top"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
