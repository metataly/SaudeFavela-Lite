import React from 'react';
import { WifiOff, Database } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-amber-600 text-white px-4 py-2.5 shadow-sm text-xs sm:text-sm font-medium flex items-center justify-between gap-3 border-b border-amber-700"
    >
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 shrink-0 animate-pulse" aria-hidden="true" />
        <span>
          <strong>Modo Offline Ativo:</strong> Você está sem internet, mas suas unidades e guias salvos continuam acessíveis no seu celular.
        </span>
      </div>
      <div className="hidden sm:flex items-center gap-1 text-xs bg-amber-700/60 px-2 py-0.5 rounded">
        <Database className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Cache Local</span>
      </div>
    </div>
  );
};
