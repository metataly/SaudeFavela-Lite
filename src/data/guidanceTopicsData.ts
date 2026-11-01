import { GuidanceTopic } from '../types';

/**
 * Catálogo de Orientações da Atenção Primária à Saúde (SUS)
 * Auditado segundo a legislação sanitária brasileira:
 * - Constituição Federal de 1988 (Art. 196 a 200 - Seguridade Social e Saúde)
 * - Lei Federal nº 8.080/1990 (Lei Orgânica da Saúde - Princípios da Universalidade e Igualdade)
 * - Portaria MS nº 940/2011 (Regulamenta o CNS - Art. 18: Vedada a recusa de atendimento)
 * - Portaria de Consolidação GM/MS nº 2/2017 (Anexo XXII - Política Nacional de Atenção Básica / PNAB)
 * - Lei Federal nº 11.108/2005 (Lei do Acompanhante no Parto)
 * - Resoluções SMS-RJ sobre Territorialização e Acolhimento à Demanda Espontânea
 */
export const GUIDANCE_TOPICS_DATA: GuidanceTopic[] = [
  {
    id: 'consulta-geral',
    title: 'Como conseguir consulta médica ou de enfermagem',
    category: 'consulta',
    informationLevel: 'procedimento_administrativo',
    shortSummary: 'Passo a passo no balcão de acolhimento da sua Clínica da Família de referência.',
    whatToBring: [
      'Documento de identificação com foto (RG, CNH, Carteira de Trabalho) ou Certidão de Nascimento para crianças.',
      'Cartão do SUS (físico ou no app Meu SUS Digital). Se não tiver em mãos, a equipe localiza pelo seu CPF.',
      'Comprovante de residência simples ou declaração comunitária (para vincular à equipe da sua rua).'
    ],
    stepsToFollow: [
      'Identifique a Clínica da Família que atende sua rua ou travessa (território de cobertura).',
      'Compareça preferencialmente no início do horário de funcionamento para o Acolhimento com Classificação de Risco.',
      'A equipe de enfermagem avalia sua necessidade: sintomas agudos do dia são acolhidos no mesmo turno (demanda espontânea); rotinas crônicas são agendadas para os dias seguintes.',
      'Você é direcionado para a equipe de Saúde da Família responsável pela sua microárea.'
    ],
    communityTips: [
      'Descubra quem é o Agente Comunitário de Saúde (ACS) que visita sua rua: ele conhece a rotina da equipe médica e pode intermediar orientações de acolhimento.',
      'Para quem tem jornada de trabalho rígida, consulte os horários de início da manhã (a partir das 07:00) ou o atendimento de sábado pela manhã.'
    ],
    susRightsNote: 'O acolhimento é diretriz prioritária da PNAB (Portaria GM/MS nº 2/2017). Nenhuma pessoa que procure uma unidade de saúde com queixa de sofrimento ou sintoma pode ser dispensada sem avaliação de acolhimento.',
    legalBasis: 'Portaria de Consolidação GM/MS nº 2/2017, Anexo XXII (PNAB) e Lei 8.080/1990, Art. 7º.',
    lastVerifiedDate: '2026-03-15'
  },
  {
    id: 'sem-comprovante',
    title: 'Não tenho conta de luz ou água no meu nome: posso ser atendido?',
    category: 'documentos',
    informationLevel: 'direito_universal',
    shortSummary: 'SIM! A legislação federal e a Constituição proíbem recusar atendimento por falta de comprovante comercial.',
    whatToBring: [
      'Qualquer documento de identificação com foto ou número de CPF.',
      'Se houver: comprovante da casa de quem você mora (parente, aluguel, vizinho) ou uma declaração escrita de próprio punho informando onde reside.',
      'Atestado da Associação de Moradores do morro ou comunidade (opcional, mas aceito como referência de vínculo).'
    ],
    stepsToFollow: [
      'Informe no balcão que você reside no território, mas não possui conta comercial de concessionária (Light, Cedae/Águas do Rio) em seu nome.',
      'A equipe preenche a autodeclaração de residência e o cadastro de primeiro acolhimento imediatamente.',
      'Um Agente Comunitário de Saúde (ACS) fará uma visita domiciliar posterior para validar a microárea de cobertura e cadastrar toda a família no sistema e-SUS APS.',
      'O acolhimento e a assistência ocorrem no mesmo dia, sem que a falta do papel comercial funcione como barreira.'
    ],
    communityTips: [
      'Nas comunidades cariocas com ocupação histórica ou moradias multifamiliares, a autodeclaração é rotina padrão reconhecida pela SMS-RJ.',
      'Caso algum funcionário da recepção hesite, peça gentilmente para conversar com o enfermeiro ou gerente responsável pelo acolhimento.'
    ],
    susRightsNote: 'O Artigo 18 da Portaria MS nº 940/2011 determina explicitamente: "A ausência do Cartão Nacional de Saúde ou de comprovante de residência não impedirá o atendimento ao cidadão em qualquer unidade do SUS". O Art. 196 da CF/88 consagra a saúde como direito universal de todos e dever do Estado.',
    legalBasis: 'Constituição Federal de 1988, Art. 196; Portaria Ministério da Saúde nº 940/2011, Art. 18; Lei nº 8.080/1990, Art. 2º.',
    lastVerifiedDate: '2026-03-15'
  },
  {
    id: 'vacinacao-rotina',
    title: 'Vacinação infantil e de adultos: o que levar e horários',
    category: 'vacina',
    informationLevel: 'procedimento_administrativo',
    shortSummary: 'Todas as vacinas do Programa Nacional de Imunizações (PNI) são 100% gratuitas.',
    whatToBring: [
      'Caderneta de Vacinação (física ou registro no aplicativo Meu SUS Digital).',
      'Documento de identificação com foto ou Certidão de Nascimento.',
      'Número do CPF ou Cartão do SUS.'
    ],
    stepsToFollow: [
      'Dirija-se diretamente à Sala de Vacinas da Clínica da Família.',
      'A equipe de enfermagem confere as doses aplicadas e calcula os prazos das vacinas atrasadas ou da época.',
      'A vacina é aplicada com seringas e agulhas descartáveis homologadas.',
      'A dose é registrada no sistema informatizado nacional de imunizações e anotada na caderneta física.'
    ],
    communityTips: [
      'Se você perdeu o livrinho físico antigo de vacinas, não deixe de ir: a unidade consegue consultar as doses aplicadas pelo seu CPF no sistema nacional e emitir uma nova caderneta.',
      'Aos sábados, as salas de vacina costumam funcionar das 08:00 às 12:00, ideal para quem trabalha durante a semana.'
    ],
    susRightsNote: 'O Programa Nacional de Imunizações (PNI) é política de Estado regulamentada pela Lei nº 6.259/1975. A vacinação nas unidades públicas é universal e gratuita para todos os cidadãos residentes no território nacional.',
    legalBasis: 'Lei Federal nº 6.259/1975 e Calendário Nacional de Vacinação do Ministério da Saúde.',
    lastVerifiedDate: '2026-03-12'
  },
  {
    id: 'remedios-farmacia',
    title: 'Remédios gratuitos na farmácia da Clínica da Família',
    category: 'remedios',
    informationLevel: 'confirmar_na_unidade',
    shortSummary: 'Retirada de medicamentos essenciais receitados por médicos ou enfermeiros do SUS.',
    whatToBring: [
      'Receita médica ou de enfermagem válida e legível, emitida por profissional habilitado.',
      'Documento de identificação com foto da pessoa receitada.',
      'Cartão do SUS ou CPF cadastrado na unidade.'
    ],
    stepsToFollow: [
      'Apresente a receita no balcão da farmácia da própria Clínica da Família.',
      'O atendente ou farmacêutico confere o prazo da prescrição (remédios controlados possuem validade mais curta).',
      'O medicamento é conferido e entregue com explicação detalhada dos horários e modo de tomar.',
      'Caso o medicamento prescrito esteja temporariamente desabastecido na unidade, solicite carimbo de indisponibilidade ou orientação sobre qual unidade polo da AP possui estoque.'
    ],
    communityTips: [
      'Medicamentos básicos para hipertensão arterial e diabetes também podem ser retirados sem custo em drogarias privadas conveniadas ao programa Farmácia Popular usando seu CPF e receita médica.',
      'Avise a equipe médica quando a medicação contínua estiver com menos de 10 comprimidos para providenciar a renovação da receita com tempo hábil.'
    ],
    susRightsNote: 'A assistência farmacêutica é parte integrante da Seguridade Social no SUS (Lei 8.080/1990, Art. 6º, I, "d"). O fornecimento de medicamentos da Relação Nacional de Medicamentos Essenciais (RENAME) é dever do poder público.',
    legalBasis: 'Lei nº 8.080/1990, Art. 6º; Relação Nacional de Medicamentos Essenciais (RENAME / Ministério da Saúde).',
    lastVerifiedDate: '2026-03-14'
  },
  {
    id: 'pre-natal-gestante',
    title: 'Início do Pré-Natal e cuidados com a gestante',
    category: 'pre_natal',
    informationLevel: 'especifico_municipal_rj',
    shortSummary: 'Acompanhamento seguro da gravidez com a equipe de Saúde da Família e Programa Cegonha Carioca.',
    whatToBring: [
      'Documento oficial de identificação.',
      'Cartão do SUS ou CPF.',
      'Resultado de teste de gravidez (se já tiver feito) ou solicitação direta de teste rápido na própria unidade.'
    ],
    stepsToFollow: [
      'Ao suspeitar de gestação, procure a Clínica da Família mais próxima para realização do teste rápido confirmatório.',
      'Inicia-se o cadastro no Pré-Natal e no programa municipal Cegonha Carioca.',
      'A gestante recebe a Caderneta da Gestante, realiza a primeira consulta (médica ou de enfermagem) e solicita exames laboratoriais do primeiro trimestre.',
      'A gestante conhece com antecedência a maternidade pública de referência para o parto de acordo com sua área territorial.'
    ],
    communityTips: [
      'No município do Rio, o Programa Cegonha Carioca disponibiliza transporte especial (ambulância exclusiva) para a gestante em trabalho de parto chegar à maternidade de referência.',
      'Incentiva-se a realização do Pré-Natal do Parceiro, com exames e acolhimento para a paternidade ativa.'
    ],
    susRightsNote: 'A Lei Federal nº 11.108/2005 (Lei do Acompanhante) garante à gestante o direito de indicar um(a) acompanhante de sua livre escolha durante todo o trabalho de parto, parto e pós-parto imediato. Nenhuma maternidade do SUS pode proibir esse direito.',
    legalBasis: 'Lei Federal nº 11.108/2005; Portaria GM/MS nº 1.459/2011 (Rede Cegonha); Programa Cegonha Carioca (SMS-RJ).',
    lastVerifiedDate: '2026-03-10'
  },
  {
    id: 'quando-ir-upa-urgencia',
    title: 'Quando ir à Clínica da Família vs. quando ir à UPA 24h ou ligar 192',
    category: 'urgencia',
    informationLevel: 'urgencia_emergencia',
    isUrgent: true,
    shortSummary: 'Reconheça os sinais de alerta de emergência médica que exigem atendimento imediato.',
    whatToBring: [
      'Em situações com risco imediato de morte, NUNCA atrase o socorro buscando papéis: vá direto à emergência ou ligue 192.'
    ],
    stepsToFollow: [
      'CLÍNICA DA FAMÍLIA (Atenção Básica): Dores crônicas leves, controle de diabetes e pressão, renovação de receitas, vacinação, pré-natal, febre baixa recente sem outros sintomas.',
      'UPA 24H (Pronto Atendimento): Febre alta persistente que não baixa com remédio, falta de ar moderada a forte, cortes profundos que precisam de sutura, suspeita de fratura óssea, dor abdominal aguda intolerável.',
      'LIGAR 192 (SAMU) OU 193 (BOMBEIROS): Dor intensa e súbita no peito com aperto ou queimação irradiando para o braço/pescoço, perda súbita de consciência, convulsão, sinais de AVC (boca torta, dificuldade para falar ou levantar um braço).'
    ],
    emergencyAction: {
      label: 'Ligar para SAMU Emergência (192)',
      phone: '192'
    },
    communityTips: [
      'Nas comunidades do Rio, o SAMU possui protocolos de socorro integrado. Em caso de restrição momentânea de acesso, as UPAs 24h de Manguinhos, Rocinha e Cidade de Deus operam em regime ininterrupto.',
      'Mantenha sempre os números 192 (SAMU) e 193 (Bombeiros) salvos na discagem rápida do celular dos familiares idosos.'
    ],
    susRightsNote: 'A recusa ou omissão de socorro emergencial configura crime previsto no Artigo 135 do Código Penal Brasileiro. O atendimento estabilizador de urgência no SUS é incondicional a qualquer exigência prévia.',
    legalBasis: 'Constituição Federal de 1988, Art. 196; Lei 8.080/1990; Política Nacional de Atenção às Urgências (Portaria GM/MS nº 1.863/2003); Código Penal Brasileiro, Art. 135.',
    lastVerifiedDate: '2026-03-15'
  }
];
