import { Injectable } from '@angular/core';
import { Estatistica } from '../models/estatistica';
import { ESTATISTICAS_MOCK } from '../data/estatisticas.mock';

@Injectable({ providedIn: 'root' })
export class EstatisticasService {
  listar(): Promise<Estatistica[]> {
    return Promise.resolve([...ESTATISTICAS_MOCK]);
  }
}
