import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const mainRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/pokemons',
  },
  {
    path: 'pokemons',
    loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomeModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(mainRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
