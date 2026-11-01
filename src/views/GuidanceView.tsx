import React, { useState } from 'react';
import {
  HelpCircle,
  FileCheck2,
  ListOrdered,
  Lightbulb,
  ShieldAlert,
  Volume2,
  PhoneCall,
  Search,
  Mic,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  HeartPulse,
  Scale,
  Calendar
} from 'lucide-react';
import { GuidanceTopic, GuidanceCategory, InformationLevel } from '../types';
import { GUIDANCE_TOPICS_DATA } from '../data/guidanceTopicsData';
import { startVoiceInput, stopVoiceInput } from '../services/speechService';

interface GuidanceViewProps {
  onSpeak: (text: string) => void;
}

export const GuidanceView: React.FC<GuidanceViewProps> = ({ onSpeak }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('sem-comprovante'); // Inicia com o guia crucial de documentos aberto
  const [isListening, setIsListening] = useState(false);

  const categories = [
    { id: 'todos', label: 'Tudo' },
    { id: 'documentos', label: 'Documentos & Direitos' },
    { id: 'consulta', label: 'Consultas Médicas' },
    { id: 'vacina', label: 'Vacinação' },
    { id: 'remedios', label: 'Remédios Gratuitos' },
    { id: 'pre_natal', label: 'Pré-Natal / Gestante' },
    { id: 'urgencia', label: 'Urgências (SAMU 192)' },
  ];

  const handleVoiceSearch = () => {
    if (isListening) {
      stopVoiceInput();
      setIsListening(false);
      return;
    }
    setIsListening(true);
    startVoiceInput(
      (transcript) => {
        setSearchTerm(transcript);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const getLevelBadge = (level: InformationLevel) => {
    switch (level) {
      case 'direito_universal':
        return { label: 'Direito Universal (CF/88)', class: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      case 'procedimento_administrativo':
        return { label: 'Rotina de Acolhimento APS', class: 'bg-sky-100 text-sky-900 border-sky-300' };
      case 'especifico_municipal_rj':
        return { label: 'Programa Municipal RJ', class: 'bg-purple-100 text-purple-900 border-purple-300' };
      case 'confirmar_na_unidade':
        return { label: 'Confirmar na Unidade', class: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'urgencia_emergencia':
        return { label: 'Urgência & Emergência 192', class: 'bg-rose-100 text-rose-900 border-rose-300' };
      default:
        return { label: 'Informativo', class: 'bg-slate-100 text-slate-800 border-slate-300' };
    }
  };

  const filteredTopics = GUIDANCE_TOPICS_DATA.filter((topic) => {
    if (selectedCategory !== 'todos' && topic.category !== selectedCategory) {
      return false;
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const text = `${topic.title} ${topic.shortSummary} ${topic.whatToBring.join(' ')} ${topic.stepsToFollow.join(' ')} ${topic.communityTips.join(' ')} ${topic.legalBasis}`.toLowerCase();
      return text.includes(term);
    }
    return true;
  });

  const handleReadTopic = (topic: GuidanceTopic) => {
    const text = `
      ${topic.title}.
      Classificação: ${getLevelBadge(topic.informationLevel).label}.
      Resumo: ${topic.shortSummary}.
      O que levar: ${topic.whatToBring.join('. ')}.
      Passo a passo no posto: ${topic.stepsToFollow.join('. ')}.
      Dica da comunidade: ${topic.communityTips.join('. ')}.
      Seu direito no SUS: ${topic.susRightsNote}.
      Base jurídica: ${topic.legalBasis}.
    `;
    onSpeak(text);
  };

  return (
    <div className="space-y-5 pb-8 animate-in fade-in duration-150">
      {/* Título & Introdução Acolhedora */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Guia de Orientações e Direitos no SUS
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Fundamentação jurídica e normas sanitárias em linguagem simples e sem barreiras desnecessárias.
        </p>
      </div>

      {/* Caixa de Alerta de Responsabilidade e Distinção de Níveis */}
      <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 text-xs space-y-1">
        <p className="font-bold flex items-center gap-1.5 text-sky-900">
          <HelpCircle className="w-4 h-4 text-sky-700 shrink-0" />
          Rigor Informativo e Distinção Legal
        </p>
        <p className="text-sky-800 leading-relaxed">
          Cada orientação abaixo distingue claramente <strong>Direitos Universais</strong> (que ninguém pode negar), <strong>Rotinas Administrativas</strong> de acolhimento e <strong>Protocolos de Emergência</strong>, com indicação das leis e portarias do Ministério da Saúde.
        </p>
      </div>

      {/* Barra de Busca de Dúvidas */}
      <div className="relative flex items-center">
        <label htmlFor="guidance-search" className="sr-only">
          Buscar orientações de saúde
        </label>
        <Search className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" aria-hidden="true" />
        <input
          id="guidance-search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Qual é a sua dúvida? (Ex: sem conta de luz, vacina, remédio...)"
          className="w-full min-h-[48px] pl-11 pr-14 py-2.5 bg-white border border-slate-300 rounded-2xl text-sm text-slate-900 placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 shadow-2xs"
        />
        <button
          type="button"
          onClick={handleVoiceSearch}
          aria-label={isListening ? 'Parar microfone' : 'Pesquisar por voz'}
          className={`absolute right-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition ${
            isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>

      {/* Categorias Rápidas em Abas Roláveis */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none" role="tablist">
        {categories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={selectedCategory === cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
              selectedCategory === cat.id
                ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tópicos com Expansão Interativa */}
      <div className="space-y-3.5">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedId === topic.id;
          const isUrgent = topic.isUrgent;
          const badge = getLevelBadge(topic.informationLevel);

          return (
            <article
              key={topic.id}
              className={`rounded-3xl bg-white border transition-all ${
                isUrgent
                  ? 'border-rose-300 ring-2 ring-rose-100'
                  : isExpanded
                  ? 'border-emerald-300 shadow-md ring-1 ring-emerald-50'
                  : 'border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              {/* Cabeçalho Clicável do Tópico */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : topic.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setExpandedId(isExpanded ? null : topic.id);
                  }
                }}
                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer"
                aria-expanded={isExpanded}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      isUrgent
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    {isUrgent ? (
                      <AlertTriangle className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <HeartPulse className="w-5 h-5" aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.class}`}>
                        {badge.label}
                      </span>
                    </div>
                    <h2 className={`text-base font-bold leading-snug ${
                      isUrgent ? 'text-rose-950' : 'text-slate-900'
                    }`}>
                      {topic.title}
                    </h2>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {topic.shortSummary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 mt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadTopic(topic);
                    }}
                    aria-label={`Ouvir ${topic.title}`}
                    title="Ouvir esta orientação"
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <div className="w-8 h-8 flex items-center justify-center text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Conteúdo Expandido */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 animate-in fade-in duration-150">
                  {/* Bloco de Emergência Imediata se for urgente */}
                  {topic.emergencyAction && (
                    <div className="p-3.5 rounded-2xl bg-rose-600 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                      <div className="text-xs">
                        <p className="font-bold text-sm">Emergência Médica?</p>
                        <p className="text-rose-100">Não espere se houver falta de ar grave, convulsão ou dor forte no peito.</p>
                      </div>
                      <a
                        href={`tel:${topic.emergencyAction.phone}`}
                        className="w-full sm:w-auto min-h-[44px] px-4 py-2 bg-white text-rose-700 hover:bg-rose-50 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
                      >
                        <PhoneCall className="w-4 h-4" />
                        {topic.emergencyAction.label}
                      </a>
                    </div>
                  )}

                  {/* 1. O que levar */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-emerald-700" />
                      Documentos e Itens Recomendados
                    </h3>
                    <ul className="space-y-1.5 pl-1 text-xs text-slate-700">
                      {topic.whatToBring.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 2. Passo a passo */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <ListOrdered className="w-4 h-4 text-sky-700" />
                      O que fazer ao chegar na unidade
                    </h3>
                    <ol className="space-y-2 pl-1 text-xs text-slate-700">
                      {topic.stepsToFollow.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 font-bold text-[11px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* 3. Dicas da Comunidade */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                    <h3 className="font-bold flex items-center gap-1.5 text-amber-900">
                      <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" />
                      Dica de ouro da comunidade
                    </h3>
                    <ul className="space-y-1 pl-1 text-amber-900">
                      {topic.communityTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span>•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 4. Seu Direito e Fundamentação Jurídica */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                    <div className="flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 block mb-0.5">Seu Direito no SUS:</span>
                        <p className="leading-relaxed">{topic.susRightsNote}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 font-mono text-[10px]">
                        <Scale className="w-3.5 h-3.5 text-slate-400" />
                        {topic.legalBasis}
                      </span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Auditado em {topic.lastVerifiedDate}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
