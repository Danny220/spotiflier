import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../User';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  user: User | undefined;

  title = 'Spotiflier';

  isLoggedOut = !localStorage.getItem('access_token') || localStorage.getItem('access_token') == '';

  constructor(
    private router: Router, 
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const isLogin = this.route.snapshot.params['loginSuccess'];
    if (isLogin) {
      await this.authService.getProfile();
    }

    this.isLoggedOut = !localStorage.getItem('access_token') || localStorage.getItem('access_token') == '';

    this.user = this.authService.user;
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  goFullScreen() {
    this.router.navigate(['profile', true])
  }

  searchArtist(query: Event) {

  }
}
