
import React, { useState } from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onSettings: () => void;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onSettings, onBack }) => {
  const isHome = currentView === 'HOME';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const viewTitles: Record<AppView, string> = {
    HOME: 'SonicPurge',
    AUTO: 'Auto Clean',
    MANUAL: 'Manual Control',
    VIBRATE: 'Vibrate Cleaner',
    TEST: 'Speaker Check',
    DONATE: 'Support Project',
    SETTINGS: 'Settings'
    
  };

  return (
    <header className="relative z-50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {!isHome && (
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent">
          {viewTitles[currentView]}
        </h1>
      </div>

      <div className="relative">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 glass rounded-2xl hover:bg-white/10 transition-all active:scale-90"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute right-0 mt-3 w-56 glass-dark rounded-3xl p-2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
              <button 
                onClick={() => { onSettings(); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 p-4 hover:bg-white/5 rounded-2xl transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="font-medium">Settings</span>
              </button>
              
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: 'SonicPurge', text: 'Clean your speaker with SonicPurge!', url: window.location.href });
                  }
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-4 hover:bg-white/5 rounded-2xl transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <span className="font-medium">Share App</span>
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
