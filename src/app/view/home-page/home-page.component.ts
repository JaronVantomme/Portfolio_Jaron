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

}
