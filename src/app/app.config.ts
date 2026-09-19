import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'; 
import { provideBrowserGlobalErrorListeners } from '@angular/core'; 
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

// التعديل الأول: عملنا import لـ provideTranslateService
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    
    // التعديل التاني: استخدام provideTranslateService بشكل مباشر مع provideTranslateHttpLoader
    provideTranslateService({
      fallbackLang: 'en',
      lang: 'en', // اختياري: تقدر تحدد لغة افتراضية هنا
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      })
    }),

    provideCharts(withDefaultRegisterables()),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      tapToDismiss: true,
      closeButton: true,
      progressBar: true,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      },
      newestOnTop: true,
      easing: 'ease-in',
    }),
  ]
};