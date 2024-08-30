import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {

  public workItems = [
    { title: 'Social Creativity Cup 2020', category: 'document', image: 'https://i.postimg.cc/L5KwkY3H/Social-Creativity-Cup.jpg', isNewArea: true, areaTime: '2016-2022', areaTitle: 'Student IW', areaDescription: 'VTI Roeselare' },
    { title: 'Project One', category: 'website', image: 'https://i.postimg.cc/T14c50mZ/Project-One.jpg', isNewArea: true, areaTime: '2016-2022', areaTitle: 'Student MCT', areaDescription: 'Howest Kortrijk' },
    { title: 'Interaction Design Project', category: 'website', image: 'https://i.postimg.cc/DZt6WKyb/Interaction-Design-Project.jpg', isNewArea: false, areaTime: '', areaTitle: '', areaDescription: '' },
    { title: 'Team Project', category: 'website', image: 'https://i.postimg.cc/zvgr4tJj/Team-Project.jpg', isNewArea: false, areaTime: '', areaTitle: '', areaDescription: '' },
    { title: 'Portfolio', category: 'website', image: 'https://i.postimg.cc/0QGZFBCg/Portfolio-Mockup.jpg', isNewArea: true, areaTime: '2023 - Present', areaTitle: 'Afgestudeerd', areaDescription: 'Jobhopr' },
  ];
  
}
