import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FbAythresponse, LoginInfo, User} from "../interfaces";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth";
import {Router} from "@angular/router";
import {AlertService} from "./alert.service";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    googleProvider = new GoogleAuthProvider();
    facebookProvider = new FacebookAuthProvider();
    auth = getAuth();

    constructor(private alert: AlertService, private http: HttpClient, private router: Router) {
    }

    get token(): string {
        const expDate = new Date(localStorage.getItem('fb-token-exp'))
        if (new Date() > expDate) {
            this.signOut()
            return null
        }
        return localStorage.getItem('fb-token')
    }

    signIn(user: LoginInfo): Observable<User> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(AuthService.setToken),
                catchError(this.handleError.bind(this))
            );
    }

    googleSignIn() {
        signInWithPopup(this.auth, this.googleProvider)
            .then(() => {
                this.setGoogleFacebookToken();
            }).catch((error) => {
            this.handleError(error);
        });
    }

    facebookSignIn() {
        signInWithPopup(this.auth, this.facebookProvider)
            .then(() => {
                this.setGoogleFacebookToken();
            })
            .catch((error) => {
                this.handleError(error);
            });
    }

    signUp(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
            .pipe(
                tap(AuthService.setToken),
                catchError(this.handleError.bind(this))
            );
    }

    signOut() {
        AuthService.setToken(null)
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    private handleError(error: HttpErrorResponse) {
        const {message} = error.error.error;
        switch (message) {
            case 'INVALID_EMAIL':
                this.alert.danger('Wrong email.')
                break
            case 'INVALID_PASSWORD':
                this.alert.danger('Wrong password.')
                break
            case 'EMAIL_NOT_FOUND':
                this.alert.danger('Such email does not exist.')
                break
            case 'EMAIL_EXISTS':
                this.alert.danger('The email address is already in use by another account.')
                break
            case 'OPERATION_NOT_ALLOWED':
                this.alert.danger('Password sign-in is disabled for this project.')
                break
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                this.alert.danger('We have blocked all requests from this device due to unusual activity. Try again later.')
                break
            default:
                this.alert.warning(error.error.error.message)

        }

        return throwError(error)
    }

    private static setToken(response: FbAythresponse | null) {
        if (response) {
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
            localStorage.setItem('fb-token', response.idToken)
            localStorage.setItem('fb-token-exp', expDate.toString())
        } else {
            localStorage.clear()
        }
    }

    setGoogleFacebookToken() {
        this.auth.currentUser.getIdTokenResult().then((result) => {
            const expDate = new Date(new Date().getTime() + 3600000)
            localStorage.setItem('fb-token', result.token)
            localStorage.setItem('fb-token-exp', expDate.toString());
            this.router.navigate(['/pets-dashboard'])
        })
    }
}
