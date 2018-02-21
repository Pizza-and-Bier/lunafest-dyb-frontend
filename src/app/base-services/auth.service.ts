import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

import { BaseUserService } from "./user.service";

@Injectable()
export class BaseAuthService {
    constructor(private afAuth: AngularFireAuth, private userService: BaseUserService) { }
    
    public attemptLogin(email: string, password: string): Promise<firebase.User> {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }
    
    public logout(): Promise<void> {
        return this.afAuth.auth.signOut();
    }

    /**
     * @author Anthony Pizzimenti
     * @desc Checks whether an email is already registered with the auth service.
     * @param {string} email    Email to check.
     * @returns {Promise<boolean>}
     */
    public userExists(email: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.fetchProvidersForEmail(email).then((data) => {
                if (data.length == 0) resolve (true);
                else resolve(false);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * @author Anthony Pizzimenti
     * @desc Signs up a new user.
     * @param {string} email    Email for the new user.
     * @param {string} password Password for the new user.
     * @returns {Promise<any>} 
     */
    public signup(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let auth = this.afAuth.auth.createUserWithEmailAndPassword(email, password),
                reason = "Account couldn't be created - ";

            auth.then((u) => {
                this.userService.create(u.uid);
                resolve("User created successfully.");
            }).catch((err) => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                        reject(reason + "email already in use.");
                        break;
                    case "auth/invalid-email":
                        reject(reason + "email is invalid.");
                        break;
                    case "auth/operation-not-allowed":
                        reject(reason + "this operation is not allowed.");
                        break;
                    case "auth/weak-password":
                        reject(reason + "google thinks this password sucks.");
                        break;
                    default:
                        reject(reason + "the reason? Unknown.");
                        break;
                }
            });
        })
    }
    
    /**
     * @author Anthony Pizzimenti
     * @desc Returns an authenticated user's unique Google ID.
     * @returns {Promise<string>}
     */
    public uniqueID(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.onAuthStateChanged((user) => {
                if (!user) reject(null);
                else resolve(user.uid);
            });
        });
    }
    
    /**
     * @author Anthony Pizzimenti
     * @desc Returns an authenticated user object.
     * @returns {Promise<firebase.User>} 
     */
    public user(): Promise<firebase.User> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.onAuthStateChanged((user) => {
                if (!user) reject(null);
                else resolve(user);
            });
        });
    }
}
