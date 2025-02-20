import { Component, Input, Output } from '@angular/core';
import { DoctorResponse } from '../../models/doctor.model';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss'],
  imports: [CommonModule],
})
export class DoctorCardComponent {
  @Input() doctor: DoctorResponse = { firstName: '', lastName: '', email: '', dateOfBirth: '', gender: '', specialization: '', licenseNumber: '', priceHour: 0 };

  @Output() doctorSelected = new EventEmitter<DoctorResponse>();
  
  constructor(private router: Router) {}
  selectDoctor() {
    this.doctorSelected.emit(this.doctor);

    this.router.navigate(['/doctors/details'], {
      state: { doctor: this.doctor }
    });
  }
}