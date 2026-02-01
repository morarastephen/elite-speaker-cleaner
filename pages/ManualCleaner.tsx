
import React, { useState, useEffect } from 'react';
import { audioService } from '../services/audio';

interface ManualCleanerProps {
  onBack: () => void;
}

const ManualCleaner: React.FC<ManualCleanerProps> = () => {
  // STATE: Track if sound is playing
  const [isActive, setIsActive] = useState(false);
  // STATE: The specific frequency selected by the user slider
  const [freq, setFreq] = useState(165);

  /**
   * Toggles the manual sound wave on or off.
   */
  const toggleCleaning = () => {
    if (isActive) {
      audioService.stop();
      setIsActive(false);
    } else {
      audioService.startFrequency(freq);
      setIsActive(true);
    }
  };

  /**
   * Updates the frequency state and changes the sound pitch in real-time.
   */
  const handleFreqChange = (newFreq: number) => {
    setFreq(newFreq);
    if (isActive) {
      // We call updateFrequency instead of startFrequency to keep the wave smooth
      audioService.updateFrequency(newFreq);
    }
  };

  // CLEANUP: Stop sound if user navigates away from this page
  useEffect(() => {
    return () => audioService.stop();
  }, []);

  return (
    <div className="h-full px-6 flex flex-col items-center justify-center max-w-lg mx-auto pb-20">
      {/* FREQUENCY DISPLAY: Large, bold text for a futuristic vibe */}
      <div className="mb-12 text-center">
        <div className="text-8xl font-black tracking-tighter text-indigo-500 tabular-nums mb-2">
          {freq}
        </div>
        <p className="text-indigo-300/60 font-medium tracking-widest uppercase text-xs">Target Frequency (Hz)</p>
      </div>

      <div className="w-full space-y-12">
        {/* SLIDER: Standard range input styled with Tailwind utility classes */}
        <div className="px-4">
          <input 
            type="range" 
            min="100" 
            max="1000" 
            step="1"
            value={freq}
            onChange={(e) => handleFreqChange(parseInt(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between mt-4 text-xs font-mono text-gray-500">
            <span>100Hz</span>
            <span>1000Hz</span>
          </div>
        </div>

        {/* TRIGGER BUTTON */}
        <button 
          onClick={toggleCleaning}
          className={`w-full py-6 rounded-[32px] text-lg font-bold tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 ${
            isActive ? 'bg-red-500 shadow-lg shadow-red-500/20' : 'bg-indigo-600 shadow-lg shadow-indigo-600/20'
          }`}
        >
          {isActive ? 'HALT WAVE' : 'INITIATE MANUAL PULSE'}
        </button>

        {/* USER TIP: Helps beginners understand the goal of frequencies */}
        <p className="text-center text-gray-500 text-sm italic px-8">
          Lower frequencies (165-250Hz) are best for water. Higher frequencies (500Hz+) are best for fine dust.
        </p>
      </div>
    </div>
  );
};

export default ManualCleaner;
