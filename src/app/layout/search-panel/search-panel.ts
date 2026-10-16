import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SEARCH_SUGGESTIONS } from '../../core/data/search-index';
import { SearchService } from '../../core/services/search.service';
import { UiStateService } from '../../core/services/ui-state.service';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-search-panel',
  standalone: true,
  templateUrl: './search-panel.html',
  imports: [RouterLink, Icon],
})
export class SearchPanel {
  @ViewChild('searchInput') private searchInput?: ElementRef<HTMLInputElement>;

  private readonly ui = inject(UiStateService);
  private readonly searchService = inject(SearchService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly aberto = this.ui.pesquisaAberta;
  protected readonly sugestoes = SEARCH_SUGGESTIONS;
  protected readonly query = signal('');
  private readonly debouncedQuery = signal('');
  protected readonly resultados = computed(() => this.searchService.search(this.debouncedQuery()));
  protected readonly grupos = computed(() => {
    const groups = new Map<string, ReturnType<SearchService['search']>>();
    for (const result of this.resultados()) {
      groups.set(result.kind, [...(groups.get(result.kind) ?? []), result]);
    }
    return [...groups.entries()].map(([kind, results]) => ({ kind, results }));
  });
  protected readonly resultadoActivo = signal(0);
  private debounceTimer = 0;

  constructor() {
    effect((onCleanup) => {
      if (!this.aberto() || !isPlatformBrowser(this.platformId)) return;
      const focusTimer = window.setTimeout(() => this.searchInput?.nativeElement.focus());
      onCleanup(() => window.clearTimeout(focusTimer));
    });
  }

  protected actualizarConsulta(value: string): void {
    this.query.set(value);
    this.resultadoActivo.set(0);
    if (!isPlatformBrowser(this.platformId)) {
      this.debouncedQuery.set(value);
      return;
    }
    window.clearTimeout(this.debounceTimer);
    this.debounceTimer = window.setTimeout(() => this.debouncedQuery.set(value), 120);
  }

  protected onInput(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) this.actualizarConsulta(target.value);
  }

  protected fechar(): void {
    this.ui.fecharPesquisa();
    if (isPlatformBrowser(this.platformId)) {
      queueMicrotask(() => document.getElementById('header-search')?.focus());
    }
  }

  protected escolher(resultId: string): void {
    const result = this.resultados().find((item) => item.id === resultId);
    if (!result) return;
    void this.router.navigateByUrl(result.href);
    this.fechar();
  }

  protected resultadoId(index: number): string {
    return this.resultados()[index]?.id ?? '';
  }

  protected indexOf(resultId: string): number {
    return this.resultados().findIndex((result) => result.id === resultId);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.fechar();
      return;
    }

    const count = this.resultados().length;
    if (event.key === 'ArrowDown' && count) {
      event.preventDefault();
      this.resultadoActivo.update((index) => (index + 1) % count);
    } else if (event.key === 'ArrowUp' && count) {
      event.preventDefault();
      this.resultadoActivo.update((index) => (index - 1 + count) % count);
    } else if (event.key === 'Enter' && count) {
      event.preventDefault();
      this.escolher(this.resultadoId(this.resultadoActivo()));
    } else if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  private trapFocus(event: KeyboardEvent): void {
    const focusable = this.getFocusableElements();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private getFocusableElements(): HTMLElement[] {
    return Array.from(
      document.querySelectorAll<HTMLElement>(
        '#search-panel input, #search-panel button:not([disabled]), #search-panel a[href]',
      ),
    ).filter((element) => element.offsetParent !== null);
  }
}
