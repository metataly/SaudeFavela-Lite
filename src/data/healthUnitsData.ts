import { HealthUnit } from '../types';

/**
 * Catálogo de Unidades de Atenção Primária e Urgência no Rio de Janeiro
 *
 * Situação cadastral:
 * - 'fonte_oficial_datada': Endereço e telefone com publicação oficial datada.
 * - 'endereco_com_fonte': Endereço (e eventualmente CNES) com publicação oficial; telefone e horário a confirmar.
 * - 'a_confirmar': Endereço, telefone e horário pendentes de confirmação no CNES ou na Central 1746.
 */

const LISTA_2021 = {
  dataSource: 'Lista de unidades da SMS-Rio',
  sourceYear: '2021',
  sourceUrl: 'https://saude.prefeitura.rio/wp-content/uploads/sites/47/2022/02/UnidadesTratamentoTabagismo-SITE-MRJ-4-01-21.docx.pdf',
};

const LISTA_2025 = {
  dataSource: 'Lista de unidades de referência de vacinação da SMS-Rio (09/10/2025)',
  sourceYear: '2025',
  sourceUrl: 'https://saude.prefeitura.rio/wp-content/uploads/sites/47/2025/10/CONCENTRADORAS-PFIZER-BABY-09.10.2025.pdf',
};

