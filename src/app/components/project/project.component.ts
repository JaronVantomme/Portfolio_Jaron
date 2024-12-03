import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from './../../services/tranlation.service';
import { CommonModule } from '@angular/common';
import { InfinityLoopScrollComponent } from '../infinity-loop-scroll/infinity-loop-scroll.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, InfinityLoopScrollComponent],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  public $unsubscribe = new Subject<void>();
  
  public projectDate: string = '';
  public projectId: string = '';
  public projectTitle: string = '';
  public projectDescription: string = '';
  public projectLink: string = '';
  public projectLinkTitle: string = '';
  public projectImage: string = '';
  public projectInfoSmallTitle: string = ''
  public projectInfoTitle: string = ''
  public projectInfo: string = ''
  public projectSkills: string[] = []

  public nextProjectId: string = ""
  public nextProjectTitle: string = ''
  public nextProjectImage: string = ''

  constructor(
    private route: ActivatedRoute, 
    private translationService: TranslationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.projectImage = '../../../assets/images/Portfolio';

    this.route.paramMap.pipe(takeUntil(this.$unsubscribe)).subscribe(params => {
      const id = params.get('id');
      this.projectId = id !== null ? id : '';
      this.loadProjectData();
    });

    this.translationService.languageChange$.pipe(takeUntil(this.$unsubscribe)).subscribe(() => {
      this.loadProjectData();
    });
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  loadProjectData() {
    this.projectDate = this.translationService.getProjectTranslation(this.projectId, 'date') as string;
    this.projectTitle = this.translationService.getProjectTranslation(this.projectId, 'title') as string;
    this.projectDescription = this.translationService.getProjectTranslation(this.projectId, 'description') as string;
    this.projectLink = this.translationService.getProjectTranslation(this.projectId, 'link') as string;
    this.projectLinkTitle = this.translationService.getProjectTranslation(this.projectId, 'linkTitle') as string;
    this.projectImage = this.translationService.getProjectTranslation(this.projectId, 'image') as string;
    this.projectInfoSmallTitle = this.translationService.getProjectTranslation(this.projectId, 'projectInfoSmallTitle') as string;
    this.projectInfoTitle = this.translationService.getProjectTranslation(this.projectId, 'projectInfoTitle') as string;
    this.projectInfo = this.translationService.getProjectTranslation(this.projectId, 'projectInfo') as string;
    this.projectSkills = this.translationService.getProjectTranslation(this.projectId, 'skills') as string[];

    this.nextProjectId = this.translationService.getNextProjectTranslation(this.projectId, 'id') as string;
    this.nextProjectTitle = this.translationService.getNextProjectTranslation(this.projectId, 'title') as string;
    this.nextProjectImage = this.translationService.getNextProjectTranslation(this.projectId, 'image') as string;
  }

  goTo(location: string) {
    window.open(location, '_blank');
  }

  goToNextProject(projectId: string) {
    this.router.navigateByUrl(`/project/${projectId}`)
    window.scrollTo(0, 0)
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  applyRipple(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const ripple = button.querySelector('.ripple') as HTMLElement;

    if (!ripple) return;

    ripple.classList.remove('animate');

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.offsetWidth; // Trigger een hertekening
    ripple.classList.add('animate');

    setTimeout(() => {
      ripple.classList.remove('animate');
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}
