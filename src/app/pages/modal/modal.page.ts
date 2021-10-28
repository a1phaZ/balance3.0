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
  @Input() type: string;
  @Input() cardId: string;
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

  onSubmit() {
    this.dismissModal({[this.type]: {cardId: this.cardId, ...this.form.value}});
  }
}
