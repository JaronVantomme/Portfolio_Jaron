import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CursorService } from '../../services/CursorService';

@Component({
  selector: 'app-infinity-loop-scroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinity-loop-scroll.component.html',
  styleUrls: ['./infinity-loop-scroll.component.css'],
})
export class InfinityLoopScrollComponent implements OnInit {

  public currentVisibleSkillLists: Set<string> = new Set();



  constructor(private cursorService: CursorService, private elRef: ElementRef) {}

  skills = [
    { name: 'Adobe XD', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adobe_XD_CC_icon.svg/800px-Adobe_XD_CC_icon.svg.png', link: '' },
    { name: 'After Effects', icon: 'https://seeklogo.com/images/A/adobe-after-effects-logo-960B473FE4-seeklogo.com.png', link: '' },
    { name: 'Arduino', icon: 'https://cdn.worldvectorlogo.com/logos/arduino-1.svg', link: '' },
    { name: 'Astro', icon: 'https://astro.build/assets/press/astro-icon-light-gradient.png', link: '' },
    { name: 'Azure', icon: 'https://swimburger.net/media/ppnn3pcl/azure.png', link: '' },
    { name: 'C#', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/C_Sharp_wordmark.svg/2048px-C_Sharp_wordmark.svg.png', link: '' },
    { name: 'Chart.js', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Chart.js_logo.svg', link: '' },
    { name: 'CSS', icon: 'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/css3-512.png', link: '' },
    { name: '.NET', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/2048px-.NET_Core_Logo.svg.png', link: '' },
    { name: 'Firebase', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-firebase-11796860-9632965.png', link: '' },
    { name: 'Figma', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Figma-1-logo.png', link: '' },
    { name: 'Expo', icon: 'https://cdn.icon-icons.com/icons2/2389/PNG/512/expo_logo_icon_145293.png', link: '' },
    { name: 'Eslint', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/ESLint_logo.svg', link: '' },
    { name: 'Docker', icon: 'https://seeklogo.com/images/D/docker-logo-CF97D0124B-seeklogo.com.png', link: '' },
    { name: 'Dapr', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Dapr_logo.svg/1024px-Dapr_logo.svg.png', link: '' },
    { name: 'Git', icon: 'https://book.git-scm.com/images/logos/downloads/Git-Icon-1788C.png', link: '' },
    { name: 'Flutter', icon: 'https://seeklogo.com/images/F/flutter-logo-5086DD11C5-seeklogo.com.png', link: '' },
    { name: 'Github', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg', link: '' },
    { name: 'Gitkraken', icon: 'https://www.svgrepo.com/show/330510/gitkraken.svg', link: '' },
    { name: 'GraphQL', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/768px-GraphQL_Logo.svg.png', link: '' },
    { name: 'HTML', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HTML5_Badge.svg/1024px-HTML5_Badge.svg.png', link: '' },
    { name: 'Javascript', icon: 'https://cdn.worldvectorlogo.com/logos/javascript-1.svg', link: '' },
    { name: 'Typescript', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/768px-Typescript_logo_2020.svg.png', link: '' },
    { name: 'Kubernetis', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg', link: '' },
    { name: 'Jest', icon: 'https://www.svgrepo.com/show/353930/jest.svg', link: '' },
    { name: 'JSON', icon: 'https://www.svgrepo.com/show/306281/json.svg', link: '' },
    { name: 'Netlify', icon: 'https://www.svgrepo.com/show/373874/netlify.svg', link: '' },
    { name: 'Nest.js', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg', link: '' },
    { name: 'MySQL', icon: 'https://icons.veryicon.com/png/o/miscellaneous/gwidc_1/mysql-2.png', link: '' },
    { name: 'NPM', icon: 'https://www.svgrepo.com/show/355146/npm.svg', link: '' },
    { name: 'Postman', icon: 'https://www.svgrepo.com/show/354202/postman-icon.svg', link: '' },
    { name: 'Node.js', icon: 'https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png', link: '' },
    { name: 'MQTT', icon: 'https://avatars.githubusercontent.com/u/1544528?v=4', link: '' },
    { name: 'Next.js', icon: 'https://cdn.worldvectorlogo.com/logos/next-js.svg', link: '' },
    { name: 'MongoDB', icon: 'https://www.svgrepo.com/show/331488/mongodb.svg', link: '' },
    { name: 'Three.js', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Three.js_Icon.svg/1200px-Three.js_Icon.svg.png', link: '' },
    { name: 'Prettier', icon: 'https://www.svgrepo.com/show/306599/prettier.svg', link: '' },
    { name: 'Python', icon: 'https://www.svgrepo.com/show/376344/python.svg', link: '' },
    { name: 'React', icon: 'https://www.svgrepo.com/show/327388/logo-react.svg', link: '' },
    { name: 'Sass', icon: 'https://cdn.iconscout.com/icon/free/png-256/free-sass-3521691-2945135.png', link: '' },
    { name: 'Socket.io', icon: 'https://cdn.icon-icons.com/icons2/2389/PNG/512/socket_io_logo_icon_144874.png', link: '' },
    { name: 'Raspberry Pi', icon: 'https://upload.wikimedia.org/wikipedia/fr/thumb/3/3b/Raspberry_Pi_logo.svg/1200px-Raspberry_Pi_logo.svg.png', link: '' },
    { name: 'Tailwind', icon: 'https://www.svgrepo.com/show/333609/tailwind-css.svg', link: '' },
    { name: 'UI/UX', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFruzSMJRcWHdJSDWeiwndqINBExXqN2xsg&s', link: '' },
    { name: 'Xamarin', icon: 'https://cdn.worldvectorlogo.com/logos/xamarin.svg', link: '' },
    { name: 'Vue.js', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png', link: '' },
    { name: 'Vite', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/1039px-Vitejs-logo.svg.png', link: '' },
  ];

  skillList1: { name: string, icon: string }[] = [];
  skillList2: { name: string, icon: string }[] = [];
  skillList3: { name: string, icon: string }[] = [];
  skillList4: { name: string, icon: string }[] = [];
  skillList5: { name: string, icon: string }[] = [];
  skillList6: { name: string, icon: string }[] = [];

  ngOnInit(): void {
    this.distributeSkills();
  }

  distributeSkills() {
    // Duplicate and randomize the skill list
    const extendedSkills = this.extendSkills(this.skills, 6);
    const shuffledSkills = this.shuffleArray(extendedSkills);

    // Distribute skills evenly across 6 lists
    const numLists = 6;
    const skillLists: { name: string, icon: string }[][] = Array.from({ length: numLists }, () => []);

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

  extendSkills(skills: { name: string, icon: string }[], multiplier: number): { name: string, icon: string }[] {
    const extendedSkills = [];
    for (let i = 0; i < multiplier; i++) {
      extendedSkills.push(...skills);
    }
    return Array.from(new Set(extendedSkills.map(skill => JSON.stringify(skill)))
      .values()).map(e => JSON.parse(e));
  }
  

  shuffleArray(array: { name: string, icon: string }[]): { name: string, icon: string }[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
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
  
}
