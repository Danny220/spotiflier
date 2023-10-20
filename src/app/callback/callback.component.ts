import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  error = false;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    const urlParams=  new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    let codeVerifier = localStorage.getItem('code_verifier');

    if (code !== null && codeVerifier !== null) {
      let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:4200/callback',
        client_id: this.authService.clientId,
        code_verifier: codeVerifier
      });

      const response = fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
      })
        .then(response => {
          if (!response.ok) {
            this.error = true;
            throw new Error(`--- ERROR ---\nHTTP STATUS: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          localStorage.setItem('access_token', data.access_token);
          this.router.navigate(['home', true]);
        })
        .catch(error => {
          this.error = true;
          console.error(`--- ERROR ---\n${error}`);
        })
    } else {
      this.error = true;
      throw new Error(`--- ERROR ---\ncode or codeVerifier is null\ncode: ${{code}}\ncodeVerifier: ${codeVerifier}`);
    }
  }
}
