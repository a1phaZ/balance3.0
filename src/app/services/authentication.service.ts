import { Injectable, NgZone }                         from '@angular/core';
import { User }                                      from '../interfaces/user';
import { Router }                                     from '@angular/router';
import { AngularFireAuth }                            from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { NotificationService }                        from './notification.service';
// import auth from '@firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private notify: NotificationService
  ) {
    this.ngFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  // Login in with email/password
  signIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  registerUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  sendVerificationMail() {
    return this.ngFireAuth.currentUser
      .then(u => u.sendEmailVerification())
      .then(() => this.router.navigate(['verify-email']));
  }

  // Recover password
  passwordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.notify.showToast('Password reset email has been sent, please check your inbox.');
      }).catch((error) => {
        this.notify.showToast(error.message);
      });
  }

  // Returns true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(this.getItem('user'));
    return (user !== null && user.emailVerified !== false);
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(this.getItem('user'));
    return (user.emailVerified !== false);
  }

  getItem(key) {
    return localStorage.getItem(key);
  }

  // Sign in with Gmail
  // googleAuth() {
  //   return this.authLogin(new firebase.auth.GoogleAuthProvider());
  // }

  // Auth providers
  authLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        this.notify.showToast(error.message);
        window.alert(error);
      });
  }

  // Store user in localStorage
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign-out
  signOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
