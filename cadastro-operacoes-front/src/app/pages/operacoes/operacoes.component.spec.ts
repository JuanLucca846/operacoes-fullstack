import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacoesComponent } from './operacoes.component';
import { ListarOperacoesComponent } from './listar-operacoes/listar-operacoes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PagerService } from 'src/app/service/pager.service';
import { DetalhesOperacoesComponent } from './detalhes-operacoes/detalhes-operacoes.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('OperacoesComponent', () => {
  let component: OperacoesComponent;
  let fixture: ComponentFixture<OperacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [
        OperacoesComponent,
        ListarOperacoesComponent,
        DetalhesOperacoesComponent,
      ],
      providers: [
        {
          provide: PagerService,
          useValue: { getPager: () => ({}) },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => '1' }),
            url: of([{ path: '1' }]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OperacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
