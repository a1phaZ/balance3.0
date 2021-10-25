import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardInfoPageRoutingModule } from './card-info-routing.module';

import { CardInfoPage }         from './card-info.page';
import { MainPageModule }       from '../main/main.module';
import { DateTransformPipe }    from '../../pipes/date-transform.pipe';
import { TransactionComponent } from '../../ui/transaction/transaction.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		CardInfoPageRoutingModule,
		MainPageModule
	],
  declarations: [CardInfoPage, DateTransformPipe, TransactionComponent]
})
export class CardInfoPageModule {}
