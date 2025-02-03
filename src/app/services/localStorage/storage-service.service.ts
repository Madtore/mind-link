import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  static readonly TOKEN = "Token";
  static readonly USER = "User";


  constructor() { }

  static saveToken(token: string) {
    localStorage.removeItem(StorageServiceService.TOKEN)
    localStorage.setItem(StorageServiceService.TOKEN, token)
  }

  static saveUser(user: any) {
    localStorage.removeItem(StorageServiceService.USER)
    localStorage.setItem(StorageServiceService.USER, JSON.stringify(user))
  }

  static getToken(): string | null {
    return localStorage.getItem(StorageServiceService.TOKEN)
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(StorageServiceService.USER) || '{}')
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
    localStorage.removeItem(StorageServiceService.TOKEN)
    localStorage.removeItem(StorageServiceService.USER)
  }
  
}
