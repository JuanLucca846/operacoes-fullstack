import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarOperacaoComponent } from './pages/criar-operacao/criar-operacao.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { AtualizarOperacaoComponent } from './pages/atualizar-operacao/atualizar-operacao.component';

const routes: Routes = [
  {
    path: 'criar',
    component: CriarOperacaoComponent,
  },
  {
    path: 'lista',
    children: [
      { path: '', component: OperacoesComponent },
      { path: ':id', component: OperacoesComponent },
    ],
  },
  {
    path: 'operacao/editar/:id',
    component: AtualizarOperacaoComponent,
  },
  { path: '', redirectTo: '/criar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
