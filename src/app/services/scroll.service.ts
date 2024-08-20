import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private currentSectionSubject = new BehaviorSubject<string>('welcome');
  currentSection$ = this.currentSectionSubject.asObservable();
  private currentSection: string = 'welcome';

  constructor() {}

  updateSection(sectionId: string): void {
    if (this.currentSection !== sectionId) {
      this.currentSection = sectionId;
      this.currentSectionSubject.next(sectionId);
    }
  }
}
