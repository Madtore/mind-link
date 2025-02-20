import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorCardComponent } from '../../components/doctor-card/doctor-card.component';
import { DoctorService } from '../../services/doctor.service';
import { DoctorResponse } from '../../models/doctor.model';


@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, DoctorCardComponent],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  sercCategory: string = '';
  doctors: DoctorResponse[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  filterDoctors: DoctorResponse[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.filterDoctors = this.doctors;
  }

  loadDoctors(page: number = 0): void {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data.doctors;
        this.totalPages = data.totalPages;
        this.currentPage = page;
      },
      error: (error) => console.error('Error al cargar doctores:', error)
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadDoctors(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.loadDoctors(this.currentPage - 1);
    }
  }
}