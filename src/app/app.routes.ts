import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'doctors',
    loadComponent: () => import('./pages/doctors/doctors.component').then(c => c.DoctorsComponent)
  },
  {
    path: 'doctor-details', 
    loadComponent: () => import('./pages/doctor-details/doctor-details.component').then(c => c.DoctorDetailsComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component').then(c => c.BlogComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path: 'video-call/:id',
    loadComponent: () => import('./pages/video-call/video-call.component').then(c => c.VideoCallComponent)
  },
  {
    path: 'add-post/:id',
    loadComponent: () => import('./pages/post-form/post-form.component').then(c => c.PostFormComponent)
  },
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
];
