import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { Component, PLATFORM_ID, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../../core/config/site.config';
import { Ciclo } from '../../../core/models/ciclo';
import { Evento } from '../../../core/models/evento';
import { Noticia } from '../../../core/models/noticia';
import { RevealDirective } from '../../directives/reveal/reveal.directive';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import {
  DESCRICAO_FERIAS,
  DESCRICAO_FORMACOES,
  HeroVariant,
  ItemFaixa,
  ORDEM_CICLOS,
  TITULOS_CICLO,
} from './page-hero.constants';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet, Button, Icon, RevealDirective],
  templateUrl: './page-hero.html',
})
export class PageHero {
  readonly variant = input<HeroVariant>('home');
  readonly ciclos = input<Ciclo[]>([]);
  readonly noticias = input<Noticia[]>([]);
  readonly eventos = input<Evento[]>([]);
  readonly titulo = input<string[]>([]);
  readonly subtitulo = input<string>('');

  protected readonly eHome = computed(() => this.variant() === 'home');
  protected readonly anos = new Date().getFullYear() - SITE.anoFundacao;
  protected readonly aberto = signal<ItemFaixa | null>(null);

  protected readonly tituloLinhas = computed(() =>
    this.titulo().length ? this.titulo() : ['Educar com excelência,', 'formar com valores.'],
  );

  protected readonly subtituloTexto = computed(
    () =>
      this.subtitulo() ||
      'Do pré-escolar ao Ensino Médio, com ensino de qualidade e valores que formam cidadãos.',
  );

  protected readonly botaoSecundario = computed(() =>
    this.eHome()
      ? { rota: '/educacao', label: 'Ver ciclos de ensino' }
      : { rota: '/', label: 'Página inicial' },
  );

  protected readonly rotuloFaixa = computed(() => (this.eHome() ? 'Ensino' : 'Notícias'));

  protected readonly colunas = computed(() => (this.eHome() ? 'lg:grid-cols-6' : 'lg:grid-cols-5'));
  protected readonly esqueletos = computed(() => (this.eHome() ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5]));

  protected readonly itens = computed<ItemFaixa[]>(() => {
    if (this.eHome()) return this.itensHome();
    return this.noticias()
      .slice(0, 5)
      .map((n) => ({
        id: n.id,
        etiqueta: n.categoria.replace(/'$/, ''),
        titulo: n.titulo,
        detalhe: n.resumo,
        rodape: n.data,
        rota: '/noticias',
      }));
  });

  private readonly platformId = inject(PLATFORM_ID);
  private gatilho: HTMLElement | null = null;

  constructor() {
    // Modal aberto: bloqueia o scroll e foca o botão de fechar.
    effect((onCleanup) => {
      if (!this.aberto() || !isPlatformBrowser(this.platformId)) return;
      const anterior = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const timer = window.setTimeout(() => document.getElementById('faixa-modal-fechar')?.focus());
      onCleanup(() => {
        document.body.style.overflow = anterior;
        window.clearTimeout(timer);
      });
    });
  }

  protected abrir(item: ItemFaixa, event: Event): void {
    this.gatilho = event.currentTarget as HTMLElement;
    this.aberto.set(item);
  }

  protected fechar(): void {
    this.aberto.set(null);
    const gatilho = this.gatilho;
    this.gatilho = null;
    if (gatilho && isPlatformBrowser(this.platformId)) queueMicrotask(() => gatilho.focus());
  }

  private itensHome(): ItemFaixa[] {
    const todos = this.ciclos();
    if (!todos.length) return [];

    const ciclos = ORDEM_CICLOS.map((slug) => todos.find((c) => c.slug === slug)).filter(
      (c): c is Ciclo => !!c,
    );

    const porCiclo: ItemFaixa[] = ciclos.map((c) => ({
      id: c.slug,
      titulo: TITULOS_CICLO[c.slug] ?? c.nome,
      detalhe: `Classes: ${c.classes[0]} a ${c.classes[c.classes.length - 1]}`,
      rodape: `Cursos: ${c.cursos.slice(0, 3).join(', ')}`,
      rota: '/educacao',
      modal: {
        descricao: c.resumo,
        listas: [
          { rotulo: 'Classes', itens: c.classes },
          { rotulo: 'Cursos', itens: c.cursos },
          ...(c.extracurriculares.length
            ? [{ rotulo: 'Actividades extracurriculares', itens: c.extracurriculares }]
            : []),
        ],
      },
    }));

    const formacoes = [...new Set(todos.flatMap((c) => c.formacoes))];
    const ferias = todos
      .filter((c) => c.planoFerias)
      .map((c) => `${c.nome}: ${c.planoFerias}`);

    return [
      ...porCiclo,
      {
        id: 'formacoes-profissionais',
        titulo: 'Formações profissionais',
        detalhe: 'Cursos e workshops de curta duração',
        rodape: formacoes.slice(0, 2).join(', '),
        rota: '/educacao',
        modal: {
          descricao: DESCRICAO_FORMACOES,
          listas: [{ rotulo: 'Formações disponíveis', itens: formacoes }],
        },
      },
      {
        id: 'plano-de-ferias',
        titulo: 'Plano de férias',
        detalhe: 'Reforço e actividades durante as férias',
        rodape: 'Para todos os ciclos de ensino',
        rota: '/educacao',
        modal: {
          descricao: DESCRICAO_FERIAS,
          listas: [{ rotulo: 'Por ciclo', itens: ferias }],
        },
      },
    ];
  }
}