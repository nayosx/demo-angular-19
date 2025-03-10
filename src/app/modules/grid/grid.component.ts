import { Component, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Amiibo } from '../../shared/models/amiibo.model';
import { CardImgText } from '../../shared/models/card-imga.model';
import { ManagerAmiiboService } from '../../shared/services/manager-amiibo.service';
import { CardImgTextComponent } from "../../components/card-img-text/card-img-text.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  imports: [CardImgTextComponent],
  templateUrl: './grid.component.html',
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {
  

  data: CardImgText<Amiibo>[] = [];

  amiiboShared = inject(ManagerAmiiboService);
  _router = inject(Router);

  isLoading: boolean = false;
  isError: boolean = false;


  ngOnInit(): void {

    const data = this.amiiboShared.getAmiiobs();
    this.isLoading = true;

    if(data && data.length > 0) {
      this.data = data;
    } else {
      this._router.navigate(['/list']);
    }

    this.isLoading = false;
  }

  onSelect(card:Amiibo) {
    this.amiiboShared.setSelected(card);
  }

}
