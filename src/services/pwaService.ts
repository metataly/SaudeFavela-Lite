/**
 * Serviço de Gerenciamento do Ciclo de Vida do Service Worker (PWA)
 * Garante registro determinístico, detecção de atualizações e limpeza de caches antigos
 */

// Callback para atualização de SW retornado por virtual:pwa-register
let updateSWCallback: ((reloadPage?: boolean) => Promise<void>) | null = null;
let isSWRegistered = false;
let isOfflineReady = false;
let hasUpdatePending = false;

type SWListener = (status: {
  registered: boolean;
  offlineReady: boolean;
  updatePending: boolean;
}) => void;

const listeners: Set<SWListener> = new Set();

function notifyListeners() {
  listeners.forEach((listener) =>
    listener({
      registered: isSWRegistered,
      offlineReady: isOfflineReady,
      updatePending: hasUpdatePending,
    })
  );
}

export function subscribeSWStatus(listener: SWListener): () => void {
  listeners.add(listener);
  // Notifica estado imediato
  listener({
    registered: isSWRegistered,
    offlineReady: isOfflineReady,
    updatePending: hasUpdatePending,
  });
  return () => {
    listeners.delete(listener);
  };
}

export async function initServiceWorker(): Promise<void> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.info('[PWA] Service Worker não suportado nesta plataforma.');
    return;
  }

  try {
    // Import dinâmico do registrador gerado pelo vite-plugin-pwa
    const { registerSW } = await import('virtual:pwa-register');

    updateSWCallback = registerSW({
      immediate: true,
      onNeedRefresh() {
        console.info('[PWA] Nova versão disponível do SaúdeFavela-Lite.');
        hasUpdatePending = true;
        notifyListeners();
      },
      onOfflineReady() {
        console.info('[PWA] Aplicação pronta para funcionamento 100% offline.');
        isOfflineReady = true;
        isSWRegistered = true;
        notifyListeners();
      },
      onRegistered(registration) {
        console.info('[PWA] Service Worker registrado com escopo:', registration?.scope);
        isSWRegistered = true;
        notifyListeners();
      },
      onRegisterError(error) {
        console.warn('[PWA] Erro no registro do Service Worker:', error);
      },
    });
  } catch (err) {
    // Em ambiente de desenvolvimento vite ou preview de iframe sem suporte a SW
    console.info('[PWA] Registro via virtual:pwa-register em modo fallback:', err);
    // Tenta registrar sw nativamente se existir
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        if (regs.length > 0) {
          isSWRegistered = true;
          notifyListeners();
        }
      });
    }
  }
}

// Aplica a nova versão imediatamente evitando que o usuário fique preso a caches antigos
export async function applyPWAUpdate(): Promise<void> {
  if (updateSWCallback) {
    await updateSWCallback(true);
  } else if (typeof window !== 'undefined') {
    window.location.reload();
  }
}

export function getPWAStatus(): {
  registered: boolean;
  offlineReady: boolean;
  updatePending: boolean;
} {
  return {
    registered: isSWRegistered,
    offlineReady: isOfflineReady,
    updatePending: hasUpdatePending,
  };
}
