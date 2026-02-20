
import React, { useState, useEffect } from 'react';
import { GlassHeader, Dock, InfoDrawer } from './components/Layout';
import { WebpagesView, WebappsView, WebtoolsView, ArticlesView, SplashView, ProfileView } from './components/Views';
import { CommandPalette } from './components/CommandPalette';
import { LiquidBackground } from './components/LiquidBackground';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Category } from './types';
import { DRAWER_CONTENT } from './constants';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('home');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Weather State
  const [weather, setWeather] = useState<{ temp: number | null; loading: boolean }>({ temp: null, loading: true });

  const currentPath = DRAWER_CONTENT[activeCategory]?.path || 'root';

  // Fetch Weather
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`
            );
            const data = await res.json();
            setWeather({ temp: Math.round(data.current.temperature_2m), loading: false });
          } catch (e) {
            console.error('Weather fetch failed', e);
            setWeather({ temp: null, loading: false });
          }
        },
        (error) => {
          console.warn('Geolocation denied or failed', error);
          setWeather({ temp: null, loading: false });
        }
      );
    } else {
      setWeather({ temp: null, loading: false });
    }
  }, []);

  // Keyboard hooks
  useKeyboardShortcuts({
    onTogglePalette: () => setIsPaletteOpen(prev => !prev),
    onSearch: () => setIsPaletteOpen(true),
    onSwitchCategory: (c) => setActiveCategory(c as Category),
  });

  return (
    <>
      <LiquidBackground />
      
      <div className="flex h-screen w-screen relative z-10 overflow-hidden font-sans selection:bg-pink-500/30 selection:text-pink-100">
        
        <GlassHeader 
          onNavigate={setActiveCategory}
          onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
          onToggleSearch={() => setIsPaletteOpen(true)}
          weather={weather}
        />

        {/* Main Desktop Area */}
        <main className="relative w-full h-full flex items-center justify-center p-4">
          
          {/* Main "Safari Window" Container 
              Increased size to be more substantial and square-like.
              Removed excessive padding from main wrapper to ensure centering.
          */}
          <div className="relative w-full max-w-[1000px] h-[85vh] max-h-[1000px] aspect-[1/1] md:aspect-auto p-[1px] rounded-[2.5rem] bg-gradient-to-br from-pink-500 via-blue-500 to-green-500 animate-in zoom-in-95 duration-500 shadow-2xl mx-auto my-auto">
             <div className="w-full h-full bg-[#0c0c0c]/80 backdrop-blur-md rounded-[2.5rem] overflow-hidden flex flex-col relative">
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide scroll-smooth relative">
                  {activeCategory === 'home' && <SplashView onNavigate={setActiveCategory} />}
                  {activeCategory === 'about' && <ProfileView />}
                  {activeCategory === 'webpages' && <WebpagesView />}
                  {activeCategory === 'webapps' && <WebappsView />}
                  {activeCategory === 'webtools' && <WebtoolsView />}
                  {activeCategory === 'articles' && <ArticlesView />}
                </div>

                {/* Bottom Right Status Status - Inside Container */}
                <div className="absolute bottom-6 right-8 pointer-events-none z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span className="text-[10px] font-mono text-zinc-500">{currentPath}</span>
                </div>

             </div>
          </div>

        </main>

        <InfoDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)}
          activeCategory={activeCategory}
        />

        <Dock 
          activeCategory={activeCategory} 
          onNavigate={setActiveCategory} 
        />

        <CommandPalette 
          isOpen={isPaletteOpen} 
          onClose={() => setIsPaletteOpen(false)} 
          onNavigate={setActiveCategory}
        />
      </div>
    </>
  );
};

export default App;
