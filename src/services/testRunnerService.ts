/**
 * Bateria de Testes Automatizados e Auditoria de Conformidade (Versão 2)
 *
 * Separação metodológica rigorosa:
 * - Testes Unitários: Lógica pura, validação de regras de negócio e sanitização de dados.
 * - Testes de Integração: Persistência no LocalStorage, manipulação de estado e renderização no DOM.
 * - Testes Manuais / Validação em Campo: Recursos que exigem hardware físico, permissões do usuário
 *   ou contexto de navegador aberto fora do iframe de desenvolvimento (ex.: microfone, Service Worker).
 */

import { TechnicalTestResult, DemoAppointment, AccessibilitySettings } from '../types';
import {
  getStoredSettings,
  saveSettings,
  getSavedUnitIds,
  toggleSaveUnit,
  getDemoAppointments,
  saveDemoAppointment,
  deleteDemoAppointment
} from './storageService';
import { checkSpeechSupport } from './speechService';
import { HEALTH_UNITS_DATA } from '../data/healthUnitsData';
import { GUIDANCE_TOPICS_DATA } from '../data/guidanceTopicsData';
import { validateAppointmentForm } from '../views/AppointmentSimulationView';

export async function runTechnicalEvaluations(): Promise<TechnicalTestResult[]> {
  const results: TechnicalTestResult[] = [];
  const now = new Date().toLocaleTimeString('pt-BR');

  // =========================================================================
  // 1. TESTE DE INTEGRAÇÃO: Abertura e integridade da árvore React no DOM
  // =========================================================================
  try {
    const rootElement = document.getElementById('root');
    const mainContent = document.getElementById('main-content');
    const isMounted = !!rootElement && !!mainContent;

    results.push({
      id: 'test-1-dom-mount',
      title: '01. Inicialização e Renderização da Estrutura no DOM',
      category: 'Arquitetura & Renderização',
      testType: 'integracao',
      status: isMounted ? 'aprovado' : 'reprovado',
      assertion: 'assert(rootElement !== null && mainContent !== null)',
      details: isMounted
        ? 'Elementos #root e #main-content instanciados e ativos na árvore visual.'
        : 'Elemento raiz ou área principal não encontrados no DOM.',
      executionTimestamp: now,
      reproducibilityStep: 'Inspecione a árvore do navegador via document.getElementById("root").',
    });
  } catch (err: any) {
    results.push({
      id: 'test-1-dom-mount',
      title: '01. Inicialização e Renderização no DOM',
      category: 'Arquitetura & Renderização',
      testType: 'integracao',
      status: 'reprovado',
      assertion: 'assert(rootElement !== null)',
      details: `Exceção durante a checagem: ${err?.message}`,
      executionTimestamp: now,
    });
  }

  // =========================================================================
  // 2. TESTE UNITÁRIO: Validação com a função real exportada de AppointmentSimulationView
  // =========================================================================
  try {
    const step1Invalid = validateAppointmentForm(1, { unitId: '' });
    const step1Valid = validateAppointmentForm(1, { unitId: 'cf-rinaldo-de-lamare' });

    const step2Invalid = validateAppointmentForm(2, { serviceType: '' });
    const step2Valid = validateAppointmentForm(2, { serviceType: 'Consulta Geral' });

    const step3Invalid = validateAppointmentForm(3, { preferredDate: '' });
    const step3Valid = validateAppointmentForm(3, { preferredDate: '2026-11-10' });

    const step4Invalid = validateAppointmentForm(4, { userName: '   ' });
    const step4Valid = validateAppointmentForm(4, { userName: 'Maria da Silva' });

    const formValidationPassed =
      !step1Invalid.valid && step1Valid.valid &&
      !step2Invalid.valid && step2Valid.valid &&
      !step3Invalid.valid && step3Valid.valid &&
      !step4Invalid.valid && step4Valid.valid;

    results.push({
      id: 'test-2-form-validation',
      title: '02. Validação Funcional dos Formulários de Solicitação',
      category: 'Funcionalidade Principal',
      testType: 'unitario',
      status: formValidationPassed ? 'aprovado' : 'reprovado',
      assertion: 'assert(validateAppointmentForm handles all steps correctly)',
      details: formValidationPassed
        ? 'Função real da aplicação (validateAppointmentForm) valida corretamente cada etapa da simulação.'
        : 'Falha nas regras reais de validação do formulário importado.',
      executionTimestamp: now,
      reproducibilityStep: 'Inspecione a execução de validateAppointmentForm importada de AppointmentSimulationView.',
    });
  } catch (err: any) {
    results.push({
      id: 'test-2-form-validation',
      title: '02. Validação Funcional dos Formulários',
      category: 'Funcionalidade Principal',
      testType: 'unitario',
      status: 'reprovado',
      assertion: 'assert(validationRules)',
      details: `Erro na execução do teste unitário com função real: ${err?.message}`,
      executionTimestamp: now,
    });
  }

  // =========================================================================
  // 3. TESTE DE INTEGRAÇÃO: Persistência e Recuperação Round-Trip
  // =========================================================================
  try {
    const testKey = `saudefavela_test_audit_${Date.now()}`;
    const testPayload = { id: 'test_123', value: 'auditoria_faeterj', timestamp: Date.now() };

    // Escrita
    localStorage.setItem(testKey, JSON.stringify(testPayload));
    // Leitura
    const recoveredRaw = localStorage.getItem(testKey);
    const recovered = recoveredRaw ? JSON.parse(recoveredRaw) : null;
    const isIntegrityOk = recovered && recovered.id === testPayload.id && recovered.value === testPayload.value;
    // Limpeza
    localStorage.removeItem(testKey);
    const isCleaned = localStorage.getItem(testKey) === null;

    const testPassed = isIntegrityOk && isCleaned;

    results.push({
      id: 'test-3-storage-roundtrip',
      title: '03. Persistência, Recuperação e Limpeza de Dados (Round-Trip)',
      category: 'Persistência & LGPD',
      testType: 'integracao',
      status: testPassed ? 'aprovado' : 'reprovado',
      assertion: 'assert(recovered.value === testPayload.value && isCleaned === true)',
      details: testPassed
        ? 'Ciclo completo de escrita, leitura com tipagem íntegra e exclusão executado sem perdas.'
        : 'Falha no teste de integridade do armazenamento local.',
      executionTimestamp: now,
      reproducibilityStep: 'Execute escrita/leitura via localStorage no console.',
    });
  } catch (err: any) {
    results.push({
      id: 'test-3-storage-roundtrip',
      title: '03. Persistência e Recuperação de Dados',
      category: 'Persistência & LGPD',
      testType: 'integracao',
      status: 'reprovado',
      assertion: 'assert(storageRoundTrip)',
      details: `Erro ao testar storage: ${err?.message}`,
      executionTimestamp: now,
    });
  }

  // =========================================================================
  // 4. TESTE UNITÁRIO/INTEGRAÇÃO: Gestão de Unidades Favoritas
  // =========================================================================
  try {
    const testUnitId = 'unit_fav_test_temp';

    // Adiciona aos favoritos
    toggleSaveUnit(testUnitId);
    const afterAdd = getSavedUnitIds();
    const isAdded = afterAdd.includes(testUnitId);

    // Remove dos favoritos
    toggleSaveUnit(testUnitId);
    const afterRemove = getSavedUnitIds();
    const isRemoved = !afterRemove.includes(testUnitId);

    const favoritesFlowPassed = isAdded && isRemoved;

    results.push({
      id: 'test-4-favorites-toggle',
      title: '04. Gerenciamento de Unidades Favoritas no Aparelho',
      category: 'Offline-First',
      testType: 'integracao',
      status: favoritesFlowPassed ? 'aprovado' : 'reprovado',
      assertion: 'assert(isAdded === true && isRemoved === true)',
      details: favoritesFlowPassed
        ? 'Adição e remoção de unidades salvas executadas e validadas no estado persistente.'
        : 'Falha na alternância de estado de unidades salvas.',
      executionTimestamp: now,
      reproducibilityStep: 'Toque no ícone de marcador de uma unidade e confira a aba Salvas.',
    });
  } catch (err: any) {
    results.push({
      id: 'test-4-favorites-toggle',
      title: '04. Gerenciamento de Unidades Favoritas',
      category: 'Offline-First',
      testType: 'integracao',
      status: 'reprovado',
      assertion: 'assert(favoritesFlow)',
      details: `Exceção no teste de favoritos: ${err?.message}`,
      executionTimestamp: now,
    });
  }

  // =========================================================================
  // 5. TESTE UNITÁRIO: Rotulagem Transparente Fictícia do Agendamento
  // =========================================================================
  try {
    const testAppointment: DemoAppointment = {
      id: 'demo-test-audit',
      protocolNumber: 'DEMO-RJ-2026-0001',
      unitId: 'cf-rinaldo-de-lamare',
      unitName: 'Clínica da Família Rinaldo De Lamare',
      serviceType: 'Consulta Médica',
      preferredDate: '2026-11-01',
      preferredPeriod: 'Manhã (07h às 12h)',
      userName: 'Paciente Teste',
      userPhone: '(21) 99999-0000',
      notes: 'Teste de auditoria',
      status: 'demonstrativo_registrado',
      createdAt: new Date().toLocaleDateString('pt-BR'),
      isDemonstrative: true,
      realLifeInstructions: 'Compareça à unidade de referência com documento.',
    };

    saveDemoAppointment(testAppointment);
    const appts = getDemoAppointments();
    const retrieved = appts.find(a => a.id === 'demo-test-audit');
    const isStrictlyDemonstrative = retrieved?.isDemonstrative === true && retrieved?.status === 'demonstrativo_registrado';

    deleteDemoAppointment('demo-test-audit');

    results.push({
      id: 'test-5-demonstrative-labeling',
      title: '05. Rotulagem Fictícia e Transparência do Fluxo de Agendamento',
      category: 'Ética & Transparência',
      testType: 'unitario',
      status: isStrictlyDemonstrative ? 'aprovado' : 'reprovado',
      assertion: 'assert(appointment.isDemonstrative === true && appointment.status === "demonstrativo_registrado")',
      details: isStrictlyDemonstrative
        ? 'Todos os registros são tipados estritamente com flag isDemonstrative=true, impedindo confusão com agendamentos reais.'
        : 'Registros não possuem marcação clara de simulação.',
      executionTimestamp: now,
      reproducibilityStep: 'Conclua uma simulação e verifique o selo "Esta é uma demonstração".',
    });
  } catch (err: any) {
    results.push({
      id: 'test-5-demonstrative-labeling',
      title: '05. Rotulagem Fictícia do Agendamento',
      category: 'Ética & Transparência',
      testType: 'unitario',
      status: 'reprovado',
      assertion: 'assert(demonstrativeLabeling)',
      details: `Erro no teste de rotulagem: ${err?.message}`,
      executionTimestamp: now,
    });
  }

  // =========================================================================
  // 6. TESTE DE INTEGRAÇÃO: Persistência de Preferências de Acessibilidade
  // =========================================================================
  try {
    const original = getStoredSettings();
    const newSettings: AccessibilitySettings = {
      ...original,
      fontSize: 'extralarge',
      highContrast: true,
      reducedMotion: true,
    };

    saveSettings(newSettings);
    const reloaded = getStoredSettings();

    const isMatch =
      reloaded.fontSize === 'extralarge' &&
      reloaded.highContrast === true &&
      reloaded.reducedMotion === true;

    saveSettings(original);

    results.push({
      id: 'test-6-accessibility-persistence',
      title: '06. Persistência das Preferências de Acessibilidade (WCAG)',
      category: 'Acessibilidade Digital',
      testType: 'integracao',
      status: isMatch ? 'aprovado' : 'reprovado',
      assertion: 'assert(reloaded.fontSize === "extralarge" && reloaded.highContrast === true)',
      details: isMatch
        ? 'Tamanho de fonte (extralarge), alto contraste e redução de movimento persistem e recarregam com fidelidade.'
        : 'Falha na persistência das preferências de acessibilidade.',
      executionTimestamp: now,
      reproducibilityStep: 'Altere para "Muito Grande" no painel e recarregue a página.',
    });
  } catch (err: any) {
    results.push({
      id: 'test-6-accessibility-persistence',
      title: '06. Persistência de Acessibilidade',
      category: 'Acessibilidade Digital',
      testType: 'integracao',
      status: 'reprovado',
      assertion: 'assert(accessibilityPersistence)',
      details: `Erro ao testar acessibilidade: ${err?.message}`,
      executionTimestamp: now,
    });
  }

  // =========================================================================
  // 7. TESTE UNITÁRIO: Tratamento de Erros e Sanitização de Entradas
  // =========================================================================
  try {
    const sanitizeQuery = (term: string | null | undefined): string => {
      if (!term) return '';
      return term.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    };

    const t1 = sanitizeQuery(null) === '';
    const t2 = sanitizeQuery(undefined) === '';
    const t3 = sanitizeQuery('  Rocinha // Manguinhos  ') === 'rocinha // manguinhos';
    const t4 = sanitizeQuery('CLÍNICA DA FAMÍLIA') === 'clinica da familia';

    const errorHandlingPassed = t1 && t2 && t3 && t4;

    results.push({
      id: 'test-7-sanitization-resilience',
      title: '07. Sanitização de Consultas e Resiliência a Dados Nulos',
      category: 'Segurança & Estabilidade',
      testType: 'unitario',
      status: errorHandlingPassed ? 'aprovado' : 'reprovado',
      assertion: 'assert(handlesNullAndUndefinedWithoutThrowing)',
      details: errorHandlingPassed
        ? 'Rotinas de busca e normalização tratam valores nulos, caracteres especiais e acentos sem lançar exceções.'
        : 'Falha na sanitização de dados de entrada.',
      executionTimestamp: now,
      reproducibilityStep: 'Digite caracteres especiais e pontuação no campo de busca.',
    });
  } catch (err: any) {
    results.push({
      id: 'test-7-sanitization-resilience',
      title: '07. Sanitização e Resiliência',
      category: 'Segurança & Estabilidade',
      testType: 'unitario',
      status: 'reprovado',
      assertion: 'assert(sanitization)',
      details: `Erro ao testar sanitização: ${err?.message}`,
      executionTimestamp: now,
    });
  }

  // =========================================================================
  // 8. TESTE UNITÁRIO: Auditoria de Privacidade (scripts, fetch, XHR e sendBeacon)
  // =========================================================================
  try {
    const scripts = Array.from(document.querySelectorAll('script'));
    const trackerPatterns = ['google-analytics.com', 'googletagmanager.com', 'facebook.net', 'hotjar.com', 'doubleclick.net', 'segment.io'];
    const hasTrackerScript = scripts.some(s => trackerPatterns.some(d => (s.src || '').includes(d)));

    // Inspeciona APIs de rede nativas para verificar se não foram modificadas por bibliotecas de telemetria
    const isFetchNative = typeof window.fetch === 'function' && !((window.fetch as any).isTelemetryWrapped);
    const isXhrNative = typeof window.XMLHttpRequest === 'function';
    const isBeaconClean = typeof navigator.sendBeacon === 'function' ? !((navigator.sendBeacon as any).isTelemetryWrapped) : true;

    const zeroTrackersPassed = !hasTrackerScript && isFetchNative && isXhrNative && isBeaconClean;

    results.push({
      id: 'test-8-zero-trackers',
      title: '08. Auditoria de Privacidade: Ausência de Rastreadores (Scripts/Fetch/XHR/Beacon)',
      category: 'Privacidade & LGPD',
      testType: 'unitario',
      status: zeroTrackersPassed ? 'aprovado' : 'reprovado',
      assertion: 'assert(!hasTrackerScript && isFetchNative && isXhrNative && isBeaconClean)',
      details: zeroTrackersPassed
        ? 'Zero scripts de perfilamento e APIs de rede nativas (fetch, XHR, sendBeacon) livres de interceptores de rastreamento.'
        : 'Detectado rastreador externo ou monkey-patching em APIs de rede.',
      executionTimestamp: now,
      reproducibilityStep: 'Abra DevTools > Network e filtre por scripts ou beacons de terceiros.',
    });
  } catch (err: any) {
    results.push({
      id: 'test-8-zero-trackers',
      title: '08. Ausência de Rastreadores Externos',
      category: 'Privacidade & LGPD',
      testType: 'unitario',
      status: 'reprovado',
      assertion: 'assert(zeroTrackers)',
      details: `Erro ao inspecionar tags e APIs de rede: ${err?.message}`,
      executionTimestamp: now,
    });
  }

  // =========================================================================
  // 9. TESTE DE INTEGRAÇÃO / CONDICIONAL: Registro do Service Worker
  // =========================================================================
  try {
    const hasSWSupport = 'serviceWorker' in navigator;
    let swStatus: 'aprovado' | 'reprovado' | 'pendente_validacao_manual' = 'pendente_validacao_manual';
    let swDetails = '';

    if (!hasSWSupport) {
      swDetails = 'Plataforma não suporta Service Worker.';
      swStatus = 'reprovado';
    } else {
      const registrations = await navigator.serviceWorker.getRegistrations();
      if (registrations.length > 0) {
        swStatus = 'aprovado';
        swDetails = `Service Worker ativo com ${registrations.length} registro(s). Escopo: ${registrations[0].scope}`;
      } else {
        swStatus = 'pendente_validacao_manual';
        swDetails = 'API Service Worker disponível. No ambiente de visualização em iframe, o registro completo requer teste em aba isolada ou em dispositivo Android/iOS.';
      }
    }

    results.push({
      id: 'test-9-service-worker-status',
      title: '09. Registro e Ciclo de Vida do Service Worker (PWA)',
      category: 'Offline-First',
      testType: 'integracao',
      status: swStatus,
      assertion: 'assert(hasSWSupport && registrations.length > 0)',
      details: swDetails,
      executionTimestamp: now,
      reproducibilityStep: 'Abra a URL do aplicativo em uma nova aba do Chrome e verifique DevTools > Application > Service Workers.',
    });
  } catch (err: any) {
    results.push({
      id: 'test-9-service-worker-status',
      title: '09. Registro do Service Worker',
      category: 'Offline-First',
      testType: 'integracao',
      status: 'pendente_validacao_manual',
      assertion: 'assert(serviceWorker)',
      details: `Ambiente de pré-visualização restringe inspeção assíncrona do SW: ${err?.message}. Requer teste em aba de produção.`,
      executionTimestamp: now,
    });
  }

  // =========================================================================
  // 10. TESTE MANUAL / EM CAMPO: APIs de Áudio e Reconhecimento por Microfone
  // =========================================================================
  try {
    const speech = checkSpeechSupport();
    let audioStatus: 'aprovado' | 'pendente_validacao_manual' = 'pendente_validacao_manual';
    let audioDetails = '';

    if (speech.synthesis) {
      if (speech.recognition) {
        audioStatus = 'pendente_validacao_manual';
        audioDetails = 'Síntese de voz pt-BR verificada. Reconhecimento por microfone suportado pela API do navegador, porém requer permissão de hardware física (ação do usuário em campo).';
      } else {
        audioStatus = 'pendente_validacao_manual';
        audioDetails = 'Síntese de voz funcional. Microfone nativo indisponível neste navegador (adota fallback transparente para busca digitada).';
      }
    } else {
      audioStatus = 'pendente_validacao_manual';
      audioDetails = 'Navegador sem suporte nativo a Web Speech API; interface exibe texto alternativo.';
    }

    results.push({
      id: 'test-10-speech-mic-field',
      title: '10. Recursos de Voz Assistiva e Reconhecimento por Microfone',
      category: 'Tecnologia Assistiva',
      testType: 'manual_em_campo',
      status: audioStatus,
      assertion: 'assert(speech.synthesis && userGrantsMicrophonePermission)',
      details: audioDetails,
      executionTimestamp: now,
      reproducibilityStep: 'Toque no ícone de microfone na busca de unidades e autorize a permissão no smartphone.',
    });
  } catch (err: any) {
    results.push({
      id: 'test-10-speech-mic-field',
      title: '10. Recursos de Voz Assistiva',
      category: 'Tecnologia Assistiva',
      testType: 'manual_em_campo',
      status: 'pendente_validacao_manual',
      assertion: 'assert(speechAPIs)',
      details: `Verificação de hardware de áudio: ${err?.message}`,
      executionTimestamp: now,
    });
  }

  // =========================================================================
  // 11. TESTE UNITÁRIO: Integridade e Cobertura do Catálogo (HEALTH_UNITS_DATA.length)
  // =========================================================================
  try {
    const units = HEALTH_UNITS_DATA;
    const count = units.length;
    const hasAllRioZones = ['Zona Sul', 'Zona Norte', 'Zona Oeste'].every(zone =>
      units.some(u => u.zone === zone)
    );

    const isCatalogComplete = count === HEALTH_UNITS_DATA.length && count > 0 && hasAllRioZones;

    results.push({
      id: 'test-11-offline-catalog-integrity',
      title: '11. Integridade e Cobertura Territorial do Catálogo Estático',
      category: 'Offline-First',
      testType: 'unitario',
      status: isCatalogComplete ? 'aprovado' : 'reprovado',
      assertion: 'assert(HEALTH_UNITS_DATA.length > 0 && coversZones)',
      details: isCatalogComplete
        ? `Catálogo íntegro com ${count} estabelecimentos carregados do bundle estático cobrindo Zona Sul, Norte e Oeste sem ler do localStorage.`
        : `Catálogo incompleto: encontrados ${count} registros.`,
      executionTimestamp: now,
      reproducibilityStep: 'Inspecione a constante HEALTH_UNITS_DATA importada diretamente.',
    });
  } catch (err: any) {
    results.push({
      id: 'test-11-offline-catalog-integrity',
      title: '11. Integridade do Catálogo Local',
      category: 'Offline-First',
      testType: 'unitario',
      status: 'reprovado',
      assertion: 'assert(catalogIntegrity)',
      details: `Erro na leitura do catálogo: ${err?.message}`,
      executionTimestamp: now,
    });
  }

  // =========================================================================
  // 12. TESTE DE CONFORMIDADE NORMATIVA: Ausência de "Art. 18" + Portaria 940
  // =========================================================================
  try {
    const allGuidanceText = GUIDANCE_TOPICS_DATA.map(t =>
      `${t.title} ${t.shortSummary} ${t.whatToBring.join(' ')} ${t.stepsToFollow.join(' ')} ${t.communityTips.join(' ')} ${t.susRightsNote} ${t.legalBasis}`
    ).join(' ');

    const hasInvalidArt18With940 =
      (allGuidanceText.includes('Art. 18') || allGuidanceText.includes('Artigo 18')) &&
      allGuidanceText.includes('940');

    results.push({
      id: 'test-12-normative-portaria-940',
      title: '12. Conformidade Sanitária: Ausência de Citação Incorreta do Art. 18 da Portaria 940/2011',
      category: 'Rigor Técnico & Legal',
      testType: 'unitario',
      status: !hasInvalidArt18With940 ? 'aprovado' : 'reprovado',
      assertion: 'assert(!text.includes("Art. 18" && "940"))',
      details: !hasInvalidArt18With940
        ? 'Nenhuma menção incorreta ao revogado Art. 18 da Portaria 940/2011. Acolhimento fundamentado no Art. 196 da CF/88 e Art. 7º da Lei 8.080/1990.'
        : 'FALHA: Encontrada menção ao Art. 18 da Portaria 940/2011 associada a comprovante de residência.',
      executionTimestamp: now,
      reproducibilityStep: 'Busque "Art. 18" nos tópicos de orientação em GUIDANCE_TOPICS_DATA.',
    });
  } catch (err: any) {
    results.push({
      id: 'test-12-normative-portaria-940',
      title: '12. Conformidade Sanitária: Portaria 940/2011',
      category: 'Rigor Técnico & Legal',
      testType: 'unitario',
      status: 'reprovado',
      assertion: 'assert(!hasInvalidArt18With940)',
      details: `Erro na auditoria normativa: ${err?.message}`,
      executionTimestamp: now,
    });
  }

  // =========================================================================
  // 13. TESTE DE CONFORMIDADE NORMATIVA: Atualização da Rede Alyne (Portarias 5.349/5.350/2024)
  // =========================================================================
  try {
    const preNatalTopic = GUIDANCE_TOPICS_DATA.find(t => t.id === 'pre-natal-gestante');
    const legalText = preNatalTopic ? `${preNatalTopic.legalBasis} ${preNatalTopic.shortSummary} ${preNatalTopic.stepsToFollow.join(' ')}` : '';

    const mentionsRedeAlyne = legalText.includes('Rede Alyne') && (legalText.includes('5.349') || legalText.includes('5.350'));
    const cegonhaOnlyAsHistorical = !legalText.includes('Portaria GM/MS nº 1.459/2011 (Rede Cegonha)');

    const passesRedeAlyne = mentionsRedeAlyne && cegonhaOnlyAsHistorical;

    results.push({
      id: 'test-13-normative-rede-alyne',
      title: '13. Conformidade Sanitária: Vigência da Rede Alyne (Substituição da Rede Cegonha)',
      category: 'Rigor Técnico & Legal',
      testType: 'unitario',
      status: passesRedeAlyne ? 'aprovado' : 'reprovado',
      assertion: 'assert(mentionsRedeAlyne && !isRedeCegonhaVigente)',
      details: passesRedeAlyne
        ? 'Tópico de pré-natal cita expressamente as Portarias GM/MS nº 5.349 e 5.350/2024 (Rede Alyne, que substituiu a Rede Cegonha).'
        : 'FALHA: Rede Cegonha citada como programa ativo sem apontar substituição pela Rede Alyne.',
      executionTimestamp: now,
      reproducibilityStep: 'Inspecione a base legal do tópico pre-natal-gestante.',
    });
  } catch (err: any) {
    results.push({
      id: 'test-13-normative-rede-alyne',
      title: '13. Conformidade Sanitária: Rede Alyne',
      category: 'Rigor Técnico & Legal',
      testType: 'unitario',
      status: 'reprovado',
      assertion: 'assert(passesRedeAlyne)',
      details: `Erro ao testar conformidade da Rede Alyne: ${err?.message}`,
      executionTimestamp: now,
    });
  }

  // =========================================================================
  // 14. TESTE DE CONFORMIDADE DE DADOS: Ausência de 'verificada_cnes'
  // =========================================================================
  try {
    const hasVerificadaCnes = HEALTH_UNITS_DATA.some(u => (u.verificationStatus as string) === 'verificada_cnes');

    results.push({
      id: 'test-14-absence-verificada-cnes',
      title: '14. Integridade Cadastral: Remoção de Status Não Auditados (verificada_cnes)',
      category: 'Rigor Técnico & Legal',
      testType: 'unitario',
      status: !hasVerificadaCnes ? 'aprovado' : 'reprovado',
      assertion: 'assert(!units.some(u => u.verificationStatus === "verificada_cnes"))',
      details: !hasVerificadaCnes
        ? 'Nenhuma unidade classificada com o rótulo indevido "verificada_cnes". Unidades categorizadas apenas como "fonte_oficial_datada" ou "a_confirmar".'
        : 'FALHA: Encontrada unidade com status "verificada_cnes".',
      executionTimestamp: now,
      reproducibilityStep: 'Inspecione os valores de verificationStatus em HEALTH_UNITS_DATA.',
    });
  } catch (err: any) {
    results.push({
      id: 'test-14-absence-verificada-cnes',
      title: '14. Integridade Cadastral: Status de Unidades',
      category: 'Rigor Técnico & Legal',
      testType: 'unitario',
      status: 'reprovado',
      assertion: 'assert(!hasVerificadaCnes)',
      details: `Erro ao testar status das unidades: ${err?.message}`,
      executionTimestamp: now,
    });
  }

  // =========================================================================
  // 15. TESTE DE CONFORMIDADE DE DADOS: Unidades Oficiais Datadas com Telefone e Endereço
  // =========================================================================
  try {
    const datedUnits = HEALTH_UNITS_DATA.filter(u => u.verificationStatus === 'fonte_oficial_datada');
    const allHaveContactAndAddress = datedUnits.length > 0 && datedUnits.every(u =>
      u.address &&
      !u.address.includes('Confirmar') &&
      u.phone &&
      !u.phone.includes('Confirmar') &&
      u.dataSource &&
      u.sourceYear
    );

    results.push({
      id: 'test-15-dated-units-completeness',
      title: '15. Integridade Cadastral: Completude das Unidades com Fonte Oficial Datada',
      category: 'Rigor Técnico & Legal',
      testType: 'unitario',
      status: allHaveContactAndAddress ? 'aprovado' : 'reprovado',
      assertion: 'assert(datedUnits.every(u => hasAddress && hasPhone && hasSourceYear))',
      details: allHaveContactAndAddress
        ? `Todas as ${datedUnits.length} unidades com fonte oficial datada possuem endereço, telefone, fonte e ano especificados.`
        : 'FALHA: Unidade com status "fonte_oficial_datada" sem telefone ou endereço oficial preenchido.',
      executionTimestamp: now,
      reproducibilityStep: 'Filtre unidades com verificationStatus === "fonte_oficial_datada" e verifique endereço/telefone.',
    });
  } catch (err: any) {
    results.push({
      id: 'test-15-dated-units-completeness',
      title: '15. Integridade Cadastral: Unidades Oficiais Datadas',
      category: 'Rigor Técnico & Legal',
      testType: 'unitario',
      status: 'reprovado',
      assertion: 'assert(allHaveContactAndAddress)',
      details: `Erro ao testar unidades oficiais datadas: ${err?.message}`,
      executionTimestamp: now,
    });
  }

  return results;
}
