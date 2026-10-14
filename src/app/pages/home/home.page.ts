import { Component, inject, signal } from '@angular/core';
import { Noticia } from '../../core/models/noticia';
import { Evento } from '../../core/models/evento';
import { Estatistica } from '../../core/models/estatistica';
import { NoticiasService } from '../../core/services/noticias.service';
import { EventosService } from '../../core/services/eventos.service';
import { EstatisticasService } from '../../core/services/estatisticas.service';
import { Hero } from './sections/hero/hero';
import { NewsStrip } from './sections/news-strip/news-strip';
import { Agenda } from './sections/agenda/agenda';
import { VideoSection } from './sections/video/video';
import { StatsSection } from './sections/stats/stats';
import { SectionDots, SeccaoDot } from '../../shared/ui/section-dots/section-dots';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, NewsStrip, Agenda, VideoSection, StatsSection, SectionDots],
  templateUrl: './home.page.html',
})
export class Home {
  protected readonly noticias = signal<Noticia[]>([]);
  protected readonly eventos = signal<Evento[]>([]);
  protected readonly estatisticas = signal<Estatistica[]>([]);

  protected readonly seccoes: readonly SeccaoDot[] = [
    { id: 'inicio', label: 'Início', icon: 'home' },
    { id: 'noticias', label: 'Notícias', icon: 'news' },
    { id: 'agenda', label: 'Agenda', icon: 'calendar' },
    { id: 'video', label: 'Vídeo', icon: 'video' },
    { id: 'numeros', label: 'Números', icon: 'chart' },
  ];

  private readonly noticiasService = inject(NoticiasService);
  private readonly eventosService = inject(EventosService);
  private readonly estatisticasService = inject(EstatisticasService);

  constructor() {
    // Camada de dados: hoje mock, amanhã a API do backoffice (só muda o serviço).
    this.noticiasService.listar().then((dados) => this.noticias.set(dados));
    this.eventosService.listar().then((dados) => this.eventos.set(dados));
    this.estatisticasService.listar().then((dados) => this.estatisticas.set(dados));
  }
}