export const HEALTH_UNITS_DATA: HealthUnit[] = [
  // 1. Rinaldo De Lamare (fonte_oficial_datada, LISTA_2021)
  {
    id: 'cf-rinaldo-de-lamare',
    name: 'Clínica da Família Rinaldo De Lamare',
    unitType: 'clinica_familia',
    community: 'Rocinha / São Conrado',
    neighborhood: 'São Conrado',
    zone: 'Zona Sul',
    healthDistrict: 'AP 2.1',
    address: 'Av. Niemeyer, 776, São Conrado, Rio de Janeiro - RJ',
    hours: 'Confirmar por telefone',
    phone: '(21) 3324-2454 / (21) 3324-2487',
    dataSource: LISTA_2021.dataSource,
    sourceYear: LISTA_2021.sourceYear,
    sourceUrl: LISTA_2021.sourceUrl,
    verificationStatus: 'fonte_oficial_datada'
  },
  // 2. Maria do Socorro Silva e Souza (fonte_oficial_datada, LISTA_2021, com divergência de endereço anotada)
  {
    id: 'cf-maria-do-socorro',
    name: 'Clínica da Família Maria do Socorro Silva e Souza',
    unitType: 'clinica_familia',
    community: 'Rocinha',
    neighborhood: 'Rocinha',
    zone: 'Zona Sul',
    healthDistrict: 'AP 2.1',
    address: 'Estrada da Gávea, 445, Rocinha, Rio de Janeiro - RJ',
    addressNote: 'Fontes oficiais divergem: um documento da Prefeitura, sem data, indica Estrada da Gávea, 522 (curva do S). Confirme o endereço por telefone antes de ir.',
    hours: 'Confirmar por telefone',
    phone: '(21) 3322-7395 / (21) 3322-6694',
    dataSource: LISTA_2021.dataSource,
    sourceYear: LISTA_2021.sourceYear,
    sourceUrl: LISTA_2021.sourceUrl,
    verificationStatus: 'fonte_oficial_datada'
  },
  // 3. Santa Marta (fonte_oficial_datada, LISTA_2021)
  {
    id: 'cf-santa-marta',
    name: 'Clínica da Família Santa Marta',
    unitType: 'clinica_familia',
    community: 'Santa Marta',
    neighborhood: 'Botafogo',
    zone: 'Zona Sul',
    healthDistrict: 'AP 2.1',
    address: 'Rua São Clemente, 312, Botafogo, Rio de Janeiro - RJ',
    hours: 'Confirmar por telefone',
    phone: '(21) 2286-2374',
    dataSource: LISTA_2021.dataSource,
    sourceYear: LISTA_2021.sourceYear,
    sourceUrl: LISTA_2021.sourceUrl,
    verificationStatus: 'fonte_oficial_datada'
  },
  // 4. Pavão-Pavãozinho e Cantagalo (fonte_oficial_datada, LISTA_2021)
  {
    id: 'cf-pavao-cantagalo',
    name: 'Clínica da Família Pavão-Pavãozinho e Cantagalo',
    unitType: 'clinica_familia',
    community: 'Pavão-Pavãozinho e Cantagalo',
    neighborhood: 'Copacabana',
    zone: 'Zona Sul',
    healthDistrict: 'AP 2.1',
    address: 'Ladeira Saint Roman, 172, Copacabana, Rio de Janeiro - RJ',
    hours: 'Confirmar por telefone',
    phone: '(21) 2523-4127 / (21) 2513-1549',
    dataSource: LISTA_2021.dataSource,
    sourceYear: LISTA_2021.sourceYear,
    sourceUrl: LISTA_2021.sourceUrl,
    verificationStatus: 'fonte_oficial_datada'
  },
  // 5. Herbert de Souza (fonte_oficial_datada, LISTA_2021 - Tomás Coelho)
  {
    id: 'cf-herbert-de-souza',
    name: 'Clínica da Família Herbert de Souza',
    unitType: 'clinica_familia',
    community: 'Tomás Coelho',
    neighborhood: 'Tomás Coelho',
    zone: 'Zona Norte',
    healthDistrict: 'AP 3.2',
    address: 'Av. Pastor Martin Luther King Jr., 4420, Tomás Coelho, Rio de Janeiro - RJ',
    addressNote: 'O endereço também consta na lista da SMS-Rio de 2025 (4420/4676). O endereço anterior do app, na Maré, estava incorreto.',
    hours: 'Confirmar por telefone',
    phone: '(21) 3352-4528',
    dataSource: LISTA_2021.dataSource,
    sourceYear: LISTA_2021.sourceYear,
    sourceUrl: LISTA_2021.sourceUrl,
    verificationStatus: 'fonte_oficial_datada'
  },
  // 6. Zilda Arns (endereco_com_fonte, LISTA_2025)
  {
    id: 'cf-zilda-arns',
    name: 'Clínica da Família Zilda Arns',
    unitType: 'clinica_familia',
    community: 'Complexo do Alemão',
    neighborhood: 'Complexo do Alemão',
    zone: 'Zona Norte',
    healthDistrict: 'AP 3.1',
    address: 'Estrada do Itararé, 951 (subsolo), Complexo do Alemão, Rio de Janeiro - RJ, CEP 21061-240',
    cnes: '3784975',
    hours: 'Confirmar no CNES (cnes.saude.gov.br) ou na Central 1746',
    phone: 'Confirmar na Central 1746',
    dataSource: LISTA_2025.dataSource,
    sourceYear: LISTA_2025.sourceYear,
    sourceUrl: LISTA_2025.sourceUrl,
    verificationStatus: 'endereco_com_fonte'
  },
  // 7. Victor Valla (endereco_com_fonte, LISTA_2025)
  {
    id: 'cf-victor-valla',
    name: 'Clínica da Família Victor Valla',
    unitType: 'clinica_familia',
    community: 'Manguinhos',
    neighborhood: 'Manguinhos',
    zone: 'Zona Norte',
    healthDistrict: 'AP 3.1',
    address: 'Av. Dom Hélder Câmara, 1390 (fundos), Manguinhos, Rio de Janeiro - RJ, CEP 20973-012',
    addressNote: 'Telefones e horários variam entre as fontes consultadas. Confirme antes de ir.',
    cnes: '6514022',
    hours: 'Confirmar no CNES (cnes.saude.gov.br) ou na Central 1746',
    phone: 'Confirmar na Central 1746',
    dataSource: LISTA_2025.dataSource,
    sourceYear: LISTA_2025.sourceYear,
    sourceUrl: LISTA_2025.sourceUrl,
    verificationStatus: 'endereco_com_fonte'
  },
  // 8. Amélia dos Santos Ferreira (endereco_com_fonte, LISTA_2025 - Encantado)
  {
    id: 'cf-amelia-dos-santos',
    name: 'Clínica da Família Amélia dos Santos Ferreira',
    unitType: 'clinica_familia',
    community: 'Encantado',
    neighborhood: 'Encantado',
    zone: 'Zona Norte',
    healthDistrict: 'Confirmar',
    address: 'Rua Pompílio de Albuquerque, 386, Encantado, Rio de Janeiro - RJ',
    hours: 'Confirmar no CNES (cnes.saude.gov.br) ou na Central 1746',
    phone: 'Confirmar na Central 1746',
    dataSource: LISTA_2025.dataSource,
    sourceYear: LISTA_2025.sourceYear,
    sourceUrl: LISTA_2025.sourceUrl,
    verificationStatus: 'endereco_com_fonte'
  },
  // 9. Chapéu Mangueira e Babilônia (endereco_com_fonte, Lista Pts Vacinação)
  {
    id: 'cf-chapeu-mangueira',
    name: 'Clínica da Família Chapéu Mangueira e Babilônia',
    unitType: 'clinica_familia',
    community: 'Chapéu Mangueira e Babilônia',
    neighborhood: 'Leme',
    zone: 'Zona Sul',
    healthDistrict: 'Confirmar',
    address: 'Rua São Francisco, 5 (Babilônia), Leme, Rio de Janeiro - RJ',
    hours: 'Confirmar no CNES (cnes.saude.gov.br) ou na Central 1746',
    phone: 'Confirmar na Central 1746',
    dataSource: 'Documento da Prefeitura do Rio (lista de pontos de vacinação, sem data)',
    sourceYear: 'sem data',
    sourceUrl: 'https://www.rio.rj.gov.br/documents/73801/b073a96d-c964-4501-87a4-3ce5abf75da0',
    verificationStatus: 'endereco_com_fonte'
  },
  // 10. UPA 24h Manguinhos (endereco_com_fonte, Lista SES-RJ)
  {
    id: 'upa-manguinhos',
    name: 'UPA 24h Manguinhos',
    unitType: 'upa_emergencia',
    community: 'Manguinhos',
    neighborhood: 'Manguinhos',
    zone: 'Zona Norte',
    healthDistrict: 'AP 3.1',
    address: 'Av. Dom Hélder Câmara, 1390, Manguinhos, Rio de Janeiro - RJ',
    hours: 'Funciona 24 horas',
    phone: 'Confirmar na Central 1746',
    dataSource: 'Lista de serviços da Secretaria de Estado de Saúde do RJ, sem data',
    sourceYear: 'sem data',
    sourceUrl: 'http://www.riocomsaude.rj.gov.br/Publico/MostrarArquivo.aspx?C=MJ5XqDR4hFY%3D',
    verificationStatus: 'endereco_com_fonte'
  },
  // 11. UPA 24h Rocinha (a_confirmar, sem fonte encontrada)
  {
    id: 'upa-rocinha',
    name: 'UPA 24h Rocinha',
    unitType: 'upa_emergencia',
    community: 'Rocinha',
    neighborhood: 'São Conrado',
    zone: 'Zona Sul',
    healthDistrict: 'AP 2.1',
    address: 'Confirmar no CNES (cnes.saude.gov.br) ou na Central 1746',
    hours: 'Funciona 24 horas',
    phone: 'Confirmar na Central 1746',
    dataSource: 'CNES / Central 1746 (indicação de consulta)',
    sourceYear: 'sem data',
    sourceUrl: 'https://cnes.saude.gov.br/',
    verificationStatus: 'a_confirmar'
  },
  // 12. Nova: Vila do João (endereco_com_fonte, LISTA_2025)
  {
    id: 'cf-vila-do-joao',
    name: 'Clínica da Família Vila do João',
    unitType: 'clinica_familia',
    community: 'Complexo da Maré',
    neighborhood: 'Maré',
    zone: 'Zona Norte',
    healthDistrict: 'Confirmar',
    address: 'Rua 17, s/nº, Vila do João, Maré, Rio de Janeiro - RJ',
    hours: 'Confirmar no CNES (cnes.saude.gov.br) ou na Central 1746',
    phone: 'Confirmar na Central 1746',
    dataSource: LISTA_2025.dataSource,
    sourceYear: LISTA_2025.sourceYear,
    sourceUrl: LISTA_2025.sourceUrl,
    verificationStatus: 'endereco_com_fonte'
  },
  // 13. Nova: Hamilton Land (endereco_com_fonte, LISTA_2025)
  {
    id: 'cms-hamilton-land',
    name: 'Centro Municipal de Saúde Hamilton Land',
    unitType: 'centro_municipal_saude',
    community: 'Cidade de Deus',
    neighborhood: 'Cidade de Deus',
    zone: 'Zona Oeste',
    healthDistrict: 'Confirmar',
    address: 'Av. Edgar Werneck, 1601, Cidade de Deus, Rio de Janeiro - RJ',
    hours: 'Confirmar no CNES (cnes.saude.gov.br) ou na Central 1746',
    phone: 'Confirmar na Central 1746',
    dataSource: LISTA_2025.dataSource,
    sourceYear: LISTA_2025.sourceYear,
    sourceUrl: LISTA_2025.sourceUrl,
    verificationStatus: 'endereco_com_fonte'
  }
];
