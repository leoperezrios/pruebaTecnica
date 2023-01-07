import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    correo: [''],
    password: [''],
  });

  ngOnInit(): void {}

  onLogin(): void {
    const data = {
      correo: 'test1@gmail.com',
      password: '123456',
    };
    const formValue = this.loginForm.value;

    this.authSvc.login(data).subscribe((res) => {
      if (res) {
        this.router.navigate(['']);
      }
    });
  }
}
