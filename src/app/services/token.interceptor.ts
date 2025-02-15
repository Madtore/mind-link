import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from './auth/local-storage.service';

let tokenName = '';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => { 

  const token = LocalStorageService.getToken(); 

  const publicUrls = ['/auth/login', '/api/v1/doctors', '/api/v1/auth/register/patient', '/api/v1/auth/register/doctor'];

  if (publicUrls.some(url => req.url.includes(url))) {
    return next(req); 
  }

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedRequest);
};
