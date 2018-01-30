import { Injectable } from '@angular/core';

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

@Injectable()
export class BackendAuthService {

  constructor(private afAuth: AngularFireAuth) { }

  public attemptLogin(email: string, password: string): Promise<firebase.User> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

}