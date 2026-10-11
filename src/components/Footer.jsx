import { ExternalLink, ArrowUp, Heart, Sparkles, Zap } from 'lucide-react';

export default function Footer({ onResetScroll }) {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-black/80 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Attribution */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#45db7d] flex items-center justify-center text-black font-black">
              <Zap className="w-5 h-5 fill-black stroke-black" />
            </div>
            <span className="font-extrabold text-lg text-white font-heading">ITZFIZZ</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
              SUBMISSION READY
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Crafted for the Scroll-Driven Hero Section Animation Assignment.
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
            <span>Reference Inspiration:</span>
            <a 
              href="https://paraschaturvedi.github.io/car-scroll-animation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#6ac9ff] hover:underline inline-flex items-center gap-1"
            >
              car-scroll-animation <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Quick Links & Back to Top */}
        <div className="flex items-center gap-4">
          <button
            onClick={onResetScroll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-mono font-bold transition-all"
          >
            <ArrowUp className="w-4 h-4" />
            <span>BACK TO TOP</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
