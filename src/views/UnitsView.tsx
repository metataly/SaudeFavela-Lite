import React, { useState, useMemo } from 'react';
import {
  Search,
  Mic,
  MicOff,
  MapPin,
  Phone,
  Clock,
  Bookmark,
  BookmarkCheck,
  Navigation,
  AlertCircle,
  ExternalLink,
  Volume2,
  CalendarCheck2,
  HelpCircle,
  Building2,
  FileText
} from 'lucide-react';
import { HealthUnit } from '../types';
import { HEALTH_UNITS_DATA } from '../data/healthUnitsData';
import { getSavedUnitIds, toggleSaveUnit } from '../services/storageService';
import { startVoiceInput, stopVoiceInput } from '../services/speechService';

interface UnitsViewProps {
  onSelectForSimulation: (unit: HealthUnit) => void;
  onSpeak: (text: string) => void;
}

export const UnitsView: React.FC<UnitsViewProps> = ({
  onSelectForSimulation,
  onSpeak,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('todos');
  const [onlySaved, setOnlySaved] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(() => getSavedUnitIds());
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Manipulador de salvamento local
  const handleToggleSave = (unitId: string) => {
    toggleSaveUnit(unitId);
    setSavedIds(getSavedUnitIds());
  };

  // Busca por voz
  const handleVoiceSearch = () => {
    setVoiceError(null);
    if (isListening) {
      stopVoiceInput();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    const started = startVoiceInput(
      (transcript) => {
        setSearchTerm(transcript);
        setIsListening(false);
      },
      (errorMsg) => {
        setVoiceError(errorMsg);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    if (!started) {
      setIsListening(false);
    }
  };

  // Localização aproximada
  const handleRequestLocation = () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Seu aparelho não suporta geolocalização. Use a busca manual abaixo.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Permissão de localização recusada. Você pode buscar pelo nome da favela ou bairro.');
        } else {
          setLocationError('Não foi possível obter sua localização exata. Use a busca manual.');
        }
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  // Cálculo de distância aproximada em km
  const getDistanceKm = (unit: HealthUnit) => {
    if (!userLocation) return null;
    const R = 6371;
    const dLat = ((unit.coordinates.lat - userLocation.lat) * Math.PI) / 180;
    const dLon = ((unit.coordinates.lng - userLocation.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userLocation.lat * Math.PI) / 180) *
        Math.cos((unit.coordinates.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  // Filtragem
  const filteredUnits = useMemo(() => {
    let list = HEALTH_UNITS_DATA;

    if (onlySaved) {
      list = list.filter((u) => savedIds.includes(u.id));
    }

    if (selectedZone !== 'todos') {
      if (selectedZone === 'upas') {
        list = list.filter((u) => u.unitType === 'upa_emergencia');
      } else {
        list = list.filter((u) => u.zone === selectedZone);
      }
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      list = list.filter((u) => {
        const text = `${u.name} ${u.community} ${u.neighborhood} ${u.address} ${u.landmarks} ${u.servicesOffered.join(' ')}`
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        return text.includes(term);
      });
    }

    // Se temos localização, ordena por proximidade
    if (userLocation) {
      list = [...list].sort((a, b) => {
        const distA = parseFloat(getDistanceKm(a) || '999');
        const distB = parseFloat(getDistanceKm(b) || '999');
        return distA - distB;
      });
    }

    return list;
  }, [searchTerm, selectedZone, onlySaved, savedIds, userLocation]);

  const handleReadUnit = (unit: HealthUnit) => {
    const text = `
      ${unit.name}.
      Localizada em ${unit.community}, no bairro ${unit.neighborhood}, Área de Planejamento ${unit.healthDistrict}.
      Endereço: ${unit.address}.
      Ponto de referência: ${unit.landmarks}.
      Horário de funcionamento: ${unit.hours}.
      Telefone: ${unit.phone}.
      Serviços oferecidos: ${unit.servicesOffered.slice(0, 4).join(', ')}.
    `;
    onSpeak(text);
  };

  return (
    <div className="space-y-5 pb-8 animate-in fade-in duration-150">
      {/* Cabeçalho da Visão */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Unidades de Saúde no Rio de Janeiro (APS & UPAs)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Catálogo informativo com Áreas de Planejamento (AP) e referências territoriais nas comunidades.
        </p>
      </div>

      {/* Barra de Pesquisa com Microfone */}
      <div className="space-y-2">
        <div className="relative flex items-center">
          <label htmlFor="unit-search" className="sr-only">
            Buscar unidade de saúde por favela, bairro ou nome
          </label>
          <Search className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" aria-hidden="true" />
          <input
            id="unit-search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ex: Rocinha, Maré, Alemão, Cidade de Deus, Santa Marta..."
            className="w-full min-h-[48px] pl-11 pr-24 py-2.5 bg-white border border-slate-300 rounded-2xl text-sm text-slate-900 placeholder:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-sky-600 focus:border-sky-600 shadow-2xs"
          />
          <div className="absolute right-2 flex items-center gap-1">
            <button
              type="button"
              onClick={handleVoiceSearch}
              aria-label={isListening ? 'Parar escuta de voz' : 'Buscar por voz (fale o nome do bairro)'}
              title={isListening ? 'Ouvindo...' : 'Falar pesquisa'}
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {voiceError && (
          <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-xl border border-rose-200 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {voiceError}
          </p>
        )}
      </div>

      {/* Botão Opcional de Localização e Filtro de Salvos */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <button
          type="button"
          onClick={handleRequestLocation}
          disabled={isLocating}
          className="min-h-[44px] px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-semibold flex items-center gap-2 border border-sky-200 transition active:scale-95 disabled:opacity-50"
        >
          <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
          <span>
            {isLocating
              ? 'Localizando...'
              : userLocation
              ? 'Localização ativa (ordenado por distância)'
              : 'Ver unidades mais próximas de mim'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setOnlySaved(!onlySaved)}
          className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition ${
            onlySaved
              ? 'bg-amber-600 text-white border-amber-700'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Salvas no celular ({savedIds.length})</span>
        </button>
      </div>

      {locationError && (
        <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {locationError}
        </p>
      )}

      {/* Filtros de Região / Zona */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none" role="tablist" aria-label="Filtrar por região do Rio">
        {[
          { id: 'todos', label: 'Todas as Unidades' },
          { id: 'Zona Sul', label: 'Zona Sul' },
          { id: 'Zona Norte', label: 'Zona Norte' },
          { id: 'Zona Oeste', label: 'Zona Oeste' },
          { id: 'upas', label: 'UPAs 24h (Urgência)' },
        ].map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={selectedZone === f.id}
            onClick={() => setSelectedZone(f.id)}
            className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
              selectedZone === f.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Contador de Resultados */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span>Mostrando <strong>{filteredUnits.length}</strong> unidades</span>
        <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
          Armazenado localmente · Busca offline
        </span>
      </div>

      {/* Lista de Unidades */}
      {filteredUnits.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-3xl bg-white border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-800">Nenhuma unidade encontrada</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Tente pesquisar por outro nome, bairro ou limpe o termo de busca para ver todas as unidades da cidade.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedZone('todos');
              setOnlySaved(false);
            }}
            className="min-h-[44px] px-4 py-2 bg-sky-700 text-white font-semibold text-xs rounded-xl hover:bg-sky-800 transition"
          >
            Mostrar todas as unidades
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredUnits.map((unit) => {
            const isSaved = savedIds.includes(unit.id);
            const distance = getDistanceKm(unit);
            const isUpa = unit.unitType === 'upa_emergencia';
            const isDatedSource = unit.verificationStatus === 'fonte_oficial_datada';
            const hasDirectPhone = !unit.phone.includes('Confirmar');

            return (
              <article
                key={unit.id}
                className={`p-4 sm:p-5 rounded-3xl bg-white border transition-shadow hover:shadow-md ${
                  isUpa ? 'border-rose-300 ring-1 ring-rose-100' : 'border-slate-200'
                }`}
              >
                {/* Cabeçalho do Card */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-1">
                      <span className="font-bold text-sky-800 uppercase tracking-wider text-[11px]">
                        {unit.community}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{unit.healthDistrict}</span>
                      {distance && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-bold text-emerald-700">~{distance} km</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {unit.name}
                    </h2>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleReadUnit(unit)}
                      aria-label={`Ouvir detalhes de ${unit.name}`}
                      title="Ouvir informações desta unidade"
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:text-sky-700 hover:bg-sky-50 transition"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleSave(unit.id)}
                      aria-label={isSaved ? `Remover ${unit.name} das salvas` : `Salvar ${unit.name} no aparelho`}
                      title={isSaved ? 'Salva no aparelho' : 'Salvar no aparelho'}
                      className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition ${
                        isSaved
                          ? 'bg-amber-100 text-amber-900'
                          : 'text-slate-400 hover:text-amber-800 hover:bg-amber-50'
                      }`}
                    >
                      {isSaved ? <BookmarkCheck className="w-5 h-5 text-amber-700" /> : <Bookmark className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Informações Práticas */}
                <div className="mt-3.5 space-y-2 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-slate-800">{unit.address}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5 italic">Ref: {unit.landmarks}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                    <span className="text-slate-700 font-medium">{unit.hours}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                    {hasDirectPhone ? (
                      <a
                        href={`tel:${unit.phone.split('/')[0].replace(/\D/g, '')}`}
                        className="font-bold text-sky-700 hover:text-sky-900 underline min-h-[44px] flex items-center"
                      >
                        {unit.phone} (Toque para ligar)
                      </a>
                    ) : (
                      <span className="text-slate-700 min-h-[44px] flex items-center">
                        {unit.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Serviços Disponíveis */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Serviços Oferecidos na Atenção Básica:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {unit.servicesOffered.map((srv, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recursos de Acessibilidade */}
                <div className="mt-2.5 flex items-center gap-1.5 flex-wrap text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Acessibilidade:</span>
                  {unit.accessibilityFeatures.map((feat, idx) => (
                    <span key={idx} className="bg-sky-50 text-sky-800 px-2 py-0.5 rounded text-[10px] font-medium">
                      ✓ {feat}
                    </span>
                  ))}
                </div>

                {/* Nota de Auditoria para Pesquisadores */}
                {unit.fieldAuditNotes && (
                  <div className="mt-2 p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-start gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span><strong>Nota de Campo:</strong> {unit.fieldAuditNotes}</span>
                  </div>
                )}

                {/* Rodapé com Fonte, Ano e Confirmação */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>
                      {isDatedSource
                        ? `Dados conforme ${unit.dataSource}, ${unit.sourceYear || '2021'}. Confirme por telefone antes de ir.`
                        : 'Dados a confirmar no CNES (cnes.saude.gov.br) ou na Central 1746 antes de ir.'}
                    </span>
                  </div>

                  {!isUpa && (
                    <button
                      type="button"
                      onClick={() => onSelectForSimulation(unit)}
                      className="min-h-[44px] px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 shadow-xs"
                    >
                      <CalendarCheck2 className="w-4 h-4" />
                      <span>Simular Agendamento nesta unidade</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
