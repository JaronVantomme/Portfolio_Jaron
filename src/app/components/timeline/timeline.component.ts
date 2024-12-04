import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslationService } from '../../services/tranlation.service';
import { fromEvent, Subject, Subscription, takeUntil } from 'rxjs';
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
  resizeSubscription: Subscription = new Subscription();

  public workItems = [new Project()]
  public areaData = [new Project()]
  private areaCounts: number[] = []
  private currentItemIndex: number= 0;

  constructor(private router: Router, private translationService: TranslationService, private cdr: ChangeDetectorRef) {}


  async ngOnInit(): Promise<void> {
    this.resizeSubscription = fromEvent(window, 'resize').subscribe(() => {
      this.setTimlineHeight()
    });

    this.translationService.languageChange$.pipe(takeUntil(this.$unsubscribe)).subscribe(async () => {
      const rawProjects = this.translationService.getTranslation('Projects');
      const rawAreas = this.translationService.getTranslation('Areas');
      this.workItems = this.transformProjects(rawProjects, rawAreas);
      this.areaData = this.getNewAreaData(this.workItems) as any;
      this.areaCounts = this.getAreaCounts(this.workItems)
      this.cdr.detectChanges();
      setTimeout(() => {
        this.handleScroll();
      }, 0);
    });
  
    const rawProjects = this.translationService.getTranslation('Projects');
    const rawAreas = this.translationService.getTranslation('Areas');
    this.workItems = this.transformProjects(rawProjects, rawAreas);
    this.areaData = this.getNewAreaData(this.workItems) as any;
    this.areaCounts = this.getAreaCounts(this.workItems)
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('resize', this.handleScroll.bind(this));

    this.setTimlineHeight()
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

  getAreaCounts(projects: any) {
    const groupedProjects: any[] = [];
    let lastValidGroupIndex: number | null = null;

    projects.forEach((project: any) => {
        const groupKey = project.areaTime && project.areaTitle && project.areaDescription
            ? `${project.areaTime}|${project.areaTitle}|${project.areaDescription}`
            : null;

        if (groupKey) {
            lastValidGroupIndex = groupedProjects.length;
            groupedProjects.push([project]);
        } else if (lastValidGroupIndex !== null) {
            groupedProjects[lastValidGroupIndex].push(project);
        }
    });

    const areaCounts = groupedProjects.map((projectsInGroup: any[]) => projectsInGroup.length);

    return areaCounts;
  }


  transformProjects(rawData: any, areas: any): Project[] {
    return Object.values(rawData).map((project: any) => {
      const area = areas[project.areaID] || {};
      return new Project(
        project.id,
        project.title,
        project.category,
        project.image,
        project.isNewArea,
        area.areaTime || '',
        area.areaTitle || '',
        area.areaDescription || '',
        project.description,
        project.link,
        project.skills,
        project.projectInfoSmallTitle,
        project.projectInfo
      );
    });
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

    if (scrollIndicatorHeight < this.getAreaValue(0, 'start')) {
      scrollIndicatorHeight = this.getAreaValue(0, 'start');
      if (window.innerWidth > 1300) {
        scrollIndicatorPointOneHeight = this.getAreaValue(0, 'start');
      } else {
        scrollIndicatorPointOneHeight = 0;
      }
    }

    if (scrollIndicatorHeight >= this.getAreaValue(0, 'end')) {
      scrollIndicatorPointOneHeight = this.getAreaValue(0, 'end');
    }
    if (scrollIndicatorHeight < this.getAreaValue(1, 'start')) {
      scrollIndicatorPointTwoHeight = this.getAreaValue(1, 'start')
    }


    if (scrollIndicatorHeight >= this.getAreaValue(1, 'end')) {
      scrollIndicatorPointTwoHeight = this.getAreaValue(1, 'end');
    }
    if (scrollIndicatorHeight < this.getAreaValue(2, 'start')) {
      scrollIndicatorPointThreeHeight = this.getAreaValue(2, 'start') 
    }
    if (scrollIndicatorHeight > this.getAreaValue(2 , 'end')) {
      if (window.innerWidth <= 1300) {
        if (scrollIndicatorHeight >= this.getProjectsHeight()) scrollIndicatorHeight = this.getProjectsHeight();
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

  getStyleByClass(className: string): number {
    const element = document.querySelector(`.${className}`);
  
    if (!element) {
      console.error(`Element met class "${className}" niet gevonden.`);
      return 0;
    }
  
    const style = window.getComputedStyle(element);
  
    const topValue = parseFloat(style.top);
  
    if (isNaN(topValue)) {
      console.error(`Kon de 'top' waarde niet parsen van het element.`);
      return 0;
    }
  
    return topValue;
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

  getProjectsHeight(): number {
    if (window.innerWidth <= 1300) return this.getAreaValue(this.areaCounts.length - 1, 'end') + (60 * (this.areaCounts.length - 1)) + 140
    else return this.getAreaValue(this.areaCounts.length - 1, 'end')+100
  }

  getAreaValue(areaNumber: number, state: 'start' | 'end'): number {
    const timelineElements = document.querySelectorAll('li') as NodeListOf<HTMLElement>;
    const projectHeight = timelineElements[0].offsetHeight

    switch (state) {
      case 'start':
        if (areaNumber === 0) return 20
        else return this.getAreaValue(areaNumber - 1, 'end') + 100
      case 'end':
        return this.getAreaValue(areaNumber, 'start') + (projectHeight * this.areaCounts[areaNumber]) - 100
      default:
        return 0
    }
  }

  setTimlineHeight() {
    const timelineElement = document.querySelector('.timeline') as HTMLElement;
    if (timelineElement) {
      if (window.innerWidth <= 1300) timelineElement.style.height = `${this.getProjectsHeight()}px`;
      else timelineElement.style.height = `${this.getProjectsHeight()}px`;
    }
  }

}
