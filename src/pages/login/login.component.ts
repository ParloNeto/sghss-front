import { CommonModule } from '@angular/common';
import { FooterComponent } from './../../shared/footer/footer.component';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService, Credenciais } from './login.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FooterComponent, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

public erroLogin: boolean = false;

  #router = inject(Router);
  #formBuilder = inject(FormBuilder);
  #loginService = inject(LoginService);
  #authService = inject(AuthService);

  loginUser = this.#formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {}
public clickEntrar() {
  if (this.loginUser.valid) {
    this.#loginService.logar(this.loginUser.value as Credenciais).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);

        this.#router.navigateByUrl('/home');
      },
      error: () => {
       this.erroLogin = true;
      }
    });
  }
}

}
