import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private messageSource = new BehaviorSubject<{ message: string, type: 'success' | 'error' } | null>(null);
  currentMessage = this.messageSource.asObservable();

  showNotification(message: string, type: 'success' | 'error') {
    this.messageSource.next({ message, type });
    setTimeout(() => this.messageSource.next(null), 3000);
  }
}
