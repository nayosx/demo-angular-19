import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CardImgText } from '../../shared/models/card-imga.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-img-text',
  imports: [
    CommonModule
  ],
  templateUrl: './card-img-text.component.html',
  styleUrl: './card-img-text.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class CardImgTextComponent <T>{

  @Input() CardImgText!: CardImgText<T>;
  @Input() isGrid:boolean = false;

  @Output() onSelectedCard = new EventEmitter<T>();


  handleClick(card:CardImgText<T>) {
    this.onSelectedCard.emit(card.data);
  }

}
