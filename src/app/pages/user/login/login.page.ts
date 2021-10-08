import { Component, OnInit }     from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { NotificationService }   from '../../../services/notification.service';
import { Router }                from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public notify: NotificationService
  ) { }

  ngOnInit() {
  }

  logIn(email, password) {
    this.authService.signIn(email.value, password.value)
      .then((res) => {
        console.log(res);
        if (this.authService.isEmailVerified) {
          this.router.navigate(['shopping-list/add']);
        } else {
          this.notify.showSuccessToast('Email is not verified');
          return false;
        }
      })
      .catch(err => {
        console.log(err);
        this.notify.showErrorToast(err.message);
      });
  }
}