import { useState, useEffect } from 'react';
import { Settings, Volume2, ZoomIn, Palette, Save, Trash2, Plus } from 'lucide-react';

const PRESET_THEMES = [
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

interface CustomThemeColors {
  bgApp: string;
  bgPanel: string;
  textMain: string;
  textMuted: string;
  accent: string;
  borderLight: string;
}

interface CustomTheme {
  id: string;
  label: string;
  colors: CustomThemeColors;
}

const DEFAULT_NEW_THEME: CustomThemeColors = {
  bgApp: '#1e1e2e',
  bgPanel: 'rgba(24, 24, 37, 0.8)',
  textMain: '#cdd6f4',
  textMuted: '#a6adc8',
  accent: '#cba6f7',
  borderLight: 'rgba(203, 166, 247, 0.3)',
};

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
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>([]);
  const [editingTheme, setEditingTheme] = useState<CustomTheme | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('promptcraft_theme') || 'sombre';
    const savedCustomThemes = localStorage.getItem('promptcraft_custom_themes');
    
    let loadedCustomThemes: CustomTheme[] = [];
    if (savedCustomThemes) {
      try {
        loadedCustomThemes = JSON.parse(savedCustomThemes);
        setCustomThemes(loadedCustomThemes);
      } catch (e) {
        console.error("Failed to parse custom themes");
      }
    } else {
      // Migrate old single custom theme if it exists
      const oldCustom = localStorage.getItem('promptcraft_custom_theme');
      if (oldCustom) {
        try {
          const parsedOld = JSON.parse(oldCustom);
          loadedCustomThemes = [{ id: 'custom-1', label: 'Custom Theme 1', colors: parsedOld }];
          setCustomThemes(loadedCustomThemes);
          localStorage.setItem('promptcraft_custom_themes', JSON.stringify(loadedCustomThemes));
        } catch (e) {}
      }
    }
    
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme, loadedCustomThemes);
  }, []);

  const applyTheme = (themeId: string, themesList: CustomTheme[], previewColors?: CustomThemeColors) => {
    const customTheme = themesList.find(t => t.id === themeId);
    
    if (previewColors || customTheme) {
      document.documentElement.setAttribute('data-theme', 'custom');
      const colors = previewColors || customTheme!.colors;
      document.documentElement.style.setProperty('--bg-app', colors.bgApp);
      document.documentElement.style.setProperty('--bg-panel', colors.bgPanel);
      document.documentElement.style.setProperty('--text-main', colors.textMain);
      document.documentElement.style.setProperty('--text-muted', colors.textMuted);
      document.documentElement.style.setProperty('--accent', colors.accent);
      document.documentElement.style.setProperty('--border-light', colors.borderLight);
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
      document.documentElement.style.removeProperty('--bg-app');
      document.documentElement.style.removeProperty('--bg-panel');
      document.documentElement.style.removeProperty('--text-main');
      document.documentElement.style.removeProperty('--text-muted');
      document.documentElement.style.removeProperty('--accent');
      document.documentElement.style.removeProperty('--border-light');
    }
  };

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem('promptcraft_theme', themeId);
    applyTheme(themeId, customThemes);
    setEditingTheme(null);
  };

  const handleCreateNewTheme = () => {
    const newTheme: CustomTheme = {
      id: `custom-${Date.now()}`,
      label: `My Theme ${customThemes.length + 1}`,
      colors: { ...DEFAULT_NEW_THEME }
    };
    setEditingTheme(newTheme);
    applyTheme(newTheme.id, customThemes, newTheme.colors);
  };

  const handleEditTheme = (theme: CustomTheme, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTheme(theme);
    setCurrentTheme(theme.id);
    applyTheme(theme.id, customThemes, theme.colors);
  };

  const handleDeleteTheme = (themeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedThemes = customThemes.filter(t => t.id !== themeId);
    setCustomThemes(updatedThemes);
    localStorage.setItem('promptcraft_custom_themes', JSON.stringify(updatedThemes));
    
    if (currentTheme === themeId || editingTheme?.id === themeId) {
      changeTheme('sombre');
    }
  };

  const handleEditingColorChange = (key: keyof CustomThemeColors, value: string) => {
    if (!editingTheme) return;
    const updatedTheme = {
      ...editingTheme,
      colors: { ...editingTheme.colors, [key]: value }
    };
    setEditingTheme(updatedTheme);
    applyTheme(updatedTheme.id, customThemes, updatedTheme.colors);
  };

  const handleEditingLabelChange = (label: string) => {
    if (!editingTheme) return;
    setEditingTheme({ ...editingTheme, label });
  };

  const saveEditingTheme = () => {
    if (!editingTheme) return;
    
    let updatedThemes;
    const existingIndex = customThemes.findIndex(t => t.id === editingTheme.id);
    
    if (existingIndex >= 0) {
      updatedThemes = [...customThemes];
      updatedThemes[existingIndex] = editingTheme;
    } else {
      updatedThemes = [...customThemes, editingTheme];
    }
    
    setCustomThemes(updatedThemes);
    localStorage.setItem('promptcraft_custom_themes', JSON.stringify(updatedThemes));
    
    setCurrentTheme(editingTheme.id);
    localStorage.setItem('promptcraft_theme', editingTheme.id);
    applyTheme(editingTheme.id, updatedThemes);
    
    setEditingTheme(null);
  };

  const cancelEditing = () => {
    setEditingTheme(null);
    applyTheme(currentTheme, customThemes);
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
          <div className="absolute right-0 mt-2 w-80 glass-card rounded-2xl shadow-xl z-50 overflow-hidden border border-theme-border py-2 animate-in fade-in slide-in-from-top-2">
            
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

            <div className="px-4 py-2 border-b border-theme-border mb-2 flex justify-between items-center">
              <h3 className="text-sm font-bold text-theme-text uppercase tracking-widest">Apparence</h3>
              {!editingTheme && (
                <button 
                  onClick={handleCreateNewTheme}
                  className="text-xs text-theme-accent hover:text-theme-text transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> New Theme
                </button>
              )}
            </div>
            
            {editingTheme ? (
              <div className="px-4 py-2 max-h-[50vh] overflow-y-auto flex flex-col gap-3">
                <div>
                  <label className="block text-[10px] uppercase text-theme-muted mb-1">Theme Name</label>
                  <input type="text" value={editingTheme.label} onChange={(e) => handleEditingLabelChange(e.target.value)} className="w-full text-xs p-2 bg-theme-bg border border-theme-border rounded text-theme-text" placeholder="My Custom Theme" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-theme-muted mb-1">Background (Primary)</label>
                  <div className="flex gap-2">
                    <input type="color" value={editingTheme.colors.bgApp} onChange={(e) => handleEditingColorChange('bgApp', e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0" />
                    <input type="text" value={editingTheme.colors.bgApp} onChange={(e) => handleEditingColorChange('bgApp', e.target.value)} className="flex-1 text-xs p-1 bg-theme-bg border border-theme-border rounded text-theme-text" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-theme-muted mb-1">Panel Background (Secondary)</label>
                  <div className="flex gap-2">
                    <input type="text" value={editingTheme.colors.bgPanel} onChange={(e) => handleEditingColorChange('bgPanel', e.target.value)} className="flex-1 text-xs p-1 bg-theme-bg border border-theme-border rounded text-theme-text" placeholder="rgba(0,0,0,0.5) or #hex" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-theme-muted mb-1">Main Text</label>
                  <div className="flex gap-2">
                    <input type="color" value={editingTheme.colors.textMain} onChange={(e) => handleEditingColorChange('textMain', e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0" />
                    <input type="text" value={editingTheme.colors.textMain} onChange={(e) => handleEditingColorChange('textMain', e.target.value)} className="flex-1 text-xs p-1 bg-theme-bg border border-theme-border rounded text-theme-text" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-theme-muted mb-1">Muted Text</label>
                  <div className="flex gap-2">
                    <input type="color" value={editingTheme.colors.textMuted} onChange={(e) => handleEditingColorChange('textMuted', e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0" />
                    <input type="text" value={editingTheme.colors.textMuted} onChange={(e) => handleEditingColorChange('textMuted', e.target.value)} className="flex-1 text-xs p-1 bg-theme-bg border border-theme-border rounded text-theme-text" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-theme-muted mb-1">Accent Color</label>
                  <div className="flex gap-2">
                    <input type="color" value={editingTheme.colors.accent} onChange={(e) => handleEditingColorChange('accent', e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0" />
                    <input type="text" value={editingTheme.colors.accent} onChange={(e) => handleEditingColorChange('accent', e.target.value)} className="flex-1 text-xs p-1 bg-theme-bg border border-theme-border rounded text-theme-text" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-theme-muted mb-1">Border Color</label>
                  <div className="flex gap-2">
                    <input type="text" value={editingTheme.colors.borderLight} onChange={(e) => handleEditingColorChange('borderLight', e.target.value)} className="flex-1 text-xs p-1 bg-theme-bg border border-theme-border rounded text-theme-text" placeholder="rgba(0,0,0,0.2) or #hex" />
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={cancelEditing}
                    className="flex-1 py-2 bg-theme-panel border border-theme-border text-theme-text font-bold text-xs rounded-lg hover:bg-theme-bg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={saveEditingTheme}
                    className="flex-1 py-2 bg-theme-accent text-theme-bg font-bold text-xs rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-h-[40vh] overflow-y-auto">
                {PRESET_THEMES.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => changeTheme(theme.id)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-theme-accent/10 flex justify-between items-center ${currentTheme === theme.id ? 'text-theme-accent font-bold bg-theme-accent/5' : 'text-theme-muted'}`}
                  >
                    {theme.label}
                  </button>
                ))}
                
                {customThemes.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-theme-border">
                    <div className="px-4 py-1 text-[10px] uppercase text-theme-muted tracking-widest font-bold">Custom Themes</div>
                    {customThemes.map(theme => (
                      <div key={theme.id} className={`w-full flex justify-between items-center px-4 py-2 text-sm transition-colors hover:bg-theme-accent/10 ${currentTheme === theme.id ? 'text-theme-accent font-bold bg-theme-accent/5' : 'text-theme-muted'}`}>
                        <button
                          onClick={() => changeTheme(theme.id)}
                          className="flex-1 text-left"
                        >
                          {theme.label}
                        </button>
                        <div className="flex items-center gap-2">
                          <button onClick={(e) => handleEditTheme(theme, e)} className="text-theme-muted hover:text-theme-accent p-1" title="Edit Theme">
                            <Palette className="w-3 h-3" />
                          </button>
                          <button onClick={(e) => handleDeleteTheme(theme.id, e)} className="text-theme-muted hover:text-red-500 p-1" title="Delete Theme">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
