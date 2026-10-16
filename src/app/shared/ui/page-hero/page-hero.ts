import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../../core/config/site.config';
import { Ciclo } from '../../../core/models/ciclo';
import { Evento } from '../../../core/models/evento';
import { Noticia } from '../../../core/models/noticia';
import { RevealDirective } from '../../directives/reveal/reveal.directive';
import { Button } from '../button/button';
import { ETIQUETAS_CICLO, HeroVariant, ItemFaixa } from './page-hero.constants';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [RouterLink, Button, RevealDirective],
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

  protected readonly itens = computed<ItemFaixa[]>(() => {
    if (this.eHome()) {
      return this.ciclos().map((c) => ({
        id: c.slug,
        etiqueta: ETIQUETAS_CICLO[c.slug] ?? c.nome.slice(0, 3),
        titulo: c.nome,
        detalhe: `Classes: ${c.classes[0]} a ${c.classes[c.classes.length - 1]}`,
        rodape: `Cursos: ${c.cursos.slice(0, 3).join(', ')}`,
        // TODO: trocar por `/educacao/${c.slug}` quando a subpágina existir.
        rota: '/educacao',
      }));
    }
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
}