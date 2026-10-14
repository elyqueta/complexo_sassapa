# PROMPT PARA KILO CODE — UI DO WEBSITE DO COMPLEXO ESCOLAR PRIVADO SASSAPA

> Cola este ficheiro inteiro no Kilo Code (modo **Architect** para a Fase 0, depois **Code** para as restantes).
> Anexa também ao Kilo: as 6 capturas de ecrã e o vídeo de referência. Este documento descreve-os em texto para que nada dependa só da imagem.

---

## 0. PAPEL E REGRAS GERAIS

És um engenheiro frontend sénior com sensibilidade de designer. Vais implementar a **primeira versão completa da UI** do website institucional do Complexo Escolar Privado Sassapa.

**Referência**: o site de uma universidade norte-americana fictícia ("Pergamum University"). Dela reproduzimos **estrutura, ritmo, hierarquia, tipografia e fluidez de animação**. **Não** copiamos logo, nome, textos, fotografias nem ilustrações. Tudo o que for conteúdo é do Sassapa (ou placeholder claramente marcado).

**Diferença obrigatória face à referência**: a referência é *dark mode*. O Sassapa será **modo claro, fundo branco**. Toda a paleta é reinterpretada (secção 2).

**Regras inegociáveis**
1. **Audita antes de escrever código** (Fase 0). Reutiliza componentes, estilos, rotas e convenções existentes. Não reescrevas o que já funciona.
2. **Sem bibliotecas pesadas**: nada de GSAP, Framer Motion, Lottie, AOS, fullPage.js, jQuery. Animações com **CSS + IntersectionObserver + Web Animations API**. Única dependência nova permitida: **Leaflet** (mapa, página Contactos). Qualquer outra → pára e pergunta.
3. Animar **apenas `transform` e `opacity`**. Nunca animar `width`, `height`, `top`, `left`, `margin`, `box-shadow` pesado ou `filter` em elementos grandes.
4. **`prefers-reduced-motion: reduce` é obrigatório** (secção 5.9).
5. **Mobile-first**. Cada ecrã testado em 360, 390, 768, 1024, 1280 e 1536 px. Zero scroll horizontal indesejado (excepto faixas com `scroll-snap` intencionais).
6. Nada de depender de `:hover` para revelar informação. Hover é só *melhoria* (`@media (hover: hover)`).
7. **Não inventes âmbito**: sem newsletter, sem app móvel, sem pagamentos online, sem chatbot. Estes aparecem na referência mas **não fazem parte do projecto**.
8. **Dados**: a UI consome uma camada de dados tipada (interfaces + serviço/mock em JSON). Quando a API do backoffice existir, troca-se só a implementação do serviço. **Não toques no backend.**
9. Textos em **português de Angola/Portugal** (pt-PT). Acessibilidade: contraste AA, foco visível, `alt` em imagens, HTML semântico, navegação por teclado.
10. Código limpo, componentes pequenos, sem duplicação, comentários só onde o "porquê" não é óbvio.

---

## 1. FASE 0 — AUDITORIA (só leitura, sem alterar ficheiros)

Antes de qualquer alteração, produz um relatório curto com:
- Framework, versão, gestor de rotas, sistema de estilos (CSS/SCSS/Tailwind), SSR sim/não.
- Estrutura de pastas, componentes partilhados existentes, tokens/variáveis já definidos.
- Páginas/rotas que já existem vs. as 7 necessárias (secção 3).
- O que vais **reutilizar**, **refactorar** e **criar de raiz**.
- Plano de implementação por fases com ficheiros afectados.

Só depois de apresentar este relatório avanças para a Fase 1.

> Se o projecto for Angular: componentes *standalone*, `ChangeDetectionStrategy.OnPush`, signals, lazy loading por rota, directiva `appReveal` para as animações, `@defer` para secções abaixo da dobra, SSR-safe (qualquer uso de `window`/`IntersectionObserver` protegido por `isPlatformBrowser`).

---

## 2. DESIGN SYSTEM (versão clara)

### 2.1 Leitura da referência
- Fundo escuro, **tipografia serif forte** nos títulos, **sans-serif pequena** no corpo.
- Navegação superior com 4 itens em **versaletes/capitalização pequena e negrito**, logo à esquerda, ícones de pesquisa e menu à direita.
- **Cor de acento laranja** (logo, aspas decorativas, linha de destaque, ponto activo, rota no mapa).
- **Verde-esmeralda** em blocos sólidos (barra de eventos, painel de estatísticas, rodapé "More…").
- **Botão creme/pêssego** para acções primárias dentro de cartões.
- **Padrão topográfico** (curvas de nível) em linhas finas no fundo, nas margens.
- **Rótulos verticais rodados** nas margens ("NEWS", "EVENTS", "TRENDING", "LATEST", "QUICK LINKS", "SOCIAL MEDIA").
- **Navegação lateral direita por pontos** (dots) + botão circular branco com ícone da secção activa.
- **Cartões flutuantes** que se sobrepõem a secções vizinhas.
- Marcadores de categoria em serif com apóstrofo ("Sch'", "Ath'", "Mus'") sobre as imagens/títulos.
- Layouts de ecrã dividido em 3 colunas (painel / conteúdo / estatísticas).
- Mapa com rota laranja, lista de pontos de interesse à esquerda, cartão de detalhe em baixo à direita.

### 2.2 Tokens (CSS custom properties, num único ficheiro de tokens)

```css
:root {
  /* Superfícies */
  --bg:            #FFFFFF;   /* fundo do site */
  --bg-soft:       #F7F5F2;   /* secções alternadas, cartões neutros */
  --bg-tint:       #FFF1E8;   /* tom pêssego (botões/realces) */
  --ink:           #141414;   /* texto principal */
  --ink-2:         #4A4A4A;   /* texto secundário */
  --ink-3:         #8A8A8A;   /* metadados, rótulos */
  --line:          #E7E3DE;   /* divisórias, bordas */

  /* Marca (substituir pelas cores do logo do Sassapa quando confirmadas) */
  --accent:        #F26B1D;   /* laranja */
  --accent-ink:    #FFFFFF;
  --brand:         #0B7A5F;   /* verde-esmeralda */
  --brand-ink:     #FFFFFF;
  --brand-deep:    #075845;

  /* Tipografia */
  --font-display: "Source Serif 4", "Playfair Display", Georgia, serif;
  --font-body:    "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;

  /* Escala fluida */
  --fs-hero:  clamp(2.25rem, 1.2rem + 4.6vw, 4.75rem);
  --fs-h1:    clamp(2rem, 1.2rem + 3vw, 3.5rem);
  --fs-h2:    clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem);
  --fs-h3:    clamp(1.125rem, 1rem + .6vw, 1.375rem);
  --fs-body:  clamp(.9375rem, .9rem + .2vw, 1.0625rem);
  --fs-small: .8125rem;
  --fs-label: .6875rem;       /* versaletes, rótulos verticais */

  /* Espaço (base 4px) */
  --s-1:.25rem; --s-2:.5rem; --s-3:.75rem; --s-4:1rem; --s-5:1.5rem;
  --s-6:2rem; --s-7:3rem; --s-8:4.5rem; --s-9:7rem;

  /* Forma e sombra */
  --r-sm:8px; --r-md:14px; --r-lg:22px; --r-pill:999px;
  --shadow-1: 0 1px 2px rgba(20,20,20,.06), 0 4px 12px rgba(20,20,20,.06);
  --shadow-2: 0 10px 30px rgba(20,20,20,.12);

  /* Movimento */
  --ease-out:    cubic-bezier(.22,.61,.36,1);
  --ease-inout:  cubic-bezier(.65,0,.35,1);
  --dur-fast:    180ms;
  --dur-base:    420ms;
  --dur-reveal:  700ms;
  --dur-page:    320ms;
  --stagger:     80ms;
  --reveal-dist: 24px;

  /* Layout */
  --container: 1240px;
  --gutter: clamp(1rem, 4vw, 2.5rem);
  --header-h: 72px;
}
```

### 2.3 Regras de tipografia
- Títulos (`h1`–`h3`, números de estatísticas): `--font-display`, peso 600–700, `letter-spacing: -0.01em`, `line-height: 1.1`.
- Navegação e rótulos: `--font-display`, **versaletes** (`font-variant-caps: all-small-caps` ou `text-transform: uppercase` com `font-size: var(--fs-label)`), peso 700, `letter-spacing: .06em`.
- Corpo: `--font-body`, `line-height: 1.6`, máximo ~68 caracteres por linha.
- Fontes servidas com `font-display: swap`, pré-carregar apenas a fonte do título (WOFF2, subset latino).

### 2.4 Elementos assinatura (implementar como componentes reutilizáveis)

| Elemento | Descrição | Notas de implementação |
|---|---|---|
| **Padrão topográfico** | Curvas de nível em linhas finas `--line`, nas margens/cantos de secções | SVG inline único, `background-image` com `opacity:.5`, `pointer-events:none`. Não animar. |
| **Rótulo vertical** | Texto rodado 90° na margem (ex.: NOTÍCIAS, GALERIA, ATALHOS) | `writing-mode: vertical-rl; transform: rotate(180deg)`; esconder em < 768px. |
| **Aspas laranja** | "❝" decorativo antes de títulos de destaque | `aria-hidden`, cor `--accent`. |
| **Linha de destaque** | Barra laranja curta (48×3px) acima de blocos de notícias | Anima `transform: scaleX` de 0→1 ao entrar. |
| **Marcador de categoria** | Palavra curta + apóstrofo em serif ("Nov'", "Evt'", "Ped'") | Sobre o canto da imagem do cartão. |
| **Dot-nav lateral** | 4–6 pontos à direita, activo = botão circular branco com ícone | Só ≥ 1024px, `position: fixed`, `aria-label` por secção. |
| **Botão primário** | Pílula/rectângulo arredondado, `--bg-tint` com texto `--ink` e seta; variante sólida `--accent` | Hover: seta desloca 4px; `:active` scale .98. |
| **Botão ghost** | Contorno 1px `--ink`, texto versaletes, seta | Usado em "Ler mais". |
| **Cartão flutuante** | Cartão branco `--shadow-2` que sobrepõe a secção seguinte (margem negativa) | Revelação por baixo→cima. |
| **Bloco verde** | Painel `--brand` com texto branco (estatísticas, atalhos, rodapé) | Usar com moderação: 1–2 por página. |

---

## 3. PÁGINAS E SECÇÕES (conteúdo e layout)

Rotas: `/` Início · `/sobre` · `/educacao` (+ subpáginas por ciclo) · `/galeria` · `/noticias` · `/inscricoes` · `/contactos`.

### 3.1 Cabeçalho (global)
- Altura `--header-h`, fundo branco com `backdrop-filter` **apenas** quando sobreposto ao hero (ou fundo sólido branco; preferir sólido por desempenho). Borda inferior `--line` aparece após 8px de scroll.
- Esquerda: logo do Sassapa (placeholder SVG até haver o ficheiro real) + nome "Complexo Escolar Privado Sassapa" em 2 linhas (como "Pergamum / University").
- Centro: Início · Sobre · Educação · Galeria · Notícias · Contactos (versaletes). Item activo com linha laranja por baixo (anima `scaleX`).
- Direita: botão **"Inscrições"** (primário, laranja), seletor **PT | EN** (apenas UI nesta fase, estrutura i18n preparada), ícone de menu.
- **Esconde ao descer, mostra ao subir** (`transform: translateY(-100%)`), com `--ease-inout` 280ms.
- **Mobile (< 1024px)**: botão hambúrguer abre **menu em ecrã inteiro** (fundo branco) — itens grandes em serif entram em *stagger* (fade + translateY 16px), botão Inscrições e redes sociais no fundo. `aria-expanded`, foco preso (focus trap), `Esc` fecha, bloqueia scroll do body.

### 3.2 Início (`/`) — réplica adaptada das imagens 1, 2 e 3
Estrutura em ecrãs de `min-height: 100svh`:

1. **Hero** (imagens 1–2)
   - Duas colunas ≥ 1024px: texto à esquerda, fotografia grande à direita com cantos suaves e máscara/gradiente suave para o branco na margem esquerda da foto (equivalente ao *fade* escuro da referência).
   - Texto: aspas laranja, título em serif `--fs-hero` (ex.: "Educar com excelência, formar com valores."), subtítulo curto, botão ghost "Conhecer o colégio" e botão primário "Fazer inscrição".
   - Mobile: foto em cima (aspect-ratio 4/5, `object-fit: cover`), texto por baixo.
   - Foto: componente `<app-media>` com `aspect-ratio`, `loading="eager"` + `fetchpriority="high"` (é o LCP), `srcset/sizes`.
2. **Faixa de Notícias** (parte inferior do hero na referência)
   - Rótulo vertical "NOTÍCIAS" + contador "1/6". Linha laranja de destaque.
   - 4 notícias em linha ≥ 1024px (marcador de categoria `Ped'`, `Evt'`, `Com'`, `Aca'` + título serif + resumo 2 linhas + data). Em < 1024px: **carrossel horizontal com `scroll-snap-type: x mandatory`**, cartões de 80% da largura para sugerir continuação.
   - Dados: máximo 6 notícias estáticas.
3. **Barra/Cartão de "Agenda do colégio"** (verde, imagem 2)
   - Barra `--brand` com 2 eventos (avatar/miniatura, título, data/hora) e um **cartão flutuante central** que sobe para cima da barra com detalhe do evento + botão creme "Mais informação".
   - Seta ▲ expande/colapsa a barra (animação `transform` do cartão; sem animar altura — usar `grid-template-rows` apenas se inevitável, caso contrário `transform`).
   - Conteúdo vem do mesmo serviço de dados; se não houver eventos, a barra não é renderizada.
4. **Secção "Vídeo / Apresentação"** (imagem 3)
   - Fundo: foto larga com **véu branco→transparente** (versão clara do véu escuro). Título central em serif, botão circular de *play* (contorno, ícone laranja) que abre vídeo YouTube via **facade** (miniatura estática; o iframe só carrega ao clique).
   - Rótulo vertical "VÍDEO", ficha lateral esquerda (diretor/a, duração) apenas ≥ 1024px.
   - Faixa inferior: 3–4 **cartões de imagem com marcador de categoria** ("Gal'", "Edu'", "Act'") e título → ligam para Galeria/Educação. Cartão "ao vivo" da referência **não se aplica** (omitir).
5. **Atalhos / Estatísticas** (imagem 4, painel verde)
   - Bloco verde com 4 números grandes em serif ("Sabias que?"): alunos, professores, anos de actividade, classes. **Valores são placeholders marcados `TODO: confirmar com o colégio`**.
   - Contagem animada de 0→valor ao entrar (1200ms, `requestAnimationFrame`, `easeOutCubic`); com *reduced motion* mostra o valor final directamente.
6. **Rodapé "Mais…"** (imagem 5) — ver 3.9.

### 3.3 Sobre (`/sobre`)
- Hero compacto (50svh) com título "Sobre o Sassapa".
- Blocos alternados texto/imagem: **História**, **Missão**, **Visão**, **Valores** (valores em grelha de cartões 2×2 → 1 coluna em mobile).
- Linha do tempo vertical simples (marcos), cada marco revela-se ao scroll.
- Rótulo vertical "HISTÓRIA" na margem (desktop).

### 3.4 Educação (`/educacao` + subpáginas) — layout de 3 colunas da imagem 4
- Página principal: título + grelha de **cartões de ciclos** (Iniciação, Ensino Primário, 1.º Ciclo, 2.º Ciclo, Ensino Médio, etc. — **ler da camada de dados**, não fixar). Cada cartão: imagem, nome, resumo, "Ver ciclo →".
- **Subpágina de ciclo** (`/educacao/:ciclo`): layout em 3 colunas ≥ 1280px (equivalente à imagem 4):
  - **Esquerda**: índice/âncoras do ciclo (Visão geral, Classes, Cursos, Plano de férias, Actividades extracurriculares, Formações) com item activo destacado ao scroll (*scrollspy*).
  - **Centro** (fundo `--bg-soft`): título serif, descrição, responsável (avatar + nome + cargo), lista de links tipo "Visão geral / Classes / Cursos…", botão "Inscrever-me neste ciclo".
  - **Direita** (bloco verde): estatísticas do ciclo (nº de classes, turmas, alunos por turma…) com os mesmos números animados.
  - < 1280px: colapsa para 1 coluna, índice vira **barra de chips horizontais com scroll-snap** fixa sob o header.
- **Não implementar o chat** da imagem 4. A coluna esquerda é o índice.

### 3.5 Galeria (`/galeria`)
- Grelha de **álbuns** (cartões com capa, título, nº de itens). Clicar abre o álbum (e sub-álbuns como chips/segundo nível).
- Dentro do álbum: **masonry em CSS columns** ou grid com `aspect-ratio` fixo (evita *layout shift*), **carregamento gradual** (`IntersectionObserver` + botão "Carregar mais" ou scroll infinito de 24 em 24).
- Imagens: Cloudinary com transformações na URL (`f_auto,q_auto,c_fill,w_{n}`), `srcset` 320/640/960/1280, `loading="lazy"`, `decoding="async"`, *placeholder* de baixa qualidade/cor dominante (`blur-up`) com *fade* ao carregar.
- Vídeos: **facade do YouTube** (miniatura + ícone play; iframe criado só ao clicar, `youtube-nocookie.com`).
- **Lightbox** acessível: teclado (←/→/Esc), *swipe* em toque, pré-carrega apenas a imagem seguinte, animação de abertura com `transform: scale(.98)→1` + `opacity`.
- Preparar para milhares de itens: nunca renderizar tudo de uma vez; limitar nós de DOM.

### 3.6 Notícias (`/noticias`)
- Notícia em destaque (grande) + grelha dos restantes (máx. 6, conteúdo estático). Cartões com marcador de categoria, data, título, resumo.
- Página de detalhe opcional **apenas se já houver rota**; caso contrário, cartão expande para *modal/drawer* simples.

### 3.7 Inscrições (`/inscricoes`)
- Formulário em **passos** (stepper de 3): 1) Dados do candidato, 2) Encarregado de educação e contactos, 3) Documentos (BI em PDF + restantes) e revisão.
- Validação inline, mensagens claras em pt-PT, estados `loading/sucesso/erro`, *drag & drop* de ficheiros com lista e remoção, limite de tamanho/tipo (PDF ≤ 5 MB, indicado no UI).
- Barra de progresso do stepper anima com `transform: scaleX`.
- Ecrã final de sucesso: texto "Recebemos o teu pedido. Receberás a ficha de inscrição por email após validação." + nota "A confirmação pode também ser feita presencialmente na instituição."
- Submissão: chamar serviço (mock agora; API depois). Sem pagamentos.

### 3.8 Contactos (`/contactos`) — réplica adaptada da imagem 6
- Ecrã de mapa quase inteiro (`min-height: 80svh`) com **Leaflet** e *tiles* claros (CARTO "Positron"/OSM claro). Padrão da referência: lista de categorias à esquerda, mapa ao centro, controlos à direita, cartão de detalhe em baixo.
- Adaptação:
  - Esquerda (desktop): título "Como chegar" e modos de transporte (Carro / A pé / Táxi) como lista vertical; activo em serif grande com contagem.
  - Mapa: marcador do colégio (pino laranja, **coordenadas numa constante `SCHOOL_COORDS` com TODO**), botão circular **"Usar a minha localização"** (laranja, canto direito) → `navigator.geolocation` → traça **rota laranja** até ao colégio (OSRM público; tratar erro/permissão negada com mensagem amigável e alternativa: abrir no Google Maps).
  - Controlos `+` / `−` personalizados e escala (como na referência).
  - Cartão em baixo à direita: nome, morada (**Avenida 21 de Janeiro, Bairro Gamek, Luanda** é do prestador — **não usar**; deixar `TODO: morada do colégio`), telefone, email, horário, botão creme "Abrir direcções".
  - Distância e duração estimadas aparecem no cartão após traçar a rota.
- Mobile: mapa em cima (60svh), lista de modos em chips, cartão em *bottom sheet*.
- Mais abaixo: formulário/contactos directos e redes sociais.
- Carregar Leaflet **só nesta rota** (lazy) e o mapa só quando visível.

