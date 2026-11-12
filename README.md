# SaúdeFavela-Lite

**SaúdeFavela-Lite** é uma Progressive Web App (PWA) acessível e inclusiva, voltada para orientação sobre os serviços da Atenção Primária à Saúde (APS) no Sistema Único de Saúde (SUS) no município do Rio de Janeiro.

O projeto atua como camada intermediária pedagógica e informativa entre o cidadão e a rede de saúde, sem substituir sistemas oficiais de regulação governamentais ou configurar atendimento médico direto.

---

## 1. O que o app é
- Um guia digital informativo com catálogo territorial de unidades de saúde (Clínicas da Família, CMS e UPAs 24h).
- Um repositório de orientações sobre direitos sanitários (acolhimento com classificação de risco, vacinação, dispensação de medicamentos, pré-natal e urgências).
- Uma ferramenta demonstrativa de simulação de solicitação de agendamento em 6 etapas para treino e familiarização de usuários com baixo letramento digital.

---

## 2. O que funciona offline
- **Arquivos e Recursos do App:** Graças ao Service Worker e Cache Storage da PWA, toda a interface gráfica (HTML, CSS, JavaScript, ícones e fontes nativas) permanece 100% utilizável sem conexão à internet após a primeira visita.
- **Catálogo de Unidades:** Os dados das unidades de saúde estão embutidos diretamente no bundle da aplicação, permitindo busca e filtragem por região sem depender de rede ou de requisições a bancos de dados externos.
- **Guia de Direitos e Normas:** Todas as 6 diretrizes normativas (baseadas na CF/88, Lei 8.080/1990, PNAB e Rede Alyne) estão disponíveis offline.
- **Simulação de Agendamento:** O fluxo de simulação pedagógica opera integralmente no dispositivo e armazena os protocolos demonstrativos no LocalStorage do navegador.
- **Preferências de Acessibilidade:** Configurações de tamanho de fonte, contraste elevado e redução de movimento são salvas e recuperadas localmente.

---

## 3. O que NÃO funciona offline
- **Busca por Voz:** A transcrição por voz depende da Web Speech API nativa do navegador do usuário. Na maioria dos navegadores (como Google Chrome no Android ou desktop), o áudio pode ser processado remotamente pelos servidores do fabricante do navegador. Caso o dispositivo esteja desconectado da internet, o reconhecimento de voz falhará e a interface exibirá aviso orientando a digitação manual.
- **Atualização de Versão:** Novas versões do aplicativo e atualizações do Service Worker exigem conexão para detecção e download do novo cache.

---

## 4. Situação dos Dados das Unidades (Auditoria Cadastral)

Nenhum dado é apresentado como verificado sem fonte e data visíveis.

A versão anterior do catálogo continha unidades com localização incorreta (Herbert de Souza e Amélia dos Santos Ferreira); elas foram corrigidas conforme listas da SMS-Rio.

### A) Unidades com Fonte Oficial Datada (`fonte_oficial_datada`)
*(Endereço e telefone extraídos de publicação oficial com ano informado. Horários devem ser confirmados por telefone antes de ir):*

1. **Clínica da Família Rinaldo De Lamare** (Rocinha / São Conrado)
   - Fonte: Lista de unidades da SMS-Rio, 2021 ([saude.prefeitura.rio](https://saude.prefeitura.rio/wp-content/uploads/sites/47/2022/02/UnidadesTratamentoTabagismo-SITE-MRJ-4-01-21.docx.pdf))
   - Endereço: Av. Niemeyer, 776, São Conrado, Rio de Janeiro - RJ
   - Telefone: (21) 3324-2454 / (21) 3324-2487
   - Horário: Confirmar por telefone

2. **Clínica da Família Maria do Socorro Silva e Souza** (Rocinha)
   - Fonte: Lista de unidades da SMS-Rio, 2021 ([saude.prefeitura.rio](https://saude.prefeitura.rio/wp-content/uploads/sites/47/2022/02/UnidadesTratamentoTabagismo-SITE-MRJ-4-01-21.docx.pdf))
   - Endereço: Estrada da Gávea, 445, Rocinha, Rio de Janeiro - RJ
   - Observação sobre o endereço: Fontes oficiais divergem: um documento da Prefeitura, sem data, indica Estrada da Gávea, 522 (curva do S). Confirme o endereço por telefone antes de ir.
   - Telefone: (21) 3322-7395 / (21) 3322-6694
   - Horário: Confirmar por telefone

3. **Clínica da Família Santa Marta** (Botafogo)
   - Fonte: Lista de unidades da SMS-Rio, 2021 ([saude.prefeitura.rio](https://saude.prefeitura.rio/wp-content/uploads/sites/47/2022/02/UnidadesTratamentoTabagismo-SITE-MRJ-4-01-21.docx.pdf))
   - Endereço: Rua São Clemente, 312, Botafogo, Rio de Janeiro - RJ
   - Telefone: (21) 2286-2374
   - Horário: Confirmar por telefone

4. **Clínica da Família Pavão-Pavãozinho e Cantagalo** (Copacabana)
   - Fonte: Lista de unidades da SMS-Rio, 2021 ([saude.prefeitura.rio](https://saude.prefeitura.rio/wp-content/uploads/sites/47/2022/02/UnidadesTratamentoTabagismo-SITE-MRJ-4-01-21.docx.pdf))
   - Endereço: Ladeira Saint Roman, 172, Copacabana, Rio de Janeiro - RJ
   - Telefone: (21) 2523-4127 / (21) 2513-1549
   - Horário: Confirmar por telefone

5. **Clínica da Família Herbert de Souza** (Tomás Coelho)
   - Fonte: Lista de unidades da SMS-Rio, 2021 ([saude.prefeitura.rio](https://saude.prefeitura.rio/wp-content/uploads/sites/47/2022/02/UnidadesTratamentoTabagismo-SITE-MRJ-4-01-21.docx.pdf))
   - Endereço: Av. Pastor Martin Luther King Jr., 4420, Tomás Coelho, Rio de Janeiro - RJ
   - Observação sobre o endereço: O endereço também consta na lista da SMS-Rio de 2025 (4420/4676). O endereço anterior do app, na Maré, estava incorreto.
   - Telefone: (21) 3352-4528
   - Horário: Confirmar por telefone

### B) Unidades com Endereço com Fonte (`endereco_com_fonte`)
*(Endereço e, quando disponível, CNES extraídos de publicação oficial. Telefone e horário sem fonte divulgada devem ser confirmados na Central 1746 ou no CNES):*

1. **Clínica da Família Zilda Arns** (Complexo do Alemão)
   - Fonte: Lista de unidades de referência de vacinação da SMS-Rio (09/10/2025), 2025 ([saude.prefeitura.rio](https://saude.prefeitura.rio/wp-content/uploads/sites/47/2025/10/CONCENTRADORAS-PFIZER-BABY-09.10.2025.pdf))
   - Endereço: Estrada do Itararé, 951 (subsolo), Complexo do Alemão, Rio de Janeiro - RJ, CEP 21061-240
   - CNES: 3784975 (cnes.saude.gov.br)
   - Telefone e horário: Confirmar na Central 1746 ou no CNES

2. **Clínica da Família Victor Valla** (Manguinhos)
   - Fonte: Lista de unidades de referência de vacinação da SMS-Rio (09/10/2025), 2025 ([saude.prefeitura.rio](https://saude.prefeitura.rio/wp-content/uploads/sites/47/2025/10/CONCENTRADORAS-PFIZER-BABY-09.10.2025.pdf))
   - Endereço: Av. Dom Hélder Câmara, 1390 (fundos), Manguinhos, Rio de Janeiro - RJ, CEP 20973-012
   - CNES: 6514022 (cnes.saude.gov.br)
   - Observação: Telefones e horários variam entre as fontes consultadas. Confirme antes de ir.
   - Telefone e horário: Confirmar na Central 1746 ou no CNES

3. **Clínica da Família Amélia dos Santos Ferreira** (Encantado)
   - Fonte: Lista de unidades de referência de vacinação da SMS-Rio (09/10/2025), 2025 ([saude.prefeitura.rio](https://saude.prefeitura.rio/wp-content/uploads/sites/47/2025/10/CONCENTRADORAS-PFIZER-BABY-09.10.2025.pdf))
   - Endereço: Rua Pompílio de Albuquerque, 386, Encantado, Rio de Janeiro - RJ
   - Telefone e horário: Confirmar na Central 1746 ou no CNES

4. **Clínica da Família Chapéu Mangueira e Babilônia** (Leme)
   - Fonte: Documento da Prefeitura do Rio (lista de pontos de vacinação, sem data), sem data ([rio.rj.gov.br](https://www.rio.rj.gov.br/documents/73801/b073a96d-c964-4501-87a4-3ce5abf75da0))
   - Endereço: Rua São Francisco, 5 (Babilônia), Leme, Rio de Janeiro - RJ
   - Telefone e horário: Confirmar na Central 1746 ou no CNES

5. **UPA 24h Manguinhos** (Manguinhos)
   - Fonte: Lista de serviços da Secretaria de Estado de Saúde do RJ, sem data ([riocomsaude.rj.gov.br](http://www.riocomsaude.rj.gov.br/Publico/MostrarArquivo.aspx?C=MJ5XqDR4hFY%3D))
   - Endereço: Av. Dom Hélder Câmara, 1390, Manguinhos, Rio de Janeiro - RJ
   - Horário: Funciona 24 horas (característica do tipo de unidade)
   - Telefone: Confirmar na Central 1746

6. **Clínica da Família Vila do João** (Complexo da Maré)
   - Fonte: Lista de unidades de referência de vacinação da SMS-Rio (09/10/2025), 2025 ([saude.prefeitura.rio](https://saude.prefeitura.rio/wp-content/uploads/sites/47/2025/10/CONCENTRADORAS-PFIZER-BABY-09.10.2025.pdf))
   - Endereço: Rua 17, s/nº, Vila do João, Maré, Rio de Janeiro - RJ
   - Telefone e horário: Confirmar na Central 1746 ou no CNES

7. **Centro Municipal de Saúde Hamilton Land** (Cidade de Deus)
   - Fonte: Lista de unidades de referência de vacinação da SMS-Rio (09/10/2025), 2025 ([saude.prefeitura.rio](https://saude.prefeitura.rio/wp-content/uploads/sites/47/2025/10/CONCENTRADORAS-PFIZER-BABY-09.10.2025.pdf))
   - Endereço: Av. Edgar Werneck, 1601, Cidade de Deus, Rio de Janeiro - RJ
   - Telefone e horário: Confirmar na Central 1746 ou no CNES

### C) Unidades com Dados a Confirmar (`a_confirmar`)
*(Endereço, telefone e horário sem fonte oficial localizada até o momento; pendentes de confirmação no CNES em [cnes.saude.gov.br](https://cnes.saude.gov.br/) ou pela Central 1746 da Prefeitura do Rio):*

1. **UPA 24h Rocinha** (São Conrado)
   - Fonte: Fonte não encontrada (dados pendentes de localização cadastral no CNES / Central 1746)
   - Endereço: Confirmar no CNES (cnes.saude.gov.br) ou na Central 1746
   - Telefone: Confirmar na Central 1746
   - Horário: Funciona 24 horas (característica do tipo de unidade)

---

## 5. Privacidade e LGPD
- Sem cookies de rastreamento comercial ou anúncios.
- Zero transmissão de dados pessoais a servidores próprios.
- Botão no app para apagar todos os dados armazenados no navegador a qualquer momento.
