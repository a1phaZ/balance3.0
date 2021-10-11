import { Injectable }                                                        from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable }                                                        from 'rxjs';
import { AuthenticationService }                                             from '../services/authentication.service';
import { NavController }                                                     from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private navCtrl: NavController) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isLoggedIn) {
      this.navCtrl.navigateRoot('/login');
    }
    return this.authService.isLoggedIn;
  }

}
