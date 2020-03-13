import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindGamePageRoutingModule } from './find-game-routing.module';

import { FindGamePage } from './find-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindGamePageRoutingModule
  ],
  declarations: [FindGamePage]
})
export class FindGamePageModule {}
