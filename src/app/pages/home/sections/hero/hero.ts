import {
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Evento } from '../../../../core/models/evento';
import { Noticia } from '../../../../core/models/noticia';
import { VIDEO_APRESENTACAO } from '../../../../core/config/site.config';
import { Button } from '../../../../shared/ui/button/button';
import { MediaImage } from '../../../../shared/ui/media-image/media-image';
import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';
import { RevealService } from '../../../../shared/directives/reveal/reveal.service';
import { VerticalLabel } from '../../../../shared/ui/vertical-label/vertical-label';
import { Icon } from '../../../../shared/ui/icon/icon';
import { YoutubeFacade } from '../../../../shared/ui/youtube-facade/youtube-facade';
import { Logo } from '../../../../shared/ui/logo/logo';

@Component({
  selector: 'app-home-hero',
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
  templateUrl: './hero.html',
})
export class Hero {
  readonly noticias = input<Noticia[]>([]);
  readonly eventos = input<Evento[]>([]);

  protected readonly heroImg = '/hero-school.webp';
  protected readonly video = VIDEO_APRESENTACAO;
  protected readonly duracaoVideo = VIDEO_APRESENTACAO.duracao;
  protected readonly videoAberto = signal(false);

  protected readonly seccoes = [
    { id: 'inicio', label: 'Início' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'video', label: 'Vídeo' },
    { id: 'numeros', label: 'Números' },
  ] as const;

  @ViewChild('foto') private readonly foto?: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly reveal = inject(RevealService);

  protected noticiasVisiveis(): Noticia[] {
    return [...this.noticias()].reverse().slice(0, 3);
  }

  protected noticiaA(): Noticia | undefined {
    return [...this.noticias()].reverse()[3];
  }

  protected eventoProximo(): Evento | undefined {
    return this.eventos()[0];
  }

  protected posicaoNoticia(indice: number): number {
    return [9.7, 28.7, 47.5][indice] ?? 47.5;
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
    // Parallax subtil na foto, só no desktop e sem movimento reduzido.
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
