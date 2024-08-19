import { Component, HostListener } from '@angular/core';
import { InfinityLoopScrollComponent } from '../../components/infinity-loop-scroll/infinity-loop-scroll.component';
import Typed from 'typed.js';
import { CursorService } from '../../services/CursorService';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [InfinityLoopScrollComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private cursorService: CursorService) {}

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

}
