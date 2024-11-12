import { Injectable } from '@angular/core';
import enTranslations from '../../assets/i18n/en.json';
import frTranslations from '../../assets/i18n/fr.json';
import nlTranslations from '../../assets/i18n/nl.json';
import { Subject } from 'rxjs';
import { Skill } from '../models/skills.model';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {
    en: enTranslations,
    fr: frTranslations,
    nl: nlTranslations,
  };

  private currentLang: string = 'en';
  private languageChangeSubject = new Subject<string>();
  languageChange$ = this.languageChangeSubject.asObservable();

  setLanguage(lang: string) {
    this.currentLang = lang;
    this.languageChangeSubject.next(this.currentLang);
  }

  getTranslation(key: string): string {
    return this.translations[this.currentLang][key] || key;
  }

  getSkills(): Skill[] {
    return this.translations[this.currentLang]['skills'];
  }

  getProjectTranslation(projectId: string, key: string): string {
    return this.translations[this.currentLang]['Projects'][projectId][key] || key;
  }

  getCurrentLanguage(): string {
    return this.currentLang;
  }
}
