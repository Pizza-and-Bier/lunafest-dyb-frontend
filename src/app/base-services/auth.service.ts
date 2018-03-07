import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable, Subscription } from "rxjs";
import { User as fbUser} from "firebase/app";

import { BaseUserService } from "./user.service";
import { Unsubscribe } from "./unsubscribe";

@Injectable()
@Unsubscribe
export class BaseAuthService {

    private subs: Subscription[] = [];
    constructor(private afAuth: AngularFireAuth, private userService: BaseUserService) { }
    
    public attemptLogin(email: string, password: string): Promise<fbUser> {
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
    public userExists(email: string): Promise<any> {
        return this.afAuth.auth.fetchProvidersForEmail(email).then((data) => {
            console.log("exists data", data);
            if (data.length == 0) return false;
            else return (true);
        });
    }

    /**
     * @author Anthony Pizzimenti
     * @desc Signs up a new user.
     * @param {string} email    Email for the new user.
     * @param {string} password Password for the new user.
     * @param {Object} prefs    Object containing user preferences.
     * @returns {Promise<any>} 
     */
    public signup(email: string, password: string, prefs: Object): Promise<any> {
        return new Promise((resolve, reject) => {
            let auth = this.afAuth.auth.createUserWithEmailAndPassword(email, password),
                reason = "Account couldn't be created - ";

            auth.then((u) => {
                this.userService.create(u.uid, prefs);
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
     * @returns {Promise<fbUser>} 
     */
    public user(): Promise<fbUser> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.onAuthStateChanged((user) => {
                if (!user) reject(null);
                else resolve(user);
            });
        });
    }

    /**
     * @author Anthony Pizzimenti
     * @desc Sends a password reset email to the provided address.
     * @param {string} uID      A user's unique ID.
     * @param {string} email    The email provided by the user.
     * @returns {Promise<any>} Resolves if the email is sent successfully.
     */
    public sendPasswordResetEmail(uID: string, email: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.subs.push(this.userService.user(uID).take(1).subscribe((user) => {
                let sent = this.afAuth.auth.sendPasswordResetEmail(email ? email : user.email),
                    reason = "Password reset email not sent - ";

                sent.then(_ => resolve(true)).catch((err) => {
                    switch (err.code) {
                        case "auth/invalid-email":
                            reject(reason + "invalid email.");
                            break;
                        case "auth/missing-android-pkg-name":
                            reject(reason + "missing Android package name.");
                            break;
                        case "auth/missing-continue-uri":
                            reject(reason + "a continue (redirect) URL wasn't provided.");
                            break;
                        case "auth/missing-ios-bundle-id":
                            reject(reason + "iOS bundle ID wasn't provided.");
                            break;
                        case "auth/invalid-continue-uri":
                            reject(reason + "the continue URL was bad.");
                            break;
                        case "auth/unauthorized-continue-uri":
                            reject(reason + "whitelist the domain of the continue URL in the firebase console.");
                            break;
                        case "auth/user-not-found":
                            reject(reason + "there is no user with this email.");
                            break;
                    }
                });
            }));
        });
    }

    public resetPassword(actionCode: string, newPassword: string) {
        return new Promise((resolve, reject) => {
            let reset = this.afAuth.auth.confirmPasswordReset(actionCode, newPassword),
                reason = "Password couldn't be reset - ";

            reset.then(_ => resolve(true)).catch((err) => {
                switch (err.code) {
                    case "auth/expired-action-code":
                        reject(reason + "the action code provided has expired.");
                        break;
                    case "auth/invalid-action-code":
                        reject(reason + "the action code provided is invalid.");
                        break;
                    case "auth/user-disabled":
                        reject(reason + "this user's account has been disabled.");
                        break;
                    case "auth/user-not-found":
                        reject(reason + "no user corresponds to this action code.");
                        break;
                    case "auth/weak-password":
                        reject(reason + "sucky password.");
                        break;
                }
            });
        });
    }

    ngOnDestroy() { }
}
