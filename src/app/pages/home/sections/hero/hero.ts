import {
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  afterNextRender,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';
import { Container } from '../../../../shared/ui/container/container';
import { MediaImage } from '../../../../shared/ui/media-image/media-image';
import { TopoPattern } from '../../../../shared/ui/topo-pattern/topo-pattern';
import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';
import { RevealService } from '../../../../shared/directives/reveal/reveal.service';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [RouterLink, Button, Container, MediaImage, TopoPattern, RevealDirective],
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly tituloLinhas = ['Educar com', 'excelência,', 'formar com valores.'];
  protected readonly heroImg =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Angola_colegio_psv.JPG/1280px-Angola_colegio_psv.JPG';

  @ViewChild('foto') private readonly foto?: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly reveal = inject(RevealService);

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
