import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('1s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SplashScreenComponent {
  showSplash = true;
  showBackground = false;

  ngOnInit() {
    setTimeout(() => {
      this.showBackground = true;
    }, 2500);
    setTimeout(() => {
      this.showSplash = false;
    }, 5000);
  }
}
