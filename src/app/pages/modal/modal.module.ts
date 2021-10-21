import { NgModule } from '@angular/core';
import { CommonModule }                                  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPageRoutingModule } from './modal-routing.module';

import { ModalPage }          from './modal.page';
import { OptionByObjectPipe } from '../../pipes/option-by-object.pipe';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ModalPageRoutingModule,
		ReactiveFormsModule
	],
  declarations: [ModalPage, OptionByObjectPipe],
})
export class ModalPageModule {}
