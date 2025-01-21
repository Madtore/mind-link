import { Component, inject } from '@angular/core';
import { PsychologistListComponent } from '../../components/psychologist-list/psychologist-list.component';
import { HeroComponent } from '../../components/hero/hero.component';


@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [ PsychologistListComponent, HeroComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss'
})
export class DoctorsComponent {
}
