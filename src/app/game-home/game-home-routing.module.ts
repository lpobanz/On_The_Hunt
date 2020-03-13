import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameHomePage } from './game-home.page';

const routes: Routes = [
  {
    path: '',
    component: GameHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameHomePageRoutingModule {}
