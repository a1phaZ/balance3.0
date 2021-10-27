import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage }      from './main.page';
import { CardComponent } from '../../ui/card/card.component';

import { SwiperModule }           from 'swiper/angular';
import { ModalPageModule }        from '../modal/modal.module';
import { BalancePipe }            from '../../pipes/balance.pipe';
import { ToFixedPipe }            from '../../pipes/to-fixed.pipe';
import { ActionButtonComponent }  from '../../ui/add-button/action-button.component';
import { ContainerModule }        from '../../ui/container/container.module';
import { ContentContainerModule } from '../../ui/content-container/content-container.module';
import { TransactionIconModule }  from '../../ui/transaction-icon/transaction-icon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    SwiperModule,
    ModalPageModule,
    ContainerModule,
    ContentContainerModule,
    TransactionIconModule,
  ],
	declarations: [MainPage, CardComponent, BalancePipe, ToFixedPipe, ActionButtonComponent],
  exports: [
    CardComponent,
    BalancePipe,
    ActionButtonComponent
  ]
})
export class MainPageModule {}
