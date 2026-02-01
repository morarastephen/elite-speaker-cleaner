/**
 * Settings Page Component
 * 
 * Displays user settings and preferences including:
 * - Theme toggling (Dark/Light mode)
 * - Support and feedback options
 * - Rate and share functionality
 * - Privacy, terms, and version information
 */

import React from 'react';
import { Theme } from '../types';

/**
 * Props for the Settings component
 * @interface SettingsProps
 * @property {Function} onBack - Callback to navigate back to previous page
 * @property {Theme} theme - Current theme (DARK or LIGHT)
 * @property {Function} onToggleTheme - Callback to toggle between themes
 */
interface SettingsProps {
  onBack: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack, theme, onToggleTheme }) => {
  return (
    <div className="h-full px-6 py-8 overflow-y-auto max-w-lg mx-auto">
      {/* Display Settings Section */}
      <section className="mb-10">
        <h3 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-6">Display</h3>
        
        <div className="glass rounded-[32px] overflow-hidden divide-y divide-white/5">
          {/* Theme toggle button */}
          <button 
            onClick={onToggleTheme}
            className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Theme icon (moon for dark, sun for light) */}
              <div className="w-10 h-10 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                {theme === Theme.DARK ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14.5 12a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                )}
              </div>
              {/* Theme name and description */}
              <div className="text-left">
                <p className="font-bold">Theme</p>
                <p className="text-xs text-gray-500">{theme === Theme.DARK ? 'Midnight (OLED)' : 'Slate Deep'}</p>
              </div>
            </div>
            {/* Toggle switch indicator */}
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${theme === Theme.DARK ? 'bg-orange-500' : 'bg-slate-700'}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${theme === Theme.DARK ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
          </button>
        </div>
      </section>

      {/* General Settings Section */}
      <section className="mb-10">
        <h3 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-6">General</h3>
        <div className="glass rounded-[32px] overflow-hidden divide-y divide-white/5">
          {/* Customer support option */}
          <SettingsItem 
            icon={<SupportIcon />} 
            title="VIP Customer Support" 
            desc="Report bugs or suggest features" 
            color="text-blue-400" 
            bg="bg-blue-400/10"
          />
          {/* Rate the app option */}
          <SettingsItem 
            icon={<RateIcon />} 
            title="Rate Us" 
            desc="Love the app? Give us 5 stars!" 
            color="text-amber-400" 
            bg="bg-amber-400/10"
          />
          {/* Share app option with native share API */}
          <SettingsItem 
            icon={<ShareIcon />} 
            title="Share" 
            desc="Tell your friends about SonicPurge" 
            color="text-green-400" 
            bg="bg-green-400/10"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'SonicPurge', text: 'Clean your speaker!', url: window.location.href });
              }
            }}
          />
        </div>
      </section>

      {/* About Section */}
      <section className="mb-10">
        <h3 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-6">About</h3>
        <div className="glass rounded-[32px] overflow-hidden divide-y divide-white/5">
          {/* Privacy policy link */}
          <SettingsItem icon={<InfoIcon />} title="Privacy Policy" desc="Read our data policies" color="text-indigo-400" bg="bg-indigo-400/10" />
          {/* Terms of service link */}
          <SettingsItem icon={<InfoIcon />} title="Terms Of Service" desc="Usage guidelines" color="text-slate-400" bg="bg-slate-400/10" />
          {/* App information footer */}
          <div className="p-6 text-center">
            <p className="text-sm font-bold tracking-tight">SonicPurge Elite</p>
            <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-1">Version 2026.1.0</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const SettingsItem: React.FC<{
  icon: React.ReactNode; 
  title: string; 
  desc: string; 
  color: string; 
  bg: string;
  onClick?: () => void;
}> = ({ icon, title, desc, color, bg, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center gap-4 p-6 hover:bg-white/5 transition-colors text-left group">
    {/* Icon container with hover scale animation */}
    <div className={`w-10 h-10 rounded-2xl ${bg} ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    {/* Title and description text */}
    <div>
      <p className="font-bold">{title}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  </button>
);

/**
 * SupportIcon Component
 * SVG icon for customer support.
 */
const SupportIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;

/**
 * RateIcon Component
 * SVG icon for rating the app (star).
 */
const RateIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;

/**
 * ShareIcon Component
 * SVG icon for sharing the app.
 */
const ShareIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>;

/**
 * InfoIcon Component
 * SVG icon for information (used for privacy and terms).
 */
const InfoIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export default Settings;
