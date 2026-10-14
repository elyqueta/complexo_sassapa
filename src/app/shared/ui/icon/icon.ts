import { Component, input } from '@angular/core';
import { ICON_PATHS, IconName } from './icon.constants';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.html',
})
export class Icon {
  readonly name = input.required<IconName>();

  protected readonly paths = ICON_PATHS;
}
