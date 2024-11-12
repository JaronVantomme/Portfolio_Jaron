import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslationService } from '../../services/tranlation.service';
import { Subject, takeUntil } from 'rxjs';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  @ViewChild('timelineContainer', { static: true }) timelineContainer!: ElementRef;

  public $unsubscribe = new Subject<void>();

  public workItems = [new Project()]
  public areaData = [new Project()]

  constructor(private router: Router, private translationService: TranslationService, private cdr: ChangeDetectorRef) {}

  currentItemIndex: number= 0 ;

  ngOnInit(): void {
    this.translationService.languageChange$.pipe(takeUntil(this.$unsubscribe)).subscribe(async () => {
      const rawProjects = this.translationService.getTranslation('Projects');
      this.workItems = this.transformProjects(rawProjects);
      this.areaData = await this.getNewAreaData(this.workItems) as any;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.handleScroll();
      }, 0);
    });

    const rawProjects = this.translationService.getTranslation('Projects');
    this.workItems = this.transformProjects(rawProjects);
    this.areaData = this.getNewAreaData(this.workItems) as any
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('resize', this.handleScroll.bind(this));
    this.handleScroll();
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  getIndexAsWord(index: number): string {
    const words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    return words[index] || "unknown";
  }

  goToProjectDetails(projectId: string) {
    this.router.navigateByUrl(`/project/${projectId}`)
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  transformProjects(rawData: any): Project[] {
    return Object.values(rawData).map((project: any) => new Project(
      project.id,
      project.title,
      project.category,
      project.image,
      project.isNewArea,
      project.areaTime,
      project.areaTitle,
      project.areaDescription,
      project.description,
      project.link,
      project.largeDescription,
      project.skills,
      project.projectInfoSmallTitle,
      project.projectInfoTitle,
      project.projectInfo
    ));
  }

  getNewAreaData(workItems: Project[]) {
    return workItems
      .filter(item => item.isNewArea)
      .map(item => ({
        areaTime: item.areaTime,
        areaTitle: item.areaTitle,
        areaDescription: item.areaDescription
      }));
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
