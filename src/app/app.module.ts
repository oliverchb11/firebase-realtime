import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//modulos de firebase para angular
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from '../environments/environment';
//componentes
import { TeamTableComponent } from './team/team-table/team-table.component';
import { PlayerTableComponent } from './player/player-table/player-table.component';
import { PlayerModalComponent } from './modal/player-modal/player-modal.component';
//modulo de formularios
import { FormsModule,ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    TeamTableComponent,
    PlayerTableComponent,
    PlayerModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
