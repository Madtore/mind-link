import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'doctors',
    loadComponent: () => import('./pages/doctors/doctors.component').then(c => c.DoctorsComponent)
  },
  {
    path: 'doctors/details',
    loadComponent: () => import('./pages/doctor-page/doctor-page.component').then(c => c.DoctorPageComponent)
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
    path: 'add-post',
    loadComponent: () => import('./pages/post-form/post-form.component').then(c => c.PostFormComponent)
  },
  {
    path: 'appointment',
    loadComponent: () => import('./pages/appointment/appointment.component').then(c => c.AppointmentComponent)
  },
  {
    path: 'post/:id',
    loadComponent: () => import('./pages/post-details/post-details.component').then(c => c.PostDetailsComponent)
  }
];
