import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infinity-loop-scroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinity-loop-scroll.component.html',
  styleUrls: ['./infinity-loop-scroll.component.css']
})
export class InfinityLoopScrollComponent implements OnInit {

  skills = [
    { name: 'Angular', icon: 'path/to/angular-icon.png', link: '' },
    { name: 'TypeScript', icon: 'path/to/typescript-icon.png', link: '' },
    { name: 'JavaScript', icon: 'path/to/javascript-icon.png', link: '' },
    { name: 'HTML', icon: 'path/to/html-icon.png', link: '' },
    { name: 'CSS', icon: 'path/to/css-icon.png', link: '' },
    { name: 'Node.js', icon: 'path/to/nodejs', link: '' },
    { name: 'Express', icon: 'path/to/express-icon.png', link: '' },
    { name: 'MongoDB', icon: 'path/to/mongodb-icon.png', link: '' },
    { name: 'Python', icon: 'path/to/python-icon.png', link: '' },
    { name: 'Django', icon: 'path/to/django-icon.png', link: '' },
    { name: 'React', icon: 'path/to/react-icon.png', link: '' },
    { name: 'Vue.js', icon: 'path/to/vuejs-, ', link: '' },
    { name: 'SASS', icon: 'path/to/sass-icon.png', link: '' },
    { name: 'Git', icon: 'path/to/git-icon.png', link: '' },
    { name: 'Docker', icon: 'path/to/docker-icon.png', link: '' },
    { name: 'Kubernetes', icon: 'path/to/kubernetes-icon.png', link: '' },
    { name: 'AWS', icon: 'path/to/aws-icon.png', link: '' },
    { name: 'Azure', icon: 'path/to/azure-icon.png', link: '' },
    { name: 'GCP', icon: 'path/to/gcp-icon.png', link: '' },
    { name: 'SQL', icon: 'path/to/sql-icon.png', link: '' },
    { name: 'GraphQL', icon: 'path/to/graphql-icon.png', link: '' },
    { name: 'Jenkins', icon: 'path/to/jenkins-icon.png', link: '' },
    { name: 'Terraform', icon: 'path/to/terraform-icon.png', link: '' },
    { name: 'Ansible', icon: 'path/to/ansible-icon.png', link: '' },
    { name: 'Linux', icon: 'path/to/linux-icon.png', link: '' },
    { name: 'Angular12332', icon: 'path/to/angular-icon.png', link: '' },
    { name: 'TypeScript12332', icon: 'path/to/typescript-icon.png', link: '' },
    { name: 'JavaScript12332', icon: 'path/to/javascript-icon.png', link: '' },
    { name: 'HTML12332', icon: 'path/to/html-icon.png', link: '' },
    { name: 'CSS12332', icon: 'path/to/css-icon.png', link: '' },
    { name: 'Node12332.js', icon: 'path/to/nodejs-,', link: '' },
    { name: 'Express12332', icon: 'path/to/express-icon.png', link: '' },
    { name: 'MongoDB12332', icon: 'path/to/mongodb-icon.png', link: '' },
    { name: 'Python12332', icon: 'path/to/python-icon.png', link: '' },
    { name: 'Django12332', icon: 'path/to/django-icon.png', link: '' },
    { name: 'React12332', icon: 'path/to/react-icon.png', link: '' },
    { name: 'Vue12332.js', icon: 'path/to/vuejs', link: '' },
    { name: 'SASS12332', icon: 'path/to/sass-icon.png', link: '' },
    { name: 'Git12332', icon: 'path/to/git-icon.png', link: '' },
    { name: 'Docker12332', icon: 'path/to/docker-icon.png', link: '' },
    { name: 'Kubernetes12332', icon: 'path/to/kubernetes-icon.png', link: '' },
    { name: 'AWS12332', icon: 'path/to/aws-icon.png', link: '' },
    { name: 'Azure12332', icon: 'path/to/azure-icon.png', link: '' },
    { name: 'GCP12332', icon: 'path/to/gcp-icon.png', link: '' },
    { name: 'SQL12332', icon: 'path/to/sql-icon.png', link: '' },
    { name: 'GraphQL12332', icon: 'path/to/graphql-icon.png', link: '' },
    { name: 'Jenkins12332', icon: 'path/to/jenkins-icon.png', link: '' },
    { name: 'Terraform12332', icon: 'path/to/terraform-icon.png', link: '' },
    { name: 'Ansible12332', icon: 'path/to/ansible-icon.png', link: '' },
    { name: 'Linux12332', icon: 'path/to/linux-icon.png', link: '' }
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
    console.log('Shuffled array:', array);
    return array;
  }
  
}
