import React from 'react';
import { Volume2, Square } from 'lucide-react';
import { stopSpeaking } from '../services/speechService';

interface AudioAssistantBarProps {
  isSpeaking: boolean;
  currentText: string;
  onStop: () => void;
}

export const AudioAssistantBar: React.FC<AudioAssistantBarProps> = ({
  isSpeaking,
  currentText,
  onStop,
}) => {
  if (!isSpeaking) return null;

  return (
    <aside
      aria-label="Controles do leitor de áudio assistivo"
      className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 bg-slate-900/95 text-white p-3.5 rounded-2xl shadow-xl backdrop-blur-md border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
            <Volume2 className="w-4 h-4 animate-bounce" aria-hidden="true" />
          </div>
          <div className="overflow-hidden">
            <div className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider">
              Lendo em voz alta (pt-BR)
            </div>
            <p className="text-xs text-slate-300 truncate font-normal">
              {currentText || 'Texto da tela'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              stopSpeaking();
              onStop();
            }}
            aria-label="Parar leitura em voz alta"
            className="min-h-[44px] px-3.5 flex items-center justify-center gap-1.5 bg-rose-600/90 hover:bg-rose-600 rounded-xl text-white font-medium text-xs transition"
          >
            <Square className="w-4 h-4" />
            <span>Parar</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
