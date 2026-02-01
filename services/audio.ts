
/**
 * AUDIO SERVICE
 * This class handles the "Web Audio API", which is how browsers generate
 * raw sound waves without needing an external audio file.
 */
class AudioService {
  // The 'brain' of the audio system
  private context: AudioContext | null = null;
  // The source of the sound (the wave generator)
  private oscillator: OscillatorNode | null = null;
  // The volume control (gain)
  private gainNode: GainNode | null = null;

  /**
   * Initialize the AudioContext. 
   * Browsers require this to be created after a user interacts with the page.
   */
  private init() {
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  /**
   * Starts playing a continuous sound wave at a specific frequency.
   * @param freq - The frequency in Hertz (Hz). Lower = Bass, Higher = Treble.
   */
  public startFrequency(freq: number) {
    this.init();
    if (!this.context) return;

    // Stop any existing sound first to prevent overlapping noise
    this.stop();

    // Create the oscillator (the wave producer)
    this.oscillator = this.context.createOscillator();
    // Create the gain (the volume knob)
    this.gainNode = this.context.createGain();

    // 'sawtooth' waves have a sharp "jagged" shape.
    // This physical vibration is more effective at dislodging water/dust than a smooth 'sine' wave.
    this.oscillator.type = 'sawtooth';
    this.oscillator.frequency.setValueAtTime(freq, this.context.currentTime);

    // Fade the sound in slightly (0.1s) to avoid a "pop" sound when starting
    this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(0.8, this.context.currentTime + 0.1);

    // Connect the components: Oscillator -> Gain -> Speakers (destination)
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);

    this.oscillator.start();
  }

  /**
   * Smoothly changes the current sound frequency without stopping it.
   */
  public updateFrequency(freq: number) {
    if (this.oscillator && this.context) {
      // exponentialRamp makes the frequency change sound natural to the human ear
      this.oscillator.frequency.exponentialRampToValueAtTime(freq, this.context.currentTime + 0.05);
    }
  }

  /**
   * Fades out and stops the sound.
   */
  public stop() {
    if (this.oscillator && this.gainNode && this.context) {
      // Fade out volume to 0 over 0.1s
      this.gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.1);
      
      // Physically stop the oscillator and disconnect nodes after the fade-out
      setTimeout(() => {
        this.oscillator?.stop();
        this.oscillator?.disconnect();
        this.gainNode?.disconnect();
        this.oscillator = null;
        this.gainNode = null;
      }, 150);
    }
  }

  /**
   * Plays a quick notification-style tone.
   */
  public playTone(freq: number, duration: number) {
    this.init();
    if (!this.context) return;
    
    const osc = this.context.createOscillator();
    const g = this.context.createGain();
    
    osc.type = 'sine'; // Use a soft round wave for testing
    osc.frequency.setValueAtTime(freq, this.context.currentTime);
    
    g.gain.setValueAtTime(0.5, this.context.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);
    
    osc.connect(g);
    g.connect(this.context.destination);
    
    osc.start();
    osc.stop(this.context.currentTime + duration);
  }
}

// Export a single instance of the service (Singleton pattern)
export const audioService = new AudioService();
