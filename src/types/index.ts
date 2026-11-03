/**
 * Definições de Tipos - SaúdeFavela-Lite (Versão 2 - Auditoria & Pesquisa Acadêmica)
 * Sistema de Apoio e Orientação à Atenção Primária em Saúde (SUS)
 */

export type UnitType = 
  | 'clinica_familia'
  | 'centro_municipal_saude'
  | 'posto_saude'
  | 'upa_emergencia';

export type ZoneRJ = 'Zona Sul' | 'Zona Norte' | 'Zona Oeste' | 'Centro';

export type UnitVerificationStatus = 
  | 'fonte_oficial_datada'
  | 'a_confirmar';

export interface HealthUnit {
  id: string;
  name: string;
  unitType: UnitType;
  community: string;        // Ex: "Rocinha", "Complexo da Maré", "Alemão", "Cidade de Deus"
  neighborhood: string;
  zone: ZoneRJ;
  healthDistrict: string;   // Área de Planejamento (ex.: AP 2.1, AP 3.1, AP 4.0)
  address: string;
  landmarks?: string;
  hours: string;
  phone: string;
  servicesOffered?: string[];
  dataSource: string;
  sourceYear?: string;
  sourceUrl: string;        // Link de referência pública
  verificationStatus: UnitVerificationStatus;
  lastUpdated?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  accessibilityFeatures?: string[];
  fieldAuditNotes?: string; // Observações para os pesquisadores em campo
}

export type GuidanceCategory =
  | 'consulta'
  | 'vacina'
  | 'urgencia'
  | 'documentos'
  | 'remedios'
  | 'pre_natal'
  | 'direitos_sus';

export type InformationLevel =
  | 'direito_universal'             // Garantido pela Constituição e Leis Federais
  | 'procedimento_administrativo'   // Rotina padrão de acolhimento e triagem da APS
  | 'especifico_municipal_rj'       // Programas locais (ex.: SMS-RJ)
  | 'confirmar_na_unidade'          // Informação sujeita à escala da equipe e estoque
  | 'urgencia_emergencia';          // Protocolo de socorro imediato (SAMU/UPA)

export interface GuidanceTopic {
  id: string;
  title: string;
  category: GuidanceCategory;
  informationLevel: InformationLevel;
  shortSummary: string;
  whatToBring: string[];
  stepsToFollow: string[];
  communityTips: string[];
  susRightsNote: string;
  legalBasis: string;               // Base jurídica/normativa (Portarias, Leis)
  lastReviewedDate: string;
  isUrgent?: boolean;
  emergencyAction?: {
    label: string;
    phone: string;
  };
}

export interface DemoAppointment {
  id: string;
  protocolNumber: string; // Ex: DEMO-RJ-2026-4819
  unitId: string;
  unitName: string;
  serviceType: string;
  preferredDate: string;
  preferredPeriod: 'Manhã (07h às 12h)' | 'Tarde (13h às 17h)';
  userName: string;
  userPhone: string;
  notes: string;
  status: 'demonstrativo_registrado';
  createdAt: string;
  isDemonstrative: true;
  realLifeInstructions: string;
}

export type TextSizePreference = 'normal' | 'large' | 'extralarge';

export interface AccessibilitySettings {
  fontSize: TextSizePreference;
  highContrast: boolean;
  reducedMotion: boolean;
  simplifiedMode: boolean;
  speechRate: number; // 0.8 a 1.2
}

export type TestExecutionType = 'unitario' | 'integracao' | 'manual_em_campo';
export type TestStatus = 'aprovado' | 'reprovado' | 'pendente_validacao_manual';

export interface TechnicalTestResult {
  id: string;
  title: string;
  category: string;
  testType: TestExecutionType;
  status: TestStatus;
  assertion: string;
  details: string;
  executionTimestamp?: string;
  reproducibilityStep?: string;
}

export interface MeasuredPerformanceData {
  resourceCount: number;
  measuredTransferBytes: number;
  domContentLoadedMs: number;
  loadCompleteMs: number;
  ttfbMs: number;
  memoryUsageMb: number | null;
  measurementSupported: boolean;
  sampleCondition: string; // ex: 'Navegador ativo (Cache aquecido / Vite Dev)'
}

export interface TelemetryReport {
  localWritesCount: number;
  offlineCacheStatus: 'ativo' | 'parcial' | 'indisponivel';
  cachedUnitsCount: number;
  savedAppointmentsCount: number;
  lastSyncDate: string;
  measuredPerformance?: MeasuredPerformanceData;
}
