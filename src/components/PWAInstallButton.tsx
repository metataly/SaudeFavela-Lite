import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // Se já instalado como app, oculta
  if (isInstalled) {
    return null;
  }

  // Android / Chrome / Computador
  if (isInstallable) {
    return (
      <button
        onClick={install}
        aria-label="Instalar aplicativo no celular"
        className="flex items-center gap-1.5 min-h-[44px] min-w-[44px] px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors active:scale-95"
      >
        <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="whitespace-nowrap">Instalar App</span>
      </button>
    );
  }

  // iOS Safari
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          aria-label="Como instalar no iPhone"
          className="flex items-center gap-1.5 min-h-[44px] min-w-[44px] px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors active:scale-95"
        >
          <Smartphone className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="whitespace-nowrap">Instalar no iOS</span>
        </button>

        {showIOSGuide && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          >
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 id="ios-modal-title" className="text-base font-bold text-slate-900">
                  Instalar no iPhone / iPad
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-500 hover:text-slate-800"
                  aria-label="Fechar instruções de instalação"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-sky-700">1.</span>
                  <p>Toque no botão <strong>Compartilhar</strong> (ícone de quadrado com seta para cima) na barra do Safari.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-sky-700">2.</span>
                  <p>Role para baixo e selecione <strong>Adicionar à Tela de Início</strong>.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-sky-700">3.</span>
                  <p>Toque em <strong>Adicionar</strong> no canto superior direito.</p>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                Após adicionar, o SaúdeFavela-Lite funcionará como um aplicativo rápido e sem barra de navegação.
              </p>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full min-h-[44px] rounded-xl bg-sky-700 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 transition"
              >
                Entendi
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
