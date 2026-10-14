import { Injectable } from '@angular/core';
import { Inscricao } from '../models/inscricao';

export interface ResultadoInscricao {
  ok: boolean;
  protocolo: string;
}

@Injectable({ providedIn: 'root' })
export class InscricoesService {
  // Mock: guarda o pedido localmente e devolve um protocolo fictício.
  submeter(inscricao: Inscricao): Promise<ResultadoInscricao> {
    const protocolo = `SASSAPA-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000,
    )}`;
    console.info('[mock] inscrição recebida', { protocolo, inscricao });
    return Promise.resolve({ ok: true, protocolo });
  }
}
