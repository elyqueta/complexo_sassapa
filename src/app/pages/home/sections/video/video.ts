import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VIDEO_APRESENTACAO } from '../../../../core/config/site.config';
import { MediaImage } from '../../../../shared/ui/media-image/media-image';
import { CategoryTag } from '../../../../shared/ui/category-tag/category-tag';
import { VerticalLabel } from '../../../../shared/ui/vertical-label/vertical-label';
import { YoutubeFacade } from '../../../../shared/ui/youtube-facade/youtube-facade';
import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';

interface CartaoVideo {
  categoria: string;
  titulo: string;
  rota: string;
  imagem: string;
  alt: string;
}

@Component({
  selector: 'app-video-section',
  standalone: true,
  imports: [
    RouterLink,
    MediaImage,
    CategoryTag,
    VerticalLabel,
    YoutubeFacade,
    RevealDirective,
  ],
  templateUrl: './video.html',
})
export class VideoSection {
  protected readonly video = VIDEO_APRESENTACAO;

  protected readonly fundoImg =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Skola_i_provinsen_Huambo%2C_Angola.jpg/1280px-Skola_i_provinsen_Huambo%2C_Angola.jpg';
  protected readonly posterImg = 'https://upload.wikimedia.org/wikipedia/commons/3/38/Kuito_class.jpg';

  protected readonly cartoes: readonly CartaoVideo[] = [
    {
      categoria: "Gal'",
      titulo: 'Galeria de actividades',
      rota: '/galeria',
      imagem:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Angola_colegio_psv.JPG/1280px-Angola_colegio_psv.JPG',
      alt: 'Alunos angolanos no átrio da escola',
    },
    {
      categoria: "Edu'",
      titulo: 'Ciclos de ensino',
      rota: '/educacao',
      imagem:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Escola_Eiffel_%28Angola-Bengo%29_P1050_05-07-12.jpg/1280px-Escola_Eiffel_%28Angola-Bengo%29_P1050_05-07-12.jpg',
      alt: 'Alunos de uma escola em Bengo numa actividade de grupo',
    },
    {
      categoria: "Act'",
      titulo: 'Notícias e eventos',
      rota: '/noticias',
      imagem:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Escola_Eiffel_%28Angola-Bengo%29_P1331_29-06-12.jpg/1280px-Escola_Eiffel_%28Angola-Bengo%29_P1331_29-06-12.jpg',
      alt: 'Alunos de uma escola angolana em sala de aula',
    },
  ];
}
