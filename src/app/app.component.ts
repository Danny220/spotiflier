import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { User } from './User';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private appService: AppService
  ) {}

  user: User | undefined;
  title: string | undefined;

  ngOnInit(): void {
    this.appService.title = 'Spotiflier';
    this.title = this.appService.title;

    this.authService.authChange.subscribe(data => this.user = data);
  }

  ngOnDestroy(): void {
    this.authService.authChange.unsubscribe();
  }

  login() {
    this.authService.login();
  }
}
