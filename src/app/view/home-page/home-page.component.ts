import { Component, HostListener, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';
import { InfinityLoopScrollComponent } from '../../components/infinity-loop-scroll/infinity-loop-scroll.component';
import Typed from 'typed.js';
import { CursorService } from '../../services/CursorService';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [InfinityLoopScrollComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent implements OnInit {
  public activeFilter: string = 'all';
  public isFlipped = false;


  public workItems = [
    { title: 'Project 1', category: 'web', image: 'https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg' },
    { title: 'Project 2', category: 'app', image: 'https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg' },
    { title: 'Project 3', category: 'branding', image: 'https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg' },
    { title: 'Project 4', category: 'web', image: 'https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg' },
    { title: 'Project 5', category: 'app', image: 'https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg' },
    { title: 'Project 6', category: 'branding', image: 'https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg' },
    { title: 'Project 6', category: 'branding', image: 'https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg' },
    { title: 'Project 6', category: 'branding', image: 'https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg' },
    { title: 'Project 6', category: 'branding', image: 'https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg' },
    { title: 'Project 6', category: 'branding', image: 'https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg' }
  ];

  public filteredItems = this.workItems;
  private currentSection: string = '';


  constructor(private cursorService: CursorService, private elRef: ElementRef, private scrollService: ScrollService) {}

  ngOnInit() {
    this.updateCurrentSection();
  }

  ngAfterViewInit(): void {
    const options = {
      strings: ["Jaron Vantomme", "Jaron Vantomme", "a programmer" , "a programmer", "a developer" , "a developer", "a designer" , "a designer"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 3000,
      startDelay: 250,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    };

    new Typed('#typed-text', options);

    const elements = Array.from(document.querySelectorAll('.work-item')) as HTMLElement[];

    VanillaTilt.init(elements, {
      max: 5,
      speed: 400,
      glare: true,
      'max-glare': 0.1,
    });
  }

  applyRipple(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const ripple = button.querySelector('.ripple') as HTMLElement;

    ripple.classList.remove('animate');

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.offsetWidth;
    ripple.classList.add('animate');

    setTimeout(() => ripple.classList.remove('animate'), 600);
  }

  filterItems(category: string) {
    this.activeFilter = category;
    if (category === 'all') {
      this.filteredItems = this.workItems;
    } else {
      this.filteredItems = this.workItems.filter(item => item.category === category);
    }
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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.updateCurrentSection();
  }

  updateCurrentSection() {
    const sections = this.elRef.nativeElement.querySelectorAll('section');
    let currentSectionId = '';

    sections.forEach((section: HTMLElement) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentSectionId = section.id;
      }
    });

    if (this.currentSection !== currentSectionId) {
      this.currentSection = currentSectionId;
      this.scrollService.updateSection(currentSectionId);
    }
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  sendEmail(event: Event) {
    event.preventDefault();

    console.log('Formulier ingediend!');
  }

  closePopup() {
    this.isFlipped = !this.isFlipped;
  }

}
