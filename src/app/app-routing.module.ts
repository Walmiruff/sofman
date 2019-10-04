import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
   // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tab-solicitacao',
    loadChildren: './tab-solicitacao/tab-solicitacao.module#TabSolicitacaoPageModule'
  },
  {
    path: 'tab-solicitacao-details/:id',
    loadChildren: './tab-solicitacao-details/tab-solicitacao-details.module#TabSolicitacaoDetailsPageModule'
  },
  { path: 'tab-form-solicitacao', loadChildren: './tab-form-solicitacao/tab-form-solicitacao.module#TabFormSolicitacaoPageModule' },
  { path: 'asscliente', loadChildren: './modais/modal/asscliente/asscliente.module#AssclientePageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
