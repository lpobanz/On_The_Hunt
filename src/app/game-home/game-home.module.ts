import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameHomePageRoutingModule } from './game-home-routing.module';

import { GameHomePage } from './game-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameHomePageRoutingModule
  ],
  declarations: [GameHomePage]
})
export class GameHomePageModule {}
