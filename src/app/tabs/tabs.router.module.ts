import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'login',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'tab2/:ordemid',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2-details/tab2-details.module').then(m => m.Tab2DetailsPageModule)
          }
        ]
      },
      {
        path: 'tab2/:ordemid/apt-mat',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2-apt-mat/tab2-apt-mat.module').then(m => m.Tab2AptMatPageModule)
          }
        ]
      },
      {
        path: 'tab2/:ordemid/apt-hora',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2-apt-hora/tab2-apt-hora.module').then(m => m.Tab2AptHoraPageModule)
          }
        ]
      },
      {
        path: 'tab2/:ordemid/tarefa',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2-tarefa/tab2-tarefa.module').then(m => m.Tab2TarefaPageModule)
          }
        ]
      },
      {
        path: 'tab2/:ordemid/img',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab2-img/tab2-img.module').then(m => m.Tab2ImgPageModule)
          }
        ]
      },
      {
        path: 'tab2/:ordemid/solicitations',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2-solicitations/tab2-solicitations.module').then(
                m => m.Tab2SolicitationsPageModule
              )
          }
        ]
      },

      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
