import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtualizarOperacaoComponent } from './atualizar-operacao.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Service } from 'src/app/service/service';
import Swal from 'sweetalert2';

describe('AtualizarOperacaoComponent', () => {
  let component: AtualizarOperacaoComponent;
  let fixture: ComponentFixture<AtualizarOperacaoComponent>;
  let service: jasmine.SpyObj<Service>;
  let router: Router;

  beforeEach(async () => {
    const serviceMock = jasmine.createSpyObj('Service', [
      'buscarOperacaoPorId',
      'atualizarOperacao',
      'deletarOperacao',
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [AtualizarOperacaoComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: Service, useValue: serviceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '1' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AtualizarOperacaoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(Service) as jasmine.SpyObj<Service>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if the form is invalid', () => {
    component.operacaoForm.patchValue({ nome: '' });

    const swalSpy = spyOn(Swal, 'fire');

    component.enviar();

    expect(swalSpy).toHaveBeenCalledWith(
      'Erro!',
      'Preencha todos os campos corretamente.',
      'error'
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
});
