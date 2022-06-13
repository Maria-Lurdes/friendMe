import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "firebase/auth";
import {Router} from "@angular/router";
import {AlertService} from "./alert.service";
import {LoginInfo, UserAuthInfo} from "../interfaces";

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

    async googleSignIn() {
        try {
            await signInWithPopup(this.auth, this.googleProvider);
            this.setGoogleFacebookToken();
        } catch (error) {
            this.handleAuthError(error.code);
        }
    }

    async facebookSignIn() {
        try {
            await signInWithPopup(this.auth, this.facebookProvider);
            this.setGoogleFacebookToken()
        } catch (error) {
            this.handleAuthError(error.code);
        }
    }

    async signUpUser(email: string, password: string, displayName: string) {
        try {
            await createUserWithEmailAndPassword(this.auth, email, password);
            await updateProfile(this.auth.currentUser, {displayName})
            await this.setTokenAndNavigate()
        } catch (error) {
            this.handleAuthError(error.code);
        }
    }

    async updateUserProfile (updatedUser: UserAuthInfo) {
        try {
            await updateProfile(this.auth.currentUser, updatedUser)
            const idToken = await this.auth.currentUser.getIdToken();
            this.setToken(idToken);
            this.alert.success('Your profile is successfully updated.')
        } catch(error) {
            this.handleAuthError(error.code);
        }
    }

    async sendPasswordResetEmail(email: string) {
        let userEmail = email ? email : this.auth.currentUser.email;
        try {
            await sendPasswordResetEmail(this.auth, userEmail);
            this.alert.success('Check your email to reset your password.')
        } catch (error) {
            this.handleAuthError(error.code);
        }
    }

    async signIn(user: LoginInfo) {
        try {
            await signInWithEmailAndPassword(this.auth, user.email, user.password);
            await this.setTokenAndNavigate();
            if (this.auth.currentUser.email === 'admin@gmail.com') {
                localStorage.setItem('role', 'admin')
            } else {
                localStorage.setItem('role', 'user')
            }
        } catch (error) {
            this.handleAuthError(error.code);
        }
    }

    async setTokenAndNavigate() {
        const idToken = await this.auth.currentUser.getIdToken();
        this.setToken(idToken);
        this.router.navigate(['/pets-dashboard'])
    }

    signOut() {
        this.setToken(null)
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    private handleAuthError(errorCode: string) {
        console.log(errorCode, 'errorCode')
        switch (errorCode) {
            case 'auth/email-already-exists':
                this.alert.danger('The provided email is already in use by an existing user. Each user must have a unique email.')
                break
            case 'auth/email-already-in-use':
                this.alert.danger('The provided email is already in use by an existing user. Each user must have a unique email.')
                break
            case 'auth/invalid-email':
                this.alert.danger('The provided value for the email user property is invalid. It must be a string email address.')
                break
            case 'auth/invalid-password':
                this.alert.danger('The provided value for the password user property is invalid. It must be a string with at least six characters.')
                break
            case 'auth/uid-already-exists':
                this.alert.danger('The provided uid is already in use by an existing user. Each user must have a unique uid.')
                break
            case 'auth/network-request-failed':
                this.alert.danger('There is problem with your network.')
                break
            case 'auth/wrong-password':
                this.alert.danger('Wrong password.')
                break
            default:
                this.alert.danger('Smth went wrong, try again later.')
        }
    }

    setToken(response: string) {
        if (response) {
            const expDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('fb-token', response)
            localStorage.setItem('fb-token-exp', expDate.toString())
        } else {
            localStorage.clear()
        }
    }

    setGoogleFacebookToken() {
        this.auth.currentUser.getIdTokenResult().then((result) => {
            const expDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('fb-token', result.token)
            localStorage.setItem('fb-token-exp', expDate.toString());
            this.router.navigate(['/pets-dashboard'])
        })
    }
}
