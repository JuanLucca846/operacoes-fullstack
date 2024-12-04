import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IListaOperacoes } from 'src/app/interfaces/IListaOperacoes';
import { PagerService } from 'src/app/service/pager.service';
import { Service } from 'src/app/service/service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-operacoes',
  templateUrl: './listar-operacoes.component.html',
  styleUrls: ['./listar-operacoes.component.scss'],
})
export class ListarOperacoesComponent {
  operacoes: IListaOperacoes[] = [];
  operacoesVisiveis: IListaOperacoes[] = [];
  operacoesPaginadas: IListaOperacoes[] = [];
  operacoesFiltradas: IListaOperacoes[] = [];
  pager: any = {};
  query: string = '';

  constructor(private pagerService: PagerService, private service: Service) {}

  ngOnInit() {
    this.buscarTodasOperacoes();
  }

  buscarTodasOperacoes() {
    this.service.buscarTodasOperacoes().subscribe(
      (resultado: IListaOperacoes[]) => {
        this.operacoes = resultado;
        this.operacoesVisiveis = resultado;
        this.mudarPaginas(1);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  mudarPaginas(pagina: number) {
    this.pager = this.pagerService.paginacao(
      this.operacoesVisiveis.length,
      pagina
    );
    this.operacoesPaginadas = this.operacoesVisiveis.slice(
      this.pager.indexInicial,
      this.pager.indexFinal + 1
    );
  }

  deletarOperacao(operacaoId: string) {
    Swal.fire({
      title: 'Deseja deletar essa operação ?',
      text: 'Confirme!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deletarOperacao(operacaoId).subscribe(() => {
          Swal.fire(
            'Operação deletada!',
            'A operação foi deletada com sucesso!',
            'success'
          );
          this.buscarTodasOperacoes();
        });
      }
    });
  }

  buscarOperacoesNomeDescCat() {
    if (this.query === '') {
      this.operacoesVisiveis = this.operacoes;
    } else {
      this.service
        .buscarOperacaoNomeDescCat(this.query)
        .subscribe((resultado: IListaOperacoes[]) => {
          this.operacoesVisiveis = resultado;
        });
    }
    this.mudarPaginas(1);
  }
}
