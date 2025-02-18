import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorResponse } from '../../models/doctor.model';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/auth/local-storage.service';
import { AppointmentService } from '../../services/appointment/appointment.service';

@Component({
  standalone: true,
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.scss'],
  imports: [CommonModule,
    ReactiveFormsModule]
})
export class DoctorPageComponent implements OnInit {
  doctor?: DoctorResponse;
  isModalOpen = false;
  appointmentForm: FormGroup;
  patientEmail: string = LocalStorageService.getUser().email;
  minDate: string;

  constructor(private router: Router, private fb: FormBuilder, private appointmentService: AppointmentService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.doctor = navigation.extras.state['doctor'] as DoctorResponse;
    }

    this.appointmentForm = this.fb.group({
      doctorEmail: [this.doctor?.email, [Validators.required, Validators.email]],
      patientEmail: [this.patientEmail, [Validators.required, Validators.email]],
      appointmentDate: ['', Validators.required],
      sessionType: ['', Validators.required]
    });

    const today = new Date();
    today.setMinutes(today.getMinutes() + 1);
    this.minDate = today.toISOString().slice(0, 16);
  }

  ngOnInit() {
    if (!this.doctor) {
      this.router.navigate(['/']);
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  onTimeChange(event: any) {
    const selectedDate = new Date(event.target.value);
    const minutes = selectedDate.getMinutes();
    
    if (minutes % 30 !== 0) {
      const roundedMinutes = Math.round(minutes / 30) * 30;
      selectedDate.setMinutes(roundedMinutes);
      
    }
  }
  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.appointmentService.createAppointment(this.appointmentForm.value).subscribe(response => {
        console.log('Código de estado:', response.status);
        console.log('Cuerpo de la respuesta:', response.body);
      });
      this.closeModal();
    }
  }
}

