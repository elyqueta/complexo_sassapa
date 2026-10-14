import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Container } from '../../shared/ui/container/container';
import { TopoPattern } from '../../shared/ui/topo-pattern/topo-pattern';
import { Button } from '../../shared/ui/button/button';
import { RevealDirective } from '../../shared/directives/reveal/reveal.directive';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [RouterLink, Container, TopoPattern, Button, RevealDirective],
  templateUrl: './coming-soon.page.html',
})
export class ComingSoon {}
