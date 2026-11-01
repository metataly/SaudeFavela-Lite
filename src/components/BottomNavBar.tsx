import React from 'react';
import { Home, MapPin, BookOpen, CalendarCheck2, Activity } from 'lucide-react';

export type AppTab = 'home' | 'units' | 'guidance' | 'simulation' | 'diagnostics';

interface BottomNavBarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    {
      id: 'home' as AppTab,
      label: 'Início',
      icon: Home,
      ariaLabel: 'Ir para tela Inicial',
    },
    {
      id: 'units' as AppTab,
      label: 'Unidades',
      icon: MapPin,
      ariaLabel: 'Ir para Localizador de Unidades de Saúde',
    },
    {
      id: 'guidance' as AppTab,
      label: 'Guia SUS',
      icon: BookOpen,
      ariaLabel: 'Ir para Guia de Orientações do SUS',
    },
    {
      id: 'simulation' as AppTab,
      label: 'Simulação',
      icon: CalendarCheck2,
      ariaLabel: 'Ir para Simulação Demonstrativa de Agendamento',
    },
    {
      id: 'diagnostics' as AppTab,
      label: 'Avaliação',
      icon: Activity,
      ariaLabel: 'Ir para Avaliação Técnica e Diagnóstico',
    },
  ];

  return (
    <nav
      aria-label="Navegação Principal do Aplicativo"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg pb-safe"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-stretch h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              aria-label={tab.ariaLabel}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors relative ${
                isActive
                  ? 'text-sky-800 font-bold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-sky-800 stroke-[2.5]' : 'stroke-[1.8]'
                  }`}
                  aria-hidden="true"
                />
              </div>
              <span className={`text-[10px] sm:text-[11px] leading-tight mt-1 truncate max-w-full px-0.5 ${
                isActive ? 'font-bold text-sky-900' : 'text-slate-600'
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 w-6 h-0.5 bg-sky-700 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
