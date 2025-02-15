import { Injectable, signal } from '@angular/core';
import { type User } from '../../pages/auth/login/login.component';

const TOKEN = "Token"
const USER = "User"

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  static roleSigal = signal<string>(LocalStorageService.getUserRole());
  static userSignal = signal<any>(LocalStorageService.getUser());

  constructor() { }

  private static isBrowser(): boolean {
    return typeof window !== 'undefined';   
  }

  static saveToken(token: string) {
    if (!this.isBrowser()) return;  
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);
  
  }

  static saveUser(user: User) {
    if (!this.isBrowser()) return;  
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
    this.userSignal.set(user);
    this.roleSigal.set(user.role);
  }

  static getToken(): string | null {
    if (!this.isBrowser()) return null;  
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    if (!this.isBrowser()) return {};  
    return JSON.parse(localStorage.getItem(USER) || '{}');
  }

  static getUserId(): string {
    const user = this.getUser();
    return user?.id || ''; 
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user?.role || '';  
  }

  static isAdminLoggedIn(): boolean {
    return this.getToken() != null;
  }

  static isCustomerLoggedIn(): boolean {
    return this.getToken() != null;
  }

  static logout() {
    if (!this.isBrowser()) return; 
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    this.userSignal.set(null);
  }
}