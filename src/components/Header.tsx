import React from 'react';
import { Volume2, VolumeX, Sliders, Wifi, WifiOff } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { AccessibilitySettings } from '../types';

interface HeaderProps {
  onSpeakScreen: () => void;
  isSpeaking: boolean;
  onOpenAccessibility: () => void;
  settings: AccessibilitySettings;
  onCycleFontSize: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSpeakScreen,
  isSpeaking,
  onOpenAccessibility,
  settings,
  onCycleFontSize,
}) => {
  const isOnline = useOnlineStatus();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zona 1: Marca principal em linha única */}
        <div className="flex items-center gap-2 min-w-0">
          <a
            href="#inicio"
            className="flex items-center gap-2 group min-h-[44px] py-1"
            aria-label="SaúdeFavela-Lite - Página Inicial"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-700 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
              SF
            </div>
            <div className="truncate">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 block truncate group-hover:text-sky-700 transition">
                SaúdeFavela<span className="text-emerald-600 font-extrabold">-Lite</span>
              </span>
              <span className="text-[10px] text-slate-600 block leading-none font-medium truncate">
                Atenção Primária · SUS RJ
              </span>
            </div>
          </a>
        </div>

        {/* Zona 2: Indicador de conexão e utilitários de acesso */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Indicador de Conexão */}
          <div
            title={isOnline ? 'Conectado à internet' : 'Sem conexão. Funcionando com dados locais.'}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
              isOnline
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-900 border-amber-300'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-3 h-3 text-emerald-600 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-amber-700 shrink-0" aria-hidden="true" />
                <span>Offline</span>
              </>
            )}
          </div>

          {/* Botão de Tamanho da Fonte (A- / A / A+) */}
          <button
            onClick={onCycleFontSize}
            aria-label={`Tamanho do texto atual: ${settings.fontSize}. Toque para alterar.`}
            title="Alterar tamanho do texto"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition active:scale-95 border border-slate-200"
          >
            <span className="text-xs font-bold">
              {settings.fontSize === 'normal' && 'A'}
              {settings.fontSize === 'large' && 'A+'}
              {settings.fontSize === 'extralarge' && 'A++'}
            </span>
          </button>

          {/* Botão Ouvir Esta Tela */}
          <button
            onClick={onSpeakScreen}
            aria-label={isSpeaking ? 'Parar leitura de tela em voz alta' : 'Ouvir o conteúdo desta tela'}
            title={isSpeaking ? 'Parar áudio' : 'Ouvir esta tela'}
            className={`min-h-[44px] min-w-[44px] px-2.5 flex items-center justify-center gap-1.5 rounded-xl font-bold text-xs transition active:scale-95 border ${
              isSpeaking
                ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                : 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
            }`}
          >
            {isSpeaking ? (
              <VolumeX className="w-4 h-4 text-amber-800 shrink-0" aria-hidden="true" />
            ) : (
              <Volume2 className="w-4 h-4 text-sky-700 shrink-0" aria-hidden="true" />
            )}
            <span className="hidden md:inline whitespace-nowrap">
              {isSpeaking ? 'Parar Áudio' : 'Ouvir Tela'}
            </span>
          </button>

          {/* Botão Instalar PWA */}
          <PWAInstallButton />

          {/* Painel de Acessibilidade & Opções */}
          <button
            onClick={onOpenAccessibility}
            aria-label="Abrir configurações de acessibilidade"
            title="Acessibilidade e opções"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition active:scale-95 border border-slate-200"
          >
            <Sliders className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};
