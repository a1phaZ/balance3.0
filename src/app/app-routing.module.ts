import { NgModule }                                from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard }                               from './guards/auth.guard';
import { MAIN_PAGE }                               from './shared/constants';

const routes: Routes = [
  {
    path: '',
    redirectTo: MAIN_PAGE,
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'shopping-list/add',
    loadChildren: () => import('./pages/shopping-list/create-item/create-item.module').then( m => m.CreateItemPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/user/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'pin',
    loadChildren: () => import('./pages/user/pin-pad/pin-pad.module').then( m => m.PinPadPageModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./pages/shopping-list/shopping-list.module').then( m => m.ShoppingListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'plan',
    loadChildren: () => import('./pages/plan/plan.module').then( m => m.PlanPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'card/:id',
    loadChildren: () => import('./pages/card-info/card-info.module').then( m => m.CardInfoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
