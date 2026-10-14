import { Component, DestroyRef, afterNextRender, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { Noticia } from '../../../../core/models/noticia';
import { NewsCard } from '../../../../shared/ui/news-card/news-card';
import { VerticalLabel } from '../../../../shared/ui/vertical-label/vertical-label';
import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';

@Component({
  selector: 'app-news-strip',
  standalone: true,
  imports: [NewsCard, VerticalLabel, RevealDirective],
  templateUrl: './news-strip.html',
})
export class NewsStrip {
  readonly noticias = input.required<Noticia[]>();

  protected readonly indice = signal(0);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Indicador de posição (1/6) no carrossel móvel.
    afterNextRender(() => {
      const scroller = document.getElementById('faixa-noticias');
      if (!scroller) return;
      fromEvent(scroller, 'scroll', { passive: true })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          const cartao = scroller.querySelector<HTMLElement>('app-news-card');
          const largura = cartao?.offsetWidth ?? 1;
          this.indice.set(Math.round(scroller.scrollLeft / largura));
        });
    });
  }
}
