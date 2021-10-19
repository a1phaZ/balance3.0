import { Component, Input, OnInit } from '@angular/core';
import { ModalService }             from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() item: any;
  @Input() fields: any[];
  data: any;

  // form: FormGroup;

  constructor(private modalCtrl: ModalService) {
  }

  ngOnInit() {
    console.log(this.fields);
    this.data = this.fields;
  }

  dismissModal() {
    this.modalCtrl.dismissModal(this.data);
  }
}