### 3.9 Rodapé "Mais…" (global) — adaptado da imagem 5
- Fundo `--bg-soft` com padrão topográfico. Título "Mais…" + frase curta.
- Colunas: **Atalhos** (Educação, Inscrições, Galeria, Notícias, Contactos, Sobre) · **Redes sociais** (Facebook, WhatsApp, Instagram, YouTube, TikTok — rótulos verticais/itens com apóstrofo `Fb'`, `Ig'`, `Yt'`, `Tk'`, `Wa'` como na referência, links `TODO` até haver URLs) · **Contacto**.
- Ilustração: **fachada do colégio em desenho de linhas** (SVG) à direita, equivalente ao templo grego (usar placeholder SVG simples de edifício; marcar `TODO: ilustração da fachada`).
- Faixa inferior verde com botão "Inscrições" e contactos. **Omitir newsletter e app móvel.**
- Linha final: © ano Complexo Escolar Privado Sassapa · Política de privacidade · Termos.

---

## 4. COMPONENTES PARTILHADOS A CRIAR / REUTILIZAR

`SiteHeader`, `MobileMenu`, `SiteFooter`, `Container`, `Section` (com `id`, rótulo vertical, modo `fullscreen`), `SectionDots` (dot-nav), `VerticalLabel`, `TopoPattern`, `Button` (variantes: primary, ghost, tint, icon-circle), `CategoryTag`, `NewsCard`, `NewsStrip` (carrossel snap), `EventBar`, `FloatingCard`, `StatBlock` + `CountUp`, `MediaImage` (Cloudinary + blur-up), `YoutubeFacade`, `Lightbox`, `AlbumCard`, `CycleCard`, `StepForm`, `FileDropzone`, `SchoolMap`, `Reveal` (directiva/hook), `ThemeTokens`.

Cada componente: props tipadas, estados vazio/loading/erro, acessível, sem estilos inline soltos.

---

## 5. MOVIMENTO E ANIMAÇÕES (secção crítica)

Objectivo: **fluidez, elegância e continuidade** — nada brusco, nada exagerado, nada lento.

### 5.1 Princípios
- Movimento **discreto**: deslocamentos de 16–32px, nunca mais.
- **Mesmo ritmo em todo o site**: usar apenas os tokens `--dur-*`, `--ease-*`, `--stagger`.
- Entrada: elemento sobe/desliza e aparece. Saída: **só em transições de rota e menus** (não reverter reveals ao fazer scroll para cima; revelar **uma única vez**).
- Nada anima antes de entrar no viewport.

### 5.2 Sistema de *reveal* (um só mecanismo para todo o site)
Atributos/classes declarativos, p.ex. `data-reveal="up|down|left|right|fade|scale"`, `data-reveal-delay`, `data-reveal-stagger` (aplicado ao contentor para filhos).

```css
[data-reveal] {
  opacity: 0;
  transition: opacity var(--dur-reveal) var(--ease-out),
              transform var(--dur-reveal) var(--ease-out);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform;
}
[data-reveal="up"]    { transform: translate3d(0, var(--reveal-dist), 0); }
[data-reveal="down"]  { transform: translate3d(0, calc(var(--reveal-dist) * -1), 0); }
[data-reveal="left"]  { transform: translate3d(calc(var(--reveal-dist) * -1), 0, 0); }
[data-reveal="right"] { transform: translate3d(var(--reveal-dist), 0, 0); }
[data-reveal="scale"] { transform: scale(.97); }
[data-reveal].is-in   { opacity: 1; transform: none; will-change: auto; }
```

- **Um único `IntersectionObserver`** partilhado (`threshold: 0.15`, `rootMargin: "0px 0px -8% 0px"`), `unobserve` após revelar.
- *Stagger*: filhos recebem `--reveal-delay: calc(var(--i) * var(--stagger))` (máx. 8 filhos escalonados; acima disso, delay constante).
- Remover `will-change` depois da animação.
- SSR: sem JS, o conteúdo **tem de estar visível** (`<noscript>` ou classe `js` no `<html>` que ativa o estado inicial oculto).

### 5.3 Animações específicas
| Onde | Efeito | Parâmetros |
|---|---|---|
| Hero – texto | Linhas do título sobem em *stagger* (máscara `overflow:hidden` por linha) | 700ms, 80ms entre linhas |
| Hero – foto | Entra com `scale(1.04)→1` + fade; **parallax subtil** só ≥ 1024px (translateY máx. ±24px com `rAF`, passivo) | 900ms |
| Linha de destaque | `scaleX(0→1)`, `transform-origin: left` | 600ms |
| Notícias/cartões | Fade + up, *stagger* | 700ms / 80ms |
| Faixa horizontal (snap) | Cartões entram da direita no 1.º reveal; depois só `scroll-snap` nativo | — |
| Cartão flutuante / barra de eventos | Sobe 32px + fade | 700ms |
| Estatísticas | `CountUp` + fade/up | 1200ms |
| Dot-nav | Ponto activo muda com `transform: scale` e preenchimento | 280ms |
| Cabeçalho | Esconde/mostra com `translateY` | 280ms |
| Menu mobile | Painel `opacity` + `translateY(-8px)`; itens em *stagger* | 320ms + 60ms |
| **Transição de rota** | *Cross-fade* + `translateY(8px)`; usar **View Transitions API** (`document.startViewTransition`) com *fallback* para fade CSS | 320ms (`--dur-page`) |
| Galeria – imagem | *Blur-up* → nítida (`opacity`) | 400ms |
| Lightbox | `scale(.98→1)` + fade; setas deslizam 24px | 280ms |
| Mapa – rota | Linha laranja desenha-se com `stroke-dashoffset` | 900ms |
| Stepper (inscrições) | Passo actual entra da direita; anterior sai para a esquerda | 320ms |

### 5.4 Transições entre secções (fluidez contínua)
- Sem cortes secos: secções contíguas **sobrepõem-se ligeiramente** (cartões flutuantes com margem negativa, véus em gradiente entre fundos).
- Na Home, em ≥ 1024px: `scroll-snap-type: y proximity` (**nunca `mandatory`**) nas secções de ecrã inteiro. Em mobile, **sem snap vertical**.
- **Dot-nav** sincronizada por `IntersectionObserver` (secção com maior área visível). Clique faz `scrollIntoView({ behavior: 'smooth' })` (instantâneo se *reduced motion*).

### 5.5 Hover/foco/toque
- Cartões: `translateY(-4px)` + sombra mais forte (usar pseudo-elemento com `opacity` para a sombra em vez de animar `box-shadow`); imagem interna `scale(1.04)` com `overflow:hidden` no contentor.
- Botões: seta desloca 4px; `:active` scale(.98).
- Links de navegação: linha laranja `scaleX`.
- **Tudo dentro de `@media (hover: hover) and (pointer: fine)`**. Em toque: feedback `:active` (scale .98, 120ms) e a informação principal **já visível** (nada escondido atrás de hover).
- Foco por teclado: `outline: 2px solid var(--accent); outline-offset: 3px` — nunca remover.

### 5.6 Desempenho de movimento
- `transform`/`opacity` apenas; `translate3d` para promover camada; `will-change` só durante a animação.
- Listeners de scroll **passivos** e agrupados em `requestAnimationFrame`; preferir `IntersectionObserver` a eventos de scroll.
- Sem animações em loop infinito (excepto indicador de loading mínimo). Pausar o que estiver fora do viewport.
- Orçamento: nenhuma animação > 1200ms; nenhuma tarefa JS > 50ms durante scroll.

### 5.7 Mobile e tablet
- Mesmo vocabulário, **distâncias menores** (`--reveal-dist: 16px` < 768px).
- Parallax desligado em toque.
- Carrosséis com *swipe* nativo (`scroll-snap`), indicadores de posição (1/6) actualizados por scroll.
- Menu em ecrã inteiro com alvos de toque ≥ 44×44px.

### 5.8 Estados de carregamento
- *Skeletons* neutros (`--bg-soft`) com shimmer **leve em `transform`** (ou sem shimmer) para listas/galeria; reservar espaço (`aspect-ratio`) para **CLS ≈ 0**.

