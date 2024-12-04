import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CriarOperacaoComponent } from './criar-operacao.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { Service } from 'src/app/service/service';
import { ICriaOperacoes } from 'src/app/interfaces/ICriaOperacoes';
import { Router } from '@angular/router';

describe('CriarOperacaoComponent', () => {
  let component: CriarOperacaoComponent;
  let fixture: ComponentFixture<CriarOperacaoComponent>;
  let service: jasmine.SpyObj<Service>;
  let router: Router;

  beforeEach(async () => {
    const serviceMock = jasmine.createSpyObj('Service', ['cadastrarOperacao']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [CriarOperacaoComponent],
      providers: [{ provide: Service, useValue: serviceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CriarOperacaoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(Service) as jasmine.SpyObj<Service>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(U) requisicoesArray() and respostasArray(): 
    should be array`, () => {
    component.operacaoForm = new FormGroup({
      nome: new FormControl<string | null>(null),
      descricao: new FormControl<string | null>(null),
      categoria: new FormControl<string | null>(null),
      autenticacao: new FormControl<string | null>(null),
      permissao: new FormControl<string | null>(null),
      requisicao: new FormArray([
        new FormGroup({
          nome: new FormControl<string | null>(null),
          tipo: new FormControl<string | null>(null),
        }),
      ]),
      resposta: new FormArray([
        new FormGroup({
          nome: new FormControl<string | null>(null),
          tipo: new FormControl<string | null>(null),
        }),
      ]),
    });

    expect(component.requisicoesArray.length).toBe(1);

    expect(component.respostasArray.length).toBe(1);
  });

  it(`(U) should show error if the form is invalid`, () => {
    component.operacaoForm.controls['nome'].setValue('');

    const swalSpy = spyOn(Swal, 'fire');

    component.enviar();

    expect(swalSpy).toHaveBeenCalledWith(
      'Erro!',
      'Preencha todos os campos corretamente.',
      'error'
    );
  });

  it(`(U) should create a operation`, () => {
    component.operacaoForm.controls['nome'].setValue('Operação Pix');
    component.operacaoForm.controls['descricao'].setValue(
      'Cadastrando uma nova operação pix.'
    );
    component.operacaoForm.controls['categoria'].setValue('Java');
    component.operacaoForm.controls['autenticacao'].setValue('JwT');
    component.operacaoForm.controls['permissao'].setValue('Todos');
    (component.requisicoesArray.at(0) as FormGroup).controls['nome'].setValue(
      'Valor'
    );
    (component.requisicoesArray.at(0) as FormGroup).controls['tipo'].setValue(
      'int'
    );
    (component.respostasArray.at(0) as FormGroup).controls['nome'].setValue(
      'statusCode'
    );
    (component.respostasArray.at(0) as FormGroup).controls['tipo'].setValue(
      'int'
    );

    const operacaoMock: ICriaOperacoes = {
      nome: 'Operação Pix',
      descricao: 'Cadastrando uma nova operação pix.',
      categoria: 'Java',
      autenticacao: 'JwT',
      permissao: 'Todos',
      requisicao: { nome: 'Valor', tipo: 'int' },
      resposta: { nome: 'statusCode', tipo: 'int' },
    };

    service.cadastrarOperacao.and.returnValue(of(operacaoMock));

    const navigateSpy = spyOn(router, 'navigateByUrl');
    const swalSpy = spyOn(Swal, 'fire');

    component.enviar();

    expect(navigateSpy).toHaveBeenCalledWith('/lista');
    expect(swalSpy).toHaveBeenCalledWith(
      'Sucesso!',
      'Nova operação cadastrada!',
      'success'
    );
  });

  it(`(U) should add a field to requisicoesArray`, () => {
    component.adicionarCampoReq();

    expect(component.requisicoesArray.length).toBe(2);
  });

  it(`(U) should remove a field from requisicoesArray`, () => {
    component.removerCampoReq(0);

    expect(component.requisicoesArray.length).toBe(0);
  });

  it(`(U) should add a field to respostasArray`, () => {
    component.adicionarCampoRes();

    expect(component.respostasArray.length).toBe(2);
  });

  it(`(U) should remove a field from respostasArray`, () => {
    component.removerCampoRes(0);

    expect(component.respostasArray.length).toBe(0);
  });

  it(`(U) should go to the next step`, () => {
    component.etapa = 1;

    component.proximaEtapa();

    expect(component.etapa).toBe(2);
  });

  it(`(U) Should stop on step 4`, () => {
    component.etapa = 4;

    component.proximaEtapa();

    expect(component.etapa).toBe(4);
  });

  it(`(U) should go to the previous step`, () => {
    component.etapa = 4;

    component.etapaAnterior();

    expect(component.etapa).toBe(3);
  });

  it(`(U) should stop on step 1`, () => {
    component.etapa = 1;

    component.etapaAnterior();

    expect(component.etapa).toBe(1);
  });
});
