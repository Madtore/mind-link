import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import { DoctorResponse } from '../models/doctor.model';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/doctors';

  getDoctors(): Observable<{ doctors: DoctorResponse[], totalPages: number }> {
    return this.http.get<{ content: DoctorResponse[], totalPages: number }>(this.apiUrl).pipe(
      map(response => ({
        doctors: response.content,  
        totalPages: response.totalPages 
      }))
    );
  }
}









