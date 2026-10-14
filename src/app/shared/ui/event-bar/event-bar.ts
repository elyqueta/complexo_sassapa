import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Evento } from '../../../core/models/evento';
import { MediaImage } from '../media-image/media-image';
import { CategoryTag } from '../category-tag/category-tag';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';

/** Barra verde da agenda + cartão flutuante com o detalhe do evento activo. */
@Component({
  selector: 'app-event-bar',
  standalone: true,
  imports: [RouterLink, MediaImage, CategoryTag, Button, Icon],
  templateUrl: './event-bar.html',
})
export class EventBar {
  readonly eventos = input.required<Evento[]>();

  protected readonly activo = signal(0);
  protected readonly expandido = signal(true);

  protected readonly eventoActivo = computed(
    () => this.eventos()[Math.min(this.activo(), this.eventos().length - 1)],
  );

  protected selecionar(index: number): void {
    this.activo.set(index);
    this.expandido.set(true);
  }

  protected alternar(): void {
    this.expandido.update((v) => !v);
  }

  protected imgAlt(evento: Evento): string {
    return evento.imagemAlt ?? evento.titulo;
  }
}
