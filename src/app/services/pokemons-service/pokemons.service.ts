import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export default class PokemonsService {
  private API_PATH = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  public getPokemonInfos(nameOrId: string): Observable<any> {
    return this.http.get(
      `${this.API_PATH}/pokemon/${nameOrId}`
    ) as Observable<Pokemon>;
  }
}
