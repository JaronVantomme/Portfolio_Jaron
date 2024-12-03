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
    <!-- <app-cursor-ball></app-cursor-ball> -->
    <app-header *ngIf="!showSplash"></app-header>
    
    <div *ngIf="!removeSplash" [ngClass]="{'splash-container': true, 'slide-out': !showSplash, 'slide-in': showSplash}">
      <app-splash-screen></app-splash-screen>
    </div>
    
    <div *ngIf="!showSplash" class="flex flex-col h-min-screen overflow-x-hidden">
      <div class="flex-1 bg-background-dark-0">
        <router-outlet></router-outlet>
      </div>    
      <app-footer class="footer"></app-footer>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showSplash = true;
  public removeSplash = false

  constructor() {}

  ngOnInit() {
    const currentPath = window.location.pathname;

    if (currentPath !== '/' && currentPath.length > 1) {
      this.showSplash = false;
      this.removeSplash = true;
    }


    setTimeout(() => {
      this.showSplash = false;
      setTimeout(() => {
        this.removeSplash = true
      }, 1000)
    }, 4000);
  }
}
