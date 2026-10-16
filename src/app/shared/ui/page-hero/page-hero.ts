import {
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  computed,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Evento } from '../../../core/models/evento';
import { Noticia } from '../../../core/models/noticia';
import { VIDEO_APRESENTACAO } from '../../../core/config/site.config';
import { Button } from '../button/button';
import { MediaImage } from '../media-image/media-image';
import { RevealDirective } from '../../../shared/directives/reveal/reveal.directive';
import { RevealService } from '../../../shared/directives/reveal/reveal.service';
import { VerticalLabel } from '../vertical-label/vertical-label';
import { Icon } from '../icon/icon';
import { YoutubeFacade } from '../youtube-facade/youtube-facade';
import { Logo } from '../logo/logo';

type HeroVariante = 'home' | 'noticias';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [
    RouterLink,
    Button,
    MediaImage,
    RevealDirective,
    VerticalLabel,
    Icon,
    YoutubeFacade,
    Logo,
  ],
  templateUrl: './page-hero.html',
})
export class PageHero {
  readonly noticias = input<Noticia[]>([]);
  readonly eventos = input<Evento[]>([]);
  readonly variante = input<HeroVariante>('home');
  readonly titulo = input<string[]>([]);
  readonly subtitulo = input<string>('');
  readonly imagem = input<string>('/hero-school.webp');

  protected readonly heroImg = this.imagem();
  protected readonly video = VIDEO_APRESENTACAO;
  protected readonly duracaoVideo = VIDEO_APRESENTACAO.duracao;
  protected readonly videoAberto = signal(false);

  protected readonly mostraDots = computed(() => this.variante() === 'home');

  protected readonly seccoes = computed(() => {
    if (this.variante() === 'noticias') return [];
    return [
      { id: 'inicio', label: 'Início', icon: 'home' },
      { id: 'noticias', label: 'Notícias', icon: 'news' },
      { id: 'agenda', label: 'Agenda', icon: 'calendar' },
      { id: 'video', label: 'Vídeo', icon: 'video' },
      { id: 'numeros', label: 'Números', icon: 'chart' },
    ];
  });

  protected readonly tituloDefault = computed(() =>
    this.titulo().length ? this.titulo() : ['Educar com excelência,', 'formar com valores.']
  );
  protected readonly subtituloDefault = computed(() =>
    this.subtitulo() || 'Do pré-escolar ao Ensino Médio, com ensino de qualidade e valores que formam cidadãos.'
  );

  protected readonly cardCount = computed(() => (this.variante() === 'home' ? 3 : 4));

  protected readonly contadorTotal = computed(() => {
    const total = this.noticias().length + this.eventos().length;
    return this.mostraDots() ? Math.min(4, total) : '';
  });

  @ViewChild('foto') private readonly foto?: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly reveal = inject(RevealService);

  protected noticiasVisiveis(): Noticia[] {
    return [...this.noticias()].reverse().slice(0, this.cardCount());
  }

  protected noticiaA(): Noticia | undefined {
    return [...this.noticias()].reverse()[3];
  }

  protected eventoProximo(): Evento | undefined {
    return this.eventos()[0];
  }

  protected posicaoNoticia(indice: number): number {
    return [9.7, 29.8, 49.9][indice] ?? 49.9;
  }

  protected etiquetaNoticia(indice: number): string {
    return ['Not', 'Edu', 'Act'][indice] ?? 'Not';
  }

  protected abrirVideo(): void {
    this.videoAberto.set(true);
  }

  protected fecharVideo(): void {
    this.videoAberto.set(false);
  }

  protected irPara(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  constructor() {
    afterNextRender(() => {
      const node = this.foto?.nativeElement;
      if (!node || !isPlatformBrowser(inject(PLATFORM_ID))) return;
      if (window.matchMedia('(max-width: 1023px)').matches) return;
      if (this.reveal.reducedMotion) return;

      let agendado = false;
      const aplicar = () => {
        agendado = false;
        const deslocamento = Math.max(-24, Math.min(24, window.scrollY * 0.06));
        node.style.transform = `translate3d(0, ${deslocamento}px, 0)`;
      };

      fromEvent(window, 'scroll', { passive: true })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          if (agendado) return;
          agendado = true;
          requestAnimationFrame(aplicar);
        });
    });
  }
}