import React, { useState, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { audioEngine } from './utils/audioEngine';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TelemetryHUD from './components/TelemetryHUD';
import InteractiveControls from './components/InteractiveControls';
import ArchitectureSection from './components/ArchitectureSection';
import PerformanceSection from './components/PerformanceSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
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
    // Unmute audio for immersive auto cruise if desired
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setMuted(false);
    }

    const maxScroll = window.innerHeight * 2.4;
    const currentScroll = window.scrollY;

    // Smooth cruise from current scroll to end of hero track
    const target = currentScroll >= maxScroll ? 0 : maxScroll;

    const scrollObj = { y: window.scrollY };
    autoCruiseTween.current = gsap.to(scrollObj, {
      y: target,
      duration: 6.5,
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
    const maxScroll = window.innerHeight * 2.4;
    window.scrollTo({
      top: fraction * maxScroll,
      behavior: 'auto'
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f8fafc] relative font-sans selection:bg-[#45db7d] selection:text-black">
      
      {/* Top Fixed Navbar */}
      <Navbar
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
          onScrollTelemetry={handleScrollTelemetry}
          carColor={carColor}
          scrubSmoothness={scrubSmoothness}
        />

        {/* Cockpit HUD Fixed Overlay during hero section */}
        <TelemetryHUD
          speed={telemetry.speed}
          gear={telemetry.gear}
          rpm={telemetry.rpm}
          progress={telemetry.progress}
        />

        {/* Interactive Controls & Customization */}
        <InteractiveControls
          carColor={carColor}
          onSelectColor={setCarColor}
          scrubSmoothness={scrubSmoothness}
          onSelectScrub={setScrubSmoothness}
          scrollProgress={telemetry.progress}
          onScrubProgress={handleScrubProgress}
        />

        {/* Engineering & Architecture Breakdown */}
        <ArchitectureSection />

        {/* Performance Benchmarks & Tech Stack */}
        <PerformanceSection />
      </main>

      {/* Footer with Assignment Details */}
      <Footer onResetScroll={handleResetScroll} />

    </div>
  );
}
