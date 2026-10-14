import { Component, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MediaImage } from '../media-image/media-image';
import { Icon } from '../icon/icon';

/** Fachada de vídeo do YouTube: só carrega o iframe após clique do utilizador. */
@Component({
  selector: 'app-youtube-facade',
  standalone: true,
  imports: [MediaImage, Icon],
  templateUrl: './youtube-facade.html',
})
export class YoutubeFacade {
  readonly youtubeId = input.required<string>();
  readonly titulo = input.required<string>();
  readonly poster = input.required<string>();
  readonly posterAlt = input('');

  protected readonly playing = signal(false);
  private readonly sanitizer = inject(DomSanitizer);

  protected get embedUrl(): SafeResourceUrl {
    const url = `https://www.youtube-nocookie.com/embed/${this.youtubeId()}?autoplay=1&rel=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
