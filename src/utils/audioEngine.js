// Web Audio API Supercar Synthesizer
// Zero external files, pure browser synthesis with realistic RPM harmonics

class SupercarAudio {
  constructor() {
    this.ctx = null;
    this.oscMain = null;
    this.oscSub = null;
    this.gainNode = null;
    this.filterNode = null;
    this.isPlaying = false;
    this.isMuted = true;
    this.targetPitch = 65;
    this.currentPitch = 65;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // Master Gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

      // Low pass filter to give deep combustion body
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(450, this.ctx.currentTime);

      // Main V8 cylinder pulse oscillator (sawtooth)
      this.oscMain = this.ctx.createOscillator();
      this.oscMain.type = 'sawtooth';
      this.oscMain.frequency.setValueAtTime(65, this.ctx.currentTime);

      // Sub Rumble oscillator (triangle)
      this.oscSub = this.ctx.createOscillator();
      this.oscSub.type = 'triangle';
      this.oscSub.frequency.setValueAtTime(32.5, this.ctx.currentTime);

      this.oscMain.connect(this.filterNode);
      this.oscSub.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.oscMain.start();
      this.oscSub.start();
      this.isPlaying = true;
    } catch (e) {
      console.warn("AudioContext init prevented:", e);
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (!this.ctx && !muted) {
      this.init();
    }
    if (this.ctx && this.gainNode) {
      if (this.ctx.state === 'suspended' && !muted) {
        this.ctx.resume();
      }
      const targetVolume = muted ? 0 : 0.08;
      this.gainNode.gain.setTargetAtTime(targetVolume, this.ctx.currentTime, 0.05);
    }
  }

  // throttle: 0 to 1
  setThrottle(throttle) {
    if (this.isMuted || !this.ctx || !this.oscMain) return;

    // RPM mapping: 60Hz idle up to 260Hz redline
    const targetHz = 60 + Math.min(throttle * 220, 220);
    const filterHz = 400 + Math.min(throttle * 1400, 1400);

    const now = this.ctx.currentTime;
    this.oscMain.frequency.setTargetAtTime(targetHz, now, 0.06);
    this.oscSub.frequency.setTargetAtTime(targetHz * 0.5, now, 0.06);
    this.filterNode.frequency.setTargetAtTime(filterHz, now, 0.08);

    // Boost volume slightly during acceleration
    const volume = 0.07 + Math.min(throttle * 0.08, 0.08);
    this.gainNode.gain.setTargetAtTime(volume, now, 0.04);
  }
}

export const audioEngine = new SupercarAudio();
