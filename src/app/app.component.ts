import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components//footer/footer.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
  <div class="flex flex-col min-h-screen">
    <app-header></app-header>
    <div class="flex-1 bg-background-dark-0">
      <router-outlet></router-outlet>
    </div>    
    <app-footer></app-footer>
  </div>
  `,
})
export class AppComponent {
  title = 'website_zannah';
}
