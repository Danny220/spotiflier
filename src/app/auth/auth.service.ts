import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../User";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {
    
    constructor(private router: Router) {}

    user: User | undefined;

    clientId = 'f83edfbb6f184b87868b01798a336ac1';
    redirectUri = 'http://localhost:4200/callback';

    codeVerifier = this.generateRandomString(128);

    authChange = new Subject<User | undefined>();
        
    async getProfile() {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
  
        const data = await response.json();
        console.log(data);
  
        this.user = data;
        this.authChange.next(this.user as User);
    }
    generateRandomString(length: number): string {
        let text = '';
        let possible = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    async generateCodeChallenge(codeVerifier: string) {
        function base64encode(string: any) {
            const nArray: number[] = Array.from(new Uint8Array(string))
            return btoa(String.fromCharCode.apply(null, nArray))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier)
        const digest = await window.crypto.subtle.digest('SHA-256', data);

        return base64encode(digest);
    }

    login() {
        this.generateCodeChallenge(this.codeVerifier).then(codeChallenge => {
            let state = this.generateRandomString(16);
            let scope = 'user-read-private user-read-email';

            localStorage.setItem('code_verifier', this.codeVerifier);

            let args = new URLSearchParams({
                response_type: 'code',
                client_id: this.clientId,
                scope: scope,
                redirect_uri: this.redirectUri,
                state: state,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge
            });

            window.location.assign('https://accounts.spotify.com/authorize?' + args);
        });
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['..']);
        this.authChange.next(undefined);
    }
}