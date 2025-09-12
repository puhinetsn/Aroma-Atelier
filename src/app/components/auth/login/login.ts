import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  private authService = inject(AuthService);
  private router = inject(Router);

  login() {
    const infoUser = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    this.authService.signIn(infoUser).subscribe(() => {
      this.authService.getUser().subscribe(() => {
        this.router.navigate(['/perfumes']);
      });
    });

    this.loginForm.reset();
  }
}
