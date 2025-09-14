import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  errorMessage = signal<string | null>(null);

  login() {
    const infoUser = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    this.authService.signIn(infoUser).subscribe({
      next: (res) =>
        this.authService.getUser().subscribe({
          next: (res) => this.router.navigate(['/perfumes']),
          error: (err) => this.errorMessage.set('Error during Receiving User.'),
        }),

      error: (err) => this.errorMessage.set('Error during Logging In.'),
    });

    this.loginForm.reset();
  }
}
