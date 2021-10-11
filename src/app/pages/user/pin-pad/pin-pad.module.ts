import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PinPadPageRoutingModule } from './pin-pad-routing.module';

import { PinPadPage }        from './pin-pad.page';
import { KeyboardComponent } from './keyboard/keyboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PinPadPageRoutingModule
  ],
	declarations: [PinPadPage, KeyboardComponent]
})
export class PinPadPageModule {}
