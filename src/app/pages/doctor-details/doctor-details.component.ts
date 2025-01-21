import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.scss'
})
export class DoctorDetailsComponent implements OnInit{

  psychologist = history.state.psychologist;
  // destructurar psychologist para tener los valores 

  details = {
    name : this.psychologist.name,
    specialization : this.psychologist.specialization,
    imageUrl : this.psychologist.imageUrl,
    tags : this.psychologist.tags
  }
area: any;

  constructor(private location: Location) {}
  ngOnInit(): void {
    if (!this.psychologist) {
      this.goBack();
    } else {
      
    }
  }

  goBack() {
    this.location.back();
  }
}