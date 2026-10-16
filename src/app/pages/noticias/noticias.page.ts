import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../core/models/noticia';
import { Evento } from '../../core/models/evento';
import { NoticiasService } from '../../core/services/noticias.service';
import { EventosService } from '../../core/services/eventos.service';
import { PageHero } from '../../shared/ui/page-hero/page-hero';
import { Container } from '../../shared/ui/container/container';
import { MediaImage } from '../../shared/ui/media-image/media-image';
import { Logo } from '../../shared/ui/logo/logo';
import { VerticalLabel } from '../../shared/ui/vertical-label/vertical-label';
import { CategoryTag } from '../../shared/ui/category-tag/category-tag';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PageHero,
    Container,
    MediaImage,
    Logo,
    VerticalLabel,
    CategoryTag,
  ],
  templateUrl: './noticias.page.html',
})
export class Noticias {
  protected readonly noticias = signal<Noticia[]>([]);
  protected readonly eventos = signal<Evento[]>([]);

  private readonly noticiasService = inject(NoticiasService);
  private readonly eventosService = inject(EventosService);

  constructor() {
    this.noticiasService.listar().then((dados) => this.noticias.set(dados));
    this.eventosService.listar().then((dados) => this.eventos.set(dados));
  }
}