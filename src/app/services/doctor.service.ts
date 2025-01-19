import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../models/doctor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private http = inject(HttpClient);
  private apiUrl = 'api/doctors';

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }
}