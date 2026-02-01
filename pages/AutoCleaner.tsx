
import React, { useState, useEffect, useRef } from 'react';
import { audioService } from '../services/audio';

interface AutoCleanerProps {
  onBack: () => void;
  onFinish: () => void;
}

const AutoCleaner: React.FC<AutoCleanerProps> = ({ onBack, onFinish }) => {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFreq, setCurrentFreq] = useState(165);
  const timerRef = useRef<number | null>(null);

  const startCleaning = () => {
    setIsActive(true);
    setProgress(0);
    audioService.startFrequency(165);
  };

  const stopCleaning = () => {
    setIsActive(false);
    audioService.stop();
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            stopCleaning();
            onFinish();
            return 100;
          }
          // Sweep frequency from 165Hz to 1000Hz
          const newFreq = 165 + (prev * 8.35);
          setCurrentFreq(Math.round(newFreq));
          audioService.updateFrequency(newFreq);
          return prev + 1;
        });
      }, 300); // ~30 second cycle
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div className="h-full px-6 flex flex-col items-center justify-center max-w-lg mx-auto pb-20">
      <div className="relative mb-16 flex items-center justify-center">
        {/* Animated Rings */}
        {isActive && (
          <>
            <div className="absolute w-64 h-64 border-2 border-blue-500/20 rounded-full animate-ping"></div>
            <div className="absolute w-70 h-70 border border-blue-500/10 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </>
        )}
        
        <div className="relative glass w-64 h-64 rounded-full flex flex-col items-center justify-center glow-blue border-white/10 z-10 transition-all duration-500">
           <span className="text-6xl font-bold tracking-tighter tabular-nums">
             {progress}%
           </span>
           <span className="text-blue-400 font-medium text-xs tracking-widest mt-2 uppercase">
             {isActive ? 'Cleaning...' : 'Ready'}
           </span>
        </div>
      </div>

      <div className="w-full space-y-8">
        <div className="text-center">
           <p className="text-gray-400 font-mono">{currentFreq} Hz</p>
           <p className="text-xs text-gray-500 mt-1">High-Impact Sonic Waves</p>
        </div>

        <button 
          onClick={isActive ? stopCleaning : startCleaning}
          className={`w-full py-6 rounded-[32px] text-lg font-bold tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 ${
            isActive ? 'bg-red-500 shadow-lg shadow-red-500/20' : 'bg-blue-600 shadow-lg shadow-blue-600/20'
          }`}
        >
          {isActive ? (
            <>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><rect x="5" y="5" width="10" height="10" /></svg>
              STOP
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M6 4l10 6-10 6V4z" /></svg>
              START AUTO CLEAN
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AutoCleaner;
