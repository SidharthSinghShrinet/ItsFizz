import { Volume2, VolumeX, Play, RotateCcw, ExternalLink, Zap } from 'lucide-react';

export default function Navbar({ 
  isMuted, 
  onToggleMute, 
  onAutoPlay, 
  isPlayingAuto, 
  onResetScroll,
  scrollProgress 
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-2xl px-5 py-3 shadow-2xl border border-white/10">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#45db7d] to-[#10b981] flex items-center justify-center text-black font-black text-xl shadow-lg shadow-[#45db7d]/30">
            <Zap className="w-6 h-6 fill-black stroke-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider text-white">ITZFIZZ</span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#45db7d]/15 text-[#45db7d] border border-[#45db7d]/30">
                MOTION LAB
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">Scroll-Driven Supercar Engine</p>
          </div>
        </div>

        {/* Center Progress Pill */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
          <span className="text-xs font-mono text-slate-400">TRACK PROGRESS</span>
          <div className="w-32 h-2 rounded-full bg-slate-800 overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-[#def54f] via-[#45db7d] to-[#6ac9ff] transition-all duration-150 ease-out"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-[#45db7d] w-10 text-right">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* Interactive Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Engine Button */}
          <button
            onClick={onToggleMute}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 border ${
              !isMuted 
                ? 'bg-[#45db7d]/20 text-[#45db7d] border-[#45db7d]/50 shadow-lg shadow-[#45db7d]/20' 
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
            }`}
            title={isMuted ? "Unmute Engine Audio" : "Mute Engine Audio"}
          >
            {!isMuted ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{!isMuted ? 'V8 ACTIVE' : 'AUDIO OFF'}</span>
          </button>

          {/* Auto Cruise / Play Demo */}
          <button
            onClick={onAutoPlay}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 border ${
              isPlayingAuto
                ? 'bg-[#def54f] text-black border-[#def54f] shadow-lg shadow-[#def54f]/30'
                : 'bg-white/5 text-slate-300 border-white/10 hover:text-white hover:bg-white/10'
            }`}
            title="Auto-cruise through the scroll experience"
          >
            <Play className={`w-3.5 h-3.5 ${isPlayingAuto ? 'fill-black' : ''}`} />
            <span className="hidden sm:inline">{isPlayingAuto ? 'CRUISING...' : 'AUTO CRUISE'}</span>
          </button>

          {/* Reset Position */}
          <button
            onClick={onResetScroll}
            className="p-2 rounded-xl text-slate-400 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset to Top"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
}
