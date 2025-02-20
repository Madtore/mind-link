import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginRequest } from '../../../common/login/LoginRequest';
import { AuthService } from '../../../services/auth/auth.service';
import { LocalStorageService } from '../../../services/auth/local-storage.service';
import { Router } from '@angular/router';

export interface User {
  email: string;
  role: string;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      
      const loginRequest: LoginRequest = this.createLoginRequest();

      this.authService.login(loginRequest).subscribe(
        {
          next: (response) => {
            const user: User = { email: response.body.email, role: response.body.role };
            LocalStorageService.saveUser(user);
            LocalStorageService.saveToken(response.body.token);
            this.router.navigateByUrl('/');
        },
          error: (error) => {
              console.log(error.error.message)
          }
        }
      )
    }
  }

  createLoginRequest(): LoginRequest{
    return new LoginRequest(this.loginForm.value.email,this.loginForm.value.password);
  }
}