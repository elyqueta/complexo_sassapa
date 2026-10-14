import { Component, input } from '@angular/core';
import { Estatistica } from '../../../../core/models/estatistica';
import { Container } from '../../../../shared/ui/container/container';
import { StatBlock } from '../../../../shared/ui/stat-block/stat-block';
import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';
import { RevealGroupDirective } from '../../../../shared/directives/reveal/reveal-group.directive';

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [Container, StatBlock, RevealDirective, RevealGroupDirective],
  templateUrl: './stats.html',
})
export class StatsSection {
  readonly estatisticas = input<Estatistica[]>([]);
}
