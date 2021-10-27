import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { TransactionIconComponent } from './transaction-icon.component';
import { IonicModule }              from '@ionic/angular';



@NgModule({
  declarations: [TransactionIconComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [TransactionIconComponent]
})
export class TransactionIconModule { }
