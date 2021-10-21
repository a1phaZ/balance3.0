import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardInfoPageRoutingModule } from './card-info-routing.module';

import { CardInfoPage } from './card-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardInfoPageRoutingModule
  ],
  declarations: [CardInfoPage]
})
export class CardInfoPageModule {}
