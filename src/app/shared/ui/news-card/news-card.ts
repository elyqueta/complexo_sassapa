import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../../core/models/noticia';
import { MediaImage } from '../media-image/media-image';
import { CategoryTag } from '../category-tag/category-tag';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [RouterLink, MediaImage, CategoryTag],
  templateUrl: './news-card.html',
})
export class NewsCard {
  readonly noticia = input.required<Noticia>();
}
