// src/app/services/translation.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLang: string = 'es'; // Idioma predeterminado

  constructor(private translateService: TranslateService) {
    // Establece el idioma predeterminado al iniciar
    this.translateService.setDefaultLang(this.currentLang);
    this.translateService.use(this.currentLang);

    // Opcional: carga el idioma almacenado en localStorage (si existe)
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      this.changeLanguage(savedLang);
    }
  }

  // Método para cambiar el idioma
  changeLanguage(lang: string) {
    this.currentLang = lang;
    this.translateService.use(lang);

    // Guardar el idioma en localStorage para mantener la preferencia del usuario
    localStorage.setItem('language', lang);
  }

  // Método para obtener el idioma actual
  getCurrentLang(): string {
    return this.currentLang;
  }
}
