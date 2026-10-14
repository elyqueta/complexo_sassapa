import { Injectable } from '@angular/core';
import { Album } from '../models/album';
import { ALBUNS_MOCK } from '../data/galeria.mock';

@Injectable({ providedIn: 'root' })
export class GaleriaService {
  listarAlbuns(): Promise<Album[]> {
    return Promise.resolve([...ALBUNS_MOCK]);
  }
}
