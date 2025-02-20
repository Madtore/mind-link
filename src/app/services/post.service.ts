import { Injectable } from '@angular/core';
import { LikeService } from './like.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private likeService: LikeService, private sanitizer: DomSanitizer) {}

  

  getSafeUrl(base64String: string) {
    if (!base64String || base64String.trim() === '') return '';

    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

    const imageType = this.detectImageType(base64);  
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/${imageType};base64,${base64}`);
  }

  private detectImageType(base64: string): string {
    const signature = base64.substring(0, 30);
    if (signature.startsWith('/9j/')) return 'jpeg';
    if (signature.startsWith('iVBORw')) return 'png';
    if (signature.startsWith('R0lGOD')) return 'gif';
    if (signature.startsWith('UklGR')) return 'webp'; 
    return 'jpeg'; 
  }
}
