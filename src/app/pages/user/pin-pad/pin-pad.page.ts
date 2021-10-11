import { Component, OnInit }   from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-pin-pad',
  templateUrl: './pin-pad.page.html',
  styleUrls: ['./pin-pad.page.scss'],
})
export class PinPadPage implements OnInit {
  pinLength = 0;

  constructor(
    private notify: NotificationService
  ) { }

  ngOnInit() {
  }

  fillDots($event: { error: string; length: number }) {
    const { error, length } = $event;
    if (error) {
      this.notify.showErrorToast(error);
    }
    this.pinLength = length;
  }
}
