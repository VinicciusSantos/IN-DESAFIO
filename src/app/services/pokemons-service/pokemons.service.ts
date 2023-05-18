import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon, PokemonRange, PokemonSpecie } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export default class PokemonsService {
  private API_PATH = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  public getPokemonInfos(nameOrId: string): Observable<any> {
    return this.http.get(
      `${this.API_PATH}/pokemon/${nameOrId.toLowerCase()}`
    ) as Observable<Pokemon>;
  }

  public getPokemonsInRange(
    limit: number,
    offset: number
  ): Observable<PokemonRange> {
    return this.http.get(
      `${this.API_PATH}/pokemon?limit=${limit}&offset=${offset}`
    ) as Observable<PokemonRange>;
  }

  public getPokemonSpecie(nameOrId: string): Observable<PokemonSpecie> {
    return this.http.get(
      `${this.API_PATH}/pokemon-species/${nameOrId}`
    ) as Observable<PokemonSpecie>;
  }
}
