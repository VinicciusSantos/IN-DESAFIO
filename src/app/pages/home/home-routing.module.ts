import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { PokemonDrawerComponent } from './pokemon-drawer/pokemon-drawer.component';

const routes: Routes = [
  {
    path: ``,
    component: HomeComponent,
    children: [{ path: ':name', component: PokemonDrawerComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
