import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent }              from './app.component';
import { AppRoutingModule }          from './app-routing.module';
import { environment }               from '../environments/environment';
import { AngularFireModule }         from '@angular/fire/compat';
import { AngularFireAuthModule }     from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule }    from '@angular/fire/compat/firestore';
import { FormBuilder }               from '@angular/forms';
import { ModalPageModule }           from './pages/modal/modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ModalPageModule,
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {
}
