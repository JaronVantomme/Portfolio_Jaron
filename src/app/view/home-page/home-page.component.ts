import { Component } from '@angular/core';
import { InfinityLoopScrollComponent } from '../../components/infinity-loop-scroll/infinity-loop-scroll.component';
import Typed from 'typed.js';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [InfinityLoopScrollComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  ngAfterViewInit(): void {
    const options = {
      strings: ["Jaron Vantomme", "a programmer", "a developer", "a designer"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 3000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    };

    new Typed('#typed-text', options);
  }

  applyRipple(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const ripple = button.querySelector('.ripple') as HTMLElement;

    // Verwijder eventuele bestaande ripple-effecten
    ripple.classList.remove('animate');

    // Bereken de grootte en positie van de ripple
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    // Stel de grootte en positie in
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Forceer een hertekening van de ripple
    ripple.offsetWidth; // Dit zorgt ervoor dat de stijlwijzigingen worden gepusht
    ripple.classList.add('animate');

    // Verwijder de animatie na afloop
    setTimeout(() => ripple.classList.remove('animate'), 600); // Zorg ervoor dat de duur van de timeout overeenkomt met de duur van de animatie
  }

}
