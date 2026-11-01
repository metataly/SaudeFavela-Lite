/**
 * Serviço de Medição de Desempenho e Telemetria Científica
 * Utiliza a Performance API nativa do W3C (PerformanceNavigationTiming e PerformanceResourceTiming)
 * Diferencia rigorosamente métricas medidas em tempo real de estimativas teóricas
 */

import { MeasuredPerformanceData } from '../types';

export function measureCurrentPerformance(): MeasuredPerformanceData {
  if (typeof window === 'undefined' || typeof performance === 'undefined') {
    return {
      resourceCount: 0,
      measuredTransferBytes: 0,
      domContentLoadedMs: 0,
      loadCompleteMs: 0,
      ttfbMs: 0,
      memoryUsageMb: null,
      measurementSupported: false,
      sampleCondition: 'Performance API não disponível no ambiente de execução.',
    };
  }

  try {
    // Recursos estáticos carregados e seus bytes transferidos
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    let totalTransferBytes = 0;

    resources.forEach((entry) => {
      // transferSize inclui cabeçalhos HTTP e payload compactado
      if (entry.transferSize && entry.transferSize > 0) {
        totalTransferBytes += entry.transferSize;
      } else if (entry.encodedBodySize && entry.encodedBodySize > 0) {
        totalTransferBytes += entry.encodedBodySize;
      }
    });

    // Tempos de navegação principal
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    let domContentLoaded = 0;
    let loadComplete = 0;
    let ttfb = 0;

    if (navEntries.length > 0) {
      const nav = navEntries[0];
      domContentLoaded = Math.round(nav.domContentLoadedEventEnd - nav.startTime);
      loadComplete = Math.round(nav.loadEventEnd - nav.startTime);
      ttfb = Math.round(nav.responseStart - nav.requestStart);
    } else if (performance.timing) {
      // Fallback para navegadores legados (Navigation Timing v1)
      const t = performance.timing;
      domContentLoaded = Math.max(0, t.domContentLoadedEventEnd - t.navigationStart);
      loadComplete = Math.max(0, t.loadEventEnd - t.navigationStart);
      ttfb = Math.max(0, t.responseStart - t.requestStart);
    }

    // Memória JS Heap (disponível no Chromium / Chrome Android)
    let memoryMb: number | null = null;
    const perfWithMemory = performance as unknown as { memory?: { usedJSHeapSize?: number } };
    if (perfWithMemory.memory && typeof perfWithMemory.memory.usedJSHeapSize === 'number') {
      memoryMb = Math.round((perfWithMemory.memory.usedJSHeapSize / (1024 * 1024)) * 10) / 10;
    }

    const isWarmCache = resources.some(r => r.transferSize === 0 && r.decodedBodySize > 0);
    const sampleCondition = isWarmCache
      ? 'Medição Real: Cache Ativo / Service Worker (recursos servidos localmente com 0 B transferidos pela rede)'
      : 'Medição Real: Carregamento inicial de rede / Vite Client';

    return {
      resourceCount: resources.length,
      measuredTransferBytes: totalTransferBytes,
      domContentLoadedMs: Math.max(0, domContentLoaded),
      loadCompleteMs: Math.max(0, loadComplete),
      ttfbMs: Math.max(0, ttfb),
      memoryUsageMb: memoryMb,
      measurementSupported: true,
      sampleCondition,
    };
  } catch (err) {
    console.warn('Erro ao calcular medições da Performance API:', err);
    return {
      resourceCount: 0,
      measuredTransferBytes: 0,
      domContentLoadedMs: 0,
      loadCompleteMs: 0,
      ttfbMs: 0,
      memoryUsageMb: null,
      measurementSupported: false,
      sampleCondition: 'Erro ao coletar métricas da Performance API.',
    };
  }
}

// Mede dados adicionais transferidos entre momentos de navegação
export class NavigationTransferTracker {
  private initialBytes: number = 0;
  private initialResourceCount: number = 0;

  constructor() {
    this.reset();
  }

  public reset(): void {
    if (typeof performance !== 'undefined') {
      const perf = measureCurrentPerformance();
      this.initialBytes = perf.measuredTransferBytes;
      this.initialResourceCount = perf.resourceCount;
    }
  }

  public getDelta(): { deltaBytes: number; deltaResources: number } {
    if (typeof performance === 'undefined') {
      return { deltaBytes: 0, deltaResources: 0 };
    }
    const current = measureCurrentPerformance();
    return {
      deltaBytes: Math.max(0, current.measuredTransferBytes - this.initialBytes),
      deltaResources: Math.max(0, current.resourceCount - this.initialResourceCount),
    };
  }
}

export const globalTransferTracker = new NavigationTransferTracker();
