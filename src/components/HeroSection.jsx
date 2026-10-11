import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  TrendingUp, 
  PhoneOff, 
  Zap, 
  Smile 
} from 'lucide-react';
import TelemetryHUD from './TelemetryHUD';

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
  theme = 'dark',
  onScrollTelemetry, 
  carColor = 'orange', 
  scrubSmoothness = 1.0 
}) {
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const headlineRef = useRef(null);
  const lettersRef = useRef([]);
  const metricsContainerRef = useRef(null);
  const cardsRef = useRef([]);

  // Telemetry state for integrated cockpit HUD
  const [telemetry, setTelemetry] = useState({
    speed: 0,
    gear: 'N',
    rpm: 1000
  });

  // Track which letters have been passed by the car
  const passedLettersRef = useRef(new Array(HEADLINE_LETTERS.length).fill(false));

  // Active status of each metric box based on scroll progress
  const [activeCards, setActiveCards] = useState([false, false, false, false]);

  // Car customizer styles
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
        return 'none';
    }
  }, [carColor]);

  // Apply letter style helper
  const styleLetter = (el, isPassed, darkMode) => {
    if (!el) return;
    if (isPassed) {
      el.style.opacity = '1';
      if (darkMode) {
        el.style.color = '#def54f';
        el.style.textShadow = '0 0 25px rgba(222, 245, 79, 0.95), 0 0 45px rgba(69, 219, 125, 0.7)';
      } else {
        el.style.color = '#047857';
        el.style.textShadow = '0 0 16px rgba(4, 120, 87, 0.55), 0 0 30px rgba(16, 185, 129, 0.35)';
      }
      el.style.transform = 'scale(1.08) translateY(-2px)';
    } else {
      el.style.opacity = darkMode ? '0.45' : '0.65';
      el.style.color = darkMode ? '#f8fafc' : '#0f172a';
      el.style.textShadow = 'none';
      el.style.transform = 'scale(1) translateY(0px)';
    }
  };

  // Re-style letters immediately when theme changes without disturbing GSAP ScrollTrigger
  useEffect(() => {
    const letterEls = lettersRef.current.filter(Boolean);
    letterEls.forEach((el, idx) => {
      styleLetter(el, passedLettersRef.current[idx], isDark);
    });
  }, [isDark]);

  // GSAP ScrollTrigger timeline setup
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const road = roadRef.current;
    const car = carRef.current;
    const trail = trailRef.current;
    const letterEls = lettersRef.current.filter(Boolean);
    const cardEls = cardsRef.current.filter(Boolean);

    if (!section || !track || !road || !car) return;

    // 1. Initial entrance animations
    const introCtx = gsap.context(() => {
      gsap.fromTo(
        letterEls,
        { opacity: 0, y: 25, scale: 0.9, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.85,
          stagger: 0.03,
          ease: 'power3.out',
          delay: 0.1,
          onComplete: () => {
            letterEls.forEach((el, idx) => {
              styleLetter(el, passedLettersRef.current[idx], isDark);
            });
          }
        }
      );

      gsap.fromTo(
        road,
        { opacity: 0, scaleY: 0.88 },
        { opacity: 1, scaleY: 1, duration: 0.9, ease: 'expo.out', delay: 0.25 }
      );

      gsap.fromTo(
        car,
        { opacity: 0, x: -70 },
        { opacity: 1, x: 0, duration: 0.85, ease: 'back.out(1.2)', delay: 0.45 }
      );

      gsap.fromTo(
        cardEls,
        { opacity: 0, y: 20, scale: 0.95, filter: 'blur(4px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.65, stagger: 0.1, ease: 'power2.out', delay: 0.55 }
      );
    }, section);

    // 2. Precompute geometry
    const computeMetrics = () => {
      const roadW = road.offsetWidth;
      const carW = car.offsetWidth || 180;
      const calculatedEndX = roadW - carW - 12;
      const roadRect = road.getBoundingClientRect();

      const calculatedPositions = letterEls.map(el => {
        const rect = el.getBoundingClientRect();
        return rect.left - roadRect.left + (rect.width * 0.5);
      });

      return { calculatedEndX, calculatedPositions, carW };
    };

    let { calculatedEndX, calculatedPositions, carW } = computeMetrics();

    const handleResize = () => {
      const updated = computeMetrics();
      calculatedEndX = updated.calculatedEndX;
      calculatedPositions = updated.calculatedPositions;
      carW = updated.carW;
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Velocity tracking
    let lastTime = performance.now();
    let lastScrollY = window.scrollY;

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=240%',
        pin: track,
        scrub: scrubSmoothness,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentX = progress * calculatedEndX;

          // GPU transform
          gsap.set(car, { x: currentX, force3D: true });

          const carFront = currentX + (carW * 0.72);
          gsap.set(trail, { width: Math.max(0, carFront), force3D: true });

          // Letter ignition
          letterEls.forEach((el, idx) => {
            const letterX = calculatedPositions[idx];
            const isPassed = carFront >= letterX;
            passedLettersRef.current[idx] = isPassed;
            styleLetter(el, isPassed, document.documentElement.classList.contains('dark'));
          });

          // Milestone triggers
          setActiveCards([
            progress >= 0.15,
            progress >= 0.38,
            progress >= 0.62,
            progress >= 0.85
          ]);

          // Telemetry
          const now = performance.now();
          const dt = Math.max((now - lastTime) / 1000, 0.016);
          const scrollDelta = Math.abs(window.scrollY - lastScrollY);
          lastTime = now;
          lastScrollY = window.scrollY;

          const rawSpeed = (scrollDelta / dt) * 0.18;
          const speed = Math.min(320, Math.max(0, rawSpeed + (progress > 0.03 ? 28 : 0)));
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

          setTelemetry({ speed, gear, rpm });

          if (onScrollTelemetry) {
            onScrollTelemetry({ speed, gear, rpm, progress, throttle });
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
    <div ref={sectionRef} className="relative w-full h-[320vh] bg-slate-50 dark:bg-[#0b0c10] transition-colors duration-300">
      
      {/* Pinned Stage Container (Managed cleanly by GSAP ScrollTrigger) */}
      <div 
        ref={trackRef} 
        className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-50 dark:bg-[#0b0c10] select-none transition-colors duration-300"
      >
        
        {/* Ambient Grid Background */}
        <div className="absolute inset-0 cyber-grid opacity-35 dark:opacity-25 pointer-events-none z-0" />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#45db7d]/15 dark:bg-[#45db7d]/10 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#def54f]/15 dark:bg-[#def54f]/10 rounded-full blur-3xl pointer-events-none z-0" />

        {/* ========================================================= */}
        {/* 1. TOP SECTION: Headline & Mission Statement (Above Fold) */}
        {/* ========================================================= */}
        <div className="relative z-10 pt-20 sm:pt-24 px-3 sm:px-6 max-w-7xl mx-auto w-full text-center">
          
          {/* Subtitle Badge */}
          <div 
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1 rounded-full border text-[10px] sm:text-[11px] font-mono mb-1.5 sm:mb-2 shadow-xs transition-colors"
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1',
              color: isDark ? '#e2e8f0' : '#0f172a'
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] dark:bg-[#45db7d] animate-ping" />
            <span className="text-[#15803d] dark:text-[#45db7d] font-bold">NEXT-GEN INTERACTION</span>
            <span className="text-slate-400 dark:text-slate-500">•</span>
            <span className="font-semibold">SCROLL-DRIVEN ARCHITECTURE</span>
          </div>

          {/* Letter-Spaced Headline (High Contrast Single Line) */}
          <h1 
            ref={headlineRef}
            aria-label="WELCOME ITZFIZZ"
            className="flex flex-nowrap whitespace-nowrap justify-center items-center text-[clamp(1.15rem,4.2vw,3.75rem)] font-black tracking-[clamp(0.08em,1.3vw,0.32em)] uppercase font-heading transition-all duration-300 select-none overflow-visible leading-none my-1"
          >
            {HEADLINE_LETTERS.map((item, index) => (
              <span
                key={item.id}
                ref={(el) => (lettersRef.current[index] = el)}
                className="inline-block transition-all duration-150 ease-out will-change-transform font-black"
                style={{
                  minWidth: item.char === '\u00A0' ? 'clamp(0.5rem, 1.2vw, 1.2rem)' : 'auto',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  opacity: isDark ? 0.45 : 0.65
                }}
              >
                {item.char}
              </span>
            ))}
          </h1>

          <p 
            className="text-[10px] sm:text-xs md:text-sm font-mono max-w-xl mx-auto font-semibold transition-colors"
            style={{ color: isDark ? '#94a3b8' : '#334155' }}
          >
            Scroll smoothly to ignite the telemetry engine and unroll the kinetic trajectory.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. MIDDLE SECTION: Road Track, McLaren Supercar, & Trail */}
        {/* ========================================================= */}
        <div className="relative z-10 w-full my-auto py-1">
          
          <div 
            ref={roadRef} 
            className="relative w-full h-[115px] sm:h-[145px] md:h-[165px] road-surface border-y-2 border-slate-700 dark:border-white/15 shadow-2xl flex items-center overflow-hidden"
          >
            {/* Top Curbs */}
            <div className="absolute top-0 left-0 right-0 h-2 sm:h-2.5 road-curb-top opacity-90 shadow-xs" />
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1.5 asphalt-line opacity-75" />

            {/* Glowing Kinetic Speed Trail */}
            <div 
              ref={trailRef}
              className="absolute left-0 top-0 bottom-0 pointer-events-none will-change-transform"
              style={{
                width: 0,
                background: isDark
                  ? 'linear-gradient(90deg, rgba(69, 219, 125, 0.15) 0%, rgba(69, 219, 125, 0.5) 70%, rgba(222, 245, 79, 0.9) 100%)'
                  : 'linear-gradient(90deg, rgba(16, 185, 129, 0.25) 0%, rgba(16, 185, 129, 0.65) 70%, rgba(22, 163, 74, 0.95) 100%)',
                boxShadow: isDark
                  ? '0 0 35px rgba(69, 219, 125, 0.6), inset 0 0 20px rgba(222, 245, 79, 0.4)'
                  : '0 0 30px rgba(16, 185, 129, 0.6), inset 0 0 15px rgba(22, 163, 74, 0.4)'
              }}
            >
              <div className="absolute top-[28%] left-0 right-0 h-1 bg-[#45db7d] blur-[0.5px]" />
              <div className="absolute bottom-[28%] left-0 right-0 h-1 bg-[#45db7d] blur-[0.5px]" />
            </div>

            {/* Top-View McLaren Supercar */}
            <div
              ref={carRef}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 will-change-transform flex items-center"
              style={{
                height: 'clamp(75px, 11vw, 120px)',
                width: 'clamp(130px, 20vw, 215px)'
              }}
            >
              {/* Afterburner Flame */}
              <div className="absolute left-1 top-1/2 -translate-y-1/2 -translate-x-full flex items-center pointer-events-none">
                <div className="w-8 sm:w-10 h-3 bg-gradient-to-l from-[#45db7d] to-transparent rounded-full blur-xs opacity-85 animate-pulse" />
              </div>

              {/* McLaren Car Image */}
              <img
                src="./car.png"
                alt="McLaren 720S Supercar"
                className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.9)] transition-all duration-300"
                style={{
                  filter: carFilterStyle
                }}
                loading="eager"
              />

              {/* Headlight Beam */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-28 sm:w-36 h-20 pointer-events-none opacity-40">
                <div 
                  className="w-full h-full bg-gradient-to-r from-cyan-300/40 via-cyan-400/10 to-transparent" 
                  style={{
                    clipPath: 'polygon(0% 40%, 100% 0%, 100% 100%, 0% 60%)'
                  }}
                />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-2 sm:h-2.5 road-curb-bottom opacity-90 shadow-xs" />
          </div>

          {/* Distance Ticks */}
          <div 
            className="hidden sm:flex justify-between items-center max-w-7xl mx-auto px-6 mt-1 text-[9px] font-mono font-bold"
            style={{ color: isDark ? '#94a3b8' : '#475569' }}
          >
            <span>GRID START /// 000M</span>
            <span>SECTOR 1 /// APEX</span>
            <span>SECTOR 2 /// NITROUS</span>
            <span>SECTOR 3 /// FINISH LINE</span>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 3. INTEGRATED COCKPIT TELEMETRY STRIP (ZERO OVERLAP!)     */}
        {/* ========================================================= */}
        <div className="relative z-10 px-3 sm:px-6 w-full my-1">
          <TelemetryHUD
            theme={theme}
            speed={telemetry.speed}
            gear={telemetry.gear}
            rpm={telemetry.rpm}
          />
        </div>

        {/* ========================================================= */}
        {/* 4. BOTTOM SECTION: Impact Metrics & Statistics Cards      */}
        {/* ========================================================= */}
        <div 
          ref={metricsContainerRef}
          className="relative z-10 pb-3 sm:pb-5 px-3 sm:px-6 max-w-7xl mx-auto w-full"
        >
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            
            {/* Metric Box 1 */}
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="p-3 sm:p-3.5 rounded-xl transition-all duration-300 border shadow-md"
              style={{
                backgroundColor: activeCards[0]
                  ? (isDark ? 'rgba(222, 245, 79, 0.15)' : '#fefce8')
                  : (isDark ? 'rgba(18, 22, 34, 0.9)' : '#ffffff'),
                borderColor: activeCards[0]
                  ? (isDark ? '#def54f' : '#eab308')
                  : (isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1')
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <div 
                  className="p-1 rounded-lg"
                  style={{
                    backgroundColor: activeCards[0]
                      ? (isDark ? '#def54f' : '#ca8a04')
                      : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'),
                    color: activeCards[0]
                      ? (isDark ? '#000000' : '#ffffff')
                      : (isDark ? '#def54f' : '#b45309')
                  }}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <span 
                  className="text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: activeCards[0]
                      ? (isDark ? '#def54f' : '#ca8a04')
                      : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'),
                    color: activeCards[0]
                      ? (isDark ? '#000000' : '#ffffff')
                      : (isDark ? '#94a3b8' : '#475569')
                  }}
                >
                  {activeCards[0] ? 'ACTIVE' : 'SECTOR 1'}
                </span>
              </div>
              <div 
                className="text-xl sm:text-2xl md:text-3xl font-black font-mono tracking-tight flex items-baseline gap-1"
                style={{ color: isDark ? '#def54f' : '#b45309' }}
              >
                58%
              </div>
              <p 
                className="mt-0.5 text-[10px] sm:text-[11px] font-semibold leading-snug"
                style={{ color: isDark ? '#cbd5e1' : '#1e293b' }}
              >
                Increase in pick up point use across global logistics hubs
              </p>
            </div>

            {/* Metric Box 2 */}
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="p-3 sm:p-3.5 rounded-xl transition-all duration-300 border shadow-md"
              style={{
                backgroundColor: activeCards[1]
                  ? (isDark ? 'rgba(106, 201, 255, 0.15)' : '#f0f9ff')
                  : (isDark ? 'rgba(18, 22, 34, 0.9)' : '#ffffff'),
                borderColor: activeCards[1]
                  ? (isDark ? '#6ac9ff' : '#0284c7')
                  : (isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1')
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <div 
                  className="p-1 rounded-lg"
                  style={{
                    backgroundColor: activeCards[1]
                      ? (isDark ? '#6ac9ff' : '#0284c7')
                      : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'),
                    color: activeCards[1]
                      ? (isDark ? '#000000' : '#ffffff')
                      : (isDark ? '#6ac9ff' : '#0284c7')
                  }}
                >
                  <PhoneOff className="w-3.5 h-3.5" />
                </div>
                <span 
                  className="text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: activeCards[1]
                      ? (isDark ? '#6ac9ff' : '#0284c7')
                      : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'),
                    color: activeCards[1]
                      ? (isDark ? '#000000' : '#ffffff')
                      : (isDark ? '#94a3b8' : '#475569')
                  }}
                >
                  {activeCards[1] ? 'ACTIVE' : 'SECTOR 2'}
                </span>
              </div>
              <div 
                className="text-xl sm:text-2xl md:text-3xl font-black font-mono tracking-tight flex items-baseline gap-1"
                style={{ color: isDark ? '#6ac9ff' : '#0284c7' }}
              >
                23%
              </div>
              <p 
                className="mt-0.5 text-[10px] sm:text-[11px] font-semibold leading-snug"
                style={{ color: isDark ? '#cbd5e1' : '#1e293b' }}
              >
                Decrease in customer support escalation and call volumes
              </p>
            </div>

            {/* Metric Box 3 */}
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="p-3 sm:p-3.5 rounded-xl transition-all duration-300 border shadow-md"
              style={{
                backgroundColor: activeCards[2]
                  ? (isDark ? 'rgba(69, 219, 125, 0.15)' : '#ecfdf5')
                  : (isDark ? 'rgba(18, 22, 34, 0.9)' : '#ffffff'),
                borderColor: activeCards[2]
                  ? (isDark ? '#45db7d' : '#10b981')
                  : (isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1')
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <div 
                  className="p-1 rounded-lg"
                  style={{
                    backgroundColor: activeCards[2]
                      ? (isDark ? '#45db7d' : '#15803d')
                      : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'),
                    color: activeCards[2]
                      ? (isDark ? '#000000' : '#ffffff')
                      : (isDark ? '#45db7d' : '#15803d')
                  }}
                >
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span 
                  className="text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: activeCards[2]
                      ? (isDark ? '#45db7d' : '#15803d')
                      : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'),
                    color: activeCards[2]
                      ? (isDark ? '#000000' : '#ffffff')
                      : (isDark ? '#94a3b8' : '#475569')
                  }}
                >
                  {activeCards[2] ? 'ACTIVE' : 'SECTOR 3'}
                </span>
              </div>
              <div 
                className="text-xl sm:text-2xl md:text-3xl font-black font-mono tracking-tight flex items-baseline gap-1"
                style={{ color: isDark ? '#45db7d' : '#15803d' }}
              >
                27%
              </div>
              <p 
                className="mt-0.5 text-[10px] sm:text-[11px] font-semibold leading-snug"
                style={{ color: isDark ? '#cbd5e1' : '#1e293b' }}
              >
                Acceleration in last-mile courier fulfillment speed
              </p>
            </div>

            {/* Metric Box 4 */}
            <div
              ref={(el) => (cardsRef.current[3] = el)}
              className="p-3 sm:p-3.5 rounded-xl transition-all duration-300 border shadow-md"
              style={{
                backgroundColor: activeCards[3]
                  ? (isDark ? 'rgba(250, 115, 40, 0.15)' : '#fff7ed')
                  : (isDark ? 'rgba(18, 22, 34, 0.9)' : '#ffffff'),
                borderColor: activeCards[3]
                  ? (isDark ? '#fa7328' : '#f97316')
                  : (isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1')
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <div 
                  className="p-1 rounded-lg"
                  style={{
                    backgroundColor: activeCards[3]
                      ? (isDark ? '#fa7328' : '#c2410c')
                      : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'),
                    color: activeCards[3]
                      ? (isDark ? '#000000' : '#ffffff')
                      : (isDark ? '#fa7328' : '#c2410c')
                  }}
                >
                  <Smile className="w-3.5 h-3.5" />
                </div>
                <span 
                  className="text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: activeCards[3]
                      ? (isDark ? '#fa7328' : '#c2410c')
                      : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'),
                    color: activeCards[3]
                      ? (isDark ? '#000000' : '#ffffff')
                      : (isDark ? '#94a3b8' : '#475569')
                  }}
                >
                  {activeCards[3] ? 'ACTIVE' : 'SECTOR 4'}
                </span>
              </div>
              <div 
                className="text-xl sm:text-2xl md:text-3xl font-black font-mono tracking-tight flex items-baseline gap-1"
                style={{ color: isDark ? '#fa7328' : '#c2410c' }}
              >
                40%
              </div>
              <p 
                className="mt-0.5 text-[10px] sm:text-[11px] font-semibold leading-snug"
                style={{ color: isDark ? '#cbd5e1' : '#1e293b' }}
              >
                Net gain in verified user satisfaction and digital retention
              </p>
            </div>

          </div>

          {/* Scroll Prompt Notice */}
          <div 
            className="flex justify-center items-center gap-1.5 sm:gap-2 mt-2 text-[10px] sm:text-[11px] font-mono font-bold transition-colors"
            style={{ color: isDark ? '#94a3b8' : '#475569' }}
          >
            <span className="animate-bounce">↓</span>
            <span>SCROLL DOWN TO ACCELERATE THROUGH THE TRAJECTORY</span>
            <span className="animate-bounce">↓</span>
          </div>

        </div>

      </div>

    </div>
  );
}
