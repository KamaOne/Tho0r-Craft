import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Bonjour ! Je suis Freyad-Craft, votre assistant bilingue. Comment puis-je vous aider avec Tho0r-Craft aujourd'hui ? / Hello! I'm Freyad-Craft, your bilingual assistant. How can I help you with Tho0r-Craft today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const initChat = () => {
    if (!chatRef.current) {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      chatRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: "You are Freyad-Craft, a masculine, bilingual (French/English) assistant for the Tho0r-Craft app. You know the app perfectly. The app is a Director Console for generating image prompts. It has categories (Human, Anatomy, Creature, Prop, Architecture, Environment, Vehicle, Logo & Branding), layouts, camera angles, visual DNA (attributes like texture, habitat, temperament for creatures, or style, color, background for logos), art styles, lighting, backgrounds, and post-prod sliders (Stylize, Chaos, Weird). It features a Subject dropdown for quick ideas, and an advanced Negative Prompt system with adjustable weights (e.g., blurry::2). It also has a Voice Assistant named Hildegarde (accessible via the microphone icon) and accessibility features in the Settings: Hildegarde as a bilingual Narrator for visually impaired users, and a Magnifier (Loupe/Zoom UI). New features include: a Collapsible Sidebar that auto-closes on mobile, Theme Settings (with Export/Import), an Auto-Focus Mode that activates after generation, Download buttons directly on gallery images, Keyboard Shortcuts (Ctrl+Enter to copy, Shift+Enter to generate, Alt+1-7 for categories, Ctrl+Z/Y for undo/redo), Prompt Variations (Ctrl+G), and Image Comparison in the Gallery. You help users understand how to use these features to create the best prompts. Detect the user's language (FR or EN) and reply in the same language. Be concise, helpful, welcoming, and ask pertinent questions to guide the user's creative process."
        }
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      initChat();
      const response = await chatRef.current.sendMessage({ message: userText });
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Désolé, une erreur s'est produite. / Sorry, an error occurred." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-theme-accent text-theme-bg flex items-center justify-center shadow-lg hover:scale-105 transition-transform p-1 ${isOpen ? 'hidden' : ''}`}
        title="Chat with Freyad-Craft"
      >
        <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Freyad&top=shortHair&facialHair=beardLight&backgroundColor=transparent" alt="Freyad-Craft" className="w-full h-full rounded-full bg-white/20" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[500px] max-h-[80vh] glass-card rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10">
          <div className="p-4 border-b border-theme-border flex justify-between items-center bg-theme-panel">
            <div className="flex items-center gap-2">
              <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Freyad&top=shortHair&facialHair=beardLight&backgroundColor=transparent" alt="Freyad-Craft" className="w-8 h-8 rounded-full bg-theme-accent/20" />
              <span className="font-bold text-theme-text">Freyad-Craft</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-theme-muted hover:text-theme-text">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-theme-bg/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-theme-accent text-theme-bg rounded-tr-sm' : 'bg-theme-panel text-theme-text border border-theme-border rounded-tl-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-theme-panel border border-theme-border p-3 rounded-2xl rounded-tl-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-theme-accent" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-theme-border bg-theme-panel flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Posez une question / Ask a question..."
              className="flex-1 p-2 rounded-xl text-sm bg-theme-bg border-none focus:ring-1 focus:ring-theme-accent"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-xl bg-theme-accent text-theme-bg disabled:opacity-50 hover:opacity-80 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
