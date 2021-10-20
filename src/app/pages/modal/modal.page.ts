import { Component, Input, OnInit } from '@angular/core';
import { ModalService }           from '../../services/modal.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() item: any;
  @Input() fields: any[];
  data: any;
  form: FormGroup;

  // form: FormGroup;

  constructor(
    private modalCtrl: ModalService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    let formFields = {};
    this.fields.forEach((field) => {
      formFields = {...formFields, [field.name]: [null, [...field.validators]]};
    });
    this.form = this.formBuilder.group(formFields);
  }

  dismissModal(data) {
    this.modalCtrl.dismissModal(data);
  }

  onSubmit({title, balance, icons}) {
    const data = {
      title,
      balance: +balance,
      icon: icons
    };
    this.dismissModal(data);
  }
}
