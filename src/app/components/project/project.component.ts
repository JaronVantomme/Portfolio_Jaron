import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public projectImage: string = '';
  public projectInfoSmallTitle: string = ''
  public projectInfoTitle: string = ''
  public projectInfo: string = ''

  constructor(
    private route: ActivatedRoute, 
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
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
    this.projectDate = this.translationService.getProjectTranslation(this.projectId, 'date');
    this.projectTitle = this.translationService.getProjectTranslation(this.projectId, 'title');
    this.projectDescription = this.translationService.getProjectTranslation(this.projectId, 'description');
    this.projectLink = this.translationService.getProjectTranslation(this.projectId, 'link');
    this.projectImage = this.translationService.getProjectTranslation(this.projectId, 'image');
    this.projectInfoSmallTitle = this.translationService.getProjectTranslation(this.projectId, 'projectInfoSmallTitle');
    this.projectInfoTitle = this.translationService.getProjectTranslation(this.projectId, 'projectInfoTitle');
    this.projectInfo = this.translationService.getProjectTranslation(this.projectId, 'projectInfo');
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
