import { Component, input } from '@angular/core';
import { Evento } from '../../../../core/models/evento';
import { EventBar } from '../../../../shared/ui/event-bar/event-bar';
import { VerticalLabel } from '../../../../shared/ui/vertical-label/vertical-label';
import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';
import { Container } from '../../../../shared/ui/container/container';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [EventBar, VerticalLabel, RevealDirective, Container],
  templateUrl: './agenda.html',
})
export class Agenda {
  readonly eventos = input<Evento[]>([]);
}
