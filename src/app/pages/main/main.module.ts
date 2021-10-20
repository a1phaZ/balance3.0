import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage }      from './main.page';
import { CardComponent } from '../../ui/card/card.component';

import { SwiperModule }    from 'swiper/angular';
import { ModalPageModule } from '../modal/modal.module';
import { BalancePipe }     from '../../pipes/balance.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    SwiperModule,
    ModalPageModule,
  ],
	declarations: [MainPage, CardComponent, BalancePipe],
})
export class MainPageModule {}
