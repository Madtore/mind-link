import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
  export class FooterComponent  {
    logo = 'mindlink.png';
    logoWidth = 64;
    logoHeight = 64;
  }

