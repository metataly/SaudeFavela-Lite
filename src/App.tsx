import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNavBar, AppTab } from './components/BottomNavBar';
import { OfflineBanner } from './components/OfflineBanner';
import { AudioAssistantBar } from './components/AudioAssistantBar';
import { AccessibilityModal } from './components/AccessibilityModal';
import { PrivacyNoticeModal } from './components/PrivacyNoticeModal';
import { HomeView } from './views/HomeView';
import { UnitsView } from './views/UnitsView';
import { GuidanceView } from './views/GuidanceView';
import { AppointmentSimulationView } from './views/AppointmentSimulationView';
import { DiagnosticsView } from './views/DiagnosticsView';

import { HealthUnit, AccessibilitySettings, TextSizePreference } from './types';
import {
  getStoredSettings,
  saveSettings,
  initOfflineUnitsCache,
  clearAllLocalData
} from './services/storageService';
import {
  speakText,
  stopSpeaking
} from './services/speechService';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [settings, setSettings] = useState<AccessibilitySettings>(() => getStoredSettings());
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Unidade pré-selecionada para fluxo de simulação
  const [preselectedUnit, setPreselectedUnit] = useState<HealthUnit | null>(null);

  // Estados de Áudio
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [currentAudioText, setCurrentAudioText] = useState('');

  // Inicializa cache offline de unidades na primeira execução
  useEffect(() => {
    initOfflineUnitsCache();
  }, []);

  // Atualiza e persiste preferências de acessibilidade
  const handleUpdateSettings = (newSettings: AccessibilitySettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  // Cicla tamanho do texto diretamente pelo botão rápido do cabeçalho
  const handleCycleFontSize = () => {
    const sequence: TextSizePreference[] = ['normal', 'large', 'extralarge'];
    const nextIndex = (sequence.indexOf(settings.fontSize) + 1) % sequence.length;
    const nextSize = sequence[nextIndex];
    handleUpdateSettings({ ...settings, fontSize: nextSize });
  };

  // Reprodução de texto em voz alta
  const handleSpeakText = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      setIsAudioPaused(false);
      return;
    }

    setCurrentAudioText(text.slice(0, 80) + '...');
    const ok = speakText(
      text,
      settings.speechRate,
      () => {
        setIsSpeaking(true);
        setIsAudioPaused(false);
      },
      () => {
        setIsSpeaking(false);
        setIsAudioPaused(false);
      },
      (err) => {
        setIsSpeaking(false);
        setIsAudioPaused(false);
        console.warn(err);
      }
    );

    if (!ok) {
      setIsSpeaking(false);
    }
  };

  // Leitura geral da tela atual
  const handleSpeakCurrentScreen = () => {
    let screenSummary = '';
    if (currentTab === 'home') {
      screenSummary = 'Você está na Tela Inicial do SaúdeFavela-Lite. Aqui você pode encontrar uma unidade de saúde, tirar dúvidas sobre o atendimento na Clínica da Família, conferir documentos necessários ou simular um agendamento.';
    } else if (currentTab === 'units') {
      screenSummary = 'Você está no Localizador de Unidades de Saúde do Rio de Janeiro. Use o campo de busca ou o microfone para pesquisar sua favela ou bairro.';
    } else if (currentTab === 'guidance') {
      screenSummary = 'Você está no Guia de Orientações do SUS. Aqui você encontra instruções claras sobre como conseguir consulta, vacinas e como ser atendido mesmo sem conta de luz no seu nome.';
    } else if (currentTab === 'simulation') {
      screenSummary = 'Você está na Simulação de Agendamento. Esta é uma ferramenta de treino demonstrativa em seis etapas. Sua consulta não será marcada no SUS.';
    } else if (currentTab === 'diagnostics') {
      screenSummary = 'Você está no painel de Diagnóstico Técnico e Avaliação Científica do MVP SaúdeFavela-Lite.';
    }
    handleSpeakText(screenSummary);
  };

  // Navega para a simulação com a unidade selecionada
  const handleSelectForSimulation = (unit: HealthUnit) => {
    setPreselectedUnit(unit);
    setCurrentTab('simulation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Classes dinâmicas de acessibilidade
  const fontSizeClass =
    settings.fontSize === 'extralarge'
      ? 'text-lg leading-relaxed'
      : settings.fontSize === 'large'
      ? 'text-base leading-normal'
      : 'text-sm leading-normal';

  const contrastClass = settings.highContrast
    ? 'contrast-125 saturate-125 border-slate-900 font-medium'
    : '';

  const motionClass = settings.reducedMotion ? 'reduce-motion' : '';

  return (
    <div
      className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans ${fontSizeClass} ${contrastClass} ${motionClass}`}
    >
      {/* Banner de Aviso Offline */}
      <OfflineBanner />

      {/* Cabeçalho Fixo Conforme Contrato */}
      <Header
        onSpeakScreen={handleSpeakCurrentScreen}
        isSpeaking={isSpeaking}
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
        settings={settings}
        onCycleFontSize={handleCycleFontSize}
      />

      {/* Área Principal de Conteúdo */}
      <main id="main-content" className="flex-1 max-w-4xl w-full mx-auto px-4 py-4 sm:py-6 pb-24">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            onSpeak={handleSpeakText}
          />
        )}

        {currentTab === 'units' && (
          <UnitsView
            onSelectForSimulation={handleSelectForSimulation}
            onSpeak={handleSpeakText}
          />
        )}

        {currentTab === 'guidance' && (
          <GuidanceView onSpeak={handleSpeakText} />
        )}

        {currentTab === 'simulation' && (
          <AppointmentSimulationView
            preselectedUnit={preselectedUnit}
            onClearPreselectedUnit={() => setPreselectedUnit(null)}
            onSpeak={handleSpeakText}
          />
        )}

        {currentTab === 'diagnostics' && (
          <DiagnosticsView />
        )}
      </main>

      {/* Barra Flutuante de Controle do Leitor de Áudio */}
      <AudioAssistantBar
        isSpeaking={isSpeaking}
        isPaused={isAudioPaused}
        currentText={currentAudioText}
        onStop={() => {
          setIsSpeaking(false);
          setIsAudioPaused(false);
        }}
        onTogglePause={() => {
          setIsAudioPaused(!isAudioPaused);
        }}
      />

      {/* Navegação Inferior de Polegar (Bottom Bar) */}
      <BottomNavBar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modais de Acessibilidade e Privacidade */}
      <AccessibilityModal
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onClearData={() => {
          if (window.confirm('Deseja apagar todos os dados salvos neste telefone?')) {
            clearAllLocalData();
            setSettings(getStoredSettings());
            setIsAccessibilityOpen(false);
          }
        }}
      />

      <PrivacyNoticeModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        onDataCleared={() => {
          setSettings(getStoredSettings());
        }}
      />
    </div>
  );
}
