import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from '../../User';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit, OnDestroy{
  @Output() loginReq: EventEmitter<any> = new EventEmitter();
  @Output() logoutReq: EventEmitter<any> = new EventEmitter();
  @Output() goFullScreenReq: EventEmitter<any> = new EventEmitter();

  @Input() user: User | undefined;

  isFullScreen: boolean | undefined;
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}
  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    if (this.route.snapshot.params['isFullScreen'] && this.route.snapshot.params['isFullScreen'] === 'true') {
      this.isFullScreen = true;
    } else {
      this.isFullScreen = false;
    }

    if (this.isFullScreen) {
      this.user = this.authService.user;
    }
  }

  login() {
    this.loginReq.emit();
  }
  logout() {
    this.logoutReq.emit();
  }

  viewImages() {

  }

  goFullScreen() {
    if (this.isFullScreen) {
      this.router.navigate(['']);
    } else {
      this.goFullScreenReq.emit();
    }
  }
}
