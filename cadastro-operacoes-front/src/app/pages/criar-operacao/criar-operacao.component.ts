import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICriaOperacoes } from 'src/app/interfaces/ICriaOperacoes';
import { IReqOperacao } from 'src/app/interfaces/IReqOperacao';
import { IResOperacao } from 'src/app/interfaces/IResOperacao';
import { Service } from 'src/app/service/service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criar-operacao',
  templateUrl: './criar-operacao.component.html',
  styleUrls: ['./criar-operacao.component.scss'],
})
export class CriarOperacaoComponent {
  requisicoes: IReqOperacao[] = [{ nome: '', tipo: '' }];
  respostas: IResOperacao[] = [{ nome: '', tipo: '' }];
  etapa: number = 1;

  operacaoForm = new FormGroup({
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

  constructor(private service: Service, private router: Router) {}

  enviar() {
    if (this.operacaoForm.invalid) {
      Swal.fire('Erro!', 'Preencha todos os campos corretamente.', 'error');
      return;
    }

    const operacao: ICriaOperacoes = {
      nome: this.operacaoForm.value.nome!,
      descricao: this.operacaoForm.value.descricao!,
      categoria: this.operacaoForm.value.categoria!,
      autenticacao: this.operacaoForm.value.autenticacao!,
      permissao: this.operacaoForm.value.permissao!,
      requisicao: this.requisicoesArray.value.map((req: any) => ({
        nome: req.nome!,
        tipo: req.tipo!,
      })),
      resposta: this.respostasArray.value.map((res: any) => ({
        nome: res.nome!,
        tipo: res.tipo!,
      })),
    };

    this.service.cadastrarOperacao(operacao).subscribe(
      (result) => {
        Swal.fire('Sucesso!', 'Nova operação cadastrada!', 'success');
        this.router.navigateByUrl('/lista');
      },
      (error) => {
        Swal.fire('Erro!', 'Não foi possível cadastrar a operação.', 'error');
      }
    );
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

  proximaEtapa() {
    if (this.etapa < 4) this.etapa++;
  }

  etapaAnterior() {
    if (this.etapa > 1) this.etapa--;
  }
}
