import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAtualizaOperacoes } from 'src/app/interfaces/IAtualizaOperacoes';
import { IListaOperacao } from 'src/app/interfaces/IListaOperacao';
import { IReqOperacao } from 'src/app/interfaces/IReqOperacao';
import { IResOperacao } from 'src/app/interfaces/IResOperacao';
import { Service } from 'src/app/service/service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atualizar-operacao',
  templateUrl: './atualizar-operacao.component.html',
  styleUrls: ['./atualizar-operacao.component.scss'],
})
export class AtualizarOperacaoComponent {
  requisicoes: IReqOperacao[] = [{ nome: '', tipo: '' }];
  respostas: IResOperacao[] = [{ nome: '', tipo: '' }];
  edit = false;
  operacaoId: number | null = null;

  operacaoForm = new FormGroup({
    id: new FormControl(),
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    descricao: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(70),
    ]),
    categoria: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(70),
    ]),
    autenticacao: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(70),
    ]),
    permissao: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(70),
    ]),
    requisicao: new FormArray([
      new FormGroup({
        nome: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(70),
        ]),
        tipo: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(70),
        ]),
      }),
    ]),
    resposta: new FormArray([
      new FormGroup({
        nome: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(70),
        ]),
        tipo: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(70),
        ]),
      }),
    ]),
  });

  get requisicoesArray() {
    return this.operacaoForm.get('requisicao') as FormArray;
  }

  get respostasArray() {
    return this.operacaoForm.get('resposta') as FormArray;
  }

  constructor(
    private service: Service,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.operacaoId = parseInt(params.get('id')!, 10);

      if (this.operacaoId) {
        (this.edit = true),
          this.service
            .buscarOperacaoPorId(this.operacaoId)
            .subscribe((operacao: IListaOperacao) => {
              this.operacaoForm.patchValue(operacao);
            });
      }
    });
  }

  enviar() {
    if (this.operacaoForm.invalid) {
      Swal.fire('Erro!', 'Preencha todos os campos corretamente.', 'error');
      return;
    }

    const operacao = this.operacaoForm.value as IAtualizaOperacoes;

    this.service.atualizarOperacao(operacao).subscribe((resultado) => {
      Swal.fire({
        title: 'Operação atualizada com sucesso!',
        text: 'Sucesso!',
        icon: 'success',
      });

      this.deletarOperacao(operacao.id);
    });
  }

  deletarOperacao(operacaoId: number) {
    Swal.fire({
      title: 'Deseja deletar a versão anterior da operação ?',
      text: 'Confirme!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deletarOperacao(operacaoId.toString()).subscribe(() => {
          Swal.fire(
            'Versão anterior da operação deletada',
            'A operação foi deletada com sucesso!',
            'success'
          );
          this.router.navigateByUrl('/lista');
        });
      } else {
        this.router.navigateByUrl('/lista');
      }
    });
  }

  adicionarCampoReq() {
    this.requisicoesArray.push(
      new FormGroup({
        nome: new FormControl('', Validators.required),
        tipo: new FormControl('', Validators.required),
      })
    );
  }

  removerCampoReq(index: number) {
    this.requisicoesArray.removeAt(index);
  }

  adicionarCampoRes() {
    this.respostasArray.push(
      new FormGroup({
        nome: new FormControl('', Validators.required),
        tipo: new FormControl('', Validators.required),
      })
    );
  }

  removerCampoRes(index: number) {
    this.respostasArray.removeAt(index);
  }
}
