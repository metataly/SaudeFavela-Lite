import { GuidanceTopic } from '../types';

/**
 * Catálogo de Orientações da Atenção Primária à Saúde (SUS)
 * Base normativa sanitária brasileira:
 * - Constituição Federal de 1988 (Art. 196 a 200 - Seguridade Social e Saúde)
 * - Lei Federal nº 8.080/1990 (Lei Orgânica da Saúde - Princípios da Universalidade e Igualdade)
 * - Portaria MS nº 940/2011 (Art. 13 - Cartão Nacional de Saúde)
 * - Portaria de Consolidação GM/MS nº 2/2017 (Anexo XXII - PNAB)
 * - Portarias GM/MS nº 5.349 e 5.350/2024 (Rede Alyne)
 * - Lei Federal nº 11.108/2005 (Lei do Acompanhante no Parto)
 * - Portaria GM/MS nº 1.863/2003 (Atenção às Urgências) e Código Penal, Art. 135
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
      'Comprovante de residência simples ou declaração (para vincular à equipe da sua rua).'
    ],
    stepsToFollow: [
      'Identifique a Clínica da Família que atende sua rua ou travessa (território de cobertura).',
      'Compareça preferencialmente no início do horário de funcionamento para o Acolhimento com Classificação de Risco.',
      'A equipe de enfermagem avalia sua necessidade: sintomas agudos do dia são acolhidos no mesmo turno (demanda espontânea); rotinas crônicas são agendadas para os dias seguintes.',
      'Você é direcionado para a equipe de Saúde da Família responsável pela sua microárea.'
    ],
    communityTips: [
      'Descubra quem é o Agente Comunitário de Saúde (ACS) que visita sua rua: ele conhece a rotina da equipe médica e pode intermediar orientações de acolhimento.',
      'Para quem tem jornada de trabalho rígida, consulte com antecedência os horários de início de acolhimento da unidade.'
    ],
    susRightsNote: 'O acolhimento é diretriz da PNAB (Portaria GM/MS nº 2/2017). Nenhuma pessoa que procure uma unidade de saúde com queixa de sofrimento ou sintoma pode ser dispensada sem avaliação de acolhimento.',
    legalBasis: 'Portaria de Consolidação GM/MS nº 2/2017, Anexo XXII (PNAB) e Lei 8.080/1990, Art. 7º.',
    lastReviewedDate: '2026-11-03'
  },
  {
    id: 'sem-comprovante',
    title: 'Não tenho conta de luz ou água no meu nome: posso ser atendido?',
    category: 'documentos',
    informationLevel: 'direito_universal',
    shortSummary: 'SIM! A universalidade do SUS garante acolhimento mesmo sem comprovante comercial em seu nome.',
    whatToBring: [
      'Qualquer documento de identificação com foto ou número de CPF.',
      'Se houver: comprovante da casa onde você mora (parente, aluguel, vizinho) ou uma declaração escrita de próprio punho informando onde reside.',
      'Atestado da Associação de Moradores do morro ou comunidade (opcional).'
    ],
    stepsToFollow: [
      'Informe no balcão que você reside no território, mas não possui conta de luz ou de água em seu nome.',
      'A equipe preenche a autodeclaração de residência e o cadastro de acolhimento.',
      'Um Agente Comunitário de Saúde (ACS) fará uma visita domiciliar posterior para validar a microárea de cobertura e cadastrar a família no sistema e-SUS APS.',
      'O acolhimento e a assistência inicial ocorrem no posto, sem que a falta de conta de concessionária seja impedimento de acesso.'
    ],
    communityTips: [
      'Nas comunidades com moradias multifamiliares ou ocupações, a autodeclaração auxilia no vínculo territorial; confirme na unidade como ela organiza o acolhimento de novos moradores.',
      'Caso algum funcionário da recepção hesite, peça gentilmente para conversar com o enfermeiro ou responsável pelo acolhimento.'
    ],
    susRightsNote: 'A saúde é direito de todos e dever do Estado (CF/88, Art. 196). O acesso às ações e serviços de saúde é universal e igualitário (Lei 8.080/1990, Art. 7º). A identificação no SUS por meio do Cartão Nacional de Saúde (CNS) visa a integração de registros, sem prejuízo do direito ao atendimento (Portaria MS nº 940/2011, Art. 13).',
    legalBasis: 'Constituição Federal de 1988, Art. 196; Lei nº 8.080/1990, Art. 7º; Portaria MS nº 940/2011, Art. 13.',
    lastReviewedDate: '2026-11-03'
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
      'Dirija-se à Sala de Vacinas da Clínica da Família.',
      'A equipe de enfermagem confere as doses aplicadas e calcula os prazos das vacinas atrasadas ou da época.',
      'A vacina é aplicada com seringas e agulhas descartáveis homologadas.',
      'A dose é registrada no sistema informatizado nacional de imunizações e anotada na caderneta física.'
    ],
    communityTips: [
      'Se você perdeu o livrinho físico antigo de vacinas, não deixe de ir: a unidade pode consultar as doses aplicadas pelo seu CPF no sistema nacional e emitir nova caderneta.',
      'Os horários de aplicação variam por unidade e devem ser confirmados antes de ir.'
    ],
    susRightsNote: 'O Programa Nacional de Imunizações (PNI) é política pública de Estado regulamentada pela Lei nº 6.259/1975. A vacinação nas unidades públicas é universal e gratuita para todos os cidadãos no território nacional.',
    legalBasis: 'Lei Federal nº 6.259/1975 e Calendário Nacional de Vacinação do Ministério da Saúde.',
    lastReviewedDate: '2026-11-03'
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
      'O medicamento é conferido e entregue com explicação dos horários e posologia.',
      'Caso o medicamento prescrito esteja temporariamente em falta na unidade, solicite carimbo de indisponibilidade ou orientação sobre qual unidade polo da AP possui estoque.'
    ],
    communityTips: [
      'Consulte no site do Ministério da Saúde quais medicamentos estão disponíveis pelo programa Farmácia Popular em farmácias conveniadas, portando receita médica e CPF.',
      'Avise a equipe médica quando a medicação contínua estiver acabando para providenciar a renovação da receita com tempo hábil.'
    ],
    susRightsNote: 'A assistência farmacêutica é parte integrante da Seguridade Social no SUS (Lei 8.080/1990, Art. 6º, I, "d"). O fornecimento de medicamentos da Relação Nacional de Medicamentos Essenciais (RENAME) é atribuição do SUS.',
    legalBasis: 'Lei nº 8.080/1990, Art. 6º; Relação Nacional de Medicamentos Essenciais (RENAME / Ministério da Saúde).',
    lastReviewedDate: '2026-11-03'
  },
  {
    id: 'pre-natal-gestante',
    title: 'Início do Pré-Natal e cuidados com a gestante',
    category: 'pre_natal',
    informationLevel: 'especifico_municipal_rj',
    shortSummary: 'Acompanhamento seguro da gravidez com a equipe de Saúde da Família e Rede Alyne.',
    whatToBring: [
      'Documento oficial de identificação.',
      'Cartão do SUS ou CPF.',
      'Resultado de teste de gravidez (se já tiver feito) ou realização de teste rápido na própria unidade.'
    ],
    stepsToFollow: [
      'Ao suspeitar de gestação, procure a Clínica da Família mais próxima para realização do teste rápido confirmatório.',
      'Inicia-se o cadastro no Pré-Natal e o acompanhamento vinculado à Rede Alyne e programas locais.',
      'A gestante recebe a Caderneta da Gestante, realiza a consulta inicial e solicita os exames do primeiro trimestre.',
      'A gestante é orientada sobre a maternidade de referência para o parto de acordo com o território.'
    ],
    communityTips: [
      'Pergunte na unidade qual é a maternidade de referência e como chegar até ela em caso de trabalho de parto.',
      'Incentiva-se a realização do Pré-Natal do Parceiro, com exames e acolhimento para a paternidade ativa.'
    ],
    susRightsNote: 'A Lei Federal nº 11.108/2005 (Lei do Acompanhante) garante à gestante o direito de indicar acompanhante de sua livre escolha durante todo o trabalho de parto, parto e pós-parto imediato. Nenhuma maternidade pode proibir esse direito.',
    legalBasis: 'Lei Federal nº 11.108/2005; Portarias GM/MS nº 5.349 e 5.350/2024 (Rede Alyne, que substituiu a Rede Cegonha).',
    lastReviewedDate: '2026-11-03'
  },
  {
    id: 'quando-ir-upa-urgencia',
    title: 'Quando ir à Clínica da Família vs. quando ir à UPA 24h ou ligar 192',
    category: 'urgencia',
    informationLevel: 'urgencia_emergencia',
    isUrgent: true,
    shortSummary: 'Reconheça os sinais de alerta de emergência médica que exigem atendimento imediato.',
    whatToBring: [
      'Em situações com risco imediato à vida, nunca atrase o socorro buscando documentos: vá direto à emergência ou ligue 192.'
    ],
    stepsToFollow: [
      'CLÍNICA DA FAMÍLIA (Atenção Básica): Acompanhamento rotineiro, dores leves, controle de diabetes e pressão, renovação de receitas, vacinação, pré-natal, febre baixa recente.',
      'UPA 24H (Pronto Atendimento): Febre alta persistente, falta de ar moderada a forte, cortes profundos que precisam de sutura, suspeita de fratura, dor abdominal aguda intensa.',
      'LIGAR 192 (SAMU) OU 193 (BOMBEIROS): Dor intensa no peito com aperto ou queimação, perda de consciência, convulsão, sinais de AVC (boca torta, dificuldade para falar ou perda de força no braço). Na dúvida, ligue 192 para orientação médica imediata.'
    ],
    emergencyAction: {
      label: 'Ligar para SAMU Emergência (192)',
      phone: '192'
    },
    communityTips: [
      'Mantenha sempre os números 192 (SAMU) e 193 (Bombeiros) de fácil acesso para pessoas idosas e familiares.',
      'Na dúvida entre aguardar ou buscar socorro para sintomas agudos graves, ligue 192 para receber triagem médica preliminar.'
    ],
    susRightsNote: 'A recusa ou omissão de socorro emergencial configura crime previsto no Artigo 135 do Código Penal Brasileiro. O atendimento estabilizador de urgência no SUS independe de exigências burocráticas prévias.',
    legalBasis: 'Constituição Federal de 1988, Art. 196; Lei 8.080/1990; Política Nacional de Atenção às Urgências (Portaria GM/MS nº 1.863/2003); Código Penal Brasileiro, Art. 135.',
    lastReviewedDate: '2026-11-03'
  }
];
