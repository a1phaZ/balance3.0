import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PinPadPage } from './pin-pad.page';

const routes: Routes = [
  {
    path: '',
    component: PinPadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PinPadPageRoutingModule {}
