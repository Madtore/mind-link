import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = {
    name: 'Nombre del Usuario',
    email: 'usuario@email.com',
    photo: 'assets/avatar/default.png',
    appointments: [
      { date: '2025-03-10', psychologist: 'Dr. Pérez', status: 'futura' },
      { date: '2025-02-05', psychologist: 'Dra. Gómez', status: 'pasada' },
      { date: '2025-02-12', psychologist: 'Dr. Martínez', status: 'futura' },
      { date: '2025-02-18', psychologist: 'Dr. Martínez', status: 'pasada' },
      { date: '2025-02-28', psychologist: 'Dr. Martínez', status: 'futura' }
    ]
  };
  filter: 'futura' | 'pasada' = 'futura';

  currentDate: Date = new Date();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();
  currentDay: number = this.currentDate.getDay();
  daysInMonth: number[] = [];
  firstDayOfMonth: number = 0;

  ngOnInit() {
    this.currentDate = new Date;
    this.updateCalendar();
  }

  updateCalendar() {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.currentDay = this.currentDate.getDay();

    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    this.firstDayOfMonth = firstDay === 0 ? 6 : firstDay - 1;

    const totalDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateCalendar();
  }

  getAppointmentsForDay(day: number) {
    const dateString = `${this.currentYear}-${(this.currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return this.user.appointments.filter(appointment => appointment.date === dateString && appointment.status === this.filter);
  }
}