import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private renderer: Renderer2;
  private originalTitle: string = 'Jaron Vantomme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.originalTitle = document.title;

    this.setupVisibilityChangeListener();
  }

  private setupVisibilityChangeListener(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.setTitle('Hey, where did you go? 😢');
      } else {
        this.setTitle(this.originalTitle);
      }
    });
  }

  public setTitle(title: string): void {
    this.renderer.setProperty(document, 'title', title);
  }
}
