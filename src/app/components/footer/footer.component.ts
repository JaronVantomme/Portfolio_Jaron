import { Component } from '@angular/core';
import { TranslationService } from '../../services/tranlation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private translationService: TranslationService) {}
  
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
