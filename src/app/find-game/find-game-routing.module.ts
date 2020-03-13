import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindGamePage } from './find-game.page';

const routes: Routes = [
  {
    path: '',
    component: FindGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindGamePageRoutingModule {}
