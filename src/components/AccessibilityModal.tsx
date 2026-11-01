import React from 'react';
import { Eye, X, Volume2, Type, Sparkles, Shield, Trash2 } from 'lucide-react';
import { AccessibilitySettings, TextSizePreference } from '../types';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: AccessibilitySettings) => void;
  onOpenPrivacy: () => void;
  onClearData: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onOpenPrivacy,
  onClearData,
}) => {
  if (!isOpen) return null;

  const handleFontSizeChange = (size: TextSizePreference) => {
    onUpdateSettings({ ...settings, fontSize: size });
  };

  const handleContrastToggle = () => {
    onUpdateSettings({ ...settings, highContrast: !settings.highContrast });
  };

  const handleMotionToggle = () => {
    onUpdateSettings({ ...settings, reducedMotion: !settings.reducedMotion });
  };

  const handleSpeechRateChange = (rate: number) => {
    onUpdateSettings({ ...settings, speechRate: rate });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 my-8 text-slate-900 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
              <Eye className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="accessibility-settings-title" className="text-base font-bold text-slate-900">
                Acessibilidade e Conforto
              </h2>
              <p className="text-xs text-slate-500">Ajuste o aplicativo para sua visão e leitura</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar painel de acessibilidade"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-6">
          {/* Tamanho da Fonte */}
          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Type className="w-4 h-4 text-sky-700" aria-hidden="true" />
              Tamanho do Texto
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleFontSizeChange('normal')}
                className={`min-h-[44px] py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                  settings.fontSize === 'normal'
                    ? 'bg-sky-700 text-white border-sky-800 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => handleFontSizeChange('large')}
                className={`min-h-[44px] py-2 px-3 rounded-xl text-sm font-semibold border transition ${
                  settings.fontSize === 'large'
                    ? 'bg-sky-700 text-white border-sky-800 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Grande
              </button>
              <button
                type="button"
                onClick={() => handleFontSizeChange('extralarge')}
                className={`min-h-[44px] py-2 px-3 rounded-xl text-base font-bold border transition ${
                  settings.fontSize === 'extralarge'
                    ? 'bg-sky-700 text-white border-sky-800 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Muito Grande
              </button>
            </div>
          </div>

          {/* Alto Contraste */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="text-sm font-bold text-slate-900">Modo Alto Contraste</div>
              <p className="text-xs text-slate-500">Bordas reforçadas e cores mais fortes para facilitar a leitura sob sol forte</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.highContrast}
              onClick={handleContrastToggle}
              className={`min-h-[44px] min-w-[56px] px-2 py-1 rounded-full transition-colors flex items-center ${
                settings.highContrast ? 'bg-sky-700 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          {/* Redução de Movimento */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="text-sm font-bold text-slate-900">Reduzir Animações</div>
              <p className="text-xs text-slate-500">Desativa efeitos visuais para maior rapidez em aparelhos mais antigos</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.reducedMotion}
              onClick={handleMotionToggle}
              className={`min-h-[44px] min-w-[56px] px-2 py-1 rounded-full transition-colors flex items-center ${
                settings.reducedMotion ? 'bg-sky-700 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          {/* Velocidade da Leitura por Voz */}
          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Volume2 className="w-4 h-4 text-sky-700" aria-hidden="true" />
              Velocidade da Voz Assistiva
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSpeechRateChange(0.85)}
                className={`min-h-[44px] py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                  settings.speechRate < 0.95
                    ? 'bg-emerald-700 text-white border-emerald-800'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                0.85x (Pausada)
              </button>
              <button
                type="button"
                onClick={() => handleSpeechRateChange(1.0)}
                className={`min-h-[44px] py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                  settings.speechRate >= 0.95 && settings.speechRate <= 1.05
                    ? 'bg-emerald-700 text-white border-emerald-800'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                1.0x (Padrão)
              </button>
              <button
                type="button"
                onClick={() => handleSpeechRateChange(1.2)}
                className={`min-h-[44px] py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                  settings.speechRate > 1.05
                    ? 'bg-emerald-700 text-white border-emerald-800'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                1.2x (Rápida)
              </button>
            </div>
          </div>

          {/* Links e Privacidade */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                onClose();
                onOpenPrivacy();
              }}
              className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-sky-700" />
                Aviso de Privacidade & LGPD
              </span>
              <span className="text-slate-400">Ver detalhes →</span>
            </button>

            <button
              onClick={() => {
                onClearData();
              }}
              className="w-full min-h-[44px] flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-rose-700 hover:bg-rose-50 text-xs font-semibold border border-rose-200 transition"
            >
              <Trash2 className="w-4 h-4" />
              Limpar dados locais do aparelho
            </button>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-slate-900 text-white font-medium text-xs rounded-xl hover:bg-slate-800 transition"
          >
            Concluir Ajustes
          </button>
        </div>
      </div>
    </div>
  );
};
