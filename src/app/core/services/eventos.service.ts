import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';
import { EVENTOS_MOCK } from '../data/eventos.mock';

@Injectable({ providedIn: 'root' })
export class EventosService {
  listar(): Promise<Evento[]> {
    return Promise.resolve([...EVENTOS_MOCK]);
  }
}
