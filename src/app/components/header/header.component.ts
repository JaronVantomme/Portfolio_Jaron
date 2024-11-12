import { Component, HostListener, OnInit } from '@angular/core';
import { CursorService } from '../../services/CursorService';
import { ScrollService } from '../../services/scroll.service';
import { TranslationService } from './../../services/tranlation.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public $unsubscribe = new Subject<void>();

  public activeSection: string = 'welkom';
  public selectedLang: string = 'en'

  constructor(private cursorService: CursorService, private scrollService: ScrollService, public translationService: TranslationService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    const lang = localStorage.getItem('lang');
    this.selectedLang = lang !== null ? lang : 'en';

    this.setLanguage(this.selectedLang)

    this.scrollService.currentSection$.pipe(takeUntil(this.$unsubscribe)).subscribe(section => {
      switch (section) {
        case 'welkom':
          this.activeSection = 'welkom';
          break;
        case 'skills':
          this.activeSection = 'skills';
          break;
        case 'work':
          this.activeSection = 'work';
          break;
        case 'contact':
          this.activeSection = 'contact';
          break;
        default:
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursorService.updateMousePosition(event.clientX, event.clientY);
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('magnet-button')) {
      this.cursorService.updateHoveringElement(target);
    } else {
      this.cursorService.updateHoveringElement(null);
    }
  }

  scrollToSection(sectionId: string) {
    if (window.location.pathname !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.activeSection = sectionId;
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      });
    } else {
      this.activeSection = sectionId;
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  observeSections() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, {
      threshold: 0.5,
    });

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  setLanguage(lang: string) {
    this.selectedLang = lang
    localStorage.setItem('lang', lang)
    this.translationService.setLanguage(lang);
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
