import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-category-tag',
  standalone: true,
  templateUrl: './category-tag.html',
})
export class CategoryTag {
  /** Rótulo curto com apóstrofo, ex.: "Nov'". */
  readonly label = input.required<string>();
  /** `ink` sobre fundos claros; `chip` sobre fotografias. */
  readonly tone = input<'ink' | 'chip'>('ink');

  protected readonly palavra = computed(() => this.label().replace(/'$/, ''));
  protected readonly chip = computed(() => this.tone() === 'chip');
}
