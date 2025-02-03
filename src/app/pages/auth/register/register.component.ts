import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  userType: string = ''; // 'paciente' o 'medico'

  // Modelo del formulario
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
    if (this.userType === 'medico') {
      console.log('Datos enviados (Médico):', this.formData);
    } else {
      console.log('Datos enviados (Paciente):', this.formData);
    }
  }
}
