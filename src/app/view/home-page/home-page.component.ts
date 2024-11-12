import { Component, HostListener, AfterViewInit, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { InfinityLoopScrollComponent } from '../../components/infinity-loop-scroll/infinity-loop-scroll.component';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { CursorService } from '../../services/CursorService';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { debounceTime, Subject, Subscription, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/tranlation.service';

import VanillaTilt from 'vanilla-tilt';
import Typed from 'typed.js';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [InfinityLoopScrollComponent, CommonModule, FormsModule, TimelineComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent implements OnInit {
  @ViewChild('flipCard', { static: false }) flipCard: ElementRef | undefined;
  @ViewChild('messageField', { static: false }) messageField: ElementRef | undefined;

  public $unsubscribe = new Subject<void>();

  private typed: Typed | null = null;
  public adjustCardHeightSubject = new Subject<void>();
  public activeFilter: string = 'all';
  public isFlipped = false;
  public name: string = ''
  public phoneNumber: any = ''
  public email: string = ''
  public message: string = ''
  private currentSection: string = '';


  constructor(private cursorService: CursorService, private elRef: ElementRef, private scrollService: ScrollService, public translationService: TranslationService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.updateCurrentSection();

    this.translationService.languageChange$.pipe(takeUntil(this.$unsubscribe)).subscribe(async () => {
      this.setTypingEffect()
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.typed) {
        this.setTypingEffect();
        this.cdRef.detectChanges();
      }
    });

    const elements = Array.from(document.querySelectorAll('.work-item')) as HTMLElement[];

    VanillaTilt.init(elements, {
      max: 5,
      speed: 400,
      glare: true,
      'max-glare': 0.1,
    });

    this.adjustCardHeightSubject.pipe(debounceTime(100), takeUntil(this.$unsubscribe)).subscribe(() => {
      this.adjustCardHeight();
    });

    if (this.messageField) {
      const resizeObserver = new ResizeObserver(() => {
        this.adjustCardHeight();
      });
      resizeObserver.observe(this.messageField.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  setTypingEffect() {
    if (this.typed) this.typed.destroy();
    
    const options = {
      strings: [this.translationService.getTranslation('Name'), this.translationService.getTranslation('Name'), this.translationService.getTranslation('Programmer'), this.translationService.getTranslation('Programmer'), this.getTranslation('Developer'), this.getTranslation('Developer'), this.getTranslation('Designer') , this.getTranslation('Designer')],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 3000,
      startDelay: 250,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    };

    this.typed = new Typed('#typed-text', options);
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
    }, 100);
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
  onWindowScroll() {
    this.updateCurrentSection();
  }

  updateCurrentSection() {
    const sections = this.elRef.nativeElement.querySelectorAll('section');
    let currentSectionId: string = '';

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

    // return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId)
    //   .then((response) => {
    //     console.log('Email sent successfully:', response);
    //     // TODO: popup met check spam folder als je geen bericht ontvangt
    //     // TODO: styling fixen templte emailJS
    //   })
    //   .catch((error) => {
    //     console.error('Failed to send email:', error);
    //   });
  }

  closePopup() {
    this.isFlipped = !this.isFlipped;
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

}
