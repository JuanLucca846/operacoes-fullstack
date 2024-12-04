import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IListaOperacoes } from '../interfaces/IListaOperacoes';
import { ICriaOperacoes } from '../interfaces/ICriaOperacoes';
import { IAtualizaOperacoes } from '../interfaces/IAtualizaOperacoes';
import { Observable } from 'rxjs';
import { IListaOperacao } from '../interfaces/IListaOperacao';

@Injectable({
  providedIn: 'root',
})
export class Service {
  api = 'http://localhost:8080/api/v1/operacoes';

  constructor(private httpClient: HttpClient) {}

  buscarTodasOperacoes() {
    return this.httpClient.get<IListaOperacoes[]>(this.api);
  }

  cadastrarOperacao(operacao: ICriaOperacoes) {
    return this.httpClient.post<ICriaOperacoes>(this.api, operacao);
  }

  buscarOperacaoPorId(operacaoId: number): Observable<IListaOperacao> {
    return this.httpClient.get<IListaOperacao>(`${this.api}/${operacaoId}`);
  }

  buscarOperacaoNomeDescCat(query: string): Observable<IListaOperacoes[]> {
    return this.httpClient.get<IListaOperacoes[]>(
      `${this.api}/busca?parametro=${query}`
    );
  }

  atualizarOperacao(operacao: IAtualizaOperacoes) {
    return this.httpClient.put<IAtualizaOperacoes>(
      `${this.api}/${operacao.id}`,
      operacao
    );
  }

  deletarOperacao(operacaoId: string) {
    return this.httpClient.delete(`${this.api}/${operacaoId}`);
  }
}
