import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../auth/local-storage.service';
import { Profile, ProfileDoctor } from '../../models/profile';
import { Appointment } from '../../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly API_URL = 'http://localhost:8080/api/v1/user';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  private get headers(): HttpHeaders {
    const token = LocalStorageService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  isDoctor(): boolean {
    return LocalStorageService.getUserRole() === 'ROLE_DOCTOR';
  }

  getProfileDoctor(): Observable<ProfileDoctor> {
    const email = LocalStorageService.getUser()?.email;
    return this.http.get<ProfileDoctor>(
      `${this.API_URL}/doctor?email=${email}`,
      { headers: this.headers }
    );
  }

  getProfilePatient(): Observable<Profile> {
    const email = LocalStorageService.getUser()?.email;
    return this.http.get<Profile>(
      `${this.API_URL}/patient?email=${email}`,
      { headers: this.headers }
    );
  }
}

