import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'find-game',
    loadChildren: () => import('./find-game/find-game.module').then( m => m.FindGamePageModule)
  },
  {
    path: 'create-game',
    loadChildren: () => import('./create-game/create-game.module').then( m => m.CreateGamePageModule)
  },
  {
    path: 'game-home',
    loadChildren: () => import('./game-home/game-home.module').then( m => m.GameHomePageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'scoreboard',
    loadChildren: () => import('./scoreboard/scoreboard.module').then( m => m.ScoreboardPageModule)
  },
  {
    path: 'create-objectives',
    loadChildren: () => import('./create-objectives/create-objectives.module').then( m => m.CreateObjectivesPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
