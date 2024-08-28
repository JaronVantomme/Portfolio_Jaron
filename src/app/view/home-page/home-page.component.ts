import { Component, HostListener, AfterViewInit, OnInit, ElementRef, ViewChild } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';
import { InfinityLoopScrollComponent } from '../../components/infinity-loop-scroll/infinity-loop-scroll.component';
import Typed from 'typed.js';
import { CursorService } from '../../services/CursorService';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { debounceTime, Subject } from 'rxjs';
import emailjs from 'emailjs-com';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [InfinityLoopScrollComponent, CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent implements OnInit {
  @ViewChild('flipCard', { static: false }) flipCard: ElementRef | undefined;
  @ViewChild('messageField', { static: false }) messageField: ElementRef | undefined;

  private userId = 'mq9EISwKXRK9fCDi_';
  private serviceId = 'service_o5hpnwl';
  private templateId = 'template_2yhkx2l';

  public adjustCardHeightSubject = new Subject<void>();

  public activeFilter: string = 'all';
  public isFlipped = false;

  public name: string = ''
  public phoneNumber: any = ''
  public email: string = ''
  public message: string = ''


  public workItems = [
    { title: 'Project One', category: 'website', image: 'https://i.postimg.cc/T14c50mZ/Project-One.jpg' },
    { title: 'Social Creativity Cup 2020', category: 'document', image: 'https://i.postimg.cc/L5KwkY3H/Social-Creativity-Cup.jpg' },
    { title: 'Interaction Design Project', category: 'website', image: 'https://i.postimg.cc/DZt6WKyb/Interaction-Design-Project.jpg' },
    { title: 'Team Project', category: 'website', image: 'https://i.postimg.cc/zvgr4tJj/Team-Project.jpg' },
    { title: 'Portfolio', category: 'website', image: 'https://i.postimg.cc/0QGZFBCg/Portfolio-Mockup.jpg' },
  ];

  // public workItems = [
  //   { title: 'Project One', category: 'website', image: 'https://i.postimg.cc/NfRDb3h0/Project-One-White.jpg' },
  //   { title: 'Social Creativity Cup 2020', category: 'document', image: 'https://i.postimg.cc/L5KwkY3H/Social-Creativity-Cup.jpg' },
  //   { title: 'Interaction Design Project', category: 'website', image: 'https://i.postimg.cc/K8yq2Z7L/Interaction-Design-Project-White.jpg' },
  //   { title: 'Team Project', category: 'website', image: 'https://i.postimg.cc/nzMTkMZ8/Team-Project-White.jpg' },
  //   { title: 'Portfolio', category: 'website', image: 'https://i.postimg.cc/DZDWqMjd/Portfolio-Mockup-White.jpg' },
  // ];

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

    this.adjustCardHeightSubject.pipe(debounceTime(100)).subscribe(() => {
      this.adjustCardHeight();
    });

    if (this.messageField) {
      const resizeObserver = new ResizeObserver(() => {
        this.adjustCardHeight();
      });
      resizeObserver.observe(this.messageField.nativeElement);
    }
  }

  adjustCardHeight() {
    if (this.flipCard && this.messageField) {
      const textArea = this.messageField.nativeElement;
      const flipCardBack = this.flipCard.nativeElement.querySelector('.flip-card-back');
      const flipCardFront = this.flipCard.nativeElement.querySelector('.flip-card-front');

      if (textArea && flipCardBack && flipCardFront) {
        const textAreaHeight = textArea.scrollHeight;

        const addedHeight = textAreaHeight - 68

        textArea.style.height = `${textAreaHeight}px`;
        flipCardBack.style.height = `${550 + addedHeight}px`;
        this.flipCard.nativeElement.style.height = `${550 + addedHeight}px`;
      }
    }
  }

  changeFlipCard() {
    this.isFlipped = !this.isFlipped;
    if (this.isFlipped) {
      this.adjustCardHeightSubject.next();
    }
  }

  flipCardFunction() {
    this.isFlipped = !this.isFlipped;
    if (this.isFlipped) {
      this.adjustCardHeightSubject.next();
    }
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

    setTimeout(() => {
      ripple.classList.remove('animate')
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
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

  sendEmail() {
    const templateParams = {
      name: this.name,
      phoneNumber: this.phoneNumber,
      email: this.email,
      message: this.message
    };

    return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId)
      .then((response) => {
        console.log('Email sent successfully:', response);
        // TODO: popup met check spam folder als je geen bericht ontvangt
        // TODO: styling fixen templte emailJS
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
      });
  }

  closePopup() {
    this.isFlipped = !this.isFlipped;
  }

}
