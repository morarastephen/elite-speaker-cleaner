
import React, { useState, useEffect, useRef } from 'react';

interface VibrateCleanerProps {
  onBack: () => void;
  onFinish: () => void;
}

type Intensity = 'LOW' | 'MEDIUM' | 'HIGH';

const VibrateCleaner: React.FC<VibrateCleanerProps> = ({ onBack, onFinish }) => {
  const [isActive, setIsActive] = useState(false);
  const [intensity, setIntensity] = useState<Intensity>('HIGH');
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  const patterns: Record<Intensity, number[]> = {
    LOW: [100, 200],
    MEDIUM: [300, 100],
    HIGH: [1000, 50]
  };

  const startCleaning = () => {
    const supportsVibrate = typeof navigator !== 'undefined' && 'vibrate' in navigator && typeof (navigator as any).vibrate === 'function';
    setIsActive(true);
    setProgress(0);

    if (!supportsVibrate) {
      // Use audio fallback (low frequency tone) when vibration API unavailable.
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 60; // low-frequency buzz-like tone
        const gain = ctx.createGain();
        gain.gain.value = 0; // start silent
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        oscillatorRef.current = { osc, gain } as any;
        setUsingAudioFallback(true);
      } catch (e) {
        // If audio context cannot be created, notify user.
        alert('Vibration is not supported on this device/browser, and audio fallback failed. Try on a mobile device.');
        stopCleaning();
      }
    }
  };

  const stopCleaning = () => {
    setIsActive(false);
    navigator.vibrate(0);
    if (timerRef.current) clearInterval(timerRef.current);
    // stop audio fallback if active
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.gain.gain.value = 0;
        oscillatorRef.current.osc.stop();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch (e) {}
      audioCtxRef.current = null;
    }
    setUsingAudioFallback(false);
  };

  // refs for audio fallback
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<any | null>(null);
  const [usingAudioFallback, setUsingAudioFallback] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const pattern = patterns[intensity];

    if (usingAudioFallback && oscillatorRef.current && audioCtxRef.current) {
      // simulate vibration by toggling gain on/off according to pattern
      let idx = 0;
      const run = () => {
        const duration = pattern[idx % pattern.length];
        const isOn = idx % 2 === 0;
        if (isOn) {
          try { oscillatorRef.current.gain.gain.setTargetAtTime(0.08, audioCtxRef.current.currentTime, 0.01); } catch (e) {}
        } else {
          try { oscillatorRef.current.gain.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.01); } catch (e) {}
        }
        idx++;
        timerRef.current = window.setTimeout(() => {
          if (!isActive) return;
          run();
        }, duration);
      };
      run();
    } else {
      timerRef.current = window.setInterval(() => {
        try { navigator.vibrate(pattern); } catch (e) {}
      }, pattern.reduce((a, b) => a + b, 0));
    }

    // progress updater
    const progressTimer = window.setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          stopCleaning();
          onFinish();
          return 100;
        }
        return prev + 2;
      });
    }, 500);

    return () => {
      stopCleaning();
      clearInterval(progressTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, intensity, usingAudioFallback]);

  return (
    <div className="h-full px-6 flex flex-col items-center justify-center max-w-lg mx-auto pb-20">
      <div className="relative mb-16 flex items-center justify-center">
        {/* Animated Vibration Effect */}
        <div className={`transition-all duration-300 ${isActive ? 'animate-bounce' : ''}`}>
           <div className={`w-32 h-32 border-8 rounded-[40px] flex items-center justify-center text-2xl font-black transition-colors ${isActive ? 'border-purple-500 bg-purple-500/10 text-white' : 'border-slate-800 text-slate-700'}`}>
             {progress}%
           </div>
           
           {/* Visual waves */}
           {isActive && [1, 2, 3].map(i => (
             <div 
               key={i} 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-purple-500/30 rounded-[50px] animate-ping"
               style={{ animationDelay: `${i * 0.4}s` }}
             ></div>
           ))}
        </div>
      </div>

      <div className="w-full space-y-10">
        <div className="glass p-2 rounded-3xl flex items-center gap-1">
          {(['LOW', 'MEDIUM', 'HIGH'] as Intensity[]).map(level => (
            <button
              key={level}
              onClick={() => setIntensity(level)}
              className={`flex-1 py-3 px-4 rounded-2xl font-bold tracking-widest text-xs transition-all ${
                intensity === level ? 'bg-white text-black shadow-lg' : 'hover:bg-white/5 text-gray-500'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <button 
          onClick={isActive ? stopCleaning : startCleaning}
          className={`w-full py-6 rounded-[32px] text-lg font-bold tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 ${
            isActive ? 'bg-red-500 shadow-lg shadow-red-500/20' : 'bg-purple-600 shadow-lg shadow-purple-600/20'
          }`}
        >
          {isActive ? 'HALT VIBRATION' : 'START VIBRATE CLEAN'}
        </button>
      </div>
    </div>
  );
};

export default VibrateCleaner;
