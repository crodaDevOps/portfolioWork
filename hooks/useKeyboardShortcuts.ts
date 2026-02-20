
import { useEffect } from 'react';
import { Category } from '../types';

interface ShortcutsProps {
  onTogglePalette: () => void;
  onSearch: () => void;
  onSwitchCategory: (category: Category) => void;
}

export const useKeyboardShortcuts = ({
  onTogglePalette,
  onSearch,
  onSwitchCategory,
}: ShortcutsProps) => {
  useEffect(() => {
    let lastKey = '';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command Palette (Cmd+K or Ctrl+K)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onTogglePalette();
      }

      // Search (/)
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        onSearch();
      }

      // G-chord navigation (g then p/t/a/d)
      if (e.key === 'g' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        lastKey = 'g';
        return; // Wait for next key
      }

      if (lastKey === 'g') {
        switch (e.key) {
          case 'h': onSwitchCategory('home'); break;
          case 'u': onSwitchCategory('about'); break;
          case 'w': onSwitchCategory('webpages'); break;
          case 'a': onSwitchCategory('webapps'); break;
          case 't': onSwitchCategory('webtools'); break;
          case 'd': onSwitchCategory('articles'); break;
        }
        lastKey = ''; // Reset
      } else {
        lastKey = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTogglePalette, onSearch, onSwitchCategory]);
};
