import { Component, ElementRef, AfterViewInit, PLATFORM_ID, inject, input, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RevealService } from '../../directives/reveal/reveal.service';
import { easeOutCubic } from '../../utils/ease-out-cubic';

const DURATION_MS = 1200;

/** Número em serif com contagem animada de 0 até ao valor ao entrar no viewport. */
@Component({
  selector: 'app-stat-block',
  standalone: true,
  templateUrl: './stat-block.html',
})
export class StatBlock implements AfterViewInit {
  readonly valor = input.required<number>();
  readonly label = input.required<string>();
  readonly descricao = input<string | undefined>(undefined);

  protected readonly display = signal('0');

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly reveal = inject(RevealService);

  ngAfterViewInit(): void {
    const valor = this.valor();
    if (!isPlatformBrowser(this.platformId) || this.reveal.reducedMotion) {
      this.display.set(formatar(valor));
      return;
    }
    this.reveal.observe(this.el.nativeElement, () => this.animar(valor));
  }

  private animar(valor: number): void {
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / DURATION_MS, 1);
      this.display.set(formatar(Math.round(easeOutCubic(p) * valor)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}

export function formatar(valor: number): string {
  return valor.toLocaleString('pt-PT');
}
