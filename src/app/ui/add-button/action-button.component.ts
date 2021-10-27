import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent implements OnInit {

  @Input() icon = 'add-circle-outline';
  @Output() buttonClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

}
