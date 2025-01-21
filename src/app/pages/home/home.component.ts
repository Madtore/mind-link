import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { InnovationComponent } from '../../components/innovation/innovation.component';
import { PricingComponent } from '../../components/pricing/pricing.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ HeroComponent, InnovationComponent, PricingComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {
  
}