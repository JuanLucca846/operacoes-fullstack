import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesOperacoesComponent } from './detalhes-operacoes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Service } from 'src/app/service/service';
import { of } from 'rxjs';
import { IListaOperacao } from 'src/app/interfaces/IListaOperacao';

describe('DetalhesOperacoesComponent', () => {
  let component: DetalhesOperacoesComponent;
  let fixture: ComponentFixture<DetalhesOperacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DetalhesOperacoesComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            url: of([
              { path: '1', parameters: {}, parameterMap: {} },
            ] as UrlSegment[]), // Corrigido para um array de UrlSegment
            paramMap: of({ get: (key: string) => '1' }),
          },
        },
        {
          provide: Service,
          useValue: {
            buscarOperacaoPorId: () => of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhesOperacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find operation by id', () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    const service = TestBed.inject(Service);

    const idMock = 1;
    const operacaoMock: IListaOperacao = {
      id: idMock,
      nome: 'Operação Pix',
      descricao: 'Cadastrando uma nova operação pix.',
      categoria: 'Java',
      autenticacao: 'JwT',
      permissao: 'Todos',
      requisicao: [{ nome: 'Valor', tipo: 'int' }],
      resposta: [{ nome: 'statusCode', tipo: 'int' }],
    };

    service.buscarOperacaoPorId = jasmine
      .createSpy()
      .and.returnValue(of(operacaoMock));

    activatedRoute.url = of([{ path: idMock.toString() }] as UrlSegment[]);

    component.ngOnInit();

    expect(service.buscarOperacaoPorId).toHaveBeenCalledWith(idMock);
    expect(component.operacao).toEqual(operacaoMock);
  });
});
