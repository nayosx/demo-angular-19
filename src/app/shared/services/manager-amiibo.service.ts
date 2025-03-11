import { inject, Injectable, signal } from '@angular/core';
import { Amiibo } from '../models/amiibo.model';
import { CardImgText } from '../models/card-imga.model';
import { CypherService } from './cypher.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerAmiiboService {

  amiibos = signal<CardImgText<Amiibo>[]>([]);
  cypher = inject(CypherService);

  constructor() { }


  setAmiibos(amiibos:CardImgText<Amiibo>[]):void {
    this.amiibos.set(amiibos);
  }

  getAmiiobs() { 
    return this.amiibos();
  }

  setSelected(amiibo:Amiibo):void {
    const data = this.amiibos().map((card) => {
      if(card.data.tail === amiibo.tail) {
        card.isSelecteble = true;
        sessionStorage.setItem('amiibo', this.cypher.encrypt(JSON.stringify(card.data)));
      } else {
        card.isSelecteble = false;
      }
      return card;
    });



    this.amiibos.set(data);
  }
}
