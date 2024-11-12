import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, input, Input, OnInit } from '@angular/core';
import { CursorService } from '../../services/CursorService';
import { TranslationService } from '../../services/tranlation.service';
import { Skill } from '../../models/skills.model';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-infinity-loop-scroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinity-loop-scroll.component.html',
  styleUrls: ['./infinity-loop-scroll.component.css'],
})
export class InfinityLoopScrollComponent implements OnInit {
  @Input() selectedSkills: string[] = []
  @Input() rows: number = 6

  public $unsubscribe = new Subject<void>();
  
  public currentVisibleSkillLists: Set<string> = new Set();
  public selectedItem: Skill = new Skill();


  constructor(private elRef: ElementRef, private translationService: TranslationService) { }

  skills: Skill[] = []

  skillList1: Skill[] = [];
  skillList2: Skill[] = [];
  skillList3: Skill[] = [];
  skillList4: Skill[] = [];
  skillList5: Skill[] = [];
  skillList6: Skill[] = [];

  async ngOnInit(): Promise<void> {
    this.skills = await this.translationService.getSkills();
    this.distributeSkills();
    this.translationService.languageChange$.pipe(takeUntil(this.$unsubscribe)).subscribe(async () => {
      this.skills = await this.translationService.getSkills();
    });
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  async distributeSkills() {
    if (this.selectedSkills.length !== 0) this.skills = this.filterSkillsByNames(this.selectedSkills)

    const extendedSkills = this.extendSkills(this.skills, 6);

    if (extendedSkills) {
      const shuffledSkills = this.shuffleArray(extendedSkills);

      const numLists = this.rows;
      const skillLists: Skill[][] = Array.from({ length: numLists }, () => []);

      shuffledSkills.forEach((skill, index) => {
        const listIndex = index % numLists;
        skillLists[listIndex].push(skill);
      });

      this.skillList1 = skillLists[0];
      this.skillList2 = skillLists[1];
      this.skillList3 = skillLists[2];
      this.skillList4 = skillLists[3];
      this.skillList5 = skillLists[4];
      this.skillList6 = skillLists[5];
    }
  }

  extendSkills(skills: { name: string, icon: string }[], multiplier: number): Skill[] {
    const extendedSkills = [];
    for (let i = 0; i < multiplier; i++) {
      extendedSkills.push(...skills);
    }
    return Array.from(new Set(extendedSkills.map(skill => JSON.stringify(skill)))
      .values()).map(e => JSON.parse(e));
  }

  filterSkillsByNames(namesList: string[]): any[] {
    return this.skills.filter(skill => namesList.includes(skill.name));
  }


  shuffleArray(array: Skill[]): Skill[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  openPopup(skillItem: Skill) {
    this.selectedItem = this.skills.find(skill => skill.name === skillItem.name) ?? new Skill();
  }

  closePopup() {
    this.selectedItem = new Skill();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.detectVisibleSkillLists();
  }

  detectVisibleSkillLists() {
    const skillWrappers = [
      { id: 'scroll-wrapper-1', listName: 'skillList1' },
      { id: 'scroll-wrapper-2', listName: 'skillList2' },
      { id: 'scroll-wrapper-3', listName: 'skillList3' },
      { id: 'scroll-wrapper-4', listName: 'skillList4' },
      { id: 'scroll-wrapper-5', listName: 'skillList5' },
      { id: 'scroll-wrapper-6', listName: 'skillList6' }
    ];

    const viewportHeight = window.innerHeight;
    const newVisibleSkillLists: Set<string> = new Set();

    skillWrappers.forEach(wrapper => {
      const element = this.elRef.nativeElement.querySelector(`#${wrapper.id}`) as HTMLElement;
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= viewportHeight - 50 && rect.bottom >= 0) {
          newVisibleSkillLists.add(wrapper.listName);
        }
      }
    });

    if (this.currentVisibleSkillLists.size !== newVisibleSkillLists.size ||
      [...this.currentVisibleSkillLists].some(item => !newVisibleSkillLists.has(item)) ||
      [...newVisibleSkillLists].some(item => !this.currentVisibleSkillLists.has(item))) {
      this.currentVisibleSkillLists = newVisibleSkillLists;
    }
  }

  applyRipple(event: MouseEvent, visitLink: string) {
    const button = event.currentTarget as HTMLElement;
    const ripple = button.querySelector('.ripple') as HTMLElement;

    ripple.classList.remove('animate');

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.offsetWidth;
    ripple.classList.add('animate');

    setTimeout(() => {
      ripple.classList.remove('animate');
      window.open(visitLink, '_blank');
    }, 600);
  }

}
