import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  TrendingUp, 
  PhoneOff, 
  Zap, 
  Smile, 
  ChevronDown, 
  Sparkles, 
  CheckCircle2, 
  Flame 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_LETTERS = [
  { char: 'W', id: 0 },
  { char: 'E', id: 1 },
  { char: 'L', id: 2 },
  { char: 'C', id: 3 },
  { char: 'O', id: 4 },
  { char: 'M', id: 5 },
  { char: 'E', id: 6 },
  { char: '\u00A0', id: 7 }, // non-breaking space
  { char: 'I', id: 8 },
  { char: 'T', id: 9 },
  { char: 'Z', id: 10 },
  { char: 'F', id: 11 },
  { char: 'I', id: 12 },
  { char: 'Z', id: 13 },
  { char: 'Z', id: 14 }
];

export default function HeroSection({ 
  onScrollTelemetry, 
  carColor = 'orange', 
  scrubSmoothness = 1.0 
}) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const headlineRef = useRef(null);
  const lettersRef = useRef([]);
  const metricsContainerRef = useRef(null);
  const cardsRef = useRef([]);

  // Active status of each metric box based on scroll progress
  const [activeCards, setActiveCards] = useState([false, false, false, false]);
  const [activeLetterCount, setActiveLetterCount] = useState(0);

  // Filter styles for car livery customizer
  const carFilterStyle = useMemo(() => {
    switch (carColor) {
      case 'emerald':
        return 'hue-rotate(90deg) saturate(1.8)';
      case 'cyan':
        return 'hue-rotate(180deg) saturate(1.7)';
      case 'purple':
        return 'hue-rotate(250deg) saturate(1.6)';
      case 'monochrome':
        return 'grayscale(1) contrast(1.2) brightness(1.1)';
      default:
        return 'none'; // Default Papaya Orange McLaren
    }
  }, [carColor]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const road = roadRef.current;
    const car = carRef.current;
    const trail = trailRef.current;
    const letterEls = lettersRef.current.filter(Boolean);
    const cardEls = cardsRef.current.filter(Boolean);

    if (!section || !track || !road || !car) return;

    // ==========================================
    // 1. INITIAL LOAD ANIMATIONS (Requirement 2)
    // ==========================================
    const introCtx = gsap.context(() => {
      // (a) Staggered reveal of the headline letters
      gsap.fromTo(
        letterEls,
        {
          opacity: 0,
          y: 40,
          scale: 0.85,
          filter: 'blur(8px)'
        },
        {
          opacity: 0.35, // subdued base opacity waiting for car ignition
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.2
        }
      );

      // (b) Subtle intro for the road and car entrance
      gsap.fromTo(
        road,
        { opacity: 0, scaleY: 0.8 },
        { opacity: 1, scaleY: 1, duration: 1.2, ease: 'expo.out', delay: 0.4 }
      );

      gsap.fromTo(
        car,
        { opacity: 0, x: -120 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'back.out(1.2)', delay: 0.6 }
      );

      // (c) Metrics cards animate in one by one with subtle delay
      gsap.fromTo(
        cardEls,
        {
          opacity: 0,
          y: 35,
          scale: 0.92,
          filter: 'blur(6px)'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          delay: 0.8
        }
      );
    }, section);

    // ========================================================
    // 2. SCROLL-BASED ANIMATION (Requirement 3: Core Feature)
    // ========================================================
    // Pre-calculate geometry to avoid layout thrashing during scroll
    let roadWidth = road.offsetWidth;
    let carWidth = car.offsetWidth || 150;
    let endX = roadWidth - carWidth - 20;

    // Store letter bounding X relative to road for ultra-fast checks
    const getLetterPositions = () => {
      const roadRect = road.getBoundingClientRect();
      return letterEls.map(el => {
        const rect = el.getBoundingClientRect();
        return rect.left - roadRect.left + (rect.width / 2);
      });
    };

    let letterPositions = getLetterPositions();

    const handleResize = () => {
      if (!road || !car) return;
      roadWidth = road.offsetWidth;
      carWidth = car.offsetWidth || 150;
      endX = roadWidth - carWidth - 20;
      letterPositions = getLetterPositions();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Track scroll velocity for realistic telemetry
    let lastTime = performance.now();
    let lastScrollY = window.scrollY;

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=240%', // 240vh scroll space for fluid pacing
        pin: track,
        scrub: scrubSmoothness,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentX = progress * endX;

          // GPU-accelerated translate3d for buttery 60fps performance
          gsap.set(car, { 
            x: currentX, 
            force3D: true 
          });

          // Trail width stretches dynamically with the car's front axle
          const carFront = currentX + (carWidth * 0.75);
          gsap.set(trailRef.current, { 
            width: Math.max(0, carFront), 
            force3D: true 
          });

          // Letter ignition: letters light up vividly when the car reaches them
          let ignited = 0;
          letterEls.forEach((el, idx) => {
            const letterX = letterPositions[idx];
            if (carFront >= letterX) {
              ignited++;
              el.style.opacity = '1';
              el.style.color = '#def54f';
              el.style.textShadow = '0 0 25px rgba(222, 245, 79, 0.9), 0 0 40px rgba(69, 219, 125, 0.6)';
              el.style.transform = 'scale(1.08) translateY(-2px)';
            } else {
              el.style.opacity = '0.35';
              el.style.color = '#ffffff';
              el.style.textShadow = 'none';
              el.style.transform = 'scale(1) translateY(0px)';
            }
          });
          setActiveLetterCount(ignited);

          // Card milestone triggers based on scroll progress
          setActiveCards([
            progress >= 0.15,
            progress >= 0.38,
            progress >= 0.62,
            progress >= 0.85
          ]);

          // Real-time telemetry calculations (Speed, Gear, RPM, Throttle)
          const now = performance.now();
          const dt = Math.max((now - lastTime) / 1000, 0.016);
          const scrollDelta = Math.abs(window.scrollY - lastScrollY);
          lastTime = now;
          lastScrollY = window.scrollY;

          // Velocity in px/sec scaled to km/h (capped at 320 km/h)
          const rawSpeed = (scrollDelta / dt) * 0.18;
          const speed = Math.min(320, Math.max(0, rawSpeed + (progress > 0.05 ? 35 : 0)));
          const throttle = Math.min(1, speed / 320);

          let gear = 'N';
          if (speed > 5) {
            if (speed < 50) gear = '1';
            else if (speed < 100) gear = '2';
            else if (speed < 155) gear = '3';
            else if (speed < 210) gear = '4';
            else if (speed < 265) gear = '5';
            else if (speed < 305) gear = '6';
            else gear = '7';
          }

          const rpm = Math.round(1000 + (throttle * 7200));

          if (onScrollTelemetry) {
            onScrollTelemetry({
              speed,
              gear,
              rpm,
              progress,
              throttle
            });
          }
        }
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      introCtx.revert();
      scrollTimeline.kill();
    };
  }, [scrubSmoothness, onScrollTelemetry]);

  return (
    <div ref={sectionRef} className="relative w-full h-[320vh] bg-[#0b0c10]">
      
      {/* Sticky Viewport Track Container */}
      <div 
        ref={trackRef} 
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-radial from-[#151926] via-[#0d0f16] to-[#07080b] select-none"
      >
        
        {/* Subtle Ambient Racing Background Grid */}
        <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#45db7d]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#def54f]/10 rounded-full blur-3xl pointer-events-none" />

        {/* ========================================================= */}
        {/* TOP SECTION: Headline & Mission Statement (Above the Fold) */}
        {/* ========================================================= */}
        <div className="relative z-10 pt-20 md:pt-22 px-4 sm:px-6 max-w-7xl mx-auto w-full text-center">
          
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 mb-2 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-[#45db7d] animate-ping" />
            <span className="text-[#45db7d] font-bold">NEXT-GEN INTERACTION</span>
            <span className="text-slate-500">•</span>
            <span>SCROLL-DRIVEN ARCHITECTURE</span>
          </div>

          {/* Letter-Spaced Headline (Requirement 1 & 2) */}
          <h1 
            ref={headlineRef}
            aria-label="WELCOME ITZFIZZ"
            className="flex flex-nowrap whitespace-nowrap justify-center items-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[0.18em] sm:tracking-[0.26em] md:tracking-[0.32em] uppercase text-white font-heading transition-all duration-300 select-none overflow-visible"
          >
            {HEADLINE_LETTERS.map((item, index) => (
              <span
                key={item.id}
                ref={(el) => (lettersRef.current[index] = el)}
                className="inline-block transition-all duration-150 ease-out will-change-transform"
                style={{
                  minWidth: item.char === '\u00A0' ? '1.2rem' : 'auto'
                }}
              >
                {item.char}
              </span>
            ))}
          </h1>

          <p className="mt-1 text-[11px] sm:text-xs md:text-sm text-slate-400 font-mono max-w-xl mx-auto">
            Scroll smoothly to ignite the telemetry engine and unroll the kinetic trajectory.
          </p>
        </div>

        {/* ========================================================= */}
        {/* MIDDLE SECTION: Road Track, McLaren Supercar, & Trail     */}
        {/* ========================================================= */}
        <div className="relative z-10 w-full my-auto py-1">
          
          <div 
            ref={roadRef} 
            className="relative w-full h-[140px] sm:h-[165px] md:h-[180px] road-surface border-y-2 border-white/15 shadow-2xl flex items-center overflow-hidden"
          >
            {/* Top Curbs (Racing kerbing) */}
            <div className="absolute top-0 left-0 right-0 h-2.5 road-curb-top opacity-80 shadow-xs" />
            
            {/* Center Dashed Asphalt Line */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1.5 asphalt-line opacity-50" />

            {/* Glowing Kinetic Speed Trail (Unrolls behind car) */}
            <div 
              ref={trailRef}
              className="absolute left-0 top-0 bottom-0 pointer-events-none will-change-transform"
              style={{
                width: 0,
                background: 'linear-gradient(90deg, rgba(69, 219, 125, 0.15) 0%, rgba(69, 219, 125, 0.45) 70%, rgba(222, 245, 79, 0.85) 100%)',
                boxShadow: '0 0 35px rgba(69, 219, 125, 0.6), inset 0 0 20px rgba(222, 245, 79, 0.4)'
              }}
            >
              {/* Tire Skid Lines */}
              <div className="absolute top-[28%] left-0 right-0 h-1 bg-[#45db7d]/80 blur-[1px]" />
              <div className="absolute bottom-[28%] left-0 right-0 h-1 bg-[#45db7d]/80 blur-[1px]" />
            </div>

            {/* Top-View McLaren Supercar Asset */}
            <div
              ref={carRef}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 will-change-transform flex items-center"
              style={{
                height: '125px',
                width: '220px'
              }}
            >
              {/* Afterburner / Exhaust Flame Effect */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 -translate-x-full flex items-center pointer-events-none">
                <div className="w-10 h-3.5 bg-gradient-to-l from-[#45db7d] to-transparent rounded-full blur-xs opacity-75 animate-pulse" />
              </div>

              {/* McLaren Supercar Image */}
              <img
                src="./car.png"
                alt="McLaren 720S High Performance Supercar"
                className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.9)] transition-all duration-300"
                style={{
                  filter: carFilterStyle
                }}
                loading="eager"
              />

              {/* Headlight Beams */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-40 h-24 pointer-events-none opacity-40">
                <div className="w-full h-full bg-gradient-to-r from-cyan-300/40 via-cyan-400/10 to-transparent clip-path-polygon" 
                  style={{
                    clipPath: 'polygon(0% 40%, 100% 0%, 100% 100%, 0% 60%)'
                  }}
                />
              </div>
            </div>

            {/* Bottom Curbs */}
            <div className="absolute bottom-0 left-0 right-0 h-2.5 road-curb-bottom opacity-80 shadow-xs" />
          </div>

          {/* Road Distance Ticks & Checkpoints */}
          <div className="hidden sm:flex justify-between items-center max-w-7xl mx-auto px-6 mt-1.5 text-[9px] font-mono text-slate-500">
            <span>GRID START /// 000M</span>
            <span>SECTOR 1 /// APEX</span>
            <span>SECTOR 2 /// NITROUS</span>
            <span>SECTOR 3 /// FINISH LINE</span>
          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM SECTION: Impact Metrics & Statistics (Requirement 1 & 2) */}
        {/* ========================================================= */}
        <div 
          ref={metricsContainerRef}
          className="relative z-10 pb-6 sm:pb-8 px-4 sm:px-6 max-w-7xl mx-auto w-full"
        >
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Metric Box 1 */}
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className={`p-3.5 sm:p-4 rounded-xl transition-all duration-500 border ${
                activeCards[0]
                  ? 'bg-[#def54f]/15 border-[#def54f] shadow-lg shadow-[#def54f]/20 scale-102'
                  : 'glass-panel border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className={`p-1.5 rounded-lg ${activeCards[0] ? 'bg-[#def54f] text-black' : 'bg-white/5 text-[#def54f]'}`}>
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${activeCards[0] ? 'bg-[#def54f] text-black' : 'bg-white/5 text-slate-400'}`}>
                  {activeCards[0] ? 'ACTIVATED' : 'SECTOR 1'}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
                <span className="text-[#def54f]">58%</span>
              </div>
              <p className="mt-0.5 text-[11px] sm:text-xs text-slate-300 font-medium leading-snug">
                Increase in pick up point use across global logistics hubs
              </p>
            </div>

            {/* Metric Box 2 */}
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className={`p-3.5 sm:p-4 rounded-xl transition-all duration-500 border ${
                activeCards[1]
                  ? 'bg-[#6ac9ff]/15 border-[#6ac9ff] shadow-lg shadow-[#6ac9ff]/20 scale-102'
                  : 'glass-panel border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className={`p-1.5 rounded-lg ${activeCards[1] ? 'bg-[#6ac9ff] text-black' : 'bg-white/5 text-[#6ac9ff]'}`}>
                  <PhoneOff className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${activeCards[1] ? 'bg-[#6ac9ff] text-black' : 'bg-white/5 text-slate-400'}`}>
                  {activeCards[1] ? 'ACTIVATED' : 'SECTOR 2'}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
                <span className="text-[#6ac9ff]">23%</span>
              </div>
              <p className="mt-0.5 text-[11px] sm:text-xs text-slate-300 font-medium leading-snug">
                Decrease in customer support escalation and call volumes
              </p>
            </div>

            {/* Metric Box 3 */}
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className={`p-3.5 sm:p-4 rounded-xl transition-all duration-500 border ${
                activeCards[2]
                  ? 'bg-[#45db7d]/15 border-[#45db7d] shadow-lg shadow-[#45db7d]/20 scale-102'
                  : 'glass-panel border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className={`p-1.5 rounded-lg ${activeCards[2] ? 'bg-[#45db7d] text-black' : 'bg-white/5 text-[#45db7d]'}`}>
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${activeCards[2] ? 'bg-[#45db7d] text-black' : 'bg-white/5 text-slate-400'}`}>
                  {activeCards[2] ? 'ACTIVATED' : 'SECTOR 3'}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
                <span className="text-[#45db7d]">27%</span>
              </div>
              <p className="mt-0.5 text-[11px] sm:text-xs text-slate-300 font-medium leading-snug">
                Acceleration in last-mile courier fulfillment speed
              </p>
            </div>

            {/* Metric Box 4 */}
            <div
              ref={(el) => (cardsRef.current[3] = el)}
              className={`p-3.5 sm:p-4 rounded-xl transition-all duration-500 border ${
                activeCards[3]
                  ? 'bg-[#fa7328]/15 border-[#fa7328] shadow-lg shadow-[#fa7328]/20 scale-102'
                  : 'glass-panel border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className={`p-1.5 rounded-lg ${activeCards[3] ? 'bg-[#fa7328] text-black' : 'bg-white/5 text-[#fa7328]'}`}>
                  <Smile className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${activeCards[3] ? 'bg-[#fa7328] text-black' : 'bg-white/5 text-slate-400'}`}>
                  {activeCards[3] ? 'ACTIVATED' : 'SECTOR 4'}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
                <span className="text-[#fa7328]">40%</span>
              </div>
              <p className="mt-0.5 text-[11px] sm:text-xs text-slate-300 font-medium leading-snug">
                Net gain in verified user satisfaction and digital retention
              </p>
            </div>

          </div>

          {/* Scroll Prompt Notice */}
          <div className="flex justify-center items-center gap-2 mt-2.5 text-slate-500 text-[11px] font-mono">
            <span className="animate-bounce">↓</span>
            <span>SCROLL DOWN TO ACCELERATE THROUGH THE TRAJECTORY</span>
            <span className="animate-bounce">↓</span>
          </div>

        </div>

      </div>

    </div>
  );
}
