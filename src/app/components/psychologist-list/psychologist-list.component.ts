import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

export interface Psychologist {
  id: number;
  name: string;
  specialization: string;
  imageUrl: string;
  tags: string[];
}

@Component({
  selector: 'app-psychologist-list',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, RouterModule],
  templateUrl: './psychologist-list.component.html',
  styleUrl: './psychologist-list.component.scss'
})
export class PsychologistListComponent {
  constructor(private router: Router) {}
  tags: string[] = [
    'ADICCIONES', 'ADICCIÓN A LAS DROGAS', 'ALIMENTACIÓN', 'ANSIEDAD',
    'AUTISMO', 'AUTOESTIMA', 'AUTOLESIONES', 'CRECIMIENTO PERSONAL',
    'CRIANZA DE LOS HIJOS', 'DEPRESIÓN', 'DUELO', 'EMDR', 'ESTRÉS',
    'EXPATRIACIÓN', 'FOBIAS', 'HIPOCONDRÍA', 'LGTBIQ+', 'PROCESAMIENTO DEL TRAUMA',
    'PSICOSIS', 'PSICOSOMÁTICA', 'PÁNICO', 'RELACIONES', 'SALUD', 'SEXOLOGÍA',
    'TOC', 'TERAPIA DE PAREJA', 'TRABAJO', 'TRASTORNO BIPOLAR', 'VIOLENCIA'
  ];

  psychologists = [
    {
      id: 1,
      name: 'Aitana Núñez Guzmán',
      specialization: 'Psicóloga con orientación tercera generación',
      imageUrl: 'assets/aitana.jpg',
      tags: ['ADICCIONES', 'TERAPIA DE PAREJA', 'PSICOSOMÁTICA', 'PÁNICO']
    },
    {
      id: 2,
      name: 'Tania Milans',
      specialization: 'Psicóloga con orientación Integradora',
      imageUrl: 'assets/tania.jpg',
      tags: ['HIPOCONDRÍA', 'TERAPIA DE PAREJA', 'DEPRESIÓN', 'EXPATRIACIÓN']
    },
  ];
  searchControl = new FormControl('');
  selectedTags: string[] = [];

  get filteredPsychologists() {
    return this.psychologists.filter(psy => {
      const matchesSearch = !this.searchControl.value ||
        psy.name.toLowerCase().includes(this.searchControl.value.toLowerCase()) ||
        psy.specialization.toLowerCase().includes(this.searchControl.value.toLowerCase());

      const matchesTags = this.selectedTags.length === 0 ||
        this.selectedTags.some(tag => psy.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }

  toggleTag(tag: string) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    } else {
      this.selectedTags.push(tag);
    }
  }


  viewDetails(psychologist: any) {
    this.router.navigate(['/doctor-details'], {
      state: { psychologist },
    });
  }
}