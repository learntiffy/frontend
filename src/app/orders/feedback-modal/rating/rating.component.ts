import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

enum COLORS {
  GREY = '#E0E0E0',
  GREEN = '#76FF03',
  YELLOW = '#FFCA28',
  RED = '#DD2C00',
  ORANGE = '#D48B8B',
  TAPAUSWA = '#F76A3C',
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() rating!: number;
  @Input() isDisabled!: boolean;
  @Input() isRated = false;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  rate(index: number) {
    if (!this.isDisabled) {
      this.rating = index;
      this.ratingChange.emit(this.rating);
    }
  }

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return COLORS.GREY;
    }

    if (this.isRated) {
      return COLORS.TAPAUSWA;
    }

    switch (this.rating) {
      case 1:
        return COLORS.ORANGE;
      case 2:
        return COLORS.RED;
      case 3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY;
    }
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }
}
