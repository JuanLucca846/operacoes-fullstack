import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOperacoesComponent } from './listar-operacoes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PagerService } from 'src/app/service/pager.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Service } from 'src/app/service/service';
import { IListaOperacao } from 'src/app/interfaces/IListaOperacao';
import { IListaOperacoes } from 'src/app/interfaces/IListaOperacoes';

describe('ListarOperacoesComponent', () => {
  let component: ListarOperacoesComponent;
  let fixture: ComponentFixture<ListarOperacoesComponent>;
  let serviceMock: jasmine.SpyObj<Service>;

  beforeEach(async () => {
    serviceMock = jasmine.createSpyObj('Service', [
      'buscarTodasOperacoes',
      'buscarOperacaoNomeDescCat',
      'deletarOperacao',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ListarOperacoesComponent],
      providers: [
        {
          provide: PagerService,
          useValue: {
            paginacao: (totalItems: number, pagina: number) => {
              return {
                indexInicial: 0,
                indexFinal: 5,
                totalItems: totalItems,
                currentPage: pagina,
              };
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarOperacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(U) should find all operations`, () => {
    const serviceSpy = spyOn(
      component['service'],
      'buscarTodasOperacoes'
    ).and.returnValue(of([]));

    component.ngOnInit();

    expect(serviceSpy).toHaveBeenCalled();
  });
});
