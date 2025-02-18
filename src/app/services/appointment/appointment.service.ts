import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../auth/local-storage.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private urlApi = 'http://localhost:8080/api/v1/appointments';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = LocalStorageService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAppointmentsByDoctor(): Observable<any> {
    const doctorEmail = LocalStorageService.getUser().email;
    console.log('Doctor Email:', doctorEmail);
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.urlApi}/doctor?doctorEmail=${doctorEmail}`, { headers });
  }

  getAppointmentsByPatient(): Observable<any> {
    const patientEmail = LocalStorageService.getUser().email;
    console.log('Patient Email:', patientEmail);
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.urlApi}/patient?patientEmail=${patientEmail}`, { headers });
  }
  getAppointment(): Observable<any> {
      if (LocalStorageService.getUserRole() === 'ROLE_DOCTOR') {
        return this.getAppointmentsByDoctor();
      } else if (LocalStorageService.getUserRole() === 'ROLE_PATIENT') {
        return this.getAppointmentsByPatient();
      }
      return new Observable<any>();
  }


  createAppointment(appointment: any): Observable<HttpResponse<any>> {
    console.log(appointment);
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.urlApi}/create`, appointment, { headers, observe: 'response' });
  }


  getUrlAppointment(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `http://localhost:8080/api/v1/room/url?appointmentID=${id}`;  
    return this.http.get(url, { headers });
}


  deleteAppointment(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.urlApi}/delete?id=${id}`;
    return this.http.delete(url , { headers });
  }
}