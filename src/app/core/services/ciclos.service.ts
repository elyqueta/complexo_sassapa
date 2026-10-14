import { Injectable } from '@angular/core';
import { Ciclo } from '../models/ciclo';
import { CICLOS_MOCK } from '../data/ciclos.mock';

@Injectable({ providedIn: 'root' })
export class CiclosService {
  listar(): Promise<Ciclo[]> {
    return Promise.resolve([...CICLOS_MOCK]);
  }

  obter(slug: string): Promise<Ciclo | undefined> {
    return Promise.resolve(CICLOS_MOCK.find((ciclo) => ciclo.slug === slug));
  }
}
