import { Component, Input, OnInit } from '@angular/core';
import Purchase                   from '../../models/purchase';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() item: any;

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const purchase = new Purchase();
    this.form = this.fb.group(purchase);
    this.form.patchValue({name: this.item.name});
    console.log(this.form.controls, this.form.value);
  }


  calc() {
    console.log(this.form.value);
    const {count = 0, price = 0} = this.form.value;
    console.log(count, price, count * price);
    this.form.patchValue({sum: count * price});
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.form.value);
  }
}
