import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { AuthService } from '../../../core/auth/services/auth-service';
import { AlertService } from '../../services/alert-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslatePipe, TranslateDirective],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit{
  isMenuCollapsed = true;
  private authService = inject(AuthService);
 protected isLoggedIn = this.authService.isLoggedIn;
  protected isAdmin = this.authService.isAdmin;
  protected isDoctor = this.authService.isDoctor;
  protected isPatient = this.authService.isPatient;
  
  private router = inject(Router);
  private alertService = inject(AlertService);
  public translate = inject(TranslateService);

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }


  constructor() {
    // تحديد اللغة الافتراضية
    this.translate.use('en');
    
    // لو اليوزر كان مختار لغة قبل كده ومتسيفة في الـ localStorage هنجيبها
    const savedLang = localStorage.getItem('lang') || 'en';
    this.useLanguage(savedLang);
  }

  ngOnInit(): void {
  }



  useLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('lang', language);

    // سحر الـ RTL: بنغير اتجاه الـ HTML كله بناءً على اللغة!
    const htmlTag = document.dir;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }

  logout() {
    this.authService.logout();
    this.alertService.toastSuccess('Logged out successfully !');
    this.router.navigate(['/auth']);
  }
}
