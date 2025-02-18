import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
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
    const params = new HttpParams().set('doctorEmail', doctorEmail);
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.urlApi}/doctor`, { headers, params });
  }

  getAppointmentsByPatient(): Observable<any> {
    const patientEmail = LocalStorageService.getUser().email;
    const params = new HttpParams().set('patientEmail', patientEmail);
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.urlApi}/patient`, { headers, params });
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
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.urlApi}/create`, appointment, { headers, observe: 'response' });
  }


  getUrlAppointment(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams().set('appointmentID', id.toString()); 
    const url = `http://localhost:8080/api/v1/room/url`;  
    return this.http.get(url, { headers, params });
  }


  deleteAppointment(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams().set('id', id.toString());
    const url = `${this.urlApi}/delete`;
    return this.http.delete(url, { headers , params });
  }
}