
import React, { useState } from 'react';
import { audioService } from '../services/audio';

interface TestSpeakerProps {
  onBack: () => void;
  onHome: () => void;
}

const TestSpeaker: React.FC<TestSpeakerProps> = ({ onHome }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const testSpeaker = () => {
    setIsPlaying(true);
    // Play a series of pleasant test tones
    audioService.playTone(440, 0.5);
    setTimeout(() => audioService.playTone(660, 0.5), 600);
    setTimeout(() => audioService.playTone(880, 0.5), 1200);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <div className="h-full px-6 flex flex-col items-center justify-center max-w-lg mx-auto pb-20">
      <div className="relative mb-16">
        <div className={`w-50 h-50 rounded-full glass border-8 border-white/5 flex items-center justify-center transition-all duration-500 ${isPlaying ? 'scale-110 border-orange-500/50' : ''}`}>
          <div className={`w-48 h-48 rounded-full bg-gradient-to-br from-slate-800 to-black flex items-center justify-center shadow-2xl relative overflow-hidden ${isPlaying ? 'animate-pulse' : ''}`}>
             <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-white/10 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-slate-800"></div>
             </div>
             {isPlaying && (
                <div className="absolute inset-0 bg-orange-500/10 animate-pulse"></div>
             )}
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <p className="text-orange-400 font-medium mb-2 italic">If sound still muffled</p>
        <p className="text-gray-500 text-sm">Retry with a different method or different frequency.</p>
      </div>

      <div className="w-full space-y-4">
        <button 
          onClick={testSpeaker}
          disabled={isPlaying}
          className="w-full py-6 rounded-[32px] bg-blue-600 text-lg font-bold tracking-widest transition-all active:scale-95 disabled:opacity-50"
        >
          CHECK SOUND
        </button>
        <button 
          onClick={onHome}
          className="w-full py-6 rounded-[32px] glass text-lg font-bold tracking-widest transition-all active:scale-95 text-gray-400"
        >
          HOME
        </button>
      </div>
    </div>
  );
};

export default TestSpeaker;