### 5.9 Reduced motion (obrigatório)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
  [data-reveal] { opacity: 1; transform: none; }
}
```
Além disso: `CountUp` mostra o valor final; parallax e View Transitions desligados; carrosséis mantêm snap nativo.

---

## 6. RESPONSIVIDADE (contrato)

Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.

| Largura | Comportamento |
|---|---|
| **< 640** (telemóvel) | 1 coluna; menu em ecrã inteiro; hero com foto em cima; carrosséis snap; cartões empilhados; rótulos verticais e dot-nav **ocultos**; mapa com bottom sheet; botões em largura total quando for acção principal. |
| **640–1023** (tablet) | Grelhas de 2 colunas; hero em 1 coluna com foto maior; carrosséis com 2 cartões visíveis; menu ainda em ecrã inteiro. |
| **≥ 1024** (desktop) | Navegação completa, dot-nav, rótulos verticais, hero em 2 colunas, layout de 3 colunas em Educação (≥ 1280), parallax subtil. |

Verificações: sem scroll horizontal, sem texto cortado, sem sobreposições indevidas, imagens nunca deformadas (`object-fit`), tipografia legível (mín. 15px corpo no mobile), áreas de toque ≥ 44px, `100svh` em vez de `100vh` (barras do browser móvel), *safe-area insets* respeitados.

---

## 7. DESEMPENHO, SEO E ACESSIBILIDADE (UI)

- **Metas Lighthouse (mobile)**: Performance ≥ 90, Acessibilidade ≥ 95, Boas práticas ≥ 95, SEO ≥ 95. LCP < 2,5 s, CLS < 0,05, INP < 200 ms.
- Imagens: formatos modernos (`f_auto`), `srcset/sizes` correctos, `width/height` ou `aspect-ratio` sempre definidos, só a imagem do hero com `fetchpriority="high"`.
- JS: *code splitting* por rota; Leaflet e Lightbox carregados sob demanda; nada de bibliotecas de animação.
- CSS: tokens + utilitários; evitar CSS morto.
- HTML semântico: `header/nav/main/section/footer`, um só `h1` por página, ordem de `h2/h3` correcta, *skip link* "Saltar para o conteúdo".
- Metadados por página (`title`, `description`, Open Graph) já com *hooks* para a fase de SEO; `lang="pt"` e preparação de `hreflang` para EN.
- `aria-live` em estados de formulário/mapa; `aria-current="page"` no menu; `alt` descritivo (ou `alt=""` se decorativa).

---

## 8. DADOS (camada tipada, mock agora)

Criar interfaces e um serviço por domínio, com **dados de exemplo realistas em pt-PT** (claramente marcados como exemplo):

```ts
interface Noticia  { id:string; titulo:string; resumo:string; data:string; categoria:string; imagem:string }
interface Evento   { id:string; titulo:string; dataHora:string; local?:string; imagem?:string }
interface Ciclo    { slug:string; nome:string; resumo:string; imagem:string; responsavel?:{nome:string; cargo:string; foto?:string}; classes:string[]; cursos:string[]; planoFerias?:string; extracurriculares:string[]; formacoes:string[]; stats?:{label:string; valor:number}[] }
interface Album    { id:string; titulo:string; capa:string; itens:number; subAlbuns?:Album[] }
interface MidiaItem{ id:string; tipo:'imagem'|'video'; url:string; titulo?:string; ordem:number }
interface Inscricao{ candidato:{...}; encarregado:{...}; documentos:File[] }
```
Os serviços devolvem `Promise`/`Observable` para que a troca pela API real seja transparente.

---

## 9. ORDEM DE EXECUÇÃO (fases)

1. **Fase 0** — Auditoria e plano (sem alterações). *Pára e mostra o relatório.*
2. **Fase 1** — Tokens, tipografia, reset, utilitários, sistema `Reveal`, regras de reduced motion.
3. **Fase 2** — Componentes partilhados: Header + MobileMenu, Footer, Button, CategoryTag, Section/VerticalLabel/TopoPattern, MediaImage.
4. **Fase 3** — **Início** completo (todas as 6 secções) + dot-nav + CountUp. Validar em mobile/tablet/desktop **antes de avançar**.
5. **Fase 4** — Sobre, Educação (+ subpáginas), Notícias.
6. **Fase 5** — Galeria (álbuns, masonry, lightbox, facade YouTube), Inscrições (stepper + dropzone), Contactos (mapa + rota).
7. **Fase 6** — Transições de rota, afinação de ritmo/consistência, passagem de acessibilidade e desempenho.
8. **Fase 7** — QA final (checklist abaixo) e resumo do que ficou como `TODO`.

Entrega cada fase com um resumo curto (o que mudou, ficheiros, o que testar).

---

## 10. CRITÉRIO DE ACEITAÇÃO (checklist final)

- [ ] Fundo branco; paleta clara coerente; nenhum resquício de dark mode.
- [ ] Identidade visual da referência traduzida (serif + versaletes, laranja/verde, padrão topográfico, rótulos verticais, dot-nav, cartões flutuantes) **sem copiar** logo/texto/imagens.
- [ ] As 7 páginas + subpáginas de Educação implementadas com a **mesma qualidade**, não só a Home.
- [ ] Animações suaves e consistentes (mesmos tokens), só `transform`/`opacity`, sem cortes bruscos nem exageros.
- [ ] Tudo funciona **por toque**, sem depender de hover.
- [ ] `prefers-reduced-motion` respeitado em todo o lado.
- [ ] Sem scroll horizontal indesejado, sem elementos cortados ou sobrepostos, sem *layout shift* visível.
- [ ] Testado em 360, 390, 768, 1024, 1280, 1536 px e em Chrome, Safari (iOS) e Firefox.
- [ ] Lighthouse mobile dentro das metas (secção 7).
- [ ] Nenhuma biblioteca de animação; Leaflet só na rota Contactos.
- [ ] Sem funcionalidades fora do âmbito (newsletter, app, pagamentos, chatbot).
- [ ] Todos os placeholders listados num resumo final de `TODO` (logo, cores finais, textos, fotos, morada/coordenadas, redes sociais, estatísticas).

---

## 11. INSTRUÇÃO FINAL

Começa **apenas** pela Fase 0 e apresenta o relatório de auditoria e o plano. Aguarda confirmação antes de avançar. Quando executares, **reutiliza o que existe**, mantém consistência entre páginas e valida em móvel e desktop a cada fase. Se algo neste documento entrar em conflito com a estrutura existente do projecto, **explica o conflito e propõe a solução** em vez de improvisar.

# PROMPT PARA KILO CODE — UI DO WEBSITE DO COMPLEXO ESCOLAR PRIVADO SASSAPA (v2)

**Stack fixa: Angular + TypeScript + Tailwind CSS.** Sem ficheiros `.css`/`.scss` desnecessários, templates separados da lógica, cores trocáveis num único sítio, `.gitignore` rigoroso.

> Cola este ficheiro inteiro no Kilo Code (modo **Architect** para a Fase 0, depois **Code** para as restantes).
> Anexa também ao Kilo: as 6 capturas de ecrã e o vídeo de referência. Este documento descreve-os em texto para que nada dependa só da imagem.

---

## 0. PAPEL E REGRAS GERAIS

És um engenheiro frontend sénior com sensibilidade de designer. Vais implementar a **primeira versão completa da UI** do website institucional do Complexo Escolar Privado Sassapa.

**Referência**: o site de uma universidade norte-americana fictícia ("Pergamum University"). Dela reproduzimos **estrutura, ritmo, hierarquia, tipografia e fluidez de animação**. **Não** copiamos logo, nome, textos, fotografias nem ilustrações. Tudo o que for conteúdo é do Sassapa (ou placeholder claramente marcado).

**Diferença obrigatória face à referência**: a referência é *dark mode*. O Sassapa será **modo claro, fundo branco**. Toda a paleta é reinterpretada (secção 2).

**Regras inegociáveis**
1. **Audita antes de escrever código** (Fase 0). Reutiliza componentes, estilos, rotas e convenções existentes. Não reescrevas o que já funciona.
2. **Sem bibliotecas pesadas**: nada de GSAP, Framer Motion, Lottie, AOS, fullPage.js, jQuery. Animações com **utilitários Tailwind + IntersectionObserver** (Web Animations API só se estritamente necessário). Única dependência nova permitida: **Leaflet** (mapa, página Contactos). Qualquer outra → pára e pergunta.
3. Animar **apenas `transform` e `opacity`**. Nunca animar `width`, `height`, `top`, `left`, `margin`, `box-shadow` pesado ou `filter` em elementos grandes.
4. **`prefers-reduced-motion: reduce` é obrigatório** (secção 5.9).
5. **Mobile-first**. Cada ecrã testado em 360, 390, 768, 1024, 1280 e 1536 px. Zero scroll horizontal indesejado (excepto faixas com `scroll-snap` intencionais).
6. Nada de depender de `:hover` para revelar informação. Hover é só *melhoria* (`@media (hover: hover)`).
7. **Não inventes âmbito**: sem newsletter, sem app móvel, sem pagamentos online, sem chatbot. Estes aparecem na referência mas **não fazem parte do projecto**.
8. **Dados**: a UI consome uma camada de dados tipada (interfaces + serviço/mock em JSON). Quando a API do backoffice existir, troca-se só a implementação do serviço. **Não toques no backend.**
9. Textos em **português de Angola/Portugal** (pt-PT). Acessibilidade: contraste AA, foco visível, `alt` em imagens, HTML semântico, navegação por teclado.
10. Código limpo, componentes pequenos, sem duplicação, comentários só onde o "porquê" não é óbvio.

---

## 0B. STACK, FICHEIROS E GIT (OBRIGATÓRIO — prevalece sobre o resto do documento)

### Stack
- **Angular (versão já existente no projecto) + TypeScript estrito + Tailwind CSS.** Detecta a versão do Tailwind (v3 ou v4) e segue-a; não migres.
- Componentes **standalone**, `ChangeDetectionStrategy.OnPush`, signals, `inject()`, controlo de fluxo `@if/@for`, rotas com *lazy loading* (`loadComponent`), `@defer` abaixo da dobra, **SSR-safe** (qualquer uso de `window`, `document`, `IntersectionObserver`, `matchMedia`, `navigator` protegido com `isPlatformBrowser`).

### Zero CSS/SCSS desnecessário
- **Todo o estilo é feito com classes Tailwind nos templates `.html`.**
- Proibido: `.css`/`.scss` por componente, `styles: []`, `styleUrl(s)`, `<style>`, `style=""` inline (excepto valores dinâmicos via `[style.--var]`/`[style.width.%]` quando não houver utilitário), `@apply` para "criar classes" (se um padrão se repete, **cria um componente**).
- **Único ficheiro CSS permitido: `src/styles.css`**, e só com:
  1. a entrada do Tailwind (`@import "tailwindcss"` em v4, ou `@tailwind base/components/utilities` em v3);
  2. o bloco global de `prefers-reduced-motion` (secção 5.9);
  3. `html { scroll-behavior: smooth; scroll-padding-top: <altura do header> }` e `:focus-visible` base, se não existir utilitário equivalente.
  Qualquer outra adição exige justificação num comentário de uma linha.
- Fontes: `<link rel="preconnect">` + `<link href="...&display=swap">` no `index.html` (sem `@font-face` manual).
- Keyframes personalizados (ex.: desenhar a rota, shimmer) vão para o **tema do Tailwind** (`keyframes`/`animation`), não para CSS solto.
- **Nunca** montar classes por concatenação (`'bg-' + cor`): o Tailwind não as detecta. Usar sempre **strings literais completas** em mapas (`Record<Variant, string>`).

### Ficheiros separados (lógica ≠ template ≠ dados)
- Cada componente tem **`.ts` (lógica) + `.html` (template, via `templateUrl`)**. Proibido `template:` inline, excepto componentes triviais de 1–3 linhas (ex.: ícone SVG) — e mesmo assim, preferir `.html`.
- **Separar também**: interfaces/tipos em `models/*.ts`; constantes e configuração em `config/*.ts`; dados mock em `data/*.ts`; serviços em `services/*.ts`; mapas de classes Tailwind (variantes) em `*.constants.ts` ao lado do componente; utilitários puros em `utils/*.ts`. **Um conceito por ficheiro.**
- Segue a convenção de nomes **já usada no projecto** (`x.component.ts` ou `x.ts`). Nomes em `kebab-case`.
- Estrutura-alvo (adapta ao que já existe):

```
src/
  index.html
  styles.css                       # ÚNICO css (ver regras acima)
  app/
    app.config.ts
    app.routes.ts
    core/
      config/        site.config.ts        # SCHOOL_COORDS, redes sociais, itens de navegação, contactos
      models/        noticia.ts evento.ts ciclo.ts album.ts midia-item.ts inscricao.ts
      services/      noticias.service.ts ciclos.service.ts galeria.service.ts inscricoes.service.ts geo.service.ts
      data/          noticias.mock.ts ciclos.mock.ts galeria.mock.ts   # claramente "mock"
    layout/
      site-header/   site-header.ts  site-header.html
      mobile-menu/   ...
      site-footer/   ...
    shared/
      ui/            button/ category-tag/ news-card/ stat-block/ section/ vertical-label/ topo-pattern/ media-image/ youtube-facade/ ...
      directives/    reveal/ reveal.directive.ts  reveal.constants.ts  reveal.service.ts
      utils/         count-up.ts  cloudinary-url.ts
    pages/
      home/          home.page.ts home.page.html  sections/ hero/ news-strip/ event-bar/ video/ stats/
      sobre/ educacao/ galeria/ noticias/ inscricoes/ contactos/
  assets/            # só SVG/ícones pequenos; fotos reais vêm do Cloudinary
```

### Cores trocáveis num único sítio
- **Zero cores hexadecimais, `rgb()` ou valores arbitrários (`bg-[#...]`) em templates ou `.ts`.** Só nomes semânticos: `bg-surface`, `bg-surface-soft`, `text-ink`, `text-ink-2`, `border-line`, `bg-brand`, `text-brand-ink`, `bg-accent`, `text-accent`, etc.
- A paleta vive **só no tema do Tailwind** (secção 2.2). Trocar a identidade = editar esse bloco. Nenhum componente deve mudar.
- Verificação obrigatória no fim de cada fase: `grep -rnE "#[0-9a-fA-F]{3,8}|\[#|rgb\(" src/app` → **0 resultados** (excepto SVGs de assets, que devem usar `currentColor`; os SVG devem herdar cor via `text-*`/`fill-current`/`stroke-current`).

### Git e `.gitignore`
- O `.gitignore` está no ficheiro `.gitignore` entregue junto com este prompt. **Na Fase 1, o primeiro passo é colocá-lo na raiz do projecto** (fundir com o existente, sem remover regras úteis).
- Depois correr `git status` e confirmar que **não aparecem** `node_modules`, `dist`, `.angular`, `.env*`, vídeos/zip/PSD, pastas de ferramentas de IA nem material de referência. Se algo indevido já estiver *tracked*: `git rm -r --cached <caminho>` e informar.
- Commitar `package-lock.json`. Criar `.env.example` (sem segredos) se houver variáveis. Manter `.editorconfig` e Prettier (com `prettier-plugin-tailwindcss` se já fizer parte do projecto, para ordenar classes).
- **Nada pesado no repositório**: fotos reais e vídeos vêm do Cloudinary/YouTube; em `assets/` só SVG e placeholders leves (< 100 KB cada).
- Um commit por fase, mensagens no formato *conventional commits* (`feat(home): hero e faixa de notícias`).

---

## 1. FASE 0 — AUDITORIA (só leitura, sem alterar ficheiros)

Antes de qualquer alteração, produz um relatório curto com:
- Framework, versão, gestor de rotas, sistema de estilos (CSS/SCSS/Tailwind), SSR sim/não.
- Estrutura de pastas, componentes partilhados existentes, tokens/variáveis já definidos.
- Páginas/rotas que já existem vs. as 7 necessárias (secção 3).
- O que vais **reutilizar**, **refactorar** e **criar de raiz**.
- Plano de implementação por fases com ficheiros afectados.

Só depois de apresentar este relatório avanças para a Fase 1.

> O projecto é Angular + Tailwind: segue a secção 0B (stack, ficheiros separados, zero CSS desnecessário). Na auditoria, reporta também: versão do Tailwind, como está configurado o tema, se já existe `.gitignore` e o que ele ignora, e que ficheiros `.css/.scss` existem e porquê.

---

## 2. DESIGN SYSTEM (versão clara)

### 2.1 Leitura da referência
- Fundo escuro, **tipografia serif forte** nos títulos, **sans-serif pequena** no corpo.
- Navegação superior com 4 itens em **versaletes/capitalização pequena e negrito**, logo à esquerda, ícones de pesquisa e menu à direita.
- **Cor de acento laranja** (logo, aspas decorativas, linha de destaque, ponto activo, rota no mapa).
- **Verde-esmeralda** em blocos sólidos (barra de eventos, painel de estatísticas, rodapé "More…").
- **Botão creme/pêssego** para acções primárias dentro de cartões.
- **Padrão topográfico** (curvas de nível) em linhas finas no fundo, nas margens.
- **Rótulos verticais rodados** nas margens ("NEWS", "EVENTS", "TRENDING", "LATEST", "QUICK LINKS", "SOCIAL MEDIA").
- **Navegação lateral direita por pontos** (dots) + botão circular branco com ícone da secção activa.
- **Cartões flutuantes** que se sobrepõem a secções vizinhas.
- Marcadores de categoria em serif com apóstrofo ("Sch'", "Ath'", "Mus'") sobre as imagens/títulos.
- Layouts de ecrã dividido em 3 colunas (painel / conteúdo / estatísticas).
- Mapa com rota laranja, lista de pontos de interesse à esquerda, cartão de detalhe em baixo à direita.

### 2.2 Tokens — o tema do Tailwind é a única fonte de verdade

As cores **vão ser trocadas** (cores finais do Sassapa). Por isso: nomes **semânticos** (nunca `orange`/`green`), definidos **uma única vez** no tema. Os valores abaixo são os da referência, para arrancar.

**Tailwind v3 → `tailwind.config.ts`:**

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        surface: { DEFAULT: '#FFFFFF', soft: '#F7F5F2', tint: '#FFF1E8' },
        ink:     { DEFAULT: '#141414', 2: '#4A4A4A', 3: '#8A8A8A' },
        line:    '#E7E3DE',
        brand:   { DEFAULT: '#0B7A5F', deep: '#075845', ink: '#FFFFFF' },  // verde (blocos sólidos)
        accent:  { DEFAULT: '#F26B1D', ink: '#FFFFFF' },                    // laranja (destaques)
      },
      fontFamily: {
        display: ['"Source Serif 4"', '"Playfair Display"', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      fontSize: {
        hero:  ['clamp(2.25rem, 1.2rem + 4.6vw, 4.75rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        h1:    ['clamp(2rem, 1.2rem + 3vw, 3.5rem)',       { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        h2:    ['clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem)',  { lineHeight: '1.15' }],
        h3:    ['clamp(1.125rem, 1rem + .6vw, 1.375rem)',  { lineHeight: '1.25' }],
        label: ['0.6875rem',                                { lineHeight: '1', letterSpacing: '0.06em' }],
      },
      borderRadius: { md: '14px', lg: '22px' },
      boxShadow: {
        card:  '0 1px 2px rgba(20,20,20,.06), 0 4px 12px rgba(20,20,20,.06)',
        float: '0 10px 30px rgba(20,20,20,.12)',
      },
      transitionDuration: { fast: '180ms', base: '420ms', reveal: '700ms', page: '320ms' },
      transitionTimingFunction: {
        out: 'cubic-bezier(.22,.61,.36,1)',
        'in-out-soft': 'cubic-bezier(.65,0,.35,1)',
      },
      maxWidth: { container: '1240px' },
      spacing: { header: '72px' },
      keyframes: {
        'draw-route': { to: { strokeDashoffset: '0' } },
        shimmer:      { '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        'draw-route': 'draw-route 900ms cubic-bezier(.22,.61,.36,1) forwards',
        shimmer:      'shimmer 1.4s linear infinite',
      },
    },
  },
} satisfies Config;
```

**Tailwind v4 →** os mesmos tokens em `@theme` dentro do `src/styles.css` (`--color-surface`, `--color-surface-soft`, `--color-ink`, `--color-ink-2`, `--color-line`, `--color-brand`, `--color-brand-deep`, `--color-brand-ink`, `--color-accent`, `--font-display`, `--font-body`, `--text-hero`, `--ease-out`, `--animate-draw-route`, …). Mesmos nomes, mesmo resultado nas classes.

**Uso nos templates (exemplos):** `bg-surface text-ink`, `bg-surface-soft`, `border-line`, `bg-brand text-brand-ink`, `bg-accent text-accent-ink`, `font-display text-h1`, `text-label uppercase font-bold font-display`, `rounded-lg shadow-card`, `duration-reveal ease-out`, `max-w-container mx-auto px-4 sm:px-6 lg:px-10`, `h-header`.

**Escala de espaço, breakpoints e opacidades**: usar a escala por defeito do Tailwind. Distância de reveal = `translate-y-6` (24px) e `max-sm:translate-y-4` (16px).

**Ao trocar de cores no futuro**: mudar apenas os valores acima; verificar contraste AA (texto sobre `brand`, `accent` e `surface-tint`).

### 2.3 Regras de tipografia
- Títulos (`h1`–`h3`, números de estatísticas): `font-display text-h1|h2|h3|hero`, `font-semibold`/`font-bold` (o tracking e a altura de linha já vêm do tema).
- Navegação e rótulos: `font-display text-label uppercase font-bold` (versaletes; o tracking vem de `text-label`).
- Corpo: `font-body leading-relaxed`, máximo ~68 caracteres por linha (`max-w-prose`).
- Fontes carregadas por `<link>` no `index.html` com `preconnect` e `display=swap` (sem `@font-face` manual); pré-carregar só a do título, subset latino.

### 2.4 Elementos assinatura (implementar como componentes reutilizáveis)

| Elemento | Descrição | Notas de implementação |
|---|---|---|
| **Padrão topográfico** | Curvas de nível em linhas finas (`stroke-line`), nas margens/cantos de secções | Componente `TopoPattern` com SVG inline (sem ficheiro CSS), `opacity-50 pointer-events-none`, `aria-hidden`. Não animar. |
| **Rótulo vertical** | Texto rodado 90° na margem (ex.: NOTÍCIAS, GALERIA, ATALHOS) | `writing-mode: vertical-rl; transform: rotate(180deg)`; esconder em < 768px. |
| **Aspas laranja** | "❝" decorativo antes de títulos de destaque | `aria-hidden`, `text-accent`. |
| **Linha de destaque** | Barra laranja curta (48×3px) acima de blocos de notícias | Anima `transform: scaleX` de 0→1 ao entrar. |
| **Marcador de categoria** | Palavra curta + apóstrofo em serif ("Nov'", "Evt'", "Ped'") | Sobre o canto da imagem do cartão. |
| **Dot-nav lateral** | 4–6 pontos à direita, activo = botão circular branco com ícone | Só ≥ 1024px, `position: fixed`, `aria-label` por secção. |
| **Botão primário** | Pílula/rectângulo arredondado, `bg-surface-tint text-ink` com seta; variante sólida `bg-accent text-accent-ink` | Hover: seta desloca 4px; `:active` scale .98. |
| **Botão ghost** | Contorno 1px `border-ink`, texto versaletes, seta | Usado em "Ler mais". |
| **Cartão flutuante** | Cartão `bg-surface shadow-float` que sobrepõe a secção seguinte (margem negativa) | Revelação por baixo→cima. |
| **Bloco verde** | Painel `bg-brand text-brand-ink` (estatísticas, atalhos, rodapé) | Usar com moderação: 1–2 por página. |

---

## 3. PÁGINAS E SECÇÕES (conteúdo e layout)

Rotas: `/` Início · `/sobre` · `/educacao` (+ subpáginas por ciclo) · `/galeria` · `/noticias` · `/inscricoes` · `/contactos`.

### 3.1 Cabeçalho (global)
- Altura `h-header`, fundo branco com `backdrop-filter` **apenas** quando sobreposto ao hero (ou fundo sólido branco; preferir sólido por desempenho). Borda inferior `border-line` aparece após 8px de scroll.
- Esquerda: logo do Sassapa (placeholder SVG até haver o ficheiro real) + nome "Complexo Escolar Privado Sassapa" em 2 linhas (como "Pergamum / University").
- Centro: Início · Sobre · Educação · Galeria · Notícias · Contactos (versaletes). Item activo com linha laranja por baixo (anima `scaleX`).
- Direita: botão **"Inscrições"** (primário, laranja), seletor **PT | EN** (apenas UI nesta fase, estrutura i18n preparada), ícone de menu.
- **Esconde ao descer, mostra ao subir** (`transform: translateY(-100%)`), com `ease-in-out-soft` e `duration-[280ms]` (ou token equivalente).
- **Mobile (< 1024px)**: botão hambúrguer abre **menu em ecrã inteiro** (fundo branco) — itens grandes em serif entram em *stagger* (fade + translateY 16px), botão Inscrições e redes sociais no fundo. `aria-expanded`, foco preso (focus trap), `Esc` fecha, bloqueia scroll do body.

### 3.2 Início (`/`) — réplica adaptada das imagens 1, 2 e 3
Estrutura em ecrãs de `min-height: 100svh`:

1. **Hero** (imagens 1–2)
   - Duas colunas ≥ 1024px: texto à esquerda, fotografia grande à direita com cantos suaves e máscara/gradiente suave para o branco na margem esquerda da foto (equivalente ao *fade* escuro da referência).
   - Texto: aspas laranja, título em serif `text-hero` (ex.: "Educar com excelência, formar com valores."), subtítulo curto, botão ghost "Conhecer o colégio" e botão primário "Fazer inscrição".
   - Mobile: foto em cima (aspect-ratio 4/5, `object-fit: cover`), texto por baixo.
   - Foto: componente `<app-media>` com `aspect-ratio`, `loading="eager"` + `fetchpriority="high"` (é o LCP), `srcset/sizes`.
2. **Faixa de Notícias** (parte inferior do hero na referência)
   - Rótulo vertical "NOTÍCIAS" + contador "1/6". Linha laranja de destaque.
   - 4 notícias em linha ≥ 1024px (marcador de categoria `Ped'`, `Evt'`, `Com'`, `Aca'` + título serif + resumo 2 linhas + data). Em < 1024px: **carrossel horizontal com `scroll-snap-type: x mandatory`**, cartões de 80% da largura para sugerir continuação.
   - Dados: máximo 6 notícias estáticas.
3. **Barra/Cartão de "Agenda do colégio"** (verde, imagem 2)
   - Barra `bg-brand` com 2 eventos (avatar/miniatura, título, data/hora) e um **cartão flutuante central** que sobe para cima da barra com detalhe do evento + botão creme "Mais informação".
   - Seta ▲ expande/colapsa a barra (animação `transform` do cartão; sem animar altura — usar `grid-template-rows` apenas se inevitável, caso contrário `transform`).
   - Conteúdo vem do mesmo serviço de dados; se não houver eventos, a barra não é renderizada.
4. **Secção "Vídeo / Apresentação"** (imagem 3)
   - Fundo: foto larga com **véu branco→transparente** (versão clara do véu escuro). Título central em serif, botão circular de *play* (contorno, ícone laranja) que abre vídeo YouTube via **facade** (miniatura estática; o iframe só carrega ao clique).
   - Rótulo vertical "VÍDEO", ficha lateral esquerda (diretor/a, duração) apenas ≥ 1024px.
   - Faixa inferior: 3–4 **cartões de imagem com marcador de categoria** ("Gal'", "Edu'", "Act'") e título → ligam para Galeria/Educação. Cartão "ao vivo" da referência **não se aplica** (omitir).
5. **Atalhos / Estatísticas** (imagem 4, painel verde)
   - Bloco verde com 4 números grandes em serif ("Sabias que?"): alunos, professores, anos de actividade, classes. **Valores são placeholders marcados `TODO: confirmar com o colégio`**.
   - Contagem animada de 0→valor ao entrar (1200ms, `requestAnimationFrame`, `easeOutCubic`); com *reduced motion* mostra o valor final directamente.
6. **Rodapé "Mais…"** (imagem 5) — ver 3.9.

### 3.3 Sobre (`/sobre`)
- Hero compacto (50svh) com título "Sobre o Sassapa".
- Blocos alternados texto/imagem: **História**, **Missão**, **Visão**, **Valores** (valores em grelha de cartões 2×2 → 1 coluna em mobile).
- Linha do tempo vertical simples (marcos), cada marco revela-se ao scroll.
- Rótulo vertical "HISTÓRIA" na margem (desktop).

### 3.4 Educação (`/educacao` + subpáginas) — layout de 3 colunas da imagem 4
- Página principal: título + grelha de **cartões de ciclos** (Iniciação, Ensino Primário, 1.º Ciclo, 2.º Ciclo, Ensino Médio, etc. — **ler da camada de dados**, não fixar). Cada cartão: imagem, nome, resumo, "Ver ciclo →".
- **Subpágina de ciclo** (`/educacao/:ciclo`): layout em 3 colunas ≥ 1280px (equivalente à imagem 4):
  - **Esquerda**: índice/âncoras do ciclo (Visão geral, Classes, Cursos, Plano de férias, Actividades extracurriculares, Formações) com item activo destacado ao scroll (*scrollspy*).
  - **Centro** (fundo `bg-surface-soft`): título serif, descrição, responsável (avatar + nome + cargo), lista de links tipo "Visão geral / Classes / Cursos…", botão "Inscrever-me neste ciclo".
  - **Direita** (bloco verde): estatísticas do ciclo (nº de classes, turmas, alunos por turma…) com os mesmos números animados.
  - < 1280px: colapsa para 1 coluna, índice vira **barra de chips horizontais com scroll-snap** fixa sob o header.
- **Não implementar o chat** da imagem 4. A coluna esquerda é o índice.

### 3.5 Galeria (`/galeria`)
- Grelha de **álbuns** (cartões com capa, título, nº de itens). Clicar abre o álbum (e sub-álbuns como chips/segundo nível).
- Dentro do álbum: **masonry em CSS columns** ou grid com `aspect-ratio` fixo (evita *layout shift*), **carregamento gradual** (`IntersectionObserver` + botão "Carregar mais" ou scroll infinito de 24 em 24).
- Imagens: Cloudinary com transformações na URL (`f_auto,q_auto,c_fill,w_{n}`), `srcset` 320/640/960/1280, `loading="lazy"`, `decoding="async"`, *placeholder* de baixa qualidade/cor dominante (`blur-up`) com *fade* ao carregar.
- Vídeos: **facade do YouTube** (miniatura + ícone play; iframe criado só ao clicar, `youtube-nocookie.com`).
- **Lightbox** acessível: teclado (←/→/Esc), *swipe* em toque, pré-carrega apenas a imagem seguinte, animação de abertura com `transform: scale(.98)→1` + `opacity`.
- Preparar para milhares de itens: nunca renderizar tudo de uma vez; limitar nós de DOM.

### 3.6 Notícias (`/noticias`)
- Notícia em destaque (grande) + grelha dos restantes (máx. 6, conteúdo estático). Cartões com marcador de categoria, data, título, resumo.
- Página de detalhe opcional **apenas se já houver rota**; caso contrário, cartão expande para *modal/drawer* simples.

### 3.7 Inscrições (`/inscricoes`)
- Formulário em **passos** (stepper de 3): 1) Dados do candidato, 2) Encarregado de educação e contactos, 3) Documentos (BI em PDF + restantes) e revisão.
- Validação inline, mensagens claras em pt-PT, estados `loading/sucesso/erro`, *drag & drop* de ficheiros com lista e remoção, limite de tamanho/tipo (PDF ≤ 5 MB, indicado no UI).
- Barra de progresso do stepper anima com `transform: scaleX`.
- Ecrã final de sucesso: texto "Recebemos o teu pedido. Receberás a ficha de inscrição por email após validação." + nota "A confirmação pode também ser feita presencialmente na instituição."
- Submissão: chamar serviço (mock agora; API depois). Sem pagamentos.

### 3.8 Contactos (`/contactos`) — réplica adaptada da imagem 6
- Ecrã de mapa quase inteiro (`min-height: 80svh`) com **Leaflet** e *tiles* claros (CARTO "Positron"/OSM claro). Padrão da referência: lista de categorias à esquerda, mapa ao centro, controlos à direita, cartão de detalhe em baixo.
- Adaptação:
  - Esquerda (desktop): título "Como chegar" e modos de transporte (Carro / A pé / Táxi) como lista vertical; activo em serif grande com contagem.
  - Mapa: marcador do colégio (pino laranja, **coordenadas numa constante `SCHOOL_COORDS` com TODO**), botão circular **"Usar a minha localização"** (laranja, canto direito) → `navigator.geolocation` → traça **rota laranja** até ao colégio (OSRM público; tratar erro/permissão negada com mensagem amigável e alternativa: abrir no Google Maps).
  - Controlos `+` / `−` personalizados e escala (como na referência).
  - Cartão em baixo à direita: nome, morada (**Avenida 21 de Janeiro, Bairro Gamek, Luanda** é do prestador — **não usar**; deixar `TODO: morada do colégio`), telefone, email, horário, botão creme "Abrir direcções".
  - Distância e duração estimadas aparecem no cartão após traçar a rota.
- Mobile: mapa em cima (60svh), lista de modos em chips, cartão em *bottom sheet*.
- Mais abaixo: formulário/contactos directos e redes sociais.
- Carregar Leaflet **só nesta rota** (lazy) e o mapa só quando visível.

### 3.9 Rodapé "Mais…" (global) — adaptado da imagem 5
- Fundo `bg-surface-soft` com padrão topográfico. Título "Mais…" + frase curta.
- Colunas: **Atalhos** (Educação, Inscrições, Galeria, Notícias, Contactos, Sobre) · **Redes sociais** (Facebook, WhatsApp, Instagram, YouTube, TikTok — rótulos verticais/itens com apóstrofo `Fb'`, `Ig'`, `Yt'`, `Tk'`, `Wa'` como na referência, links `TODO` até haver URLs) · **Contacto**.
- Ilustração: **fachada do colégio em desenho de linhas** (SVG) à direita, equivalente ao templo grego (usar placeholder SVG simples de edifício; marcar `TODO: ilustração da fachada`).
- Faixa inferior verde com botão "Inscrições" e contactos. **Omitir newsletter e app móvel.**
- Linha final: © ano Complexo Escolar Privado Sassapa · Política de privacidade · Termos.

---

## 4. COMPONENTES PARTILHADOS A CRIAR / REUTILIZAR

`SiteHeader`, `MobileMenu`, `SiteFooter`, `Container`, `Section` (com `id`, rótulo vertical, modo `fullscreen`), `SectionDots` (dot-nav), `VerticalLabel`, `TopoPattern`, `Button` (variantes: primary, ghost, tint, icon-circle), `CategoryTag`, `NewsCard`, `NewsStrip` (carrossel snap), `EventBar`, `FloatingCard`, `StatBlock` + `CountUp`, `MediaImage` (Cloudinary + blur-up), `YoutubeFacade`, `Lightbox`, `AlbumCard`, `CycleCard`, `StepForm`, `FileDropzone`, `SchoolMap`, `Reveal` (directiva/hook), `ThemeTokens`.

Cada componente: props tipadas (`input()`/`output()`), estados vazio/loading/erro, acessível, **`.ts` + `.html` separados**, estilo 100% Tailwind (secção 0B). Variantes de componentes (ex.: `Button`: primary/ghost/tint/icon) = mapa `Record<Variant, string>` com classes literais em `button.constants.ts`.

---

## 5. MOVIMENTO E ANIMAÇÕES (secção crítica)

Objectivo: **fluidez, elegância e continuidade** — nada brusco, nada exagerado, nada lento.

### 5.1 Princípios
- Movimento **discreto**: deslocamentos de 16–32px, nunca mais.
- **Mesmo ritmo em todo o site**: usar apenas os tokens do tema (`duration-fast|base|reveal|page`, `ease-out`, `ease-in-out-soft`) e o *stagger* de 80ms.
- Entrada: elemento sobe/desliza e aparece. Saída: **só em transições de rota e menus** (não reverter reveals ao fazer scroll para cima; revelar **uma única vez**).
- Nada anima antes de entrar no viewport.

### 5.2 Sistema de *reveal* (um só mecanismo, em TypeScript + Tailwind)

Sem CSS à parte: uma **directiva `appReveal`** + **um serviço** com um único `IntersectionObserver` partilhado. A directiva aplica **classes Tailwind** (strings literais completas num ficheiro `.constants.ts`, para o Tailwind as detectar).

Uso no template: `<h2 appReveal="up" [revealDelay]="0">…</h2>` · `<ul appRevealGroup> <li appReveal="up" …>` (o grupo calcula o *stagger*: `índice × 80ms`, máx. 8 filhos; acima disso, delay constante).
Variantes: `up | down | left | right | fade | scale`.

```ts
// shared/directives/reveal/reveal.constants.ts
export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

export const REVEAL_BASE =
  'transition duration-reveal ease-out motion-reduce:transition-none';

export const REVEAL_HIDDEN: Record<RevealVariant, string> = {
  up:    'opacity-0 translate-y-6 max-sm:translate-y-4',
  down:  'opacity-0 -translate-y-6 max-sm:-translate-y-4',
  left:  'opacity-0 -translate-x-6 max-sm:-translate-x-4',
  right: 'opacity-0 translate-x-6 max-sm:translate-x-4',
  fade:  'opacity-0',
  scale: 'opacity-0 scale-95',
};

export const REVEAL_SHOWN = 'opacity-100 translate-x-0 translate-y-0 scale-100';
```

```ts
// shared/directives/reveal/reveal.service.ts  (esboço — completar e proteger para SSR)
@Injectable({ providedIn: 'root' })
export class RevealService {
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private callbacks = new WeakMap<Element, () => void>();

  readonly reducedMotion = isPlatformBrowser(this.platformId)
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  observe(el: Element, onIn: () => void): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.observer ??= new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        this.callbacks.get(e.target)?.();
        this.observer!.unobserve(e.target);   // revela uma única vez
      }),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    this.callbacks.set(el, onIn);
    this.observer.observe(el);
  }
}
```

```ts
// shared/directives/reveal/reveal.directive.ts  (esboço)
@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements AfterViewInit {
  appReveal = input<RevealVariant>('up');
  revealDelay = input(0);                       // ms (o grupo pode sobrepor)
  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private reveal = inject(RevealService);

  ngAfterViewInit() {
    if (this.reveal.reducedMotion || !isPlatformBrowser(inject(PLATFORM_ID))) return; // visível, sem animar
    const node = this.el.nativeElement as HTMLElement;
    const hidden = REVEAL_HIDDEN[this.appReveal()].split(' ');
    node.classList.add(...REVEAL_BASE.split(' '), ...hidden);
    node.style.transitionDelay = `${this.revealDelay()}ms`;
    this.reveal.observe(node, () => {
      node.classList.remove(...hidden);
      node.classList.add(...REVEAL_SHOWN.split(' '));
      // limpar delay e classes após a transição para não interferir com hovers
      node.addEventListener('transitionend', () => { node.style.transitionDelay = ''; }, { once: true });
    });
  }
}
```

Regras:
- **Sem JS ou em SSR, o conteúdo está visível** (a directiva só esconde no browser).
- Elementos já visíveis no *load* devem animar de imediato (a revelação dispara no primeiro frame); os restantes só ao entrar no viewport.
- Revelar **uma vez** (`unobserve`). Nunca reverter ao fazer scroll para cima.
- Remover dependência de `will-change` fixo; usar apenas se medido necessário.
- Para o texto do hero (linhas em *stagger* com máscara), usar um pequeno componente `RevealLines` com `overflow-hidden` por linha e `translate-y-full → translate-y-0` em Tailwind.

### 5.3 Animações específicas
| Onde | Efeito | Parâmetros |
|---|---|---|
| Hero – texto | Linhas do título sobem em *stagger* (máscara `overflow:hidden` por linha) | 700ms, 80ms entre linhas |
| Hero – foto | Entra com `scale(1.04)→1` + fade; **parallax subtil** só ≥ 1024px (translateY máx. ±24px com `rAF`, passivo) | 900ms |
| Linha de destaque | `scaleX(0→1)`, `transform-origin: left` | 600ms |
| Notícias/cartões | Fade + up, *stagger* | 700ms / 80ms |
| Faixa horizontal (snap) | Cartões entram da direita no 1.º reveal; depois só `scroll-snap` nativo | — |
| Cartão flutuante / barra de eventos | Sobe 32px + fade | 700ms |
| Estatísticas | `CountUp` + fade/up | 1200ms |
| Dot-nav | Ponto activo muda com `transform: scale` e preenchimento | 280ms |
| Cabeçalho | Esconde/mostra com `translateY` | 280ms |
| Menu mobile | Painel `opacity` + `translateY(-8px)`; itens em *stagger* | 320ms + 60ms |
| **Transição de rota** | *Cross-fade* + `translateY(8px)`; usar **View Transitions API** (`document.startViewTransition`) com *fallback* para fade CSS | 320ms (`duration-page`) |
| Galeria – imagem | *Blur-up* → nítida (`opacity`) | 400ms |
| Lightbox | `scale(.98→1)` + fade; setas deslizam 24px | 280ms |
| Mapa – rota | Linha laranja desenha-se com `stroke-dashoffset` | 900ms |
| Stepper (inscrições) | Passo actual entra da direita; anterior sai para a esquerda | 320ms |

### 5.4 Transições entre secções (fluidez contínua)
- Sem cortes secos: secções contíguas **sobrepõem-se ligeiramente** (cartões flutuantes com margem negativa, véus em gradiente entre fundos).
- Na Home, em ≥ 1024px: `scroll-snap-type: y proximity` (**nunca `mandatory`**) nas secções de ecrã inteiro. Em mobile, **sem snap vertical**.
- **Dot-nav** sincronizada por `IntersectionObserver` (secção com maior área visível). Clique faz `scrollIntoView({ behavior: 'smooth' })` (instantâneo se *reduced motion*).

### 5.5 Hover/foco/toque
- Cartões: `translateY(-4px)` + sombra mais forte (usar pseudo-elemento com `opacity` para a sombra em vez de animar `box-shadow`); imagem interna `scale(1.04)` com `overflow:hidden` no contentor.
- Botões: seta desloca 4px; `:active` scale(.98).
- Links de navegação: linha laranja `scaleX`.
- **Hover só em dispositivos com hover**: usar as variantes `hover:` do Tailwind (v4 já as limita a `(hover: hover)`; em v3 activar `future: { hoverOnlyWhenSupported: true }`). Em toque: feedback `:active` (scale .98, 120ms) e a informação principal **já visível** (nada escondido atrás de hover).
- Foco por teclado: `focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent` — nunca remover.

### 5.6 Desempenho de movimento
- `transform`/`opacity` apenas; `translate3d` para promover camada; `will-change` só durante a animação.
- Listeners de scroll **passivos** e agrupados em `requestAnimationFrame`; preferir `IntersectionObserver` a eventos de scroll.
- Sem animações em loop infinito (excepto indicador de loading mínimo). Pausar o que estiver fora do viewport.
- Orçamento: nenhuma animação > 1200ms; nenhuma tarefa JS > 50ms durante scroll.

### 5.7 Mobile e tablet
- Mesmo vocabulário, **distâncias menores** (`max-sm:translate-y-4` em vez de `translate-y-6`, < 640px).
- Parallax desligado em toque.
- Carrosséis com *swipe* nativo (`scroll-snap`), indicadores de posição (1/6) actualizados por scroll.
- Menu em ecrã inteiro com alvos de toque ≥ 44×44px.

### 5.8 Estados de carregamento
- *Skeletons* neutros (`bg-surface-soft`) com shimmer **leve em `transform`** (ou sem shimmer) para listas/galeria; reservar espaço (`aspect-ratio`) para **CLS ≈ 0**.

### 5.9 Reduced motion (obrigatório)
- A directiva `appReveal` **não esconde nem anima** quando `prefers-reduced-motion: reduce` (ver `RevealService.reducedMotion`).
- Em componentes: `motion-reduce:transition-none motion-reduce:animate-none motion-reduce:transform-none` (ou equivalente da versão do Tailwind) em todos os elementos com `transition`/`animate`.
- `CountUp` mostra o valor final; parallax e View Transitions desligados; carrosséis mantêm snap nativo; `scroll-behavior` auto.
- **Rede de segurança global** (único bloco CSS justificado, em `src/styles.css`):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 6. RESPONSIVIDADE (contrato)

Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.

| Largura | Comportamento |
|---|---|
| **< 640** (telemóvel) | 1 coluna; menu em ecrã inteiro; hero com foto em cima; carrosséis snap; cartões empilhados; rótulos verticais e dot-nav **ocultos**; mapa com bottom sheet; botões em largura total quando for acção principal. |
| **640–1023** (tablet) | Grelhas de 2 colunas; hero em 1 coluna com foto maior; carrosséis com 2 cartões visíveis; menu ainda em ecrã inteiro. |
| **≥ 1024** (desktop) | Navegação completa, dot-nav, rótulos verticais, hero em 2 colunas, layout de 3 colunas em Educação (≥ 1280), parallax subtil. |

Verificações: sem scroll horizontal, sem texto cortado, sem sobreposições indevidas, imagens nunca deformadas (`object-fit`), tipografia legível (mín. 15px corpo no mobile), áreas de toque ≥ 44px, `100svh` em vez de `100vh` (barras do browser móvel), *safe-area insets* respeitados.

---

## 7. DESEMPENHO, SEO E ACESSIBILIDADE (UI)

- **Metas Lighthouse (mobile)**: Performance ≥ 90, Acessibilidade ≥ 95, Boas práticas ≥ 95, SEO ≥ 95. LCP < 2,5 s, CLS < 0,05, INP < 200 ms.
- Imagens: formatos modernos (`f_auto`), `srcset/sizes` correctos, `width/height` ou `aspect-ratio` sempre definidos, só a imagem do hero com `fetchpriority="high"`.
- JS: *code splitting* por rota; Leaflet e Lightbox carregados sob demanda; nada de bibliotecas de animação.
- CSS: tokens + utilitários; evitar CSS morto.
- HTML semântico: `header/nav/main/section/footer`, um só `h1` por página, ordem de `h2/h3` correcta, *skip link* "Saltar para o conteúdo".
- Metadados por página (`title`, `description`, Open Graph) já com *hooks* para a fase de SEO; `lang="pt"` e preparação de `hreflang` para EN.
- `aria-live` em estados de formulário/mapa; `aria-current="page"` no menu; `alt` descritivo (ou `alt=""` se decorativa).

---

## 8. DADOS (camada tipada, mock agora)

Criar interfaces e um serviço por domínio, com **dados de exemplo realistas em pt-PT** (claramente marcados como exemplo):

```ts
interface Noticia  { id:string; titulo:string; resumo:string; data:string; categoria:string; imagem:string }
interface Evento   { id:string; titulo:string; dataHora:string; local?:string; imagem?:string }
interface Ciclo    { slug:string; nome:string; resumo:string; imagem:string; responsavel?:{nome:string; cargo:string; foto?:string}; classes:string[]; cursos:string[]; planoFerias?:string; extracurriculares:string[]; formacoes:string[]; stats?:{label:string; valor:number}[] }
interface Album    { id:string; titulo:string; capa:string; itens:number; subAlbuns?:Album[] }
interface MidiaItem{ id:string; tipo:'imagem'|'video'; url:string; titulo?:string; ordem:number }
interface Inscricao{ candidato:{...}; encarregado:{...}; documentos:File[] }
```
Os serviços devolvem `Promise`/`Observable` para que a troca pela API real seja transparente.

---

## 9. ORDEM DE EXECUÇÃO (fases)

1. **Fase 0** — Auditoria e plano (sem alterações). *Pára e mostra o relatório.*
2. **Fase 1** — (a) `.gitignore` na raiz + `git status` limpo; (b) tema do Tailwind com os tokens semânticos; (c) `styles.css` mínimo; (d) fontes no `index.html`; (e) estrutura de pastas; (f) `RevealService` + `RevealDirective` + regras de reduced motion.
3. **Fase 2** — Componentes partilhados: Header + MobileMenu, Footer, Button, CategoryTag, Section/VerticalLabel/TopoPattern, MediaImage.
4. **Fase 3** — **Início** completo (todas as 6 secções) + dot-nav + CountUp. Validar em mobile/tablet/desktop **antes de avançar**.
5. **Fase 4** — Sobre, Educação (+ subpáginas), Notícias.
6. **Fase 5** — Galeria (álbuns, masonry, lightbox, facade YouTube), Inscrições (stepper + dropzone), Contactos (mapa + rota).
7. **Fase 6** — Transições de rota, afinação de ritmo/consistência, passagem de acessibilidade e desempenho.
8. **Fase 7** — QA final (checklist abaixo) e resumo do que ficou como `TODO`.

Entrega cada fase com um resumo curto (o que mudou, ficheiros, o que testar).

---

## 10. CRITÉRIO DE ACEITAÇÃO (checklist final)

- [ ] Fundo branco; paleta clara coerente; nenhum resquício de dark mode.
- [ ] Identidade visual da referência traduzida (serif + versaletes, laranja/verde, padrão topográfico, rótulos verticais, dot-nav, cartões flutuantes) **sem copiar** logo/texto/imagens.
- [ ] As 7 páginas + subpáginas de Educação implementadas com a **mesma qualidade**, não só a Home.
- [ ] Animações suaves e consistentes (mesmos tokens), só `transform`/`opacity`, sem cortes bruscos nem exageros.
- [ ] Tudo funciona **por toque**, sem depender de hover.
- [ ] `prefers-reduced-motion` respeitado em todo o lado.
- [ ] Sem scroll horizontal indesejado, sem elementos cortados ou sobrepostos, sem *layout shift* visível.
- [ ] Testado em 360, 390, 768, 1024, 1280, 1536 px e em Chrome, Safari (iOS) e Firefox.
- [ ] Lighthouse mobile dentro das metas (secção 7).
- [ ] **Stack**: tudo em Angular + TypeScript + Tailwind; **`src/styles.css` é o único CSS** e só contém o permitido; zero `.scss`, zero `styles/styleUrl`, zero `@apply`.
- [ ] **Ficheiros separados**: cada componente com `.ts` + `.html`; modelos, config, dados, serviços e constantes em ficheiros próprios.
- [ ] **Cores**: `grep` de hex/`rgb()`/`bg-[#` em `src/app` devolve 0; trocar os valores do tema altera o site inteiro sem tocar em componentes.
- [ ] **Git**: `.gitignore` aplicado, `git status` sem `node_modules`/`dist`/`.angular`/`.env`/vídeos/zip/ferramentas de IA; `package-lock.json` commitado; sem ficheiros > 100 KB em `assets/`.
- [ ] Nenhuma biblioteca de animação; Leaflet só na rota Contactos.
- [ ] Sem funcionalidades fora do âmbito (newsletter, app, pagamentos, chatbot).
- [ ] Todos os placeholders listados num resumo final de `TODO` (logo, cores finais, textos, fotos, morada/coordenadas, redes sociais, estatísticas).

---

## 11. INSTRUÇÃO FINAL

Começa **apenas** pela Fase 0 (incluindo a análise do `.gitignore`, do Tailwind e dos ficheiros `.css/.scss` existentes) e apresenta o relatório de auditoria e o plano. Aguarda confirmação antes de avançar. Quando executares, **reutiliza o que existe**, mantém consistência entre páginas e valida em móvel e desktop a cada fase. Se algo neste documento entrar em conflito com a estrutura existente do projecto, **explica o conflito e propõe a solução** em vez de improvisar.
