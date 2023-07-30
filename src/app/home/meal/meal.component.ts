import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {
  items = [
    '2 Sabji',
    '5 Roti',
    'Rice',
    'Dal',
    'Salad',
    'SPECIAL ITEM (if any)',
  ];
  constructor() {}

  ngOnInit() {}
}
