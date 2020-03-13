import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateObjectivesPageRoutingModule } from './create-objectives-routing.module';

import { CreateObjectivesPage } from './create-objectives.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateObjectivesPageRoutingModule
  ],
  declarations: [CreateObjectivesPage]
})
export class CreateObjectivesPageModule {}
