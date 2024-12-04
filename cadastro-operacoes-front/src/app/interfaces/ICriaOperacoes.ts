import { IReqOperacao } from './IReqOperacao';
import { IResOperacao } from './IResOperacao';

export interface ICriaOperacoes {
  nome: string;
  descricao: string;
  categoria: string;
  autenticacao: string;
  permissao: string;
  requisicao: IReqOperacao;
  resposta: IResOperacao;
}
