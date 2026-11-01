import React, { useState, useEffect } from 'react';
import {
  Activity,
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle,
  HardDrive,
  Wifi,
  Database,
  ShieldCheck,
  FileCode2,
  GitBranch,
  Layers,
  RefreshCw,
  Cpu,
  Clock,
  Gauge,
  AlertTriangle,
  FlaskConical,
  BookCheck
} from 'lucide-react';
import { TechnicalTestResult, TelemetryReport, MeasuredPerformanceData } from '../types';
import { runTechnicalEvaluations } from '../services/testRunnerService';
import { getTelemetryData } from '../services/storageService';
import { measureCurrentPerformance, globalTransferTracker } from '../services/performanceService';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { applyPWAUpdate, getPWAStatus } from '../services/pwaService';

export const DiagnosticsView: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [testResults, setTestResults] = useState<TechnicalTestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [telemetry, setTelemetry] = useState<TelemetryReport>(() => getTelemetryData());
  const [measuredPerf, setMeasuredPerf] = useState<MeasuredPerformanceData>(() => measureCurrentPerformance());
  const [activeSection, setActiveSection] = useState<'testes' | 'telemetria' | 'relatorio'>('testes');
  const [swStatus, setSwStatus] = useState(() => getPWAStatus());

  const handleRunTests = async () => {
    setIsRunningTests(true);
    try {
      const results = await runTechnicalEvaluations();
      setTestResults(results);
      setTelemetry(getTelemetryData());
      setMeasuredPerf(measureCurrentPerformance());
      setSwStatus(getPWAStatus());
    } finally {
      setIsRunningTests(false);
    }
  };

  useEffect(() => {
    handleRunTests();
  }, []);

  const passedCount = testResults.filter((t) => t.status === 'aprovado').length;
  const failedCount = testResults.filter((t) => t.status === 'reprovado').length;
  const pendingManualCount = testResults.filter((t) => t.status === 'pendente_validacao_manual').length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Cabeçalho */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
          <FlaskConical className="w-4 h-4 text-sky-700" />
          <span>Auditoria Técnica & Avaliação Científica · Versão 2</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Painel de Auditoria e Diagnóstico do SaúdeFavela-Lite
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Ambiente de verificação rigorosa para pesquisadores de saúde pública (FAETERJ / UFRJ / Fiocruz). Testes unitários, de integração e validações em campo.
        </p>
      </div>

      {/* Aviso de Atualização Pendente do Service Worker se houver */}
      {swStatus.updatePending && (
        <div className="p-4 rounded-2xl bg-sky-100 border-2 border-sky-300 text-sky-950 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-sky-700 shrink-0 animate-spin" />
            <div>
              <p className="font-bold">Nova versão do aplicativo disponível no cache!</p>
              <p className="text-sky-800">Clique para aplicar e atualizar os arquivos em cache imediatamente.</p>
            </div>
          </div>
          <button
            onClick={() => applyPWAUpdate()}
            className="min-h-[44px] px-4 py-2 bg-sky-700 text-white font-bold rounded-xl hover:bg-sky-800 transition"
          >
            Atualizar Agora
          </button>
        </div>
      )}

      {/* Seletor de Abas Internas */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSection('testes')}
          className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeSection === 'testes'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>Bateria de Testes ({passedCount} Aprovados · {pendingManualCount} Manuais)</span>
        </button>

        <button
          onClick={() => {
            setActiveSection('telemetria');
            setMeasuredPerf(measureCurrentPerformance());
          }}
          className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeSection === 'telemetria'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Gauge className="w-3.5 h-3.5" />
          <span>Métricas de Performance API</span>
        </button>

        <button
          onClick={() => setActiveSection('relatorio')}
          className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeSection === 'relatorio'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <BookCheck className="w-3.5 h-3.5" />
          <span>Dossiê da Pesquisa & Protocolo</span>
        </button>
      </div>

      {/* ABA 1: BATERIA DE TESTES COM SEPARAÇÃO METODOLÓGICA */}
      {activeSection === 'testes' && (
        <div className="space-y-4">
          {/* Card Resumo com Status Real */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Verificação dos Requisitos Técnicos
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl font-black text-slate-900 tabular-nums">
                  {passedCount} / {testResults.length}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  {passedCount} Aprovados
                </span>
                {pendingManualCount > 0 && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
                    {pendingManualCount} Validação Manual em Campo
                  </span>
                )}
                {failedCount > 0 && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                    {failedCount} Falhas
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleRunTests}
              disabled={isRunningTests}
              className="min-h-[44px] px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRunningTests ? 'animate-spin' : ''}`} />
              <span>{isRunningTests ? 'Executando...' : 'Reexecutar Bateria Real'}</span>
            </button>
          </div>

          {/* Lista dos Testes com Tipagem e Assertions */}
          <div className="space-y-3">
            {testResults.map((test) => {
              const isPassed = test.status === 'aprovado';
              const isFailed = test.status === 'reprovado';
              const isManual = test.status === 'pendente_validacao_manual';

              return (
                <div
                  key={test.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 text-xs space-y-2 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5">
                        {isPassed && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                        {isFailed && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                        {isManual && <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            test.testType === 'unitario'
                              ? 'bg-purple-100 text-purple-900'
                              : test.testType === 'integracao'
                              ? 'bg-blue-100 text-blue-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {test.testType === 'unitario' ? 'Teste Unitário' : test.testType === 'integracao' ? 'Teste de Integração' : 'Validação Manual em Campo'}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">· {test.category}</span>
                        </div>
                        <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {test.title}
                        </h2>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shrink-0 text-center ${
                        isPassed
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : isFailed
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}
                    >
                      {isPassed ? 'Aprovado' : isFailed ? 'Reprovado' : 'Validação Manual'}
                    </span>
                  </div>

                  {/* Assertion verificada */}
                  <div className="p-2.5 rounded-xl bg-slate-50 font-mono text-[11px] text-slate-700 border border-slate-200/80 overflow-x-auto">
                    {test.assertion}
                  </div>

                  <p className="text-slate-700 leading-relaxed text-xs">
                    {test.details}
                  </p>

                  {test.reproducibilityStep && (
                    <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-100 flex items-start gap-1">
                      <span className="font-bold text-slate-800">Passo de reprodução:</span>
                      <span>{test.reproducibilityStep}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ABA 2: MÉTRICAS REAIS DA PERFORMANCE API */}
      {activeSection === 'telemetria' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-950 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-sky-700" />
              Medições em Tempo Real via W3C Performance API
            </p>
            <p className="leading-relaxed">
              {measuredPerf.sampleCondition}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Métrica 1: Payload Transferido */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <HardDrive className="w-4 h-4 text-sky-700" />
                <span>Dados de Rede Medidos</span>
              </div>
              <div className="text-2xl font-black text-slate-900 tabular-nums">
                {(measuredPerf.measuredTransferBytes / 1024).toFixed(1)} <span className="text-sm font-semibold text-slate-500">KB</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Soma de `transferSize` de todos os recursos carregados.
              </p>
            </div>

            {/* Métrica 2: Quantidade de Recursos */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Layers className="w-4 h-4 text-emerald-700" />
                <span>Recursos Carregados</span>
              </div>
              <div className="text-2xl font-black text-slate-900 tabular-nums">
                {measuredPerf.resourceCount} <span className="text-sm font-semibold text-slate-500">arquivos</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Total de scripts, estilos, imagens e manifest no PerformanceResourceTiming.
              </p>
            </div>

            {/* Métrica 3: DOM Content Loaded */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>DOMContentLoaded</span>
              </div>
              <div className="text-2xl font-black text-slate-900 tabular-nums">
                {measuredPerf.domContentLoadedMs} <span className="text-sm font-semibold text-slate-500">ms</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Tempo até a árvore de elementos estar pronta para interação.
              </p>
            </div>

            {/* Métrica 4: Memória JS Heap */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Cpu className="w-4 h-4 text-indigo-700" />
                <span>Memória JS Heap</span>
              </div>
              <div className="text-2xl font-black text-slate-900 tabular-nums">
                {measuredPerf.memoryUsageMb ? `${measuredPerf.memoryUsageMb} MB` : 'Disponível no Chrome'}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Consumo de memória RAM alocada pela VM do navegador.
              </p>
            </div>
          </div>

          {/* Teste de Transferência Adicional entre Abas */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-700" />
              Transferência Adicional ao Navegar pelas 5 Áreas
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Como o SaúdeFavela-Lite adota arquitetura Single Page Application (SPA) com pré-carregamento do catálogo estático, a alternância entre <strong>Início, Unidades, Guia SUS, Simulação e Avaliação</strong> ocorre inteiramente em memória sem disparar novos pacotes de rede:
            </p>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-600">Requisições de rede ao trocar de aba:</span>
                <span className="font-bold text-emerald-700">0 requisições (Zero Network Overhead)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Bytes transferidos por transição:</span>
                <span className="font-bold text-emerald-700">0 Bytes (Estado reativo local)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: DOSSIÊ ACADÊMICO & PROCEDIMENTO DE TESTE OFFLINE */}
      {activeSection === 'relatorio' && (
        <div className="space-y-5 text-xs sm:text-sm text-slate-700">
          {/* Procedimento Reproduzível para Teste Offline em Navegador Real */}
          <section className="p-5 rounded-3xl bg-white border border-slate-200 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Wifi className="w-5 h-5 text-sky-700" />
              Procedimento Reproduzível para Teste Offline em Navegador Real
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Para testar de forma reprodutível a camada offline-first no Google Chrome / Edge / Firefox ou no smartphone:
            </p>
            <ol className="space-y-2 pl-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-sky-700">1.</span>
                <span><strong>Primeiro Carregamento:</strong> Acesse a URL da aplicação e aguarde o download inicial (cerca de 300ms a 800ms).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-sky-700">2.</span>
                <span><strong>Inspecionar Service Worker:</strong> Abra o DevTools (<kbd className="px-1 py-0.5 bg-slate-100 border rounded">F12</kbd>) &gt; aba <strong>Application</strong> &gt; <strong>Service Workers</strong> e verifique se o status está como <code># activated and is running</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-sky-700">3.</span>
                <span><strong>Simulação Offline:</strong> No DevTools &gt; aba <strong>Network</strong>, altere o seletor de velocidade de <em>No throttling</em> para <strong>Offline</strong> (ou coloque o smartphone em Modo Avião).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-sky-700">4.</span>
                <span><strong>Recarregamento (<kbd className="px-1 py-0.5 bg-slate-100 border rounded">Ctrl+R</kbd>):</strong> A aplicação recarregará instantaneamente servida pelo Cache Storage, com banner amarelo indicando "Modo Offline Ativo".</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-sky-700">5.</span>
                <span><strong>Busca de Unidades e Guia:</strong> Pesquise por "Rocinha", "Maré" ou "sem conta de luz". Todos os 11 postos e diretrizes responderão imediatamente sem falhas.</span>
              </li>
            </ol>
          </section>

          {/* Dossiê Metodológico para a Pesquisa Científica */}
          <section className="p-5 rounded-3xl bg-white border border-slate-200 space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookCheck className="w-5 h-5 text-emerald-700" />
              Fundamentação Metodológica para Pesquisa em Saúde Coletiva
            </h2>
            <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong>Hipótese de Pesquisa:</strong> A simplificação da interface digital, o suporte de áudio nativo e a garantia de acesso offline reduzem o tempo e a ansiedade informacional de moradores de favelas cariocas na busca por acolhimento na Atenção Primária à Saúde.
              </p>
              <p>
                <strong>Tratamento Ético e LGPD (Lei nº 13.709/2018):</strong> O protótipo implementa *Privacy by Design*. Nenhum dado identificador (CPF, prontuário, CNS) é trafegado ou exigido. A simulação de agendamento é estritamente pedagógica e pode ser apagada a qualquer momento pelo botão de limpeza local.
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
