import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user = {
    name: 'Nombre del Usuario',
    email: 'usuario@email.com',
    photo: 'assets/avatar/default.png',
    appointments: [
      { date: '2025-03-10', psychologist: 'Dr. Pérez', status: 'futura' },
      { date: '2025-02-05', psychologist: 'Dra. Gómez', status: 'pasada' }
    ]
  };
  filter: 'futura' | 'pasada' = 'futura';
}