// Lightweight Web Audio API synthesizer for tactile UI micro-sounds
// Zero external audio assets required — pure client-side waveform synthesis.

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.enabled = false;

    if (typeof window !== "undefined") {
      this.enabled = localStorage.getItem("portfolio_sound") === "true";
    }
  }

  init() {
    if (!this.audioCtx && typeof window !== "undefined") {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_sound", String(this.enabled));
    }
    if (this.enabled) {
      this.init();
      this.playBeep(660, 0.08, "sine");
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  playBeep(freq = 440, duration = 0.05, type = "sine", gainVal = 0.03) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // Graceful fallback
    }
  }

  click() {
    this.playBeep(700, 0.04, "triangle", 0.02);
  }

  hover() {
    this.playBeep(480, 0.03, "sine", 0.01);
  }

  toggleTheme() {
    if (!this.enabled) return;
    this.playBeep(520, 0.05, "sine", 0.02);
    setTimeout(() => this.playBeep(780, 0.07, "sine", 0.02), 50);
  }

  commandOpen() {
    if (!this.enabled) return;
    this.playBeep(440, 0.04, "sine", 0.02);
    setTimeout(() => this.playBeep(880, 0.06, "sine", 0.02), 40);
  }
}

export const sound = new SoundEngine();
