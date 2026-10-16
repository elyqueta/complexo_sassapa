import { Component, inject, signal } from '@angular/core';
import { Ciclo } from '../../core/models/ciclo';
import { Evento } from '../../core/models/evento';
import { Estatistica } from '../../core/models/estatistica';
import { CiclosService } from '../../core/services/ciclos.service';
import { EventosService } from '../../core/services/eventos.service';
import { EstatisticasService } from '../../core/services/estatisticas.service';
import { PageHero } from '../../shared/ui/page-hero/page-hero';
import { Agenda } from './sections/agenda/agenda';
import { VideoSection } from './sections/video/video';
import { StatsSection } from './sections/stats/stats';
import { SectionDots, SeccaoDot } from '../../shared/ui/section-dots/section-dots';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageHero, Agenda, VideoSection, StatsSection, SectionDots],
  templateUrl: './home.page.html',
})
export class Home {
  protected readonly ciclos = signal<Ciclo[]>([]);
  protected readonly eventos = signal<Evento[]>([]);
  protected readonly estatisticas = signal<Estatistica[]>([]);

  protected readonly seccoes: readonly SeccaoDot[] = [
    { id: 'inicio', label: 'Início', icon: '/assets/brand/home-angle-svgrepo-com.svg' },
    { id: 'agenda', label: 'Agenda', icon: '/assets/brand/schedule-svgrepo-com.svg' },
    { id: 'video', label: 'Vídeo', icon: '/assets/brand/video-library-svgrepo-com.svg' },
    { id: 'numeros', label: 'Números', icon: '/assets/brand/laptop-minimalistic-svgrepo-com.svg' },
  ];

  private readonly ciclosService = inject(CiclosService);
  private readonly eventosService = inject(EventosService);
  private readonly estatisticasService = inject(EstatisticasService);

  constructor() {
    this.ciclosService.listar().then((dados) => this.ciclos.set(dados));
    this.eventosService.listar().then((dados) => this.eventos.set(dados));
    this.estatisticasService.listar().then((dados) => this.estatisticas.set(dados));
  }
}