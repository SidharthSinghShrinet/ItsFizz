import React from 'react';
import { Volume2, VolumeX, Play, RotateCcw, ExternalLink, Zap, Sun, Moon } from 'lucide-react';

export default function Navbar({ 
  theme,
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
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-2xl px-3.5 sm:px-5 py-2.5 sm:py-3 shadow-2xl border border-white/10 dark:border-white/10 dark:bg-[#121622]/85 bg-white/90">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#45db7d] to-[#10b981] flex items-center justify-center text-black font-black text-lg sm:text-xl shadow-lg shadow-[#45db7d]/30 shrink-0">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-black stroke-black" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-wider text-slate-900 dark:text-white font-heading">
                ITZFIZZ
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-[#45db7d]/15 text-[#15803d] dark:text-[#45db7d] border border-[#45db7d]/30">
                MOTION LAB
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-600 dark:text-slate-400 font-mono hidden md:block">
              Scroll-Driven Supercar Engine
            </p>
          </div>
        </div>

        {/* Center Progress Pill */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
          <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">TRACK PROGRESS</span>
          <div className="w-32 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-[#10b981] via-[#45db7d] to-[#0284c7] transition-all duration-150 ease-out"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-[#15803d] dark:text-[#45db7d] w-10 text-right">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* Interactive Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
          
          {/* Theme Toggle Button (Light/Dark Mode) */}
          <button
            onClick={onToggleTheme}
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-200"
            title={isDark ? "Switch to Crisp Light Mode" : "Switch to Futuristic Dark Mode"}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* Audio Engine Button */}
          <button
            onClick={onToggleMute}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-medium transition-all duration-200 border ${
              !isMuted 
                ? 'bg-[#45db7d]/20 text-[#15803d] dark:text-[#45db7d] border-[#45db7d]/50 shadow-md shadow-[#45db7d]/20' 
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:text-black dark:hover:text-white'
            }`}
            title={isMuted ? "Unmute Engine Audio" : "Mute Engine Audio"}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse text-[#15803d] dark:text-[#45db7d]" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            <span className="hidden sm:inline">{!isMuted ? 'V8 SOUND' : 'AUDIO OFF'}</span>
          </button>

          {/* Auto Cruise / Play Demo */}
          <button
            onClick={onAutoPlay}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold transition-all duration-200 border ${
              isPlayingAuto
                ? 'bg-[#def54f] text-black border-[#def54f] shadow-md shadow-[#def54f]/30'
                : 'bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-black dark:hover:text-white'
            }`}
            title="Auto-cruise through the scroll experience"
          >
            <Play className={`w-3.5 h-3.5 ${isPlayingAuto ? 'fill-black' : ''}`} />
            <span className="hidden sm:inline">{isPlayingAuto ? 'CRUISING...' : 'AUTO CRUISE'}</span>
          </button>

          {/* Reset Position */}
          <button
            onClick={onResetScroll}
            className="p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            title="Reset to Top"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
