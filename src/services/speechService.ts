/**
 * Serviço de Acessibilidade por Voz (Síntese e Reconhecimento)
 * Utiliza APIs nativas do navegador sem enviar dados a terceiros
 */

// Interface para reconhecimento de voz
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export interface SpeechState {
  isSpeaking: boolean;
  isListening: boolean;
  isSynthesisSupported: boolean;
  isRecognitionSupported: boolean;
  currentUtteranceText: string;
}

let activeUtterance: SpeechSynthesisUtterance | null = null;
let activeRecognition: any = null;

export function checkSpeechSupport(): { synthesis: boolean; recognition: boolean } {
  const win = typeof window !== 'undefined' ? (window as unknown as IWindow) : null;
  const synthesis = !!(win && 'speechSynthesis' in win);
  const recognition = !!(win && (win.SpeechRecognition || win.webkitSpeechRecognition));
  return { synthesis, recognition };
}

// Inicia leitura de texto em voz alta (pt-BR)
export function speakText(
  text: string,
  rate: number = 1.0,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: string) => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onError?.('Seu navegador não suporta leitura por voz.');
    return false;
  }

  // Se já estiver falando, cancela anterior
  window.speechSynthesis.cancel();

  // Limpa tags ou caracteres especiais desnecessários
  const cleanText = text.replace(/<[^>]*>?/gm, '').trim();
  if (!cleanText) return false;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'pt-BR';
  utterance.rate = Math.max(0.7, Math.min(1.4, rate));
  utterance.pitch = 1.0;

  // Busca voz brasileira se disponível
  const voices = window.speechSynthesis.getVoices();
  const ptVoice = voices.find(v => v.lang.includes('pt-BR') || v.lang.includes('pt_BR')) ||
                  voices.find(v => v.lang.startsWith('pt'));
  if (ptVoice) {
    utterance.voice = ptVoice;
  }

  utterance.onstart = () => {
    activeUtterance = utterance;
    onStart?.();
  };

  utterance.onend = () => {
    activeUtterance = null;
    onEnd?.();
  };

  utterance.onerror = (event) => {
    activeUtterance = null;
    console.warn('Erro na síntese de voz:', event);
    onError?.('Não foi possível reproduzir a leitura de áudio no momento.');
  };

  try {
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    activeUtterance = null;
    onError?.('Falha ao ativar o sintetizador de voz.');
    return false;
  }
}

// Interrompe qualquer leitura em andamento
export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
}

// Inicia reconhecimento de fala para busca por voz
export function startVoiceInput(
  onResult: (transcript: string) => void,
  onError: (errorMsg: string) => void,
  onEnd: () => void
): boolean {
  const win = typeof window !== 'undefined' ? (window as unknown as IWindow) : null;
  if (!win) return false;

  const SpeechRecognitionAPI = win.SpeechRecognition || win.webkitSpeechRecognition;

  if (!SpeechRecognitionAPI) {
    onError('O seu navegador não possui suporte a comando por voz. Você pode digitar normalmente.');
    return false;
  }

  try {
    if (activeRecognition) {
      activeRecognition.abort();
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'pt-BR';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      let msg = 'Não foi possível reconhecer o áudio.';
      if (event.error === 'not-allowed') {
        msg = 'Permissão para microfone não autorizada. Digite sua busca pelo teclado.';
      } else if (event.error === 'network') {
        msg = 'O reconhecimento de voz precisa de internet neste navegador. Digite sua busca.';
      }
      onError(msg);
    };

    recognition.onend = () => {
      activeRecognition = null;
      onEnd();
    };

    activeRecognition = recognition;
    recognition.start();
    return true;
  } catch (err) {
    activeRecognition = null;
    onError('Erro ao iniciar o microfone. Use a digitação por teclado.');
    return false;
  }
}

export function stopVoiceInput(): void {
  if (activeRecognition) {
    try {
      activeRecognition.stop();
    } catch {
      // noop
    }
    activeRecognition = null;
  }
}
