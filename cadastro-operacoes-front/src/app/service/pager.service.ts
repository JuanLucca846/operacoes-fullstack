import { Injectable } from '@angular/core';

@Injectable()
export class PagerService {
  paginacao(
    itensTotais: number,
    paginaAtual: number = 1,
    tamanhoPagina: number = 4
  ) {
    const paginasTotais = Math.ceil(itensTotais / tamanhoPagina);

    if (paginaAtual < 1) {
      paginaAtual = 1;
    } else if (paginaAtual > paginasTotais) {
      paginaAtual = paginasTotais;
    }

    let paginaInicial: number, paginaFinal: number;
    if (paginasTotais <= 6) {
      paginaInicial = 1;
      paginaFinal = paginasTotais;
    } else {
      if (paginaAtual <= 6) {
        paginaInicial = 1;
        paginaFinal = 6;
      } else if (paginaAtual + 2 >= paginasTotais) {
        paginaInicial = paginasTotais - 5;
        paginaFinal = paginasTotais;
      } else {
        paginaInicial = paginaAtual - 3;
        paginaFinal = paginaAtual + 2;
      }
    }

    const indexInicial = (paginaAtual - 1) * tamanhoPagina;
    const indexFinal = Math.min(
      indexInicial + tamanhoPagina - 1,
      itensTotais - 1
    );

    const paginas = Array.from(
      Array(paginaFinal + 1 - paginaInicial).keys()
    ).map((i) => paginaInicial + i);

    return {
      itensTotais: itensTotais,
      paginaAtual: paginaAtual,
      tamanhoPagina: tamanhoPagina,
      paginasTotais: paginasTotais,
      paginaInicial: paginaInicial,
      paginaFinal: paginaFinal,
      indexInicial: indexInicial,
      indexFinal: indexFinal,
      paginas: paginas,
    };
  }
}
