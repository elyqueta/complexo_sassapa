import { Component, input } from '@angular/core';

@Component({
  selector: 'app-vertical-label',
  standalone: true,
  templateUrl: './vertical-label.html',
})
export class VerticalLabel {
  readonly label = input.required<string>();
}
