import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements AfterViewInit {
  
  @ViewChild('timelineContainer', { static: true }) timelineContainer!: ElementRef;

  public workItems = [
    { id:'Social-Creativity-Cup-2020', title: 'Social Creativity Cup 2020', category: 'document', image: 'https://i.postimg.cc/ZRC4DmBC/Social-Creativity-Cup-2020.png', isNewArea: true, areaTime: '2010-2016', areaTitle: 'Student IW', areaDescription: 'VTI Roeselare' },
    { id:'Project-One', title: 'Project One', category: 'website', image: 'https://i.postimg.cc/TPQ34QtH/Project-One.png', isNewArea: true, areaTime: '2016-2022', areaTitle: 'Student MCT', areaDescription: 'Howest Kortrijk' },
    { id:'Interaction-Design-Project', title: 'Interaction Design Project', category: 'website', image: 'https://i.postimg.cc/xTy8m0K2/Interaction-Design-Project-1.png', isNewArea: false, areaTime: '2016-2022', areaTitle: 'Student MCT', areaDescription: 'Howest Kortrijk' },
    { id:'Team-Project', title: 'Team Project', category: 'website', image: 'https://i.postimg.cc/k4Q3H5MM/Team-Project-1.png', isNewArea: false, areaTime: '2016-2022', areaTitle: 'Student MCT', areaDescription: 'Howest Kortrijk' },
    { id:'Portfolio', title: 'Portfolio', category: 'website', image: 'https://i.postimg.cc/156CcdtP/Portfolio.png', isNewArea: true, areaTime: '2023 - Present', areaTitle: 'Afgestudeerd', areaDescription: 'Jobhopr' },
  ];

  constructor(private router: Router) {}

  currentItemIndex: number= 0 ;

  goToProjectDetails(projectId: string) {
    this.router.navigateByUrl(`/project/${projectId}`)
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('resize', this.handleScroll.bind(this)); // Handle resizing
    this.handleScroll(); // Initial check
  }

  handleScroll() {
    this.updateScrollIndicator();
    if (window.innerWidth > 1300) {
      this.checkVisibleItem();
    }
  }

  updateScrollIndicator() {
    const timeline = this.timelineContainer.nativeElement;
    const scrollIndicator = timeline.querySelector('.scroll-indicator') as HTMLElement;
    const timeOne = timeline.querySelector('.time-one') as HTMLElement;
    const timeTwo = timeline.querySelector('.time-two') as HTMLElement;
    const timeThree = timeline.querySelector('.time-three') as HTMLElement;
    const pointOne = document.querySelectorAll('.timeline-point-animation-1');
    const pointTwo = document.querySelectorAll('.timeline-point-animation-2');
    const pointTree = document.querySelectorAll('.timeline-point-animation-3');
  
    const timelineRect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
    const timelineStart = timelineRect.top + scrollTop - windowHeight / 2;
    const timelineEnd = timelineRect.bottom + scrollTop - windowHeight / 2;
    
    const scrolled = Math.max(0, Math.min(1, (scrollTop - timelineStart) / (timelineEnd - timelineStart)));
    
    let scrollIndicatorHeight = scrolled * timelineRect.height;
    let scrollIndicatorPointOneHeight = scrollIndicatorHeight
    let scrollIndicatorPointTwoHeight = scrollIndicatorHeight
    let scrollIndicatorPointThreeHeight = scrollIndicatorHeight

    if (scrollIndicatorHeight < 15) {
      scrollIndicatorHeight = 15;
      if (window.innerWidth > 1300) {
        scrollIndicatorPointOneHeight = 15;
      } else {
        scrollIndicatorPointOneHeight = 0;
      }
    }
    if (scrollIndicatorHeight >= 264.5) {
      scrollIndicatorPointOneHeight = 270;
    }
    if (scrollIndicatorHeight < 364.5) {
      scrollIndicatorPointTwoHeight = 364.5
    }
    if (scrollIndicatorHeight >= 1315) {
      scrollIndicatorPointTwoHeight = 1315;
    }
    if (scrollIndicatorHeight < 1415) {
      scrollIndicatorPointThreeHeight = 1415 
    }
    if (scrollIndicatorHeight > 1425) {
      if (window.innerWidth <= 1300) {
        scrollIndicatorHeight = 1425;
      }
    }
    
    
    scrollIndicator.style.height = `${scrollIndicatorHeight}px`;

    

    if (window.innerWidth > 1300) {
      timeOne.style.top = `${scrollIndicatorPointOneHeight -20}px`
      pointOne.forEach(point => {
        const htmlPoint = point as HTMLElement;
        htmlPoint.style.top = `${scrollIndicatorPointOneHeight}px`
      });
      timeTwo.style.top = `${scrollIndicatorPointTwoHeight -20}px`
      pointTwo.forEach(point => {
        const htmlPoint = point as HTMLElement;
        htmlPoint.style.top = `${scrollIndicatorPointTwoHeight}px`
      });
      timeThree.style.top = `${scrollIndicatorPointThreeHeight -20}px`
      pointTree.forEach(point => {
        const htmlPoint = point as HTMLElement;
        htmlPoint.style.top = `${scrollIndicatorPointThreeHeight}px`
      });
    }
  }

  shouldShowPoint(index: number): boolean {
    return index === 0;
  }
  
  

  checkVisibleItem() {
    const timeline = this.timelineContainer.nativeElement;
    const items = Array.from(timeline.querySelectorAll('li')) as HTMLElement[];

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;

    let closestIndex: number | null = null;
    let closestDistance = Infinity;

    const margin = 200;

    items.forEach((item: HTMLElement, index: number) => {
        const rect = item.getBoundingClientRect();
        const itemTop = rect.top + scrollTop; 
        const itemBottom = itemTop + rect.height; 

        const distanceToTop = itemTop - scrollTop;

        if (itemTop < scrollTop + viewportHeight + margin && itemBottom > scrollTop - margin) {
            if (distanceToTop >= 100 && distanceToTop < closestDistance) {
                closestDistance = distanceToTop;
                closestIndex = index;
            }
        }
    });

    if (closestIndex !== null && closestIndex !== this.currentItemIndex) {
      this.currentItemIndex = closestIndex;
    }
  }

  isAreaVisibleWithAnimation(index: number): boolean {
    if (window.innerWidth > 1300) {
      if (index == 0) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }

  }
  isAreaVisible(): boolean {
    if (window.innerWidth > 1300) {
      return false
    } else {
      return true
    }
  }



}
