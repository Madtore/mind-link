import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { LocalStorageService } from '../../services/auth/local-storage.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ ]
})
export class HeaderComponent  {
  logo = 'mindlink.png';
  logoWidth = 42;
  logoHeight = 42;

  logUserRole = computed(() => LocalStorageService.getUserRole());
  loged = computed(() => !!LocalStorageService.userSignal());

  constructor() {
    console.log('loged' + this.logUserRole());
  }

   logOut() {
    LocalStorageService.logout();
    console.log('logout' + this.loged());
  }

}

