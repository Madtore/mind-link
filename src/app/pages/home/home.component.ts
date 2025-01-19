import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {
  currentPhotoIndex = 0;
  
  photos = [
    { id: 1, url: 'https://pro.campus.sanofi/.imaging/mte/portal/3840/dam/Portal/Spain/articulos/e-health/mejores-apps-para-medicos-gratuitas/apps-medicina-hero.jpg/jcr:content/apps-medicina-hero.jpg', alt: 'Foto 1' },
    { id: 2, url: 'https://uniteco.ec/blog/wp-content/uploads/2023/08/MedicoMujer_ECU.jpg', alt: 'Foto 2' },
    { id: 3, url: 'https://www.consejo.org.ar/img_cache/widen_1920_storage-contents-49pxfi9xihjpg_.jpg', alt: 'Foto 3' }
  ];

  constructor() {}

 /* ngOnInit(): void {
    setInterval(() => {
      this.nextPhoto(); 
    }, 5000);
  }*/
  
  prevPhoto() {
    this.currentPhotoIndex = this.currentPhotoIndex === 0 
      ? this.photos.length - 1 
      : this.currentPhotoIndex - 1;
  }

  nextPhoto() {
    this.currentPhotoIndex = this.currentPhotoIndex === this.photos.length - 1 
      ? 0 
      : this.currentPhotoIndex + 1;
  }

  setPhoto(index: number) {
    this.currentPhotoIndex = index;
  }
}