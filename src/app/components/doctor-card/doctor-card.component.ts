import { Component, Input } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss'],
  imports: [CommonModule],
})
export class DoctorCardComponent {
  @Input() doctor: Doctor = { id: 1, name: 'John', specialty: 'Cardiology' };

  call() {
    // Implementation for call action
  }
}