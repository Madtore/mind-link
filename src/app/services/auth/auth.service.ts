import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorCreate } from '../../common/login/DoctorCreate';
import { Observable } from 'rxjs';
import { PatientCreate } from '../../common/login/PatientCreate';
import { LoginRequest } from '../../common/login/LoginRequest';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private basic_url ="http://localhost:8080/api/v1";
  
  constructor(private http: HttpClient) { }

  public patientRegister(patient: PatientCreate): Observable<HttpResponse<any>> {
    return this.http.post<{ message: string }>(
      `${this.basic_url}/auth/register/patient`, 
      patient, 
    { observe: 'response' }
    );
  }
  

  public doctorRegister(doctor : DoctorCreate): Observable<HttpResponse<any>>{
    return this.http.post<{ message: string }>(
      `${this.basic_url}/auth/register/doctor`,
      doctor,
      { observe: 'response' }
    )
  }

  public login(loginRequest : LoginRequest): Observable<HttpResponse<any>>{
    return this.http.post<{ token : string, email: string }>(
      `${this.basic_url}/auth/login`,
      loginRequest,
      {observe: 'response'}
    )
  }
}
