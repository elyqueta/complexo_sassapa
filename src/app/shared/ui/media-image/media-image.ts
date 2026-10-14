import { Component, ElementRef, AfterViewInit, inject, input, signal } from '@angular/core';
import { MediaAspect, MEDIA_ASPECTS, MEDIA_SIZES } from './media-image.constants';
import { wikimediaSrcSet } from '../../utils/wikimedia-srcset';

/** Imagem com srcset, placeholder de carregamento (blur-up ligeiro) e aspecto fixo. */
@Component({
  selector: 'app-media-image',
  standalone: true,
  templateUrl: './media-image.html',
  host: { class: 'block' },
})
export class MediaImage implements AfterViewInit {
  readonly src = input.required<string>();
  readonly alt = input('');
  readonly aspect = input<MediaAspect>('landscape');
  readonly priority = input(false);
  readonly width = input<number | null>(null);
  readonly height = input<number | null>(null);
  readonly sizes = input<string | null>(null);

  protected readonly loaded = signal(false);

  private readonly el = inject(ElementRef<HTMLElement>);

  protected get aspectClass(): string {
    return MEDIA_ASPECTS[this.aspect()];
  }

  protected get sizesValue(): string {
    return this.sizes() ?? MEDIA_SIZES[this.aspect()];
  }

  protected get loading(): 'eager' | 'lazy' {
    return this.priority() ? 'eager' : 'lazy';
  }

  protected get srcset(): string {
    return wikimediaSrcSet(this.src());
  }

  ngAfterViewInit(): void {
    const img = this.el.nativeElement.querySelector('img');
    if (img?.complete) this.loaded.set(true);
  }

  protected onLoad(): void {
    this.loaded.set(true);
  }
}
