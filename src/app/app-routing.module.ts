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
    canActivate: [AuthGuard]
  },
  {
    path: 'tab-solicitacao',
    loadChildren: () => import('./tab-solicitacao/tab-solicitacao.module').then(m => m.TabSolicitacaoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tab-solicitacao-details/:id',
    loadChildren: () => import('./tab-solicitacao-details/tab-solicitacao-details.module').then(m => m.TabSolicitacaoDetailsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tab-form-solicitacao',
    loadChildren: () => import('./tab-form-solicitacao/tab-form-solicitacao.module').then(m => m.TabFormSolicitacaoPageModule),
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
