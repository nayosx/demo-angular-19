import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseAmiibo } from '../models/amiibo.model';

@Injectable({
  providedIn: 'root'
})
export class AmiiboService {

  baseUlr = 'https://www.amiiboapi.com/api/amiibo/';

  http = inject(HttpClient);


  getListaAmiibo(): Observable<ResponseAmiibo> {
    return this.http.get<ResponseAmiibo>(this.baseUlr + '?gameseries=Splatoon');
    // return this.http.get<ResponseAmiibo>(this.baseUlr );
  }

  findAmiiboByCharacter(character: string): Observable<ResponseAmiibo> {
    return this.http.get<ResponseAmiibo>(`${this.baseUlr}?name=${character}`);
  }

}
