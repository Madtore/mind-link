import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorResponse } from '../../models/doctor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-page',
  standalone: true,
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.scss'],
  imports: [CommonModule]
})
export class DoctorPageComponent implements OnInit {
  doctor?: DoctorResponse;
  
  constructor(private router: Router) {
    // Intenta obtener el doctor del estado del router
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.doctor = navigation.extras.state['doctor'] as DoctorResponse;
    }
  }
  
  ngOnInit() {
    // Si no se pudo obtener el doctor, redirige a la página principal
    if (!this.doctor) {
      this.router.navigate(['/']);
    }
  }
}
