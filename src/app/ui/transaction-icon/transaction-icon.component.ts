import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-icon',
  templateUrl: './transaction-icon.component.html',
  styleUrls: ['./transaction-icon.component.scss'],
})
export class TransactionIconComponent implements OnInit {
  @Input() income: boolean;

  constructor() { }

  ngOnInit() {}

}
