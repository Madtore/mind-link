import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from './auth/local-storage.service';

let tokenName = '';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => { 

  const token = LocalStorageService.getToken(); 

  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedRequest);
};
