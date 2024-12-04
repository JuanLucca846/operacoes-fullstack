import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IListaOperacao } from 'src/app/interfaces/IListaOperacao';
import { IListaOperacoes } from 'src/app/interfaces/IListaOperacoes';
import { PagerService } from 'src/app/service/pager.service';
import { Service } from 'src/app/service/service';

@Component({
  selector: 'app-detalhes-operacoes',
  templateUrl: './detalhes-operacoes.component.html',
  styleUrls: ['./detalhes-operacoes.component.scss'],
})
export class DetalhesOperacoesComponent implements OnInit {
  operacao: IListaOperacao;

  constructor(private service: Service, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe((params) => {
      const id = parseInt(params[0].path, 10);
      if (id) {
        this.detalhesOperacao(id);
      }
    });
  }

  detalhesOperacao(id: number): void {
    this.service.buscarOperacaoPorId(id).subscribe(
      (resultado: IListaOperacao) => {
        this.operacao = resultado;
      },
      (error) => {
        console.log('Erro', error);
      }
    );
  }
}
