import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component'; 
import { CursorBallComponent } from './components/cursor-ball/cursor-ball.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CursorBallComponent, CommonModule, SplashScreenComponent],
  template: `
    <app-cursor-ball *ngIf="!showSplash"></app-cursor-ball>
    <div [ngClass]="{'splash-container': true, 'slide-out': !showSplash, 'slide-in': showSplash}">
      <app-splash-screen></app-splash-screen>
    </div>
    <div *ngIf="!showSplash" class="flex flex-col min-h-screen overflow-x-hidden">
      <app-header></app-header>
      <div class="flex-1 bg-background-dark-0">
        <router-outlet></router-outlet>
      </div>    
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Jaron_Vantomme';
  showSplash = true;

  ngOnInit() {
    setTimeout(() => {
      this.showSplash = false;
    }, 4000);
  }
}
