
import React, { useEffect, useRef, useState } from 'react';
import { Search, Command, ArrowRight, FileText, Folder, Globe, Cpu, Wrench } from 'lucide-react';
import { Category } from '../types';
import { PROJECTS, ARTICLES } from '../constants';

interface PaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (c: Category) => void;
}

export const CommandPalette: React.FC<PaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNav = (c: Category) => {
    onNavigate(c);
    onClose();
  };

  // Filter Logic
  const filteredProjects = PROJECTS.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
  const filteredArticles = ARTICLES.filter(a => a.title.toLowerCase().includes(query.toLowerCase()));

  const navItems = [
    { id: 'home', icon: Globe },
    { id: 'about', icon: Folder },
    { id: 'webpages', icon: Globe },
    { id: 'webapps', icon: Cpu },
    { id: 'webtools', icon: Wrench },
    { id: 'articles', icon: FileText }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Gradient Border Wrapper */}
      <div className="relative w-full max-w-xl p-[1px] rounded-2xl bg-gradient-to-br from-pink-500 via-blue-500 to-green-500 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="w-full bg-[#1a1a1a] flex flex-col rounded-2xl overflow-hidden">
          <div className="flex items-center p-4 border-b border-white/10">
            <Search className="w-5 h-5 text-zinc-500 mr-3" />
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Search..."
              className="w-full bg-transparent border-none outline-none text-white placeholder:text-zinc-600 text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <kbd className="hidden md:block text-xs text-zinc-500 border border-zinc-700 px-2 py-1 rounded-md bg-white/5">ESC</kbd>
          </div>

          <div className="p-2 max-h-[60vh] overflow-y-auto">
            {/* Navigation */}
            <div className="text-[10px] font-mono text-zinc-600 px-3 py-2 uppercase tracking-widest">Jump To</div>
            {navItems.filter(i => i.id.includes(query.toLowerCase())).map((item) => {
               const Icon = item.icon;
               return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id as Category)}
                  className="w-full text-left px-3 py-3 text-zinc-400 hover:bg-white/5 hover:text-white flex items-center justify-between group transition-colors rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span className="capitalize">{item.id}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                </button>
               )
            })}
            
            {/* Projects Results */}
            {filteredProjects.length > 0 && (
              <>
                <div className="text-[10px] font-mono text-zinc-600 px-3 py-2 mt-2 uppercase tracking-widest">Web Apps</div>
                {filteredProjects.slice(0, 3).map(p => (
                   <button key={p.id} onClick={() => handleNav('webapps')} className="w-full text-left px-3 py-2 text-zinc-400 hover:bg-white/5 hover:text-white flex items-center gap-3 rounded-lg">
                     <Cpu className="w-4 h-4" />
                     <span>{p.title}</span>
                   </button>
                ))}
              </>
            )}

            {/* Articles Results */}
            {filteredArticles.length > 0 && (
              <>
                 <div className="text-[10px] font-mono text-zinc-600 px-3 py-2 mt-2 uppercase tracking-widest">Articles</div>
                 {filteredArticles.slice(0, 3).map(a => (
                   <button key={a.id} onClick={() => handleNav('articles')} className="w-full text-left px-3 py-2 text-zinc-400 hover:bg-white/5 hover:text-white flex items-center gap-3 rounded-lg">
                     <FileText className="w-4 h-4" />
                     <span>{a.title}</span>
                   </button>
                 ))}
              </>
            )}
          </div>
          
          <div className="bg-black/40 p-2 border-t border-white/5 flex justify-between items-center text-[10px] text-zinc-600 px-4">
            <div className="flex gap-4">
              <span>Use arrows to navigate</span>
              <span>Enter to select</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
