import React, { useState, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { audioEngine } from './utils/audioEngine';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InteractiveControls from './components/InteractiveControls';
import ArchitectureSection from './components/ArchitectureSection';
import PerformanceSection from './components/PerformanceSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('itzfizz_theme') || 'dark';
  });
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [carColor, setCarColor] = useState('orange');
  const [scrubSmoothness, setScrubSmoothness] = useState(1.0);
  
  const [telemetry, setTelemetry] = useState({
    speed: 0,
    gear: 'N',
    rpm: 1000,
    progress: 0,
    throttle: 0
  });

  const autoCruiseTween = useRef(null);

  // Always reset scroll to top on refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Sync theme with DOM and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('itzfizz_theme', theme);
  }, [theme]);

  // Toggle Theme Handler
  const handleToggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Audio Toggle
  const handleToggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      audioEngine.setMuted(next);
      return next;
    });
  }, []);

  // Update telemetry and audio throttle
  const handleScrollTelemetry = useCallback((data) => {
    setTelemetry(data);
    audioEngine.setThrottle(data.throttle);
  }, []);

  // Reset Scroll
  const handleResetScroll = useCallback(() => {
    if (autoCruiseTween.current) {
      autoCruiseTween.current.kill();
      setIsPlayingAuto(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Auto Cruise Animation
  const handleAutoPlay = useCallback(() => {
    if (isPlayingAuto) {
      if (autoCruiseTween.current) {
        autoCruiseTween.current.kill();
      }
      setIsPlayingAuto(false);
      return;
    }

    setIsPlayingAuto(true);
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setMuted(false);
    }

    const maxScroll = window.innerHeight * 2.2;
    const currentScroll = window.scrollY;
    const target = currentScroll >= maxScroll ? 0 : maxScroll;

    const scrollObj = { y: window.scrollY };
    autoCruiseTween.current = gsap.to(scrollObj, {
      y: target,
      duration: 6.0,
      ease: 'power2.inOut',
      onUpdate: () => {
        window.scrollTo(0, scrollObj.y);
      },
      onComplete: () => {
        setIsPlayingAuto(false);
      }
    });
  }, [isPlayingAuto, isMuted]);

  // Scrub Slider Controller
  const handleScrubProgress = useCallback((fraction) => {
    const maxScroll = window.innerHeight * 2.2;
    const targetY = fraction * maxScroll;
    window.scrollTo({
      top: targetY,
      behavior: 'auto'
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0c10] text-slate-900 dark:text-[#f8fafc] relative font-sans selection:bg-[#45db7d] selection:text-black transition-colors duration-200">
      
      {/* Top Fixed Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onAutoPlay={handleAutoPlay}
        isPlayingAuto={isPlayingAuto}
        onResetScroll={handleResetScroll}
        scrollProgress={telemetry.progress}
      />

      <main className="relative">
        {/* Core Hero Section (Scroll-driven supercar animation) */}
        <HeroSection
          theme={theme}
          onScrollTelemetry={handleScrollTelemetry}
          carColor={carColor}
          scrubSmoothness={scrubSmoothness}
        />

        {/* Interactive Controls & Customization */}
        <InteractiveControls
          theme={theme}
          carColor={carColor}
          onSelectColor={setCarColor}
          scrubSmoothness={scrubSmoothness}
          onSelectScrub={setScrubSmoothness}
          scrollProgress={telemetry.progress}
          onScrubProgress={handleScrubProgress}
        />

        {/* Engineering & Architecture Breakdown */}
        <ArchitectureSection theme={theme} />

        {/* Performance Benchmarks & Tech Stack */}
        <PerformanceSection theme={theme} />
      </main>

      {/* Footer with Assignment Details */}
      <Footer theme={theme} onResetScroll={handleResetScroll} />

    </div>
  );
}
