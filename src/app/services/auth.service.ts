import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  isAuthenticated = signal(false);

  constructor(private router: Router) {
    // Check localStorage on init
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
      this.isAuthenticated.set(true);
    }
  }

  login(email: string, password: string) {
    // Implement your login logic here
    // This is just a mock example
    const mockUser: User = {
      id: '1',
      email,
      name: 'User Name',
      role: 'patient'
    };
    
    this.currentUser.set(mockUser);
    this.isAuthenticated.set(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
    this.router.navigate(['/']);
  }

  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUser() {
    return this.currentUser;
  }
}