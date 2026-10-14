import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BUTTON_BASE, BUTTON_SIZES, BUTTON_VARIANTS, ButtonVariant } from './button.constants';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, Icon],
  templateUrl: './button.html',
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<keyof typeof BUTTON_SIZES>('md');
  readonly routerLink = input<string | null>(null);
  readonly href = input<string | null>(null);
  readonly arrow = input(true);

  protected get classes(): string {
    return `${BUTTON_BASE} ${BUTTON_SIZES[this.size()]} ${BUTTON_VARIANTS[this.variant()]}`;
  }
}
