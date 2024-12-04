import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriarOperacaoComponent } from './pages/criar-operacao/criar-operacao.component';
import { ListarOperacoesComponent } from './pages/operacoes/listar-operacoes/listar-operacoes.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { DetalhesOperacoesComponent } from './pages/operacoes/detalhes-operacoes/detalhes-operacoes.component';
import { PagerService } from './service/pager.service';
import { AtualizarOperacaoComponent } from './pages/atualizar-operacao/atualizar-operacao.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CriarOperacaoComponent,
    ListarOperacoesComponent,
    OperacoesComponent,
    DetalhesOperacoesComponent,
    AtualizarOperacaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PagerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
