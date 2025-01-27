import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-appointment',
  standalone: true,
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  imports: [ ReactiveFormsModule, CommonModule]
})
export class AppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  selectedPsychologist: any = null;
  availableHours: string[] = [];
  showSummary: boolean = false;

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      psychologistId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      notes: [''],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
    // Aquí irían las llamadas iniciales al servicio
  }

  onPsychologistSelect(psychologist: any) {
    this.selectedPsychologist = psychologist;
    // Actualizar horas disponibles
    this.updateAvailableHours();
  }

  updateAvailableHours() {
    // Lógica para actualizar horas disponibles
  }

  onDateSelect() {
    // Actualizar horas disponibles según la fecha
    this.updateAvailableHours();
  }

  showAppointmentSummary() {
    if (this.appointmentForm.valid) {
      this.showSummary = true;
    }
  }

  confirmAppointment() {
    if (this.appointmentForm.valid) {
      // Lógica para enviar la cita al backend
    }
  }
}