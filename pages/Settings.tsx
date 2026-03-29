
import React from 'react';
import { Theme } from '../types';

interface SettingsProps {
  onBack: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  installAvailable?: boolean; // PWA: New prop to check if installation is possible
  onInstall?: () => void;      // PWA: Function to trigger install
  onDonate?: () => void;    // Function to navigate to Donate page
}

const Settings: React.FC<SettingsProps> = ({ theme, onToggleTheme, installAvailable, onInstall, onDonate }) => {
  return (
    <div className="h-full px-6 py-8 overflow-y-auto max-w-lg mx-auto">

      {/* DONATE PROMO SECTION */}
      <section className="mb-10">
        <h3 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-6">Support Us</h3>
        <div className="glass rounded-[32px] overflow-hidden p-6 border-blue-500/30 glow-blue">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-lg">Project Support</p>
                <p className="text-xs text-gray-400">We are dedicated to keeping your devices sounding their best. If ElitePhoneCleaner successfully restored your audio and saved you a trip to the repair shop, please consider leaving a small donation..</p>
              </div>
           </div>
           <button 
              onClick={onDonate}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold tracking-widest text-sm hover:from-blue-700 hover:to-indigo-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
           >
             DONATE NOW
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
           </button>
        </div>
      </section>
      
      {/* PWA INSTALL SECTION - Only shows if the browser supports it and app isn't installed */}
      {installAvailable && (
        <section className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-6">Experience</h3>
          <div className="glass rounded-[32px] overflow-hidden p-6 border-orange-500/30 glow-orange">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-lg">Add to Home Screen</p>
                  <p className="text-xs text-gray-400">Install ElitePhoneCleaner for faster access and offline cleaning.</p>
                </div>
             </div>
             <button 
                onClick={onInstall}
                className="w-full py-4 bg-orange-500 rounded-2xl font-bold tracking-widest text-sm hover:bg-orange-600 transition-colors active:scale-95 shadow-lg shadow-orange-500/20"
             >
               INSTALL NOW
             </button>
          </div>
        </section>
      )}

      <section className="mb-10">
        <h3 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-6">Display</h3>
        
        <div className="glass rounded-[32px] overflow-hidden divide-y divide-white/5">
          <button 
            onClick={onToggleTheme}
            className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-4">
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
              <div className="text-left">
                <p className="font-bold">Theme</p>
                <p className="text-xs text-gray-500">{theme === Theme.DARK ? 'Midnight (OLED)' : 'Slate Deep'}</p>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${theme === Theme.DARK ? 'bg-orange-500' : 'bg-slate-700'}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${theme === Theme.DARK ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
          </button>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-6">General</h3>
        <div className="glass rounded-[32px] overflow-hidden divide-y divide-white/5">
          <SettingsItem 
            icon={<SupportIcon />} 
            title="VIP Customer Support" 
            desc="Report bugs or suggest features" 
            color="text-blue-400" 
            bg="bg-blue-400/10"
          />
          <SettingsItem 
            icon={<RateIcon />} 
            title="Rate Us" 
            desc="Love the app? Give us 5 stars!" 
            color="text-amber-400" 
            bg="bg-amber-400/10"
          />
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

      <section className="mb-10">
        <h3 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-6">About</h3>
        <div className="glass rounded-[32px] overflow-hidden divide-y divide-white/5">
          <SettingsItem icon={<InfoIcon />} title="Privacy Policy" desc="Read our data policies" color="text-indigo-400" bg="bg-indigo-400/10" />
          <SettingsItem icon={<InfoIcon />} title="Terms Of Service" desc="Usage guidelines" color="text-slate-400" bg="bg-slate-400/10" />
          <div className="p-6 text-center">
            <p className="text-sm font-bold tracking-tight"><a href="https://stephubhq.netlify.app" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Stephub Labs</a></p>
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
    <div className={`w-10 h-10 rounded-2xl ${bg} ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div>
      <p className="font-bold">{title}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  </button>
);

const SupportIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const RateIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;
const ShareIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>;
const InfoIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export default Settings;
