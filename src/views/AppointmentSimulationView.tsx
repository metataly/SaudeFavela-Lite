import React, { useState } from 'react';
import {
  CalendarCheck2,
  MapPin,
  Stethoscope,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Copy,
  Info,
  Clock,
  ArrowRight,
  ArrowLeft,
  Share2
} from 'lucide-react';
import { HealthUnit, DemoAppointment } from '../types';
import { HEALTH_UNITS_DATA } from '../data/healthUnitsData';
import {
  saveDemoAppointment,
  getDemoAppointments,
  deleteDemoAppointment
} from '../services/storageService';

interface AppointmentSimulationViewProps {
  preselectedUnit?: HealthUnit | null;
  onClearPreselectedUnit: () => void;
  onSpeak: (text: string) => void;
}

export const AppointmentSimulationView: React.FC<AppointmentSimulationViewProps> = ({
  preselectedUnit,
  onClearPreselectedUnit,
  onSpeak,
}) => {
  const [activeTab, setActiveTab] = useState<'nova' | 'historico'>('nova');
  const [step, setStep] = useState<number>(1);

  // Dados do formulário
  const [selectedUnitId, setSelectedUnitId] = useState<string>(preselectedUnit?.id || '');
  const [serviceType, setServiceType] = useState<string>('Consulta Médica (Clínica Geral)');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredPeriod, setPreferredPeriod] = useState<'Manhã (07h às 12h)' | 'Tarde (13h às 17h)'>('Manhã (07h às 12h)');
  const [userName, setUserName] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [completedAppointment, setCompletedAppointment] = useState<DemoAppointment | null>(null);

  // Lista de agendamentos no storage
  const [savedAppointments, setSavedAppointments] = useState<DemoAppointment[]>(() =>
    getDemoAppointments()
  );
  const [copiedProtocol, setCopiedProtocol] = useState<string | null>(null);

  // Unidade atual selecionada
  const selectedUnit = HEALTH_UNITS_DATA.find((u) => u.id === selectedUnitId) || null;

  const servicesList = [
    'Consulta Médica (Clínica Geral)',
    'Consulta de Enfermagem',
    'Acompanhamento Pré-Natal',
    'Vacinação e Imunização',
    'Puericultura (Saúde do Bebê e Criança)',
    'Coleta de Exames Preventivos',
    'Hiperdia (Controle de Pressão e Diabetes)',
    'Renovação de Receita de Uso Contínuo'
  ];

  // Data mínima: amanhã
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  const handleNextStep = () => {
    if (step === 1 && !selectedUnitId) return;
    if (step === 2 && !serviceType) return;
    if (step === 3 && !preferredDate) return;
    if (step === 4 && !userName.trim()) return;

    if (step === 5) {
      // Conclui a simulação e grava localmente
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const newAppointment: DemoAppointment = {
        id: `demo-${Date.now()}`,
        protocolNumber: `DEMO-RJ-2026-${randomId}`,
        unitId: selectedUnitId,
        unitName: selectedUnit ? selectedUnit.name : 'Unidade de Saúde',
        serviceType,
        preferredDate,
        preferredPeriod,
        userName: userName.trim(),
        userPhone: userPhone.trim() || 'Não informado',
        notes: notes.trim(),
        status: 'demonstrativo_registrado',
        createdAt: new Date().toLocaleDateString('pt-BR'),
        isDemonstrative: true,
        realLifeInstructions:
          'Para marcar de verdade: Leve documento e Cartão SUS à sua Clínica da Família de referência ou fale com o Agente Comunitário de Saúde (ACS) na sua comunidade.',
      };

      saveDemoAppointment(newAppointment);
      setCompletedAppointment(newAppointment);
      setSavedAppointments(getDemoAppointments());
      setStep(6);
      return;
    }

    setStep(step + 1);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedUnitId('');
    setPreferredDate('');
    setUserName('');
    setUserPhone('');
    setNotes('');
    setCompletedAppointment(null);
    onClearPreselectedUnit();
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Deseja excluir este registro de demonstração do seu celular?')) {
      deleteDemoAppointment(id);
      setSavedAppointments(getDemoAppointments());
    }
  };

  const handleCopySummary = (appt: DemoAppointment) => {
    const text = `[SaúdeFavela-Lite · Simulação Demonstrativa]\nProtocolo: ${appt.protocolNumber}\nUnidade: ${appt.unitName}\nServiço: ${appt.serviceType}\nData Desejada: ${appt.preferredDate} (${appt.preferredPeriod})\nNome: ${appt.userName}\n*Nota: Esta é uma simulação educativa local, sem agendamento no SUS.`;
    navigator.clipboard?.writeText(text);
    setCopiedProtocol(appt.id);
    setTimeout(() => setCopiedProtocol(null), 2500);
  };

  return (
    <div className="space-y-5 pb-8 animate-in fade-in duration-150">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Simulação de Agendamento na Clínica da Família
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Aprenda o passo a passo de solicitação de consulta. Nenhum dado é enviado a servidores externos.
        </p>
      </div>

      {/* Caixa de Esclarecimento Obrigatória */}
      <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <p className="font-extrabold text-amber-950">
            Atenção: Esta é uma ferramenta demonstrativa e educativa.
          </p>
          <p className="text-amber-900 leading-relaxed text-xs">
            <strong>Sua consulta NÃO será marcada no sistema do SUS por aqui.</strong> Este formulário serve para você organizar suas informações antes de procurar a equipe da sua unidade ou falar com seu Agente de Saúde.
          </p>
        </div>
      </div>

      {/* Seletor de Modo: Nova Simulação vs Histórico Local */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('nova')}
          className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'nova'
              ? 'bg-sky-700 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Nova Simulação Passo a Passo
        </button>

        <button
          onClick={() => setActiveTab('historico')}
          className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'historico'
              ? 'bg-sky-700 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <span>Registros no Aparelho</span>
          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold flex items-center justify-center">
            {savedAppointments.length}
          </span>
        </button>
      </div>

      {/* ABA 1: NOVO FLUXO PASSO A PASSO (1 a 6) */}
      {activeTab === 'nova' && (
        <div className="space-y-5">
          {/* Indicador de Progresso (6 Passos) */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
              <span>Etapa {step} de 6</span>
              <span className="text-sky-700 font-extrabold">
                {step === 1 && '1. Escolher Unidade'}
                {step === 2 && '2. Tipo de Atendimento'}
                {step === 3 && '3. Data e Horário'}
                {step === 4 && '4. Seus Dados'}
                {step === 5 && '5. Revisão Geral'}
                {step === 6 && '6. Resumo Concluído'}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-sky-700 transition-all duration-300 rounded-full"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* PASSO 1: Seleção da Unidade */}
          {step === 1 && (
            <section className="bg-white p-5 rounded-3xl border border-slate-200 space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sky-700" />
                  Passo 1: Qual unidade você costuma frequentar?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Selecione a Clínica da Família de referência da sua comunidade ou bairro.
                </p>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {HEALTH_UNITS_DATA.filter((u) => u.unitType !== 'upa_emergencia').map((u) => {
                  const isSelected = selectedUnitId === u.id;
                  return (
                    <div
                      key={u.id}
                      onClick={() => setSelectedUnitId(u.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-sky-700 bg-sky-50/70 ring-2 ring-sky-200'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{u.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{u.community} · {u.neighborhood}</div>
                      </div>
                      <input
                        type="radio"
                        name="unit-select"
                        checked={isSelected}
                        onChange={() => setSelectedUnitId(u.id)}
                        className="mt-1 w-4 h-4 text-sky-700"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  disabled={!selectedUnitId}
                  onClick={handleNextStep}
                  className="min-h-[44px] px-6 py-2.5 bg-sky-700 text-white font-bold text-xs rounded-xl hover:bg-sky-800 transition disabled:opacity-50 flex items-center gap-2"
                >
                  <span>Continuar para Passo 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          )}

          {/* PASSO 2: Seleção do Tipo de Atendimento */}
          {step === 2 && (
            <section className="bg-white p-5 rounded-3xl border border-slate-200 space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-sky-700" />
                  Passo 2: Qual atendimento você precisa simular?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Selecione a especialidade básica desejada.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {servicesList.map((srv) => {
                  const isSelected = serviceType === srv;
                  return (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => setServiceType(srv)}
                      className={`text-left p-3.5 rounded-2xl border transition text-xs font-semibold flex items-center justify-between ${
                        isSelected
                          ? 'border-sky-700 bg-sky-50 text-sky-900 ring-2 ring-sky-200'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{srv}</span>
                      <span className={`w-3.5 h-3.5 rounded-full border ${isSelected ? 'bg-sky-700 border-sky-700' : 'border-slate-300'}`} />
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="min-h-[44px] px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="min-h-[44px] px-6 py-2.5 bg-sky-700 text-white font-bold text-xs rounded-xl hover:bg-sky-800 transition flex items-center gap-2"
                >
                  <span>Continuar para Passo 3</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          )}

          {/* PASSO 3: Data e Período Preferencial */}
          {step === 3 && (
            <section className="bg-white p-5 rounded-3xl border border-slate-200 space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-sky-700" />
                  Passo 3: Escolha a data e o turno preferido
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Indique a data estimada em que você terá disponibilidade para ir ao posto.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label htmlFor="preferred-date" className="block text-xs font-bold text-slate-800 mb-1">
                    Data desejada (A partir de amanhã)
                  </label>
                  <input
                    id="preferred-date"
                    type="date"
                    min={minDateString}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full min-h-[48px] px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-sky-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Turno de preferência
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPreferredPeriod('Manhã (07h às 12h)')}
                      className={`min-h-[44px] p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                        preferredPeriod.startsWith('Manhã')
                          ? 'bg-sky-700 text-white border-sky-800'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      Manhã (07h às 12h)
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreferredPeriod('Tarde (13h às 17h)')}
                      className={`min-h-[44px] p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                        preferredPeriod.startsWith('Tarde')
                          ? 'bg-sky-700 text-white border-sky-800'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      Tarde (13h às 17h)
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="min-h-[44px] px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>

                <button
                  type="button"
                  disabled={!preferredDate}
                  onClick={handleNextStep}
                  className="min-h-[44px] px-6 py-2.5 bg-sky-700 text-white font-bold text-xs rounded-xl hover:bg-sky-800 transition disabled:opacity-50 flex items-center gap-2"
                >
                  <span>Continuar para Passo 4</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          )}

          {/* PASSO 4: Dados Mínimos Não Sensíveis */}
          {step === 4 && (
            <section className="bg-white p-5 rounded-3xl border border-slate-200 space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-sky-700" />
                  Passo 4: Identificação Simples
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Não solicitamos CPF ou dados sigilosos. Apenas um nome ou apelido para o resumo.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label htmlFor="user-name" className="block text-xs font-bold text-slate-800 mb-1">
                    Seu Primeiro Nome ou Como prefere ser chamado(a) *
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    required
                    placeholder="Ex: Maria, Carlos, Dona Lúcia..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full min-h-[48px] px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-sky-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="user-phone" className="block text-xs font-bold text-slate-800 mb-1">
                    Telefone para contato (Opcional - Apenas para simular SMS de lembrete)
                  </label>
                  <input
                    id="user-phone"
                    type="tel"
                    placeholder="Ex: (21) 98888-7777"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full min-h-[48px] px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-sky-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-xs font-bold text-slate-800 mb-1">
                    Observação rápida sobre o que você está sentindo (Opcional)
                  </label>
                  <textarea
                    id="notes"
                    rows={2}
                    placeholder="Ex: Pressão alta há três dias, preciso renovar receita de remédio..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-sky-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="min-h-[44px] px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>

                <button
                  type="button"
                  disabled={!userName.trim()}
                  onClick={handleNextStep}
                  className="min-h-[44px] px-6 py-2.5 bg-sky-700 text-white font-bold text-xs rounded-xl hover:bg-sky-800 transition disabled:opacity-50 flex items-center gap-2"
                >
                  <span>Revisar Solicitação (Passo 5)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>
          )}

          {/* PASSO 5: Revisão Geral com Alerta em Destaque */}
          {step === 5 && (
            <section className="bg-white p-5 rounded-3xl border border-slate-200 space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Info className="w-5 h-5 text-sky-700" />
                  Passo 5: Conferir dados antes de registrar a simulação
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Confirme se as informações estão corretas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Unidade:</span>
                  <span className="font-bold text-slate-900 text-right">{selectedUnit?.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Endereço da clínica:</span>
                  <span className="font-medium text-slate-800 text-right">{selectedUnit?.address}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Tipo de Atendimento:</span>
                  <span className="font-bold text-sky-800 text-right">{serviceType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Data Preferencial:</span>
                  <span className="font-bold text-slate-900">{preferredDate} ({preferredPeriod})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Nome:</span>
                  <span className="font-bold text-slate-900">{userName}</span>
                </div>
                {notes && (
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Observação:</span>
                    <span className="italic text-slate-800 text-right">{notes}</span>
                  </div>
                )}
              </div>

              {/* Mensagem de Transparência */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-300 text-amber-900 text-xs space-y-1">
                <p className="font-bold text-amber-950 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  Lembrete de Simulação Local
                </p>
                <p className="text-[11px] leading-relaxed">
                  Ao clicar no botão abaixo, um resumo demonstrativo será gerado e guardado apenas no seu celular. <strong>Nenhuma consulta real no SUS será agendada.</strong>
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="min-h-[44px] px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Corrigir dados
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="min-h-[44px] px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Gerar Resumo Demonstrativo</span>
                </button>
              </div>
            </section>
          )}

          {/* PASSO 6: Resumo do Resultado e Orientações para a Vida Real */}
          {step === 6 && completedAppointment && (
            <section className="bg-white p-5 rounded-3xl border-2 border-emerald-300 shadow-md space-y-5 animate-in fade-in duration-200">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-lg font-black text-slate-900">
                  Simulação Registrada no seu Aparelho!
                </h2>
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full border border-amber-300">
                  Esta é uma demonstração. Sua consulta não foi agendada no SUS.
                </div>
              </div>

              {/* Cartão do Protocolo Simulado */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5 text-slate-800">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-medium text-slate-500">Protocolo de Treinamento:</span>
                  <span className="font-mono font-bold text-sky-800 text-sm">{completedAppointment.protocolNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-500">Paciente:</span>
                  <span className="font-bold text-slate-900">{completedAppointment.userName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-500">Unidade:</span>
                  <span className="font-bold text-slate-900">{completedAppointment.unitName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-500">Serviço:</span>
                  <span className="font-bold text-slate-900">{completedAppointment.serviceType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-500">Previsão:</span>
                  <span className="font-bold text-slate-900">{completedAppointment.preferredDate} ({completedAppointment.preferredPeriod})</span>
                </div>
              </div>

              {/* O que fazer na vida real */}
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-950 space-y-2">
                <h3 className="font-bold text-sm text-sky-900 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-sky-700" />
                  Como agendar de verdade no seu território:
                </h3>
                <ol className="space-y-1.5 pl-1 text-sky-900">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span>Vá até a <strong>{completedAppointment.unitName}</strong> no início da manhã para o acolhimento.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span>Leve seu documento de identidade com foto e seu Cartão do SUS ou CPF.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span>Ou procure seu <strong>Agente Comunitário de Saúde (ACS)</strong> na sua rua: ele pode levar sua demanda diretamente para a equipe médica da sua família.</span>
                  </li>
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleCopySummary(completedAppointment)}
                  className="w-full sm:flex-1 min-h-[44px] px-4 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedProtocol === completedAppointment.id ? 'Resumo Copiado!' : 'Copiar Resumo para WhatsApp'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition"
                >
                  Fazer Nova Simulação
                </button>
              </div>
            </section>
          )}
        </div>
      )}

      {/* ABA 2: REGISTROS DEMONSTRATIVOS NO APARELHO */}
      {activeTab === 'historico' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Você tem <strong>{savedAppointments.length}</strong> simulações salvas localmente</span>
            <span className="text-[11px] text-slate-400">Armazenado no navegador</span>
          </div>

          {savedAppointments.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
              <CalendarCheck2 className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">Nenhuma simulação salva ainda</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Quando você concluir um fluxo de agendamento demonstrativo, o resumo aparecerá aqui.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('nova')}
                className="mt-2 min-h-[44px] px-4 py-2 bg-sky-700 text-white font-bold text-xs rounded-xl hover:bg-sky-800 transition"
              >
                Iniciar Simulação
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {savedAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                      {appt.protocolNumber}
                    </span>
                    <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold">
                      Demonstrativo
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{appt.serviceType}</h3>
                    <p className="text-slate-600 mt-0.5">{appt.unitName}</p>
                    <p className="text-slate-500 text-[11px]">
                      Data prevista: {appt.preferredDate} ({appt.preferredPeriod}) · Criado em {appt.createdAt}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopySummary(appt)}
                      className="min-h-[44px] px-3 py-1.5 text-xs text-sky-700 hover:bg-sky-50 rounded-lg font-semibold flex items-center gap-1.5 transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedProtocol === appt.id ? 'Copiado!' : 'Copiar'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteItem(appt.id)}
                      aria-label="Excluir simulação do celular"
                      className="min-h-[44px] px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-semibold flex items-center gap-1.5 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Excluir</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
