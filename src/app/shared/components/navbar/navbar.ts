import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslatePipe, TranslateDirective],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  isMenuCollapsed = true;

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
  public translate = inject(TranslateService);

  constructor() {
    // تحديد اللغة الافتراضية
    this.translate.use('en');
    
    // لو اليوزر كان مختار لغة قبل كده ومتسيفة في الـ localStorage هنجيبها
    const savedLang = localStorage.getItem('lang') || 'en';
    this.useLanguage(savedLang);
  }

  useLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('lang', language);

    // سحر الـ RTL: بنغير اتجاه الـ HTML كله بناءً على اللغة!
    const htmlTag = document.dir;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }
}
