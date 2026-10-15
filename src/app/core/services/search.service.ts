import { Injectable } from '@angular/core';
import { CICLOS_MOCK } from '../data/ciclos.mock';
import { NOTICIAS_MOCK } from '../data/noticias.mock';
import { SEARCH_INDEX, SearchIndexEntry } from '../data/search-index';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly index: readonly SearchIndexEntry[] = [
    ...SEARCH_INDEX,
    ...CICLOS_MOCK.map((ciclo) => ({
      id: `ciclo-${ciclo.slug}`,
      title: ciclo.nome,
      description: ciclo.resumo,
      kind: 'Ciclo',
      href: `/educacao/${ciclo.slug}`,
    })),
    ...CICLOS_MOCK.flatMap((ciclo) =>
      [...ciclo.classes, ...ciclo.cursos].map((curso) => ({
        id: `curso-${ciclo.slug}-${curso}`,
        title: curso,
        description: `${curso} — ${ciclo.nome}`,
        kind: 'Curso',
        href: `/educacao/${ciclo.slug}`,
      })),
    ),
    ...NOTICIAS_MOCK.map((noticia) => ({
      id: `noticia-${noticia.id}`,
      title: noticia.titulo,
      description: noticia.resumo,
      kind: 'Notícia',
      href: '/noticias',
    })),
  ];

  search(query: string): SearchIndexEntry[] {
    const term = query.trim().toLocaleLowerCase('pt');
    if (!term) return [];

    return this.index
      .filter((item) =>
        `${item.title} ${item.description}`.toLocaleLowerCase('pt').includes(term),
      )
      .slice(0, 12);
  }
}
