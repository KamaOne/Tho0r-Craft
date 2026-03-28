import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, Loader2 } from 'lucide-react';

export function LiveAssistant({ onTranscript }: { onTranscript: (text: string) => void }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null);
  const aiRef = useRef<GoogleGenAI | null>(null);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  const connect = async () => {
    setIsConnecting(true);
    try {
      if (!aiRef.current) {
        aiRef.current = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      source.connect(processor);
      processor.connect(audioContext.destination);

      const sessionPromise = aiRef.current.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-12-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
          },
          systemInstruction: "Tu es Hildegarde, l'assistante vocale de Tho0r-Craft. Présente-toi lors de la première interaction. Tu as une voix douce, amicale et bienveillante. Ton rôle est d'aider le 'Director' (l'utilisateur) à trouver des idées de prompts pour générer des images. Tu peux lui suggérer des sujets, des styles, ou des ambiances. Réponds de manière concise, chaleureuse et créative en français. Si l'utilisateur te dicte une idée, aide-le à l'étoffer avec douceur.",
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        },
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsConnecting(false);
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcm16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                let s = Math.max(-1, Math.min(1, inputData[i]));
                pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
              }
              
              const buffer = new ArrayBuffer(pcm16.length * 2);
              const view = new DataView(buffer);
              pcm16.forEach((value, index) => {
                view.setInt16(index * 2, value, true);
              });
              
              const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer) as any));
              
              sessionPromise.then((session) => {
                session.sendRealtimeInput({
                  audio: { data: base64, mimeType: 'audio/pcm;rate=16000' }
                });
              });
            };
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle audio output
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              setIsSpeaking(true);
              const binaryString = atob(base64Audio);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              
              try {
                // The audio from the model is 24kHz PCM. We need to play it.
                // For simplicity, we decode it using AudioContext if it was a standard format,
                // but since it's raw PCM, we need to create an AudioBuffer.
                const pcm16 = new Int16Array(bytes.buffer);
                const audioBuffer = audioContext.createBuffer(1, pcm16.length, 24000);
                const channelData = audioBuffer.getChannelData(0);
                for (let i = 0; i < pcm16.length; i++) {
                  channelData[i] = pcm16[i] / 32768.0;
                }
                
                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContext.destination);
                source.start();
                source.onended = () => setIsSpeaking(false);
              } catch (e) {
                console.error("Error playing audio", e);
                setIsSpeaking(false);
              }
            }

            // Handle transcriptions
            // @ts-ignore - The SDK types might not be fully up-to-date with clientContent
            if (message.clientContent?.turns) {
              // @ts-ignore
              const text = message.clientContent.turns[0]?.parts[0]?.text;
              if (text) {
                onTranscript(text);
              }
            }
          },
          onclose: () => {
            disconnect();
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            disconnect();
          }
        }
      });

      sessionRef.current = sessionPromise;

    } catch (err) {
      console.error("Failed to connect to Live API", err);
      setIsConnecting(false);
      disconnect();
    }
  };

  const disconnect = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (sessionRef.current) {
      sessionRef.current.then((s: any) => s.close());
      sessionRef.current = null;
    }
    setIsConnected(false);
    setIsConnecting(false);
    setIsSpeaking(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {isConnected && (
        <div className="bg-slate-900/90 backdrop-blur border border-sky-500/30 text-sky-400 text-xs px-4 py-2 rounded-full shadow-lg shadow-sky-900/20 flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-emerald-400 animate-pulse' : 'bg-sky-400'}`}></div>
          {isSpeaking ? 'Focus parle...' : 'Focus écoute...'}
        </div>
      )}
      <button
        onClick={isConnected ? disconnect : connect}
        disabled={isConnecting}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isConnected 
            ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' 
            : 'bg-gradient-to-br from-sky-400 to-indigo-600 hover:scale-105 text-white shadow-sky-500/30'
        }`}
        title={isConnected ? "Arrêter la dictée" : "Assistant Vocal (Focus)"}
      >
        {isConnecting ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : isConnected ? (
          <MicOff className="w-6 h-6" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
