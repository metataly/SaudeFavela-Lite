import { AccessibilitySettings, DemoAppointment, TelemetryReport } from '../types';
import { HEALTH_UNITS_DATA } from '../data/healthUnitsData';

const SETTINGS_KEY = 'saudefavela_accessibility_v1';
const SAVED_UNITS_KEY = 'saudefavela_saved_units_v1';
const DEMO_APPOINTMENTS_KEY = 'saudefavela_demo_appointments_v1';
const TELEMETRY_KEY = 'saudefavela_telemetry_v1';

export const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 'normal',
  highContrast: false,
  reducedMotion: false,
  simplifiedMode: false,
  speechRate: 1.0,
};

// Carrega preferências de acessibilidade
export function getStoredSettings(): AccessibilitySettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

// Salva preferências de acessibilidade
export function saveSettings(settings: AccessibilitySettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    recordLocalWriteAction();
  } catch (err) {
    console.warn('Erro ao salvar preferências:', err);
  }
}

// Unidades salvas/favoritas do usuário
export function getSavedUnitIds(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_UNITS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleSaveUnit(unitId: string): boolean {
  try {
    const saved = getSavedUnitIds();
    const index = saved.indexOf(unitId);
    let isSavedNow = false;
    if (index > -1) {
      saved.splice(index, 1);
      isSavedNow = false;
    } else {
      saved.push(unitId);
      isSavedNow = true;
    }
    localStorage.setItem(SAVED_UNITS_KEY, JSON.stringify(saved));
    recordLocalWriteAction();
    return isSavedNow;
  } catch {
    return false;
  }
}

// Agendamentos demonstrativos
export function getDemoAppointments(): DemoAppointment[] {
  try {
    const raw = localStorage.getItem(DEMO_APPOINTMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveDemoAppointment(appointment: DemoAppointment): void {
  try {
    const existing = getDemoAppointments();
    const updated = [appointment, ...existing];
    localStorage.setItem(DEMO_APPOINTMENTS_KEY, JSON.stringify(updated));
    recordLocalWriteAction();
  } catch (err) {
    console.error('Erro ao salvar agendamento demonstrativo local:', err);
  }
}

export function deleteDemoAppointment(id: string): void {
  try {
    const existing = getDemoAppointments();
    const filtered = existing.filter(a => a.id !== id);
    localStorage.setItem(DEMO_APPOINTMENTS_KEY, JSON.stringify(filtered));
    recordLocalWriteAction();
  } catch (err) {
    console.error('Erro ao deletar agendamento local:', err);
  }
}

// Telemetria técnica (contagem real de gravações locais)
export function getTelemetryData(): TelemetryReport {
  try {
    const raw = localStorage.getItem(TELEMETRY_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const appointments = getDemoAppointments();

    return {
      localWritesCount: typeof parsed.localWritesCount === 'number' ? parsed.localWritesCount : 0,
      offlineCacheStatus: 'ativo',
      cachedUnitsCount: HEALTH_UNITS_DATA.length,
      savedAppointmentsCount: appointments.length,
      lastSyncDate: parsed.lastSyncDate || new Date().toISOString().split('T')[0],
    };
  } catch {
    return {
      localWritesCount: 0,
      offlineCacheStatus: 'ativo',
      cachedUnitsCount: HEALTH_UNITS_DATA.length,
      savedAppointmentsCount: 0,
      lastSyncDate: new Date().toISOString().split('T')[0],
    };
  }
}

export function recordLocalWriteAction(): void {
  try {
    const current = getTelemetryData();
    const updated = {
      localWritesCount: current.localWritesCount + 1,
      lastSyncDate: new Date().toISOString(),
    };
    localStorage.setItem(TELEMETRY_KEY, JSON.stringify(updated));
  } catch {
    // silencioso para não interromper UI
  }
}

// Apagar todos os dados locais (Privacidade e LGPD)
export function clearAllLocalData(): void {
  try {
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(SAVED_UNITS_KEY);
    localStorage.removeItem(DEMO_APPOINTMENTS_KEY);
    localStorage.removeItem(TELEMETRY_KEY);
  } catch (err) {
    console.error('Erro ao limpar dados:', err);
  }
}
