import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateObjectivesPage } from './create-objectives.page';

const routes: Routes = [
  {
    path: '',
    component: CreateObjectivesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateObjectivesPageRoutingModule {}
