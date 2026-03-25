/**
 * Home Page Component
 * 
 * Displays the main landing page with the app logo, instructions, 
 * and navigation buttons for the three cleaning modes:
 * - AUTO: Automatic cleaning with ultrasonic frequencies
 * - MANUAL: Manual control with adjustable parameters
 * - VIBRATE: Vibration-based cleaning for water/dust removal
 */

import React from 'react';
import { AppView } from '../types';

/**
 * Props for the Home component
 * @interface HomeProps
 * @property {Function} onNavigate - Callback function to navigate to different app views
 */
interface HomeProps {
  onNavigate: (view: AppView) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="h-full px-6 flex flex-col items-center justify-center max-w-lg mx-auto pb-20 overflow-y-auto">
      {/* Logo section with animated glow effect */}
<div className="relative mb-12 group pt-6 md:pt-10 lg:pt-14">        {/* Animated background blur effect */}
        <div className="absolute inset-0 bg-orange-500/30 blur-[50px] rounded-full group-hover:bg-orange-500/40 transition-all duration-500"></div>
        {/* Speaker icon with pulse animation */}
        <div className="relative glass w-24 h-24 rounded-[30px] flex items-center justify-center glow-orange border-white/10 animate-pulse-slow">
          <svg className="w-24 h-24 text-orange-500 drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2a3 3 0 013 3v7a3 3 0 01-6 0V5a3 3 0 013-3zM19 10v2a7 7 0 01-14 0v-2M12 19v3M8 22h8" />
          </svg>
        </div>
      </div>

      {/* Header and instructions section */}
      <div className="text-center space-y-4 mb-12 px-4">
        <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">Elite-Phone-Cleaner</p>
        <p className="text-gray-300 leading-relaxed italic">
          Elite-Phone-Cleaner is a professional-grade web utility designed to restore your audio to factory standards without touching a single tool. By leveraging specific ultrasonic frequencies and high-intensity vibration patterns, our app physically ejects water and debris from the inside out.
          1. Raise volume to the maximum.<br/>
          2. Position phone speaker facing downwards.
        </p>
      </div>

      {/* Three cleaning mode buttons grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {/* AUTO cleaning mode button */}
        <ModeButton 
          title="AUTO" 
          icon={<AutoIcon />} 
          onClick={() => onNavigate('AUTO')}
          color="bg-blue-600/20"
          accent="bg-blue-600"
          textColor="text-blue-400"
        />
        {/* MANUAL cleaning mode button */}
        <ModeButton 
          title="MANUAL" 
          icon={<ManualIcon />} 
          onClick={() => onNavigate('MANUAL')}
          color="bg-indigo-600/20"
          accent="bg-indigo-600"
          textColor="text-indigo-400"
        />
        {/* VIBRATE cleaning mode button */}
        <ModeButton 
          title="VIBRATE" 
          icon={<VibrateIcon />} 
          onClick={() => onNavigate('VIBRATE')}
          color="bg-purple-600/20"
          accent="bg-purple-600"
          textColor="text-purple-400"
        />
      </div>
    </div>
  );
};

/**
 * ModeButton Component
 * 
 * A reusable button component for selecting cleaning modes.
 * Features interactive hover and active states with customizable colors.
 * 
 * @param {string} title - The mode title (e.g., "AUTO", "MANUAL", "VIBRATE")
 * @param {React.ReactNode} icon - SVG icon to display
 * @param {Function} onClick - Callback when button is clicked
 * @param {string} color - Tailwind class for background color
 * @param {string} accent - Tailwind class for the title bar color
 * @param {string} textColor - Tailwind class for icon and text color
 */
const ModeButton: React.FC<{
  title: string; 
  icon: React.ReactNode; 
  onClick: () => void;
  color: string;
  accent: string;
  textColor: string;
}> = ({ title, icon, onClick, color, accent, textColor }) => (
  <button 
    onClick={onClick}
    className="group relative flex flex-col h-40 glass rounded-[32px] overflow-hidden transition-all hover:scale-[1.02] active:scale-95 border border-white/5"
  >
    {/* Icon container with hover scale animation */}
    <div className={`flex-1 flex items-center justify-center ${textColor}`}>
      <div className="transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
    </div>
    {/* Title bar with accent color */}
    <div className={`py-4 ${accent} text-white font-bold tracking-widest text-xs`}>
      {title}
    </div>
  </button>
);

/**
 * AutoIcon Component
 * 
 * SVG icon representing automatic/music mode cleaning.
 * Displays a musical note/waveform icon.
 */
const AutoIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
  </svg>
);

/**
 * ManualIcon Component
 * 
 * SVG icon representing manual control mode.
 * Displays a speaker/volume control icon.
 */
const ManualIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
  </svg>
);

/**
 * VibrateIcon Component
 * 
 * SVG icon representing vibration mode cleaning.
 * Displays a phone with vibration waves icon.
 */
const VibrateIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 10l-2 2 2 2M19 10l2 2-2 2" />
  </svg>
);

export default Home;
