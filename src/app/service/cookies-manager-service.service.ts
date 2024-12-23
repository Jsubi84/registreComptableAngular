import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {

  constructor(private cookieService: CookieService) {}

  setSessionToken(token: string, minutes: number): void {
    let now = new Date();
    now.setTime(now.getTime() + minutes * 60 * 1000); // minuts en mil·lisegons
    this.cookieService.set('session_token', token, { expires: now });
  }

  deleteSessionToken(): void {
    this.cookieService.delete('session_token');
  }

  checkSessionToken(): boolean {
    return this.cookieService.check('session_token');
  }

  getSessionToken(): string {
    return this.cookieService.get('session_token');
  }

  getUserName(): string {
    return this.cookieService.get('userName');
  }

  setUserName( userName: string ): void {
    return this.cookieService.set('userName',  userName);
  }
}