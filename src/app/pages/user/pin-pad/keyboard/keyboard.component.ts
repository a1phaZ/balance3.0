import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavController }                           from '@ionic/angular';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  @Output() fillDots = new EventEmitter();
  savedPin: number[] = [];
  pin: number[] = [];

  constructor(private navCtrl: NavController) {
  }

  ngOnInit() {
    this.savedPin = JSON.parse(localStorage.getItem('pin')) || [];
  }

  onClick(digit = -1) {
    if (digit === -1) {
      localStorage.setItem('pin', JSON.stringify([]));
      localStorage.setItem('user', JSON.stringify(null));
      this.navCtrl.navigateRoot('/');
      console.log('-1');
      return;
    }
    this.pin = [...this.pin, digit];
    this.fillDots.emit({length: this.pin.length, error: null});
    if (this.pin.length === 5) {
      if (this.comparePin(this.savedPin, this.pin)) {
        this.navCtrl.navigateRoot('/shopping-list/add');
      } else {
        this.pin = [];
        this.fillDots.emit({error: 'Pin error', length: 0});
      }
    }
  }

  comparePin(savedPin, pin): boolean {
    if (savedPin.length === 0) {
      localStorage.setItem('pin', JSON.stringify(pin));
      return true;
    }
    return !!savedPin.every((num, idx) => num === pin[idx]);
  }

}
