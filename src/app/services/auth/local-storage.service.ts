import { Injectable } from '@angular/core';
import { type User } from '../../pages/auth/login/login.component';

const TOKEN = "Token"
const USER = "User"

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  static saveToken(token: string) {
    localStorage.removeItem(TOKEN)
    localStorage.setItem(TOKEN, token)
  }

  static saveUser(user: User) {
    localStorage.removeItem(USER)
    localStorage.setItem(USER, JSON.stringify(user))
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN)
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER) || '{}')
  }

  static getUserId(): string {
    const user = this.getUser()

    if (user == null) return ''

    return user.id
  }

  static getUserRole(): string {
    const user = this.getUser()

    if (user == null) return ''

    return user.role
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() == null) return false

    return this.getUserRole() === 'ADMIN'
  }

  static isCustomerLoggedIn(): boolean {
    if (this.getToken() == null) return false

    return this.getUserRole() === 'CUSTOMER'
  }

  static logout() {
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(USER)
  }
}
