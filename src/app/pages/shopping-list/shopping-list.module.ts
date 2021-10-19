import { NgModule } from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingListPageRoutingModule } from './shopping-list-routing.module';

import { ShoppingListPage }  from './shopping-list.page';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ShoppingListPageRoutingModule,
		ReactiveFormsModule
	],
  declarations: [ShoppingListPage, ListItemComponent]
})
export class ShoppingListPageModule {}
