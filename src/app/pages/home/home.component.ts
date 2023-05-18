import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TitleService } from '../../services/title-service/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public searchValue: string = '';

  constructor(private router: Router, private titleService: TitleService) {}

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

  public ngOnInit(): void {
    this.titleService.changeTitle('Pokemons', 'pokeball.png');
  }
}
