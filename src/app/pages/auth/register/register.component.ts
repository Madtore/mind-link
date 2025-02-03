import { Component, OnInit} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { PatientCreate } from '../../../common/login/DatientCreate';
import { Gender } from '../../../common/login/enum/Gender';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private router: Router, private authService: AuthService){

  }
  
  userType: string = '';

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    specialization: '',
    licenseNumber: '',
    priceHour: null
  };

  onUserTypeChange(type: string): void {
    this.userType = type;

    // Si cambia a paciente, limpiamos los datos extra de médico
    if (type === 'paciente') {
      this.formData.specialization = '';
      this.formData.licenseNumber = '';
      this.formData.priceHour = null;
    }
  }

  onSubmit(): void {

    if(this.userType == "paciente"){
      const patient: PatientCreate = new PatientCreate(
        "John",
        "Doe",
        "john.dsxose@example.com",
        "securePassword123",
        this.formatDate(new Date("1995-06-15")),
        Gender.MAN
      );
      this.authService.patientRegister(patient).subscribe(
        (res) => {
          if (typeof res === 'string') {
            console.log("Success:", res); 
          } else {
            console.log("Success:", res.message); 
          }
        },
        (err) => {
          console.error("Error:", err);
        }
      )
    }
  }
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; 
  }
  
}
