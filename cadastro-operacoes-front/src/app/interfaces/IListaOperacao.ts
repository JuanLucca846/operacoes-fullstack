import { IReqOperacao } from './IReqOperacao';
import { IResOperacao } from './IResOperacao';

export interface IListaOperacao {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  autenticacao: string;
  permissao: string;
  requisicao: IReqOperacao[];
  resposta: IResOperacao[];
}
