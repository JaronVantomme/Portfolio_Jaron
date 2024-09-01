import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements AfterViewInit {
  
  @ViewChild('timelineContainer', { static: true }) timelineContainer!: ElementRef;

  public workItems = [
    { title: 'Social Creativity Cup 2020', category: 'document', image: 'https://i.postimg.cc/L5KwkY3H/Social-Creativity-Cup.jpg', isNewArea: true, areaTime: '2016-2022', areaTitle: 'Student IW', areaDescription: 'VTI Roeselare' },
    { title: 'Project One', category: 'website', image: 'https://i.postimg.cc/T14c50mZ/Project-One.jpg', isNewArea: true, areaTime: '2016-2022', areaTitle: 'Student MCT', areaDescription: 'Howest Kortrijk' },
    { title: 'Interaction Design Project', category: 'website', image: 'https://i.postimg.cc/DZt6WKyb/Interaction-Design-Project.jpg', isNewArea: false, areaTime: '', areaTitle: '', areaDescription: '' },
    { title: 'Team Project', category: 'website', image: 'https://i.postimg.cc/zvgr4tJj/Team-Project.jpg', isNewArea: false, areaTime: '', areaTitle: '', areaDescription: '' },
    { title: 'Portfolio', category: 'website', image: 'https://i.postimg.cc/0QGZFBCg/Portfolio-Mockup.jpg', isNewArea: true, areaTime: '2023 - Present', areaTitle: 'Afgestudeerd', areaDescription: 'Jobhopr' },
  ];

  // ngAfterViewInit() {
  //   window.addEventListener('scroll', this.updateScrollIndicator.bind(this));
  // }

  // updateScrollIndicator() {
  //   const timeline = this.timelineContainer.nativeElement;
  //   const scrollIndicator = timeline.querySelector('.scroll-indicator') as HTMLElement;

  //   const timelineRect = timeline.getBoundingClientRect();
  //   const windowHeight = window.innerHeight;
  //   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  //   // Bepaal de boven- en onderkant van de timeline relatief ten opzichte van de scrollpositie
  //   const start = scrollTop + timelineRect.top;
  //   const end = scrollTop + timelineRect.bottom - windowHeight;

  //   // Bereken hoeveel er gescrold is binnen de hoogte van de timeline
  //   const scrolled = Math.max(0, Math.min(1, (scrollTop - start) / (end - start)));

  //   // Pas de hoogte van de scroll-indicator aan op basis van het percentage van de gescrollde timeline
  //   const timelineHeight = timelineRect.height;
  //   const scrollIndicatorHeight = scrolled * timelineHeight;

  //   scrollIndicator.style.height = `${scrollIndicatorHeight}px`;
  // }

  currentItemIndex: number | null = null;

  ngAfterViewInit() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('resize', this.handleScroll.bind(this)); // Handle resizing
    this.handleScroll(); // Initial check
  }

  handleScroll() {
    this.updateScrollIndicator();
    this.checkVisibleItem();
  }

  updateScrollIndicator() {
    const timeline = this.timelineContainer.nativeElement;
    const scrollIndicator = timeline.querySelector('.scroll-indicator') as HTMLElement;
  
    const timelineRect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
    // Correcte berekening zonder verplaatsen van start en end
    const timelineStart = timelineRect.top + scrollTop - windowHeight / 2; // Startpositie is eerder
    const timelineEnd = timelineRect.bottom + scrollTop - windowHeight / 2; // Eindpositie is eerder
    
    // De scrolled waarde wordt nu berekend tussen deze twee punten
    const scrolled = Math.max(0, Math.min(1, (scrollTop - timelineStart) / (timelineEnd - timelineStart)));
    
    // Bereken de hoogte van de indicator
    const scrollIndicatorHeight = scrolled * timelineRect.height;
    
    scrollIndicator.style.height = `${scrollIndicatorHeight}px`;
  }
  
  

  checkVisibleItem() {
    const timeline = this.timelineContainer.nativeElement;
    const items = Array.from(timeline.querySelectorAll('li')) as HTMLElement[];

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;

    let closestIndex: number | null = null;
    let closestDistance = Infinity;

    items.forEach((item: HTMLElement, index: number) => {
      const rect = item.getBoundingClientRect();
      const itemTop = rect.top + scrollTop;

      const distance = Math.abs(itemTop - scrollTop);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== null && closestIndex !== this.currentItemIndex) {
      this.currentItemIndex = closestIndex;
      console.log(`Currently viewing item: ${this.workItems[this.currentItemIndex].title}`);
    }
  }
}
