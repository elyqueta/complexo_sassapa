import { AfterViewInit, Component, PLATFORM_ID, inject, input, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IconName } from '../icon/icon.constants';
import { Icon } from '../icon/icon';
import { RevealService } from '../../directives/reveal/reveal.service';

export interface SeccaoDot {
  id: string;
  label: string;
  icon: IconName;
}

/** Navegação lateral por pontos (só ≥ 1024px), sincronizada por IntersectionObserver. */
@Component({
  selector: 'app-section-dots',
  standalone: true,
  imports: [Icon],
  templateUrl: './section-dots.html',
})
export class SectionDots implements AfterViewInit {
  readonly seccoes = input.required<readonly SeccaoDot[]>();

  protected readonly activo = signal(0);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly reveal = inject(RevealService);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const elementos = this.seccoes()
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elementos.length) return;

    const racios = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) racios.set(entry.target, entry.intersectionRatio);
        let melhor = 0;
        elementos.forEach((el, i) => {
          if ((racios.get(el) ?? 0) > (racios.get(elementos[melhor]) ?? 0)) melhor = i;
        });
        this.activo.set(melhor);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    elementos.forEach((el) => observer.observe(el));
  }

  protected irPara(id: string): void {
    document.getElementById(id)?.scrollIntoView({
      behavior: this.reveal.reducedMotion ? 'auto' : 'smooth',
    });
  }
}
