import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, map, tap } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userClaims: any;

  constructor(private http: HttpClient, public afAuth: AngularFireAuth) {}

  getUserClaims(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (!!user) {
          this.setUserClaims(user);
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  getUserToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (!!user) {
          user
            .getIdToken()
            .then((token) => resolve(token))
            .catch(() => reject('No token Available.'));
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  setUserClaims(user: any): void {
    this.userClaims = user;
    //    this.userClaims$.next(user);
  }

  // doFacebookLogin(): Promise<any> {
  //     return this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  // }
  //
  // doTwitterLogin(): Promise<any> {
  //     return this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  // }

  doGoogleLogin(): Promise<any> {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  doLogout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!!this.afAuth.currentUser) {
        this.afAuth.signOut().then(
          () => {
            this.setUserClaims(null);
            resolve();
          },
          (err) => reject(err)
        );
      } else {
        reject();
      }
    });
  }
}
