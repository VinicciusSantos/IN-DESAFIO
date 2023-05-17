import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon, PokemonRange } from './interfaces';

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
    // console.log(
    //   '🚀 ~ file: pokemons.service.ts:24 ~ PokemonsService ~ limit:',
    //   limit
    // );
    // return of({} as any);
    return this.http.get(
      `${this.API_PATH}/pokemon?limit=${limit}&offset=${offset}`
    ) as Observable<PokemonRange>;
  }
}
