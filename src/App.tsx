import { useState, useEffect, useRef } from 'react';
import { Settings, RefreshCw, Dices, Copy, Trash2, Info, X, Loader2, Image as ImageIcon, Download, Upload, Wand2, Keyboard } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { config, angles, stylesData, stylesValue, lightsData, lightsValue, bgsData, bgsValue } from './data';
import { LiveAssistant } from './components/LiveAssistant';
import { ThemeSettings } from './components/ThemeSettings';
import { Chatbot } from './components/Chatbot';

interface Preset {
  cat: string;
  layout: string;
  subj: string;
  style: string;
  light: string;
  bg: string;
  s: string;
  c: string;
  w: string;
  angles: string[];
  attrs: Record<string, string>;
}

export default function App() {
  const [category, setCategory] = useState('A');
  const [layout, setLayout] = useState('A0');
  const [subject, setSubject] = useState('');
  const [style, setStyle] = useState('S1');
  const [lighting, setLighting] = useState('E1');
  const [background, setBackground] = useState('F1');
  
  const [sliderS, setSliderS] = useState('250');
  const [sliderC, setSliderC] = useState('0');
  const [sliderW, setSliderW] = useState('0');
  
  const [selectedAngles, setSelectedAngles] = useState<string[]>([]);
  const [attributes, setAttributes] = useState<Record<string, string>>({});
  
  const [lens, setLens] = useState('');
  const [aspect, setAspect] = useState('');
  const [img2img, setImg2img] = useState(false);
  const [negPrompt, setNegPrompt] = useState(true);
  const [customNegPrompt, setCustomNegPrompt] = useState('worst quality, low quality, normal quality, watermark, signature, text, blurry, deformed, ugly, bad anatomy, extra fingers, mutated hands, cropped, bad proportions, disfigured face, asymmetric eyes');

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  
  const [isRotationEnabled, setIsRotationEnabled] = useState(false);
  const [rotationImages, setRotationImages] = useState<string[]>([]);
  const [rotationIndex, setRotationIndex] = useState(0);
  
  const [presetName, setPresetName] = useState('');
  const [presets, setPresets] = useState<Record<string, Preset>>({});
  const [history, setHistory] = useState<{text: string, time: string}[]>([]);
  
  const [showToast, setShowToast] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isNarratorActive, setIsNarratorActive] = useState(false);
  const [isMagnifierActive, setIsMagnifierActive] = useState(false);

  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [gallery, setGallery] = useState<{image: string, prompt: string, time: string}[]>([]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        handleCopy();
      }
      if (e.altKey && e.key >= '1' && e.key <= '7') {
        const cats = Object.keys(config);
        const index = parseInt(e.key) - 1;
        if (cats[index]) setCategory(cats[index]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generatedPrompt]);

  // Narrator Logic
  useEffect(() => {
    if (!isNarratorActive) {
      window.speechSynthesis.cancel();
      return;
    }
    
    const msg = new SpeechSynthesisUtterance("Bonjour, je suis Hildegarde, votre narratrice. Bienvenue dans Tho0r-Craft. / Hello, I am Hildegarde, your narrator. Welcome to Tho0r-Craft.");
    msg.pitch = 1.2;
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Ne lit que les éléments importants : titres, boutons principaux, labels
      const readable = target.closest('button, label, h1, h2, h3, [aria-label]');
      if (!readable) return;
      
      const textToRead = readable.getAttribute('aria-label') || readable.getAttribute('title') || (readable as HTMLElement).innerText;
      
      if (textToRead && textToRead.trim().length > 0 && textToRead.length < 150) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToRead.trim());
        window.speechSynthesis.speak(utterance);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      window.speechSynthesis.cancel();
    };
  }, [isNarratorActive]);

  // Magnifier Logic
  useEffect(() => {
    if (isMagnifierActive) {
      // @ts-ignore
      document.body.style.zoom = '1.25';
    } else {
      // @ts-ignore
      document.body.style.zoom = '1';
    }
    return () => { 
      // @ts-ignore
      document.body.style.zoom = '1'; 
    };
  }, [isMagnifierActive]);

  // Load presets and history on mount
  useEffect(() => {
    const savedPresets = localStorage.getItem('promptcraft_presets');
    if (savedPresets) setPresets(JSON.parse(savedPresets));
    
    const savedHistory = localStorage.getItem('promptcraft_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // Update layout when category changes
  useEffect(() => {
    const layouts = Object.keys(config[category].layouts);
    if (layouts.length > 0) {
      setLayout(layouts[0]);
    }
    setAttributes({});
    if (category !== 'G') {
      setIsRotationEnabled(false);
    }
  }, [category]);

  // Generate prompt whenever inputs change
  useEffect(() => {
    generatePrompt();
  }, [category, layout, subject, style, lighting, background, sliderS, sliderC, sliderW, selectedAngles, attributes, lens, aspect, img2img, negPrompt, customNegPrompt, isRotationEnabled]);

  const generatePrompt = () => {
    const catConfig = config[category];
    const layoutName = catConfig.layouts[layout] || "Layout";
    const role = catConfig.role;
    const subj = subject.trim() || "[Subject]";
    
    const attrValues = catConfig.attrs.map((a: any) => {
      const val = attributes[a.id];
      return val ? `${a.label}: ${val}` : null;
    }).filter(Boolean).join(", ");
    
    const angleText = selectedAngles.length > 0 
      ? selectedAngles.map(id => angles.find(a => a.id === id)?.value).join(", ") 
      : "centered composition";
      
    let prompt = `**[Role]** ${role}.\n`;
    prompt += `**[Task]** Create a professional ${layoutName} representation.\n`;
    if (img2img) prompt += `**[CRITICAL REFERENCE]** Strictly match image features...\n`;
    prompt += `**[Subject]** ${subj}\n`;
    if (attrValues) prompt += `**[Visual DNA]** ${attrValues}\n`;
    prompt += `**[Art Style]** ${stylesValue[style]}\n`;
    prompt += `**[Camera]** ${angleText}${lens ? `, ${lens}` : ''} 8k resolution, sharp focus\n`;
    prompt += `**[Ambiance]** ${lightsValue[lighting]}, ${bgsValue[background]}\n`;
    
    prompt += `\n**[Parameters]** --s ${sliderS} --c ${sliderC} --w ${sliderW}`;
    if (isRotationEnabled && category === 'G') {
      prompt += `\n**[Rotation]** 360 degree turnaround`;
    }
    if (aspect) prompt += ` ${aspect}`;
    if (negPrompt) prompt += ` --no ${customNegPrompt}`;
    
    setGeneratedPrompt(prompt);
  };

  const handleRandomize = () => {
    const cats = Object.keys(config);
    const randomCat = cats[Math.floor(Math.random() * cats.length)];
    setCategory(randomCat);
    
    const styles = Object.keys(stylesData);
    setStyle(styles[Math.floor(Math.random() * styles.length)]);
    
    const lights = Object.keys(lightsData);
    setLighting(lights[Math.floor(Math.random() * lights.length)]);
    
    const bgs = Object.keys(bgsData);
    setBackground(bgs[Math.floor(Math.random() * bgs.length)]);
    
    setSliderS(Math.floor(Math.random() * 500).toString());
    setSliderC(Math.floor(Math.random() * 50).toString());
  };

  const handleReset = () => {
    setCategory('A');
    setSubject('');
    setSliderS('250');
    setSliderC('0');
    setSliderW('0');
    setSelectedAngles([]);
    setAttributes({});
    setLens('');
    setAspect('');
    setIsRotationEnabled(false);
    setRotationImages([]);
    setRotationIndex(0);
  };

  const toggleAngle = (id: string) => {
    setSelectedAngles(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      triggerToast();
      addToHistory(generatedPrompt);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    setGeneratedImage(null);
    setRotationImages([]);
    setRotationIndex(0);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Clean up prompt for Gemini (remove Midjourney specific flags)
      let cleanPrompt = generatedPrompt.split('**[Parameters]**')[0];
      if (negPrompt && customNegPrompt) {
          cleanPrompt += `\nDo not include: ${customNegPrompt}`;
      }

      if (isRotationEnabled && category === 'G') {
        const angles360 = ["front view", "right side profile view", "back view", "left side profile view"];
        const promises = angles360.map(angle => {
          return ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
              parts: [{ text: `${cleanPrompt}, ${angle}` }]
            }
          });
        });
        
        const responses = await Promise.all(promises);
        const images = responses.map(res => {
          const part = res.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
          return part?.inlineData?.data ? `data:image/png;base64,${part.inlineData.data}` : null;
        }).filter(Boolean) as string[];

        if (images.length > 0) {
          setRotationImages(images);
          setGeneratedImage(images[0]);
          setGallery(prev => [{ image: images[0], prompt: generatedPrompt, time: new Date().toLocaleTimeString() }, ...prev]);
        } else {
          console.error("No image data returned for rotation");
        }
      } else {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              { text: cleanPrompt }
            ]
          }
        });

        const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
        if (imagePart?.inlineData?.data) {
          const imgData = `data:image/png;base64,${imagePart.inlineData.data}`;
          setGeneratedImage(imgData);
          setGallery(prev => [{ image: imgData, prompt: generatedPrompt, time: new Date().toLocaleTimeString() }, ...prev]);
        } else {
          console.error("No image data returned");
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleExport = () => {
    const data = { presets, history, gallery };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tho0r-craft_export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEnhance = async () => {
    setIsEnhancing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Enhance this image generation prompt to make it professional, highly detailed, and optimized for Midjourney v6. Keep the core subject but add advanced photography/art terms, lighting, and rendering keywords. Return ONLY the enhanced prompt text, nothing else.\n\nOriginal prompt: ${generatedPrompt}`
      });
      if (response.text) {
        setGeneratedPrompt(response.text.trim());
      }
    } catch (error) {
      console.error("Enhance error:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: {
            parts: [
              { inlineData: { data: base64Data, mimeType: file.type } },
              { text: `Analyze this image and extract the following parameters for an image generation prompt. Return ONLY a JSON object with these exact keys:
              - subject: (a brief description of the main subject)
              - style: (one of: Photorealism, Cinematic, Anime, Oil Painting, Cyberpunk, Watercolor, 3D Render, Sketch, Vintage Photo, Synthwave)
              - lighting: (one of: Natural, Studio, Neon, Cinematic, Golden Hour, Moody, Flat)
              - background: (one of: Studio, Urban, Nature, Sci-Fi, Abstract, Minimalist, Fantasy)
              - lens: (one of: 85mm lens f/1.8, 35mm lens, 24mm wide angle, or empty string)
              ` }
            ]
          },
          config: { responseMimeType: "application/json" }
        });

        if (response.text) {
          try {
            const data = JSON.parse(response.text);
            if (data.subject) setSubject(data.subject);
            if (data.style && Object.keys(stylesData).includes(data.style)) setStyle(data.style);
            if (data.lighting && Object.keys(lightsData).includes(data.lighting)) setLighting(data.lighting);
            if (data.background && Object.keys(bgsData).includes(data.background)) setBackground(data.background);
            if (data.lens) setLens(data.lens);
          } catch (e) {
            console.error("Failed to parse JSON", e);
          }
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Image analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadImage = () => {
    const imgToDownload = rotationImages.length > 0 ? rotationImages[rotationIndex] : generatedImage;
    if (!imgToDownload) return;
    const link = document.createElement('a');
    link.href = imgToDownload;
    link.download = `Tho0r-Craft_Vision_${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const addToHistory = (text: string) => {
    const newHistory = [{ text, time: new Date().toLocaleTimeString() }, ...history].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('promptcraft_history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('promptcraft_history');
  };

  const savePreset = () => {
    if (!presetName.trim()) return alert("Name required");
    const newPresets = {
      ...presets,
      [presetName]: {
        cat: category,
        layout,
        subj: subject,
        style,
        light: lighting,
        bg: background,
        s: sliderS,
        c: sliderC,
        w: sliderW,
        angles: selectedAngles,
        attrs: attributes
      }
    };
    setPresets(newPresets);
    localStorage.setItem('promptcraft_presets', JSON.stringify(newPresets));
    setPresetName('');
  };

  const loadPreset = (name: string) => {
    const p = presets[name];
    if (!p) return;
    setCategory(p.cat);
    setLayout(p.layout);
    setSubject(p.subj);
    setStyle(p.style);
    setLighting(p.light);
    setBackground(p.bg);
    setSliderS(p.s || '250');
    setSliderC(p.c || '0');
    setSliderW(p.w || '0');
    setSelectedAngles(p.angles || []);
    setAttributes(p.attrs || {});
  };

  const deletePreset = (name: string) => {
    if (confirm("Delete preset?")) {
      const newPresets = { ...presets };
      delete newPresets[name];
      setPresets(newPresets);
      localStorage.setItem('promptcraft_presets', JSON.stringify(newPresets));
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center relative">
          <h1 className="text-5xl font-extrabold mb-3 tracking-tighter gradient-text">Tho0r-Craft</h1>
          <p className="text-theme-muted font-medium tracking-wide uppercase italic">Director Console • Ultimate Edition</p>
          
          <div className="absolute top-0 right-0 md:top-2 md:right-4 flex items-center gap-2">
            <button 
              onClick={handleExport} 
              className="text-xs font-bold text-theme-accent border border-theme-border hover:bg-theme-accent/10 px-4 py-2 rounded-full transition-all flex items-center gap-2"
              title="Export Presets, History & Gallery"
            >
              <Download className="w-4 h-4" /> EXPORT
            </button>
            <ThemeSettings 
              isNarratorActive={isNarratorActive}
              setIsNarratorActive={setIsNarratorActive}
              isMagnifierActive={isMagnifierActive}
              setIsMagnifierActive={setIsMagnifierActive}
            />
            <button onClick={() => setShowGuide(true)} className="text-xs font-bold text-theme-accent border border-theme-border hover:bg-theme-accent/10 px-4 py-2 rounded-full transition-all flex items-center gap-2">
              <Info className="w-4 h-4" /> GUIDE
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: CONFIGURATION */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-card p-8 rounded-3xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-3 text-theme-accent uppercase tracking-widest">
                  <span className="p-2 bg-theme-accent/10 rounded-lg"><Settings className="w-5 h-5" /></span> Configuration
                </h2>
                <div className="flex gap-2">
                  <button onClick={handleRandomize} className="text-[10px] font-bold tracking-widest bg-theme-accent/20 hover:bg-theme-accent text-theme-accent hover:text-theme-bg px-4 py-2 rounded-full transition-all border border-theme-border flex items-center gap-1" title="Random Inspiration">
                    <Dices className="w-3 h-3" /> RANDOM
                  </button>
                  <button onClick={handleReset} className="text-[10px] font-bold tracking-widest bg-theme-panel hover:bg-red-500/20 text-theme-muted hover:text-red-400 px-4 py-2 rounded-full transition-all border border-theme-border flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" /> RESET
                  </button>
                </div>
              </div>

              {/* PRESETS */}
              <div className="mb-8 p-4 bg-theme-panel rounded-2xl border border-theme-border">
                <div className="flex flex-col md:flex-row gap-4 items-end mb-4">
                  <div className="flex-grow w-full">
                    <label className="block text-[9px] font-black uppercase tracking-widest text-theme-muted mb-1">Save Preset</label>
                    <input 
                      type="text" 
                      value={presetName}
                      onChange={(e) => setPresetName(e.target.value)}
                      placeholder="Ex: My Pixar Style..." 
                      className="w-full p-2 text-xs rounded-lg"
                    />
                  </div>
                  <button onClick={savePreset} className="w-full md:w-auto bg-theme-accent hover:opacity-80 text-theme-bg px-4 py-2 rounded-lg text-xs font-bold tracking-widest transition-all">
                    SAVE
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[30px]">
                  {Object.keys(presets).length === 0 ? (
                    <span className="text-[10px] text-theme-muted italic">No presets</span>
                  ) : (
                    Object.keys(presets).map(name => (
                      <div key={name} className="inline-flex items-center text-[0.75rem] px-3 py-1 rounded-full bg-theme-accent/10 border border-theme-border text-theme-accent cursor-pointer hover:bg-theme-accent/20 transition-all">
                        <span onClick={() => loadPreset(name)}>{name}</span>
                        <span className="ml-2 opacity-60 hover:opacity-100 hover:text-red-500" onClick={() => deletePreset(name)}>×</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* CAT & LAYOUT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-theme-muted mb-2">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-4 rounded-xl font-bold text-theme-accent">
                    {Object.entries(config).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-theme-muted mb-2">Structure Layout</label>
                  <select value={layout} onChange={(e) => setLayout(e.target.value)} className="w-full p-4 rounded-xl">
                    {Object.entries(config[category].layouts).map(([k, v]) => (
                      <option key={k} value={k}>{v as string}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ROTATION 360 (ONLY FOR ANATOMY) */}
              {category === 'G' && (
                <div className="mb-8 p-5 bg-theme-panel rounded-2xl border border-theme-border">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isRotationEnabled}
                      onChange={(e) => setIsRotationEnabled(e.target.checked)}
                      className="w-5 h-5 rounded border-theme-border text-theme-accent focus:ring-theme-accent bg-theme-bg"
                    />
                    <span className="text-sm font-bold text-theme-text">Activer la Rotation 360° (4 angles générés)</span>
                  </label>
                </div>
              )}

              {/* ANGLES */}
              <div className="mb-8 p-4 bg-theme-panel rounded-2xl border border-theme-border">
                <label className="block text-[10px] font-black uppercase tracking-widest text-theme-accent mb-3 italic">1. Camera Angles - Sequence</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {angles.map(angle => (
                    <div 
                      key={angle.id}
                      onClick={() => toggleAngle(angle.id)}
                      className={`cursor-pointer transition-all border border-theme-border bg-theme-panel text-[0.7rem] uppercase tracking-wider p-2 rounded-lg text-center select-none
                        ${selectedAngles.includes(angle.id) ? 'bg-theme-accent border-theme-accent text-theme-bg font-bold shadow-lg' : 'text-theme-muted hover:border-theme-accent hover:text-theme-text'}`}
                    >
                      {angle.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* ATTRIBUTES */}
              <div className="p-6 bg-theme-accent/5 border border-theme-border rounded-2xl mb-8">
                <label className="block text-[11px] font-black uppercase tracking-widest text-theme-accent mb-4">2. Visual DNA & Textures</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {config[category].attrs.map((attr: any) => (
                    <div key={attr.id}>
                      <label className="block text-[9px] text-theme-muted mb-1 font-black uppercase tracking-widest">{attr.label}</label>
                      <select 
                        value={attributes[attr.id] || ''} 
                        onChange={(e) => setAttributes({...attributes, [attr.id]: e.target.value})}
                        className="w-full p-3 text-xs rounded-xl"
                      >
                        <option value="">-- Choose --</option>
                        {attr.options.map((o: string) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* SUBJECT */}
              <div className="mb-8 relative">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-theme-muted">3. Free Narrative Description</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSubject('')}
                      className="text-[10px] bg-theme-panel border border-theme-border hover:border-red-500/50 hover:text-red-400 px-2 py-1 rounded-full text-theme-text transition-colors flex items-center justify-center"
                      title="Effacer la description"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={() => fileInputRef.current?.click()} 
                      disabled={isAnalyzing}
                      className="text-[10px] bg-theme-panel border border-theme-border hover:border-theme-accent px-3 py-1 rounded-full text-theme-text transition-colors flex items-center gap-1 disabled:opacity-50"
                      title="Upload an image to extract parameters"
                    >
                      {isAnalyzing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />} Image-to-Prompt
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                </div>
                <textarea 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  rows={2} 
                  className="w-full p-4 rounded-xl resize-none" 
                  placeholder="Ex: A majestic lion, a mechanical dragon..."
                />
              </div>

              {/* TECHNIQUE */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-theme-muted mb-2">Art Direction</label>
                  <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full p-3 rounded-xl text-sm">
                    {Object.entries(stylesData).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-theme-muted mb-2">Lighting</label>
                  <select value={lighting} onChange={(e) => setLighting(e.target.value)} className="w-full p-3 rounded-xl text-sm">
                    {Object.entries(lightsData).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-theme-muted mb-2">Background</label>
                  <select value={background} onChange={(e) => setBackground(e.target.value)} className="w-full p-3 rounded-xl text-sm">
                    {Object.entries(bgsData).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
              </div>

              {/* POST-PROD SLIDERS */}
              <div className="mb-8 p-5 bg-theme-panel rounded-2xl border border-theme-border">
                <label className="block text-[10px] font-black uppercase tracking-widest text-theme-accent mb-4">Post-Production (Advanced)</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex justify-between mb-1"><span className="text-[10px] uppercase text-theme-muted">Stylize (S)</span><span className="text-[10px] font-mono text-theme-accent">{sliderS}</span></div>
                    <input type="range" min="0" max="1000" value={sliderS} onChange={(e) => setSliderS(e.target.value)} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1"><span className="text-[10px] uppercase text-theme-muted">Chaos (C)</span><span className="text-[10px] font-mono text-theme-accent">{sliderC}</span></div>
                    <input type="range" min="0" max="100" value={sliderC} onChange={(e) => setSliderC(e.target.value)} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1"><span className="text-[10px] uppercase text-theme-muted">Weird (W)</span><span className="text-[10px] font-mono text-theme-accent">{sliderW}</span></div>
                    <input type="range" min="0" max="3000" value={sliderW} onChange={(e) => setSliderW(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* FOOTER OPTIONS */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-grow p-5 bg-theme-panel rounded-2xl border border-theme-border">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-theme-accent mb-3">Optics</label>
                  <div className="grid grid-cols-2 gap-3">
                    <select value={lens} onChange={(e) => setLens(e.target.value)} className="p-2 text-xs rounded-lg">
                      <option value="">Lens: Auto</option>
                      <option value="85mm lens f/1.8">Portrait (85mm)</option>
                      <option value="35mm lens">Standard (35mm)</option>
                      <option value="24mm wide angle">Wide (24mm)</option>
                    </select>
                    <div className="flex items-center gap-2">
                      <select value={aspect} onChange={(e) => setAspect(e.target.value)} className="p-2 text-xs rounded-lg flex-grow">
                        <option value="">Ratio: 1:1 Square</option>
                        <option value="--ar 16:9">Ratio: 16:9 Cinema</option>
                        <option value="--ar 9:16">Ratio: 9:16 Mobile</option>
                        <option value="--ar 4:3">Ratio: 4:3 Standard</option>
                        <option value="--ar 3:4">Ratio: 3:4 Portrait</option>
                      </select>
                      <div 
                        className="w-6 h-6 border-2 border-theme-accent rounded-sm transition-all duration-300 flex-shrink-0" 
                        style={{ 
                          aspectRatio: aspect === '--ar 16:9' ? '16/9' : 
                                      aspect === '--ar 9:16' ? '9/16' : 
                                      aspect === '--ar 4:3' ? '4/3' : 
                                      aspect === '--ar 3:4' ? '3/4' : '1/1' 
                        }} 
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 px-4 flex-wrap">
                  {category === 'G' && (
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={isRotationEnabled} onChange={(e) => setIsRotationEnabled(e.target.checked)} className="w-5 h-5 rounded text-theme-accent bg-theme-panel border-theme-border" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted group-hover:text-theme-accent">Rotation 360°</span>
                    </label>
                  )}
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={img2img} onChange={(e) => setImg2img(e.target.checked)} className="w-5 h-5 rounded text-theme-accent bg-theme-panel border-theme-border" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted group-hover:text-theme-accent">Img2Img</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={negPrompt} onChange={(e) => setNegPrompt(e.target.checked)} className="w-5 h-5 rounded text-theme-accent bg-theme-panel border-theme-border" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted group-hover:text-theme-accent">Neg Pro</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: OUTPUT & HISTORY */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-card p-8 rounded-3xl border-theme-border shadow-lg">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-theme-accent tracking-tighter italic">DIRECTOR'S OUTPUT</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={handleEnhance} 
                    disabled={isEnhancing || !subject} 
                    className="bg-theme-panel border border-theme-border hover:border-theme-accent text-theme-text px-4 py-2 rounded-full font-black text-xs tracking-widest transition-all shadow-xl active:scale-95 flex items-center gap-2 disabled:opacity-50"
                    title="Optimize prompt with AI"
                  >
                    {isEnhancing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />} ENHANCE
                  </button>
                  <button onClick={handleGenerateImage} disabled={isGeneratingImage} className="bg-theme-panel border border-theme-border hover:border-theme-accent text-theme-text px-4 py-2 rounded-full font-black text-xs tracking-widest transition-all shadow-xl active:scale-95 flex items-center gap-2 disabled:opacity-50">
                    {isGeneratingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />} GENERATE
                  </button>
                  <button onClick={handleCopy} className="bg-theme-accent hover:opacity-80 text-theme-bg px-6 py-2 rounded-full font-black text-xs tracking-widest transition-all shadow-xl active:scale-95 flex items-center gap-2">
                    <Copy className="w-4 h-4" /> COPY PROMPT
                  </button>
                </div>
              </div>
              <div className="output-container p-6 rounded-2xl text-theme-text text-sm overflow-y-auto whitespace-pre-wrap min-h-[400px] max-h-[600px] leading-relaxed font-mono bg-theme-bg">
                {generatedPrompt}
              </div>
            </div>

            {negPrompt && (
              <div className="glass-card p-6 rounded-3xl border-theme-border shadow-lg">
                 <h3 className="text-sm font-bold text-theme-muted uppercase tracking-widest mb-4">🚫 Negative Prompt (Anti-Prompt)</h3>
                 <div className="flex flex-wrap gap-2 mb-4">
                   <button 
                     onClick={() => setCustomNegPrompt(prev => prev + (prev ? ', ' : '') + 'text, watermark, signature, logo, typography, words')}
                     className="text-[10px] bg-theme-panel border border-theme-border hover:border-theme-accent px-3 py-1 rounded-full text-theme-text transition-colors"
                   >
                     + Anti-Texte
                   </button>
                   <button 
                     onClick={() => setCustomNegPrompt(prev => prev + (prev ? ', ' : '') + '3d, cgi, render, unreal engine, octane, plastic, smooth')}
                     className="text-[10px] bg-theme-panel border border-theme-border hover:border-theme-accent px-3 py-1 rounded-full text-theme-text transition-colors"
                   >
                     + Anti-3D
                   </button>
                   <button 
                     onClick={() => setCustomNegPrompt(prev => prev + (prev ? ', ' : '') + 'anime, manga, illustration, drawing, painting, cartoon')}
                     className="text-[10px] bg-theme-panel border border-theme-border hover:border-theme-accent px-3 py-1 rounded-full text-theme-text transition-colors"
                   >
                     + Anti-Manga
                   </button>
                   <button 
                     onClick={() => setCustomNegPrompt(prev => prev + (prev ? ', ' : '') + 'nsfw, nude, naked, pornography, hate, violence, blood, gore, indecent positions, explicit')}
                     className="text-[10px] bg-theme-panel border border-theme-border hover:border-theme-accent px-3 py-1 rounded-full text-theme-text transition-colors"
                   >
                     + SFW (Filtre Strict)
                   </button>
                 </div>
                 <textarea 
                    value={customNegPrompt}
                    onChange={(e) => setCustomNegPrompt(e.target.value)}
                    rows={3}
                    className="w-full p-4 rounded-xl resize-none text-xs font-mono text-theme-text bg-theme-bg border border-theme-border"
                 />
              </div>
            )}

            {isGeneratingImage && (
              <div className="glass-card p-6 rounded-3xl border-theme-border shadow-lg flex flex-col items-center justify-center min-h-[300px]">
                <Loader2 className="w-8 h-8 animate-spin text-theme-accent mb-4" />
                <p className="text-theme-muted text-sm animate-pulse text-center">
                  Freyad-Craft is painting your vision...<br/>
                  <span className="text-xs opacity-70">Freyad-Craft peint votre vision...</span>
                </p>
              </div>
            )}

            {generatedImage && !isGeneratingImage && (
              <div className="glass-card p-6 rounded-3xl border-theme-border shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-theme-muted uppercase tracking-widest">✨ Generated Vision</h3>
                  <button onClick={handleDownloadImage} className="text-theme-accent hover:text-theme-text transition-colors flex items-center gap-1 text-xs font-bold">
                    <Download className="w-4 h-4" /> DOWNLOAD
                  </button>
                </div>
                <img 
                  src={rotationImages.length > 0 ? rotationImages[rotationIndex] : generatedImage} 
                  alt="Generated Vision" 
                  className="w-full h-auto rounded-xl shadow-md transition-all duration-300" 
                />
                {rotationImages.length > 0 && (
                  <div className="mt-6 bg-theme-panel p-4 rounded-xl border border-theme-border">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-theme-muted mb-2">
                      <span>Face</span>
                      <span>Profil D</span>
                      <span>Dos</span>
                      <span>Profil G</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max={rotationImages.length - 1} 
                      value={rotationIndex} 
                      onChange={(e) => setRotationIndex(parseInt(e.target.value))}
                      className="w-full accent-theme-accent"
                    />
                  </div>
                )}
              </div>
            )}

            {/* GALLERY */}
            {gallery.length > 0 && (
              <div className="glass-card p-6 rounded-3xl border-theme-border shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-theme-accent uppercase tracking-widest">Visual Gallery</h3>
                  <button onClick={() => setGallery([])} className="text-xs text-theme-muted hover:text-red-500 transition-colors flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
                  {gallery.map((item, i) => (
                    <div key={i} className="bg-theme-panel rounded-xl overflow-hidden border border-theme-border group">
                      <img src={item.image} alt="Generated" className="w-full h-auto object-cover aspect-square" />
                      <div className="p-3">
                        <p className="text-[10px] text-theme-muted mb-2">{item.time}</p>
                        <p className="text-xs text-theme-text line-clamp-3 font-mono" title={item.prompt}>{item.prompt}</p>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(item.prompt);
                            triggerToast();
                          }}
                          className="mt-2 w-full py-1 bg-theme-bg border border-theme-border rounded text-xs text-theme-muted hover:text-theme-accent hover:border-theme-accent transition-colors"
                        >
                          Copy Prompt
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="glass-card p-6 rounded-3xl border-theme-border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-theme-muted uppercase tracking-widest">📜 Session History</h3>
                {history.length > 0 && (
                  <button onClick={clearHistory} className="text-[9px] text-red-400 hover:text-red-500 uppercase flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-0 max-h-[300px] overflow-y-auto rounded-xl bg-theme-bg border border-theme-border">
                {history.length === 0 ? (
                  <div className="p-4 text-center text-xs text-theme-muted italic">History fills when you copy a prompt.</div>
                ) : (
                  history.map((item, i) => (
                    <div key={i} onClick={() => setGeneratedPrompt(item.text)} className="p-3 border-b border-theme-border cursor-pointer hover:bg-theme-panel transition-colors text-xs font-mono text-theme-muted">
                      <span className="text-theme-accent mr-2">[{item.time}]</span>
                      {item.text.substring(0, 60)}...
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-16 pt-8 border-t border-theme-border flex flex-col items-center justify-center gap-4 pb-8">
          <div className="flex items-center gap-3 text-theme-accent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
              {/* Dome */}
              <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
              {/* Brim */}
              <path d="M2 15h20" />
              {/* Horns */}
              <path d="M5 12c-2-3-3-7-3-7s3 1 4.5 4" />
              <path d="M19 12c2-3 3-7 3-7s-3 1-4.5 4" />
              {/* Center detail */}
              <path d="M12 15V7" />
              {/* Nose guard */}
              <path d="M12 15v4" />
            </svg>
            <span className="font-black tracking-widest uppercase text-xl">KamaOne</span>
          </div>
          <div className="text-center text-xs space-y-2 text-theme-muted opacity-70">
            <p>Créé et designé par KamaOne.</p>
            <p>&copy; {new Date().getFullYear()} Tho0r-Craft. Tous droits réservés.</p>
            <div className="pt-2 flex flex-wrap gap-4 justify-center">
              <button onClick={() => setShowLegal(true)} className="hover:text-theme-accent transition-colors underline decoration-theme-border hover:decoration-theme-accent">Mentions Légales</button>
              <button onClick={() => setShowPrivacy(true)} className="hover:text-theme-accent transition-colors underline decoration-theme-border hover:decoration-theme-accent">Politique de Confidentialité</button>
              <button onClick={() => setShowTerms(true)} className="hover:text-theme-accent transition-colors underline decoration-theme-border hover:decoration-theme-accent">CGU</button>
            </div>
          </div>
        </footer>
      </div>

      {/* TOAST */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-theme-accent text-theme-bg px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <Copy className="w-4 h-4" /> SCRIPT COPIED SUCCESSFULLY!
        </div>
      )}

      {/* GUIDE MODAL */}
      {showGuide && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowGuide(false)}>
          <div className="bg-theme-bg border border-theme-border rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 border-b border-theme-border pb-4">
              <h2 className="text-2xl font-bold text-theme-text flex items-center gap-3">
                <span className="bg-theme-accent/20 p-2 rounded-xl text-theme-accent">
                  <Info className="w-6 h-6" />
                </span>
                Bienvenue dans le Guide Director ! 🎬
              </h2>
              <button onClick={() => setShowGuide(false)} className="text-theme-muted hover:text-theme-text transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-8 text-sm text-theme-text leading-relaxed">
              <div className="bg-theme-panel p-5 rounded-2xl border border-theme-border">
                <h3 className="text-theme-accent font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span>1.</span> La Philosophie "Director"
                </h3>
                <p className="text-theme-muted">
                  Tho0r-Craft ne génère pas de simples mots-clés au hasard. Il suit un pipeline de production professionnel inspiré du cinéma : 
                  <br/><br/>
                  <strong className="text-theme-text bg-theme-accent/10 px-2 py-1 rounded">Sujet &gt; Angle &gt; ADN (Détails) &gt; Ambiance</strong>
                  <br/><br/>
                  Respectez cet ordre de réflexion pour obtenir des résultats précis et professionnels de la part de l'IA.
                </p>
              </div>

              <div className="bg-theme-panel p-5 rounded-2xl border border-theme-border">
                <h3 className="text-theme-accent font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span>2.</span> Les Sliders de Post-Production
                </h3>
                <ul className="space-y-3 text-theme-muted">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-theme-text min-w-[80px]">Stylize (S) :</span> 
                    <span>Plus cette valeur est haute, plus l'IA prendra des libertés artistiques et s'éloignera du réalisme strict. (Défaut: 250).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-theme-text min-w-[80px]">Chaos (C) :</span> 
                    <span>Détermine à quel point les différentes images générées seront variées et différentes les unes des autres.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-theme-text min-w-[80px]">Weird (W) :</span> 
                    <span>Ajoute une touche d'étrangeté, d'originalité et d'inattendu à vos générations.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-theme-panel p-5 rounded-2xl border border-theme-border">
                <h3 className="text-theme-accent font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span>3.</span> Freyad-Craft & Génération d'Images
                </h3>
                <p className="text-theme-muted">
                  <strong className="text-theme-text">Freyad-Craft</strong> est votre assistant IA (masculin) bilingue, accessible via l'icône en bas à droite. Il connaît parfaitement l'application et peut vous guider.
                  <br/><br/>
                  Une fois votre prompt prêt, vous pouvez cliquer sur <strong className="text-theme-text">GENERATE</strong> pour créer un aperçu visuel directement dans l'application, puis le <strong className="text-theme-text">TÉLÉCHARGER</strong>.
                </p>
              </div>

              <div className="bg-theme-panel p-5 rounded-2xl border border-theme-border">
                <h3 className="text-theme-accent font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span>4.</span> Sauvegarde & Historique
                </h3>
                <p className="text-theme-muted">
                  Utilisez les <strong className="text-theme-text">Presets</strong> pour enregistrer vos configurations favorites (ex: "Mon Style Pixar"). 
                  L'<strong className="text-theme-text">Historique</strong> garde automatiquement une trace de tous les prompts que vous avez copiés lors de votre session.
                </p>
              </div>
              <div className="bg-theme-panel p-5 rounded-2xl border border-theme-border">
                <h3 className="text-theme-accent font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span>5.</span> L'Assistante Vocale (Microphone)
                </h3>
                <p className="text-theme-muted">
                  En cliquant sur l'icône <strong className="text-theme-text">Microphone</strong> (en haut à droite), vous pouvez discuter directement avec <strong className="text-theme-text">Hildegarde</strong>, votre assistante vocale. Elle a une voix douce et amicale, et elle est là pour vous aider à trouver des idées, étoffer vos descriptions, ou vous suggérer des styles et des ambiances pour vos créations.
                </p>
              </div>

              <div className="bg-theme-panel p-5 rounded-2xl border border-theme-border">
                <h3 className="text-theme-accent font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span>6.</span> Accessibilité
                </h3>
                <p className="text-theme-muted">
                  Dans les <strong className="text-theme-text">PARAMÈTRES</strong> (en haut à droite), vous pouvez activer <strong className="text-theme-text">Hildegarde en mode Narratrice</strong> pour les personnes non-voyantes (qui lit l'interface au survol) ainsi qu'une <strong className="text-theme-text">Loupe (Zoom UI)</strong> pour les personnes malvoyantes.
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-theme-border text-center">
              <button onClick={() => setShowGuide(false)} className="bg-theme-accent text-theme-bg px-8 py-3 rounded-full font-bold tracking-widest hover:opacity-90 transition-opacity">
                J'AI COMPRIS, C'EST PARTI !
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEGAL MODALS */}
      {showLegal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowLegal(false)}>
          <div className="bg-theme-bg border border-theme-border rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 border-b border-theme-border pb-4">
              <h2 className="text-2xl font-bold text-theme-text">Mentions Légales</h2>
              <button onClick={() => setShowLegal(false)} className="text-theme-muted hover:text-theme-text transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4 text-sm text-theme-text leading-relaxed">
              <p><strong>Éditeur du site :</strong> KamaOne</p>
              <p><strong>Hébergement :</strong> Google Cloud Run</p>
              <p><strong>Propriété intellectuelle :</strong> Tous les éléments de l'application Tho0r-Craft sont la propriété exclusive de KamaOne.</p>
            </div>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPrivacy(false)}>
          <div className="bg-theme-bg border border-theme-border rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 border-b border-theme-border pb-4">
              <h2 className="text-2xl font-bold text-theme-text">Politique de Confidentialité</h2>
              <button onClick={() => setShowPrivacy(false)} className="text-theme-muted hover:text-theme-text transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4 text-sm text-theme-text leading-relaxed">
              <p><strong>Collecte des données :</strong> Nous ne collectons aucune donnée personnelle à votre insu. Les historiques et presets sont stockés localement sur votre navigateur.</p>
              <p><strong>Utilisation de l'API :</strong> Les prompts et images sont traités via l'API Google Gemini. Veuillez vous référer à la politique de confidentialité de Google pour plus de détails.</p>
            </div>
          </div>
        </div>
      )}

      {showTerms && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowTerms(false)}>
          <div className="bg-theme-bg border border-theme-border rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 border-b border-theme-border pb-4">
              <h2 className="text-2xl font-bold text-theme-text">Conditions Générales d'Utilisation (CGU)</h2>
              <button onClick={() => setShowTerms(false)} className="text-theme-muted hover:text-theme-text transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4 text-sm text-theme-text leading-relaxed">
              <p><strong>Objet :</strong> Les présentes CGU définissent les conditions d'utilisation de l'application Tho0r-Craft.</p>
              <p><strong>Responsabilité :</strong> L'utilisateur est seul responsable des prompts générés et des images créées via l'application. KamaOne décline toute responsabilité quant à l'utilisation faite des contenus générés.</p>
            </div>
          </div>
        </div>
      )}

      <Chatbot />
      <LiveAssistant onTranscript={(text) => setSubject(prev => prev ? prev + ' ' + text : text)} />
    </div>
  );
}
