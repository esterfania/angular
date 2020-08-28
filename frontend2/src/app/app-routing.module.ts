import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComandasComponent } from './components/comandas/comandas.component';
import { ComandaFormComponent } from './components/comanda-form/comanda-form.component';
import { ComandaFechamentoComponet } from './components/comanda-fechamento/comanda-fechamento.component';
import { CardapioComponent } from './components/cardapio/cardapio.component';


const routes: Routes = [
  {
    path: 'comandas',
    component: ComandasComponent
  },
  {
    path: 'comanda/:codigoComanda',
    component: ComandaFormComponent
  },
  {
    path: 'comanda/:codigoComanda/fechamento',
    component: ComandaFechamentoComponet
  },
  {
    path: 'cardapio',
    component: CardapioComponent
  },
  {
    path: '**',
    redirectTo: 'comandas'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
