import { Component, inject } from '@angular/core';
import { PsychologistListComponent } from '../../components/psychologist-list/psychologist-list.component';


@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [ PsychologistListComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss'
})
export class DoctorsComponent {
}
