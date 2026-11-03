# SaúdeFavela-Lite

**SaúdeFavela-Lite** é uma Progressive Web App (PWA) de baixo consumo de dados, acessível e inclusiva, voltada para orientação sobre os serviços da Atenção Primária à Saúde (APS) no Sistema Único de Saúde (SUS) no município do Rio de Janeiro.

O projeto atua como camada intermediária pedagógica e informativa entre o cidadão e a rede de saúde, sem substituir sistemas oficiais de regulação governamentais ou configurar atendimento médico direto.

---

## 1. O que o app é
- Um guia digital informativo com catálogo territorial de unidades de saúde (Clínicas da Família, CMS e UPAs 24h).
- Um repositório de orientações sobre direitos sanitários (acolhimento com classificação de risco, vacinação, dispensação de medicamentos, pré-natal e urgências).
- Uma ferramenta demonstrativa de simulação de solicitação de agendamento em 6 etapas para treino e familiarização de usuários com baixo letramento digital.
- Um painel de diagnóstico e auditoria técnica para pesquisadores de saúde coletiva e inclusão digital.

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
- **Geolocalização por Rede:** Se o aparelho não possuir GPS dedicado e depender de triangulação de antenas celulares ou Wi-Fi via rede, a ordenação automática por proximidade pode ficar indisponível offline.
- **Atualização de Versão:** Novas versões do aplicativo e atualizações do Service Worker exigem conexão para detecção e download do novo cache.

---

## 4. Situação dos Dados das Unidades (Auditoria Cadastral)

Nenhum dado é apresentado como verificado sem fonte e data visíveis.

### A) Unidades com Fonte Oficial Datada
*(Fonte: Lista de unidades da SMS-Rio, 2021, [saude.prefeitura.rio](https://saude.prefeitura.rio). Recomenda-se confirmar por telefone antes de comparecer):*
1. **Clínica da Família Rinaldo De Lamare** (Rocinha / São Conrado)
   - Endereço: Av. Niemeyer, 776, São Conrado, Rio de Janeiro - RJ
   - Telefone: (21) 3324-2454 / (21) 3324-2487
   - Horário: Segunda a sexta das 07:00 às 18:00
2. **Clínica da Família Maria do Socorro Silva e Souza** (Rocinha)
   - Endereço: Estrada da Gávea, 445, Rocinha, Rio de Janeiro - RJ
   - Telefone: (21) 3322-7395 / (21) 3322-6694
   - Horário: Segunda a sexta das 07:00 às 18:00
3. **Clínica da Família Santa Marta** (Botafogo / Santa Marta)
   - Endereço: Rua São Clemente, 312, Botafogo, Rio de Janeiro - RJ
   - Telefone: (21) 2286-2374
   - Horário: Segunda a sexta das 07:00 às 17:00
4. **Clínica da Família Pavão-Pavãozinho e Cantagalo** (Copacabana)
   - Endereço: Ladeira Saint Roman, 172, Copacabana, Rio de Janeiro - RJ
   - Telefone: (21) 2523-4127 / (21) 2513-1549
   - Horário: Segunda a sexta das 07:00 às 18:00

### B) Unidades com Dados a Confirmar
*(Endereço, telefone e horário pendentes de confirmação no CNES em [cnes.saude.gov.br](https://cnes.saude.gov.br/) ou pela Central 1746 da Prefeitura do Rio):*
1. **Clínica da Família Zilda Arns** (Complexo do Alemão)
2. **Clínica da Família Herbert de Souza (Betinho)** (Complexo da Maré)
3. **Clínica da Família Victor Valla** (Manguinhos)
4. **Clínica da Família Amélia dos Santos Ferreira** (Cidade de Deus)
5. **Centro Municipal de Saúde Babilônia e Chapéu Mangueira** (Leme)
6. **UPA 24h Manguinhos** (Manguinhos) — Horário: *Funciona 24 horas* (característica do tipo de unidade)
7. **UPA 24h Rocinha** (São Conrado) — Horário: *Funciona 24 horas* (característica do tipo de unidade)

---

## 5. Privacidade e LGPD
- Sem cookies de rastreamento comercial ou anúncios.
- Zero transmissão de dados pessoais a servidores próprios.
- Botão no app para apagar todos os dados armazenados no navegador a qualquer momento.
