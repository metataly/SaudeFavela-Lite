<div align="center">

# SaúdeFavela-Lite

**Informação de saúde que cabe no celular, funciona com pouca internet e fala a língua de quem mais precisa dela.**

![PWA](https://img.shields.io/badge/PWA-instalável-5A0FC8)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-build-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-tipado-3178C6?logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/status-MVP-orange)

*Arquitetura PWA e acessibilidade assistiva para enfrentar o apartheid digital na Atenção Primária à Saúde no Rio de Janeiro.*

</div>

---

## O problema

Quem mora em favela e comunidade no Rio costuma enfrentar três barreiras ao mesmo tempo ao tentar usar o SUS: **não saber o que é seu direito** (por exemplo, o que fazer sem comprovante de residência), **não saber para onde ir** e **não ter internet estável, plano de dados ou familiaridade com aplicativos complexos**. O resultado é gente deixando de buscar atendimento por falta de informação, não por falta de serviço.

## A ideia

O SaúdeFavela-Lite é um **aplicativo web leve (PWA)** que reúne, em português simples:

- orientações sobre direitos e acesso ao SUS;
- um catálogo de unidades de Atenção Primária e UPAs, com a fonte de cada informação à vista;
- recursos de acessibilidade, como leitura em voz alta e busca por voz.

Ele **não faz diagnóstico, não substitui profissional de saúde e não usa inteligência artificial generativa**. Em emergência, ligue **192 (SAMU)** ou **193 (Bombeiros)**.

## O que o MVP já faz

| Recurso | Descrição |
|---|---|
| **Guias de direitos e acesso** | Textos curtos sobre situações do dia a dia (acolhimento sem comprovante, pré-natal, vacinação, medicamentos, urgência), com a base legal citada. |
| **Catálogo de unidades** | Busca por comunidade ou nome. Cada unidade mostra de onde veio a informação e quando, e o que ainda precisa ser confirmado por telefone. |
| **Leitura em voz alta** | Botões "Ouvir" e "Parar" usando a síntese de voz do navegador, para quem tem dificuldade de leitura. |
| **Busca por voz** | Ditar a busca em vez de digitar (depende do navegador; veja a seção de privacidade). |
| **Simulação de agendamento** | Treino do passo a passo de uma consulta, **sem marcar nada de verdade**. |
| **Instalável e com cache** | Pode ser instalado na tela inicial. Depois da primeira visita, os arquivos do app ficam salvos no aparelho. |

> **O que "offline" quer dizer aqui:** os arquivos do app ficam salvos no celular depois da primeira visita. Recursos que dependem de internet, como a busca por voz em alguns navegadores, não funcionam sem conexão.

## Dados: o que é confirmado e o que não é

Saúde pública exige cuidado com informação. Por isso, **o app diz de onde veio cada dado** e não esconde o que não foi confirmado.

- Cada unidade tem um **status de confiança**: com fonte oficial datada, com endereço sustentado por fonte, ou a confirmar.
- O que não tem fonte aparece como **"Confirmar no CNES ou na Central 1746"**. O app não inventa telefone nem horário.
- Fontes oficiais às vezes divergem entre si. Quando isso acontece, o app mostra o aviso em vez de escolher um dos valores em silêncio.
- O texto dos guias é **revisado pela equipe e não substitui orientação profissional**. Antes de uso real, as orientações devem passar por validação de profissional de saúde.

**Onde confirmar:** [CNES](https://cnes.saude.gov.br) e Central 1746 da Prefeitura do Rio.

**Última revisão dos dados:** `12/11/2026`

## Privacidade

- Não há servidor próprio, cadastro, login, rastreadores nem anúncios.
- Preferências e histórico ficam **no próprio aparelho** (armazenamento local do navegador).
- A **busca por voz usa o reconhecimento de fala do navegador**. Dependendo do navegador, o áudio pode ser processado pelo fabricante. A busca por texto funciona sem isso.

## Tecnologias

React 19 · TypeScript · Vite · Tailwind CSS 4 · `vite-plugin-pwa` (Service Worker e manifesto) · Web Speech API (voz)

## Como rodar

Pré-requisito: Node.js instalado.

```bash
# instalar dependências
npm install

# modo desenvolvimento
npm run dev

# gerar a versão de produção
npm run build

# testar a versão gerada (necessário para validar o PWA e o cache)
npx vite preview
```

Para testar o modo offline: abra a versão gerada, navegue pelo app, ative o modo avião e recarregue a página.

## Estrutura do projeto

```
src/
├── components/   # barra de áudio, avisos de privacidade e acessibilidade, banner offline
├── data/         # unidades de saúde e tópicos de orientação (com fontes)
├── services/     # voz, armazenamento local, desempenho, testes internos
├── views/        # telas: início, unidades, orientações, simulação, diagnóstico
└── types/        # tipos TypeScript
```

## Limitações conhecidas

- Catálogo **parcial**: nem todas as unidades têm endereço e telefone confirmados em fonte atual.
- Parte dos contatos vem de listas oficiais **datadas**; confirme por telefone antes de ir.
- Os testes internos verificam regras do app e a ausência de textos já corrigidos. **Não provam que o conteúdo de saúde está correto.**
- O consumo de dados e o desempenho em redes lentas **ainda não foram medidos** em campo.
- Ícone do PWA no formato maskable precisa de revisão.

## Roadmap

**Agora (MVP)**
- [x] Guias de direitos com base legal
- [x] Catálogo de unidades com status de fonte
- [x] Leitura em voz alta e busca por voz
- [x] PWA instalável com cache dos arquivos do app

**Próximos passos**
- [ ] Completar e confirmar os dados das unidades (CNES e SMS-Rio)
- [ ] Revisão do conteúdo por profissional de saúde
- [ ] Medição de consumo de dados e desempenho com Lighthouse e teste em campo
- [ ] Teste de usabilidade com moradores e agentes comunitários de saúde
- [ ] Teste de acessibilidade com leitor de tela (TalkBack)
- [ ] Ampliar o catálogo para outras comunidades

## Equipe

| Nome | Função | Contato |
|---|---|---|
| `Nathaly Pereira Ferreira` | `Desenvolvimento, pesquisa, testes` | `@metataly` |
| `Luís Davi da Silveira Moutinho` | `Desenvolvimento, pesquisa, testes` | `[PREENCHER]` |
| `Sérgio Carlesso Filho` | `Desenvolvimento, pesquisa, testes` | `@sergiocarlesso` |

**Orientação / instituição:** `Ricardo Marciano, FAETERJ-RIO`


## Licença

O conteúdo de orientação e os dados de unidades têm origem em fontes públicas, citadas no próprio app.

---

<div align="center">

*Feito para que informação de saúde chegue a quem mais precisa dela.*

</div>
