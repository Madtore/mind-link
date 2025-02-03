import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorCreate } from '../../common/login/DoctorCreate';
import { Observable } from 'rxjs';
import { PatientCreate } from '../../common/login/DatientCreate';
import { LoginRequest } from '../../common/login/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private basic_url ="http://localhost:8080";
  
  constructor(private http: HttpClient) { }

  public patientRegister(patient : PatientCreate): Observable<any>{
    return this.http.post(`${this.basic_url}/api/v1/auth/register/patient`,patient)
  }

  public doctorRegister(doctor : DoctorCreate): Observable<any>{
    return this.http.post(`${this.basic_url}/api/v1/auth/register/doctor`,doctor)
  }

  public login(loginRequest : LoginRequest): Observable<any>{
    return this.http.post(`${this.basic_url}/api/v1/auth/login`,loginRequest)
  }
}
