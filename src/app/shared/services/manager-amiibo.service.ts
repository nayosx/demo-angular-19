import { Injectable, signal } from '@angular/core';
import { Amiibo } from '../models/amiibo.model';
import { CardImgText } from '../models/card-imga.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerAmiiboService {

  amiibos = signal<CardImgText<Amiibo>[]>([]);

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
      } else {
        card.isSelecteble = false;
      }
      return card;
    });

    this.amiibos.set(data);
  }
}
