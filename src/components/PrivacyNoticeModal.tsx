import React from 'react';
import { ShieldCheck, X, AlertCircle, Trash2, CheckCircle2 } from 'lucide-react';
import { clearAllLocalData } from '../services/storageService';

interface PrivacyNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataCleared: () => void;
}

export const PrivacyNoticeModal: React.FC<PrivacyNoticeModalProps> = ({
  isOpen,
  onClose,
  onDataCleared,
}) => {
  const [clearedNotice, setClearedNotice] = React.useState(false);

  if (!isOpen) return null;

  const handleClear = () => {
    if (window.confirm('Tem certeza de que deseja apagar todos os dados e preferências salvos neste aparelho?')) {
      clearAllLocalData();
      setClearedNotice(true);
      onDataCleared();
      setTimeout(() => {
        setClearedNotice(false);
      }, 3000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 my-8 text-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="privacy-title" className="text-base font-bold text-slate-900">
                Privacidade & Compromisso LGPD
              </h2>
              <p className="text-xs text-slate-500">SaúdeFavela-Lite · Proteção Total de Dados</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar aviso de privacidade"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {clearedNotice && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2 border border-emerald-200 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Todos os dados e preferências locais foram completamente apagados do aparelho.</span>
          </div>
        )}

        <div className="mt-4 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-100 text-sky-900">
            <p className="font-semibold flex items-center gap-1.5 mb-1 text-sky-950">
              <AlertCircle className="w-4 h-4 shrink-0 text-sky-700" />
              Natureza do Projeto
            </p>
            <p className="text-xs text-sky-800">
              O <strong>SaúdeFavela-Lite</strong> é um protótipo comunitário e acadêmico independente de orientação em saúde para a Atenção Primária no Rio de Janeiro. <strong>Não é um canal oficial do Ministério da Saúde nem da Prefeitura</strong> e não substitui os sistemas governamentais oficiais.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">1. Princípio da Minimização de Dados (LGPD)</h3>
            <p>
              Não solicitamos e não armazenamos seu CPF, Cartão Nacional de Saúde (CNS), prontuário, diagnóstico médico ou histórico de saúde. Nenhum cadastro ou senha é necessário para navegar e consultar as informações.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">2. Onde as informações ficam guardadas?</h3>
            <p>
              Exclusivamente na memória interna do seu próprio navegador ou aparelho celular (via LocalStorage e Service Worker Cache). Nada é transmitido para servidores remotos comerciais ou de terceiros.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">3. Agendamento Demonstrativo Fictício</h3>
            <p>
              O fluxo de agendamento neste protótipo é estritamente <strong>demonstrativo e educativo</strong>. Nenhuma consulta médica é marcada no SUS real por meio deste aplicativo. O objetivo é familiarizar o cidadão com o processo de acolhimento.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">4. Zero Rastreamento e Zero Anúncios</h3>
            <p>
              Não usamos cookies de rastreamento publicitário, Google Analytics, pixels do Meta ou qualquer tecnologia de perfilamento comercial.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm mb-2">5. Controle do Usuário: Apagar Dados</h3>
            <p className="mb-3 text-xs text-slate-500">
              Você pode apagar imediatamente qualquer histórico local, preferências de fonte e registros de simulação salvos neste navegador.
            </p>
            <button
              onClick={handleClear}
              className="flex items-center justify-center gap-2 w-full min-h-[44px] px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs rounded-xl border border-rose-200 transition"
            >
              <Trash2 className="w-4 h-4" />
              Apagar todos os dados salvos neste celular
            </button>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="min-h-[44px] px-5 py-2.5 bg-slate-900 text-white font-medium text-xs rounded-xl hover:bg-slate-800 transition"
          >
            Fechar aviso
          </button>
        </div>
      </div>
    </div>
  );
};
