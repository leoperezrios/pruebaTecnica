import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAdmin = '';
  isLogged = false;

 private destroy$ = new Subject<void>();

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {


    this.authSvc.isLogged
    .pipe(takeUntil(this.destroy$))
    .subscribe((res) => (this.isLogged = res))
    this.authSvc.isAdmin$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.isAdmin = res));
    this.authSvc.isAdmin$.subscribe((res) => (this.isAdmin = res));
  }

  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.authSvc.logout();
  }
}
