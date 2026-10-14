import { AfterContentInit, Directive, contentChildren } from '@angular/core';
import { RevealDirective } from './reveal.directive';
import { REVEAL_MAX_STAGGER_INDEX } from './reveal.constants';

/** Aplica stagger (80ms por filho, máx. 8) a todos os [appReveal] descendentes. */
@Directive({ selector: '[appRevealGroup]', standalone: true })
export class RevealGroupDirective implements AfterContentInit {
  private readonly children = contentChildren(RevealDirective, { descendants: true });

  ngAfterContentInit(): void {
    this.children().forEach((child, index) => {
      child.staggerIndex = Math.min(index, REVEAL_MAX_STAGGER_INDEX);
    });
  }
}
