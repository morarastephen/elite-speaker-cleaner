
import React, { useState, useEffect, useCallback } from 'react';
import { AppView, Theme } from './types';
import Header from './components/Header';
import Home from './pages/Home';
import AutoCleaner from './pages/AutoCleaner';
import ManualCleaner from './pages/ManualCleaner';
import VibrateCleaner from './pages/VibrateCleaner';
import TestSpeaker from './pages/TestSpeaker';
import Settings from './pages/Settings';

/**
 * MAIN APP COMPONENT
 * This acts as the central router for the application.
 * Also manages PWA install prompts and theme management.
 */
const App: React.FC = () => {
  // STATE: Keeps track of which page the user is looking at
  const [currentView, setCurrentView] = useState<AppView>('HOME');
  // STATE: Keeps track of visual theme (Dark vs Default)
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  // PWA STATE: Stores the beforeinstallprompt event
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  // PWA STATE: Tracks if the app is already installed
  const [isInstalled, setIsInstalled] = useState(false);

  // CALLBACK: Toggles the theme state. Wrapped in useCallback to prevent unnecessary re-renders.
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === Theme.DARK ? Theme.DEFAULT : Theme.DARK);
  }, []);

  // CALLBACK: Helper function to change views
  const navigate = useCallback((view: AppView) => {
    setCurrentView(view);
  }, []);

  // PWA CALLBACK: Triggers the install prompt
  const handleInstallClick = useCallback(async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setInstallPrompt(null);
      }
    }
  }, [installPrompt]);

  // EFFECT: Listen for beforeinstallprompt event (PWA)
  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // EFFECT: Updates the HTML body background color whenever the theme state changes
  useEffect(() => {
    const body = document.body;
    if (theme === Theme.DEFAULT) {
      body.style.backgroundColor = '#1a1a2e';
      body.classList.remove('bg-black');
    } else {
      body.style.backgroundColor = '#000';
      body.classList.add('bg-black');
    }
  }, [theme]);

  // RENDER LOGIC: Returns the component for the current page
  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <Home onNavigate={navigate} />;
      case 'AUTO':
        return <AutoCleaner onBack={() => navigate('HOME')} onFinish={() => navigate('TEST')} />;
      case 'MANUAL':
        return <ManualCleaner onBack={() => navigate('HOME')} />;
      case 'VIBRATE':
        return <VibrateCleaner onBack={() => navigate('HOME')} onFinish={() => navigate('TEST')} />;
      case 'TEST':
        return <TestSpeaker onBack={() => navigate('HOME')} onHome={() => navigate('HOME')} />;
      case 'SETTINGS':
        return <Settings onBack={() => navigate('HOME')} theme={theme} onToggleTheme={toggleTheme} installAvailable={!!installPrompt && !isInstalled} onInstall={handleInstallClick} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  }

  return (
    // Dynamic classes: Tailwind allows us to change styles based on variables like {theme}
    <div className={`min-h-screen flex flex-col text-white transition-all duration-700 ${theme === Theme.DARK ? 'bg-black' : 'bg-slate-900'}`}>
      <Header 
        currentView={currentView} 
        onNavigate={navigate} 
        onSettings={() => navigate('SETTINGS')} 
        onBack={() => navigate('HOME')}
      />
      
      {/* Viewport for the current page */}
      <main className="flex-1 overflow-hidden relative">
        {renderView()}
      </main>
      
      {/* 2026 DESIGN TREND: Ambient background glow. 
          Using blur-[100px] creates a soft "Spatial" UI feel. */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[100px] pointer-events-none rounded-full"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[100px] pointer-events-none rounded-full"></div>
    </div>
  );
};

export default App;
