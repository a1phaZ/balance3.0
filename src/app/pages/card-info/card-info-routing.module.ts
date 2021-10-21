import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardInfoPage } from './card-info.page';

const routes: Routes = [
  {
    path: '',
    component: CardInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardInfoPageRoutingModule {}
