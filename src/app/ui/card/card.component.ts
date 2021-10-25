import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() icon = 'card-outline';
  @Input() title: string;
  @Input() balance = 0;
  @Input() full = false;

  constructor() {
  }

  ngOnInit() {
  }

}
