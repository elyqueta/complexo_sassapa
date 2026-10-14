import { Injectable } from '@angular/core';
import { Noticia } from '../models/noticia';
import { NOTICIAS_MOCK } from '../data/noticias.mock';

@Injectable({ providedIn: 'root' })
export class NoticiasService {
  listar(): Promise<Noticia[]> {
    // Mock: devolve uma cópia para que a UI nunca mutar os dados de origem.
    return Promise.resolve([...NOTICIAS_MOCK]);
  }
}
