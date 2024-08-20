import { Component, HostListener } from '@angular/core';
import { CursorService } from '../../services/CursorService';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public activeSection: string = 'welkom';

  constructor(private cursorService: CursorService) {}

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
    this.activeSection = sectionId
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
      threshold: 0.5, // Adjust the threshold as needed
    });

    sections.forEach(section => {
      observer.observe(section);
    });
  }
}
