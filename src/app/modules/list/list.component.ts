import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AmiiboService } from '../../shared/services/amiibo.service';
import { CardImgText } from '../../shared/models/card-imga.model';
import { Amiibo } from '../../shared/models/amiibo.model';
import { CommonModule } from '@angular/common';
import { CardImgTextComponent } from "../../components/card-img-text/card-img-text.component";
import { ManagerAmiiboService } from '../../shared/services/manager-amiibo.service';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    CardImgTextComponent
],
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

  amiiboServ = inject(AmiiboService);
  amiiboShared = inject(ManagerAmiiboService);

  data:CardImgText<Amiibo>[] = [];

  isLoading:boolean = false;
  isError:boolean = false;


  ngOnInit(): void {
    const data = this.amiiboShared.getAmiiobs();
    if(data.length == 0) {
      this._getResourse();
    } else {
      this.data = data;
    }
    
  }

  private _getResourse():void {
    this.isError = false;
    this.isLoading = true; 

    this.amiiboServ.getListaAmiibo().subscribe({
      next: (response) => {

        if(response.amiibo && response.amiibo.length > 0) {
          this.data = response.amiibo.map((amiibo) => {
            const card: CardImgText<Amiibo> = {
              data: amiibo,
              imgSrc: amiibo.image,
              title: amiibo.character,
              description: amiibo.amiiboSeries,
              isSelecteble: false
            };
            return card;
          });

          this.amiiboShared.setAmiibos(this.data);

          const gameSeriesNames = response.amiibo.reduce((acc: string[], amiibo) => {
            if (!acc.includes(amiibo.gameSeries)) {
              acc.push(amiibo.gameSeries);
            }
            return acc;
          }, []);

          console.log(gameSeriesNames);
        } else {
          this.data = [];
          this.amiiboShared.setAmiibos([]);
        }

        this.isError = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isError = true;
        this.isLoading = false;
      },
    })
  }


  onSelect(amiibo: Amiibo) {
    this.amiiboShared.setSelected(amiibo);
    console.log(amiibo);
  }

}
