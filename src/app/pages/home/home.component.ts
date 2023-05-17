import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public searchValue: string = '';

  constructor(private router: Router) {}

  public onSearch(): void {
    this.router.navigate(['/pokemons', this.searchValue]);
  }

  public mostSearchedNames = [
    'Charmeleon',
    'Squirtle',
    'Caterpie',
    'Pikachu',
    'Blastoise',
    'Ditto',
    'Mew',
    'Gengar',
    'Arcanine',
    'Bulbasaur',
  ];
}
