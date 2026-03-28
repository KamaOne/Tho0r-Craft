import { useState, useEffect } from 'react';
import { Settings, Volume2, ZoomIn } from 'lucide-react';

const THEMES = [
  { id: 'sombre', label: 'Sombre' },
  { id: 'claire', label: 'Claire' },
  { id: 'system', label: 'Système' },
  { id: 'zen-vert-citron', label: 'Zen Vert citron pastel' },
  { id: 'zen-bleu-ocean', label: 'Zen bleu océan pastel' },
  { id: 'zen-citrouille', label: 'Zen citrouille pastel' },
  { id: 'zen-lilas', label: 'Zen lilas Pastel' },
  { id: 'zen-rose-vert', label: 'Zen rose et vert citron pastel' },
  { id: 'sepia', label: 'Sépia' },
  { id: 'zen-noir-rouge', label: 'Zen noir anthracite et rouge' },
  { id: 'zen-noir-vert', label: 'Zen Noir et vert électrique' },
];

export function ThemeSettings({
  isNarratorActive,
  setIsNarratorActive,
  isMagnifierActive,
  setIsMagnifierActive
}: {
  isNarratorActive: boolean;
  setIsNarratorActive: (v: boolean) => void;
  isMagnifierActive: boolean;
  setIsMagnifierActive: (v: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('sombre');

  useEffect(() => {
    const savedTheme = localStorage.getItem('promptcraft_theme') || 'sombre';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('promptcraft_theme', themeId);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs font-bold text-theme-accent border border-theme-border hover:bg-theme-accent/10 px-4 py-2 rounded-full transition-all flex items-center gap-2"
        title="Paramètres & Accessibilité"
      >
        <Settings className="w-4 h-4" /> PARAMÈTRES
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-72 glass-card rounded-2xl shadow-xl z-50 overflow-hidden border border-theme-border py-2 animate-in fade-in slide-in-from-top-2">
            
            <div className="px-4 py-2 border-b border-theme-border mb-2">
              <h3 className="text-sm font-bold text-theme-text uppercase tracking-widest">Accessibilité</h3>
            </div>
            <div className="px-4 py-2 flex flex-col gap-3 border-b border-theme-border mb-2">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2 text-theme-text text-sm">
                  <Volume2 className="w-4 h-4 text-theme-accent" />
                  Hildegarde (Narratrice)
                </div>
                <input 
                  type="checkbox" 
                  checked={isNarratorActive} 
                  onChange={(e) => setIsNarratorActive(e.target.checked)} 
                  className="w-4 h-4 rounded text-theme-accent bg-theme-panel border-theme-border" 
                />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2 text-theme-text text-sm">
                  <ZoomIn className="w-4 h-4 text-theme-accent" />
                  Loupe (Zoom UI)
                </div>
                <input 
                  type="checkbox" 
                  checked={isMagnifierActive} 
                  onChange={(e) => setIsMagnifierActive(e.target.checked)} 
                  className="w-4 h-4 rounded text-theme-accent bg-theme-panel border-theme-border" 
                />
              </label>
            </div>

            <div className="px-4 py-2 border-b border-theme-border mb-2">
              <h3 className="text-sm font-bold text-theme-text uppercase tracking-widest">Apparence</h3>
            </div>
            <div className="max-h-[40vh] overflow-y-auto">
              {THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => changeTheme(theme.id)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-theme-accent/10 ${currentTheme === theme.id ? 'text-theme-accent font-bold bg-theme-accent/5' : 'text-theme-muted'}`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
