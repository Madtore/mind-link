import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile/profile.service';
import { Appointment } from '../../models/appointment';
import { Profile, ProfileDoctor } from '../../models/profile';
import { AppointmentService } from '../../services/appointment/appointment.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = false;
  todaysAppointments: Appointment[] = [];
  profile?: Profile | ProfileDoctor;
  isDoctor = false;
  currentDate = new Date();
  weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  calendarDays: Array<{
    number: number;
    appointments: Appointment[];
  }> = [];
  appointments: Appointment[] = [];
  dataLoading = true;


  getDoctorProfile(): ProfileDoctor | undefined {
    if (this.isDoctor && this.profile) {
      return this.profile as ProfileDoctor;
    }
    return undefined;
  }

  constructor(private profileService: ProfileService, private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    const today = new Date();
    this.appointmentService.getAppointment().subscribe(
      appointments => {
        this.appointments = appointments.map((appointment: Appointment) => {
          const appointmentDate = new Date(appointment.appointmentDate);
          if (appointment.sessionType === 'INITIAL_EVALUATION') {
            appointment.sessionType = 'Evaluación Inicial';
          }
          if (appointment.sessionType === 'CRISIS_INTERVENTION') {
            appointment.sessionType = 'Crisis de Intervención';
          }
          if (appointment.sessionType === 'FOLLOW_UP') {
            appointment.sessionType = 'Seguimiento';
          }
          const status: 'futura' | 'pasada' = today < appointmentDate ? 'futura' : 'pasada';
          return { ...appointment, status };
        });

        this.todaysAppointments = this.appointments.filter(appointment => {
          const appointmentDate = new Date(appointment.appointmentDate);
          return appointmentDate.toDateString() === today.toDateString();
        });
        this.loadProfile();
      this.generateCalendarDays();
      this.dataLoading = false;

        
      },
      error => {
        console.error("Error al obtener citas:", error);
      }
    );
  }
  
  
  private loadProfile() {
    if (this.profileService.isDoctor()) {
      this.isDoctor = true;
      this.profileService.getProfileDoctor().subscribe(
        profile => this.profile = profile
      );
    } else {
      this.profileService.getProfilePatient().subscribe(
        profile => this.profile = profile
      );
    }
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendarDays();
  }

  private generateCalendarDays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    let firstDayOffset = firstDayOfMonth.getDay() - 1;
    if (firstDayOffset === -1) firstDayOffset = 6;

    this.calendarDays = [];

    for (let i = 0; i < firstDayOffset; i++) {
      this.calendarDays.push({ number: 0, appointments: [] });
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      this.calendarDays.push({
        number: day,
        appointments: this.getAppointmentsForDay(day)
      });
    }
 
  }

  private getAppointmentsForDay(day: number): Appointment[] {
    const date = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      day
    );

    return this.appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointmentDate);
      return appointmentDate.getDate() === date.getDate() &&
             appointmentDate.getMonth() === date.getMonth() &&
             appointmentDate.getFullYear() === date.getFullYear();
    });
  }

  openUrl(idAppointment: number) {
    this.appointmentService.getUrlAppointment(idAppointment).subscribe(
      response => {
        console.log('URL de la cita:', response);
        window.open(response.roomUrl, '_blank');
      },
      error => {
        alert('Error al obtener la URL de la cita');
      }
    )
  }
  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe(
      response => {
        console.log('Cita eliminada:', response);
        this.loadAppointments(); 
        this.generateCalendarDays(); 
      },
      error => {
        console.error("Error al eliminar cita:", error);
      }
    )
  }
}