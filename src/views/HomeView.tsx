import React from 'react';
import {
  MapPin,
  BookOpen,
  CalendarCheck2,
  FileText,
  PhoneCall,
  WifiOff,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';
import { AppTab } from '../components/BottomNavBar';

interface HomeViewProps {
  onNavigate: (tab: AppTab) => void;
  onOpenPrivacy: () => void;
  onSpeak: (text: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenPrivacy,
  onSpeak,
}) => {
  const handleReadHome = () => {
    const text = `
      Bem-vindo ao SaúdeFavela-Lite. Guia comunitário de orientação em saúde da Atenção Primária no Rio de Janeiro.
      Você tem quatro opções principais:
      Opção um: Encontrar uma unidade de saúde, como Clínica da Família ou Centro Municipal de Saúde.
      Opção dois: Entender como conseguir atendimento e consulta.
      Opção três: Consultar orientações e documentos necessários, incluindo como fazer se você não tiver conta de luz no seu nome.
      Opção quatro: Simular uma solicitação de consulta demonstrativa.
      Em caso de emergência grave, ligue imediatamente para o SAMU no número 192.
    `;
    onSpeak(text);
  };

  return (
    <div className="space-y-6 pb-6 animate-in fade-in duration-150">
      {/* Aviso Discreto de Protótipo Independente */}
      <div className="bg-sky-50/80 border border-sky-100 rounded-2xl p-3 text-xs text-sky-900 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0" aria-hidden="true" />
          <span>
            <strong>Protótipo Comunitário Independente:</strong> Orientação simplificada para a Atenção Primária no Rio de Janeiro.
          </span>
        </div>
        <button
          onClick={onOpenPrivacy}
          className="text-sky-800 underline font-semibold text-[11px] whitespace-nowrap hover:text-sky-950 min-h-[44px] flex items-center"
        >
          Saiba mais
        </button>
      </div>

      {/* Hero com Gradiente e Padrão Visual Acolhedor */}
      <section className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-200 bg-linear-to-br from-sky-900 via-slate-900 to-emerald-950 text-white">
        <div className="relative p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
            <HeartHandshake className="w-4 h-4" />
            <span>Saúde Pública ao Alcance de Todos</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
            Acesso fácil à sua Clínica da Família no Rio
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-xl font-normal leading-relaxed">
            Orientações sobre consultas, vacinas e documentos com funcionamento offline e sem exigência de cadastro.
          </p>
        </div>

        {/* Barra Rápida de Benefícios Offline */}
        <div className="bg-slate-950/80 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% gratuito · Sem cadastro · Arquivos salvos no celular</span>
          </div>
          <button
            onClick={handleReadHome}
            className="text-sky-300 hover:text-sky-200 underline font-semibold flex items-center gap-1 min-h-[44px]"
          >
            Ouvir tela
          </button>
        </div>
      </section>

      {/* 4 Ações Principais Obrigatórias */}
      <section aria-labelledby="acoes-principais-title">
        <h2 id="acoes-principais-title" className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
          O que você deseja fazer agora?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Ação 1: Encontrar Unidade */}
          <button
            onClick={() => onNavigate('units')}
            className="group text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-500 shadow-xs hover:shadow-md transition-all active:scale-[0.99] flex items-start justify-between min-h-[96px]"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0 group-hover:bg-sky-700 group-hover:text-white transition-colors">
                <MapPin className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  1. Encontrar uma unidade
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  Localize Clínicas da Família, Postos de Saúde e UPAs perto da sua comunidade com telefone e horário.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sky-700 shrink-0 mt-1" />
          </button>

          {/* Ação 2: Entender Atendimento */}
          <button
            onClick={() => onNavigate('guidance')}
            className="group text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all active:scale-[0.99] flex items-start justify-between min-h-[96px]"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  2. Entender o atendimento
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  Descubra como funciona o acolhimento, como falar com seu Agente de Saúde e não perder a viagem.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-700 shrink-0 mt-1" />
          </button>

          {/* Ação 3: Documentos e Direitos */}
          <button
            onClick={() => onNavigate('guidance')}
            className="group text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 shadow-xs hover:shadow-md transition-all active:scale-[0.99] flex items-start justify-between min-h-[96px]"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <FileText className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                  3. Documentos e Direitos
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  O que levar na consulta e como ser atendido mesmo se você não tiver conta de luz no seu nome.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-700 shrink-0 mt-1" />
          </button>

          {/* Ação 4: Simulação de Agendamento */}
          <button
            onClick={() => onNavigate('simulation')}
            className="group text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 shadow-xs hover:shadow-md transition-all active:scale-[0.99] flex items-start justify-between min-h-[96px]"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center shrink-0 group-hover:bg-indigo-700 group-hover:text-white transition-colors">
                <CalendarCheck2 className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                  4. Simular agendamento
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  Treine o processo de solicitação em 6 etapas e guarde o resumo para quando for à sua clínica.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-700 shrink-0 mt-1" />
          </button>
        </div>
      </section>

      {/* Cartão de Emergência Rápida (192 SAMU) */}
      <section className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-4 sm:p-5 text-rose-950">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <PhoneCall className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-rose-950">
                Está com sintomas graves ou perigo à vida?
              </h2>
              <p className="text-xs text-rose-800 mt-0.5 leading-snug">
                Dor forte no peito, falta de ar grave ou desmaio: ligue imediatamente para o SAMU ou Bombeiros.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="tel:192"
              className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition"
            >
              Ligar 192 (SAMU)
            </a>
            <a
              href="tel:193"
              className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition border border-rose-300"
            >
              Ligar 193 (Bombeiros)
            </a>
          </div>
        </div>
      </section>

      {/* Cartão de Uso Offline */}
      <section className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-slate-700 flex items-start gap-3">
        <WifiOff className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs space-y-1">
          <p className="text-slate-700 leading-relaxed font-medium">
            Não exige cadastro. Depois da primeira visita, os arquivos do app ficam salvos no celular.
          </p>
        </div>
      </section>
    </div>
  );
};
