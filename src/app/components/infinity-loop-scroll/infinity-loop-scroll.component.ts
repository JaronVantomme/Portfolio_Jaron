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
  public selectedItem: { name: string, icon: string, visitLink: string, description: string } = { name: '', icon: '', visitLink: '', description: '' }


  constructor(private cursorService: CursorService, private elRef: ElementRef) {}

  skills = [
    {
      name: 'Adobe XD',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adobe_XD_CC_icon.svg/800px-Adobe_XD_CC_icon.svg.png',
      visitLink: 'https://helpx.adobe.com/be_nl/xd/get-started.html',
      description: 'A design and prototyping tool for creating user interfaces and experiences, commonly used in web and app development.'
    },
    {
      name: 'After Effects',
      icon: 'https://seeklogo.com/images/A/adobe-after-effects-logo-960B473FE4-seeklogo.com.png',
      visitLink: 'https://www.adobe.com/be_nl/products/aftereffects/campaign/pricing.html?gclid=CjwKCAjwoJa2BhBPEiwA0l0ImBup-wbbX_-re9gWF4XYKbWWS0luVgbRSsIBodBZkDahR-ACezl__BoCmIcQAvD_BwE&mv=search&mv=search&mv2=paidsearch&sdid=G85SYKHF&ef_id=CjwKCAjwoJa2BhBPEiwA0l0ImBup-wbbX_-re9gWF4XYKbWWS0luVgbRSsIBodBZkDahR-ACezl__BoCmIcQAvD_BwE:G:s&s_kwcid=AL!3085!3!600579199372!e!!g!!after%20effects!1465309134!59621726089&gad_source=1',
      description: 'A digital visual effects and motion graphics software used for post-production in film, TV, and web videos.'
    },
    {
      name: 'Arduino',
      icon: 'https://cdn.worldvectorlogo.com/logos/arduino-1.svg',
      visitLink: 'https://www.arduino.cc/',
      description: 'An open-source electronics platform for building digital devices and interactive objects that can sense and control objects in the physical world.'
    },
    {
      name: 'Astro',
      icon: 'https://astro.build/assets/press/astro-icon-light-gradient.png',
      visitLink: 'https://astro.build/',
      description: 'A modern front-end framework for building fast, content-focused websites using minimal JavaScript.'
    },
    {
      name: 'Azure',
      icon: 'https://swimburger.net/media/ppnn3pcl/azure.png',
      visitLink: 'https://azure.microsoft.com',
      description: 'Microsoft\'s cloud computing service for building, testing, and deploying applications and services through Microsoft-managed data centers.'
    },
    {
      name: 'C#',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/C_Sharp_wordmark.svg/2048px-C_Sharp_wordmark.svg.png',
      visitLink: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
      description: 'A modern, object-oriented programming language developed by Microsoft, widely used for building Windows applications, games, and enterprise software.'
    },
    {
      name: 'Chart.js',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Chart.js_logo.svg',
      visitLink: 'https://www.chartjs.org/',
      description: 'A popular JavaScript library for creating simple, clean, and interactive charts on web applications.'
    },
    {
      name: 'CSS',
      icon: 'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/css3-512.png',
      visitLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      description: 'A style sheet language used for describing the presentation of a document written in HTML or XML, defining how elements should be displayed on screen, paper, or in other media.'
    },
    {
      name: '.NET',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/2048px-.NET_Core_Logo.svg.png',
      visitLink: 'https://dotnet.microsoft.com/en-us/',
      description: 'A free, cross-platform, open-source developer platform for building many different types of applications, including web, mobile, desktop, gaming, and IoT.'
    },
    {
      name: 'Firebase',
      icon: 'https://cdn.iconscout.com/icon/free/png-256/free-firebase-11796860-9632965.png',
      visitLink: 'https://firebase.google.com/',
      description: 'A platform developed by Google for creating mobile and web applications, offering a suite of cloud-based services like authentication, database, and hosting.'
    },
    {
      name: 'Figma',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Figma-1-logo.png',
      visitLink: 'https://figma.com',
      description: 'A web-based design tool, ideal for UI/UX design, that enables collaboration in real-time, allowing teams to design, prototype, and gather feedback in one place.'
    },
    {
      name: 'Expo',
      icon: 'https://cdn.icon-icons.com/icons2/2389/PNG/512/expo_logo_icon_145293.png',
      visitLink: 'https://expo.dev/',
      description: 'An open-source platform for building native apps with JavaScript and React, offering a suite of tools and services that simplify app development.'
    },
    {
      name: 'Eslint',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/ESLint_logo.svg',
      visitLink: 'https://eslint.org/',
      description: 'A static code analysis tool for identifying and fixing problematic patterns found in JavaScript code, helping developers to maintain code quality and consistency.'
    },
    {
      name: 'Docker',
      icon: 'https://seeklogo.com/images/D/docker-logo-CF97D0124B-seeklogo.com.png',
      visitLink: 'https://www.docker.com/',
      description: 'A platform for developing, shipping, and running applications inside containers, enabling consistent environments across development, testing, and production.'
    },
    {
      name: 'Dapr',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Dapr_logo.svg/1024px-Dapr_logo.svg.png',
      visitLink: 'https://dapr.io/',
      description: 'A portable, event-driven runtime for building distributed applications across cloud and edge, supporting multiple languages and frameworks.'
    },
    {
      name: 'Git',
      icon: 'https://book.git-scm.com/images/logos/downloads/Git-Icon-1788C.png',
      visitLink: 'https://git-scm.com/',
      description: 'A distributed version control system for tracking changes in source code during software development, widely used for collaborative development.'
    },
    {
      name: 'Flutter',
      icon: 'https://seeklogo.com/images/F/flutter-logo-5086DD11C5-seeklogo.com.png',
      visitLink: 'https://flutter.dev/',
      description: 'An open-source UI software development toolkit created by Google, used to develop natively compiled applications for mobile, web, and desktop from a single codebase.'
    },
    {
      name: 'Github',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
      visitLink: 'https://github.com/',
      description: 'A platform for hosting and collaborating on Git repositories, offering version control, code review, issue tracking, and project management.'
    },
    {
      name: 'Gitkraken',
      icon: 'https://www.svgrepo.com/show/330510/gitkraken.svg',
      visitLink: 'https://www.gitkraken.com/',
      description: 'A Git client that makes using Git easier and more efficient, offering a visual interface, conflict resolution, and Gitflow support.'
    },
    {
      name: 'GraphQL',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/768px-GraphQL_Logo.svg.png',
      visitLink: 'https://graphql.org/',
      description: 'A query language for APIs and a runtime for executing those queries, enabling clients to request only the data they need from the server.'
    },
    {
      name: 'HTML',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HTML5_Badge.svg/1024px-HTML5_Badge.svg.png',
      visitLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      description: 'The standard markup language used to create web pages, defining the structure of content on the web.'
    },
    {
      name: 'Javascript',
      icon: 'https://cdn.worldvectorlogo.com/logos/javascript-1.svg',
      visitLink: 'https://www.javascript.com/',
      description: 'A versatile, high-level programming language commonly used in web development to create interactive effects within web browsers.'
    },
    {
      name: 'Typescript',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/768px-Typescript_logo_2020.svg.png',
      visitLink: 'https://www.typescriptlang.org/',
      description: 'A strict syntactical superset of JavaScript that adds optional static typing, enabling better tooling and error checking.'
    },
    {
      name: 'Kubernetis',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg',
      visitLink: 'https://kubernetes.io/',
      description: 'An open-source container orchestration system for automating the deployment, scaling, and management of containerized applications.'
    },
    // {
    //   name: 'Jest',
    //   icon: 'https://www.svgrepo.com/show/353930/jest.svg',
    //   visitLink: 'https://jestjs.io/',
    //   description: 'A JavaScript testing framework maintained by Facebook, designed for testing React applications, but also supporting any JavaScript codebase.'
    // },
    {
      name: 'JSON',
      icon: 'https://www.svgrepo.com/show/306281/json.svg',
      visitLink: 'https://www.json.org/json-en.html',
      description: 'A lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate, often used for transmitting data in web applications.'
    },
    {
      name: 'Netlify',
      icon: 'https://www.svgrepo.com/show/373874/netlify.svg',
      visitLink: 'https://www.netlify.com/',
      description: 'A platform for automating and deploying modern web projects, providing hosting, continuous integration, and CDN services for fast, secure websites.'
    },
    {
      name: 'Nest.js',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg',
      visitLink: 'https://nestjs.com/',
      description: 'A progressive Node.js framework for building efficient and scalable server-side applications, leveraging TypeScript and offering a modular architecture.'
    },
    {
      name: 'MySQL',
      icon: 'https://icons.veryicon.com/png/o/miscellaneous/gwidc_1/mysql-2.png',
      visitLink: 'https://www.mysql.com/',
      description: 'An open-source relational database management system based on Structured Query Language (SQL), widely used for data storage and management.'
    },
    {
      name: 'NPM',
      icon: 'https://www.svgrepo.com/show/355146/npm.svg',
      visitLink: 'https://www.npmjs.com/',
      description: 'The package manager for JavaScript, allowing developers to share and reuse code, and manage dependencies in their projects.'
    },
    {
      name: 'Postman',
      icon: 'https://www.svgrepo.com/show/354202/postman-icon.svg',
      visitLink: 'https://www.postman.com/',
      description: 'A collaboration platform for API development, allowing developers to design, test, document, and monitor APIs with ease.'
    },
    {
      name: 'Node.js',
      icon: 'https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png',
      visitLink: 'https://nodejs.org/en',
      description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine, allowing developers to run JavaScript on the server-side to build scalable network applications.'
    },
    {
      name: 'MQTT',
      icon: 'https://avatars.githubusercontent.com/u/1544528?v=4',
      visitLink: 'https://mqtt.org/',
      description: 'A lightweight messaging protocol for small sensors and mobile devices, optimized for high-latency or unreliable networks.'
    },
    {
      name: 'Next.js',
      icon: 'https://cdn.worldvectorlogo.com/logos/next-js.svg',
      visitLink: 'https://nextjs.org/',
      description: 'A React-based framework for building fast, user-friendly, and scalable web applications, offering features like server-side rendering and static site generation.'
    },
    {
      name: 'MongoDB',
      icon: 'https://www.svgrepo.com/show/331488/mongodb.svg',
      visitLink: 'https://www.mongodb.com/',
      description: 'A popular NoSQL database that stores data in flexible, JSON-like documents, allowing for fast and scalable data storage and retrieval.'
    },
    {
      name: 'Three.js',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Three.js_Icon.svg/1200px-Three.js_Icon.svg.png',
      visitLink: 'https://threejs.org/',
      description: 'A JavaScript library that makes it easy to create 3D content for the web, including graphics, animations, and interactive experiences.'
    },
    {
      name: 'Prettier',
      icon: 'https://www.svgrepo.com/show/306599/prettier.svg',
      visitLink: 'https://prettier.io/',
      description: 'An opinionated code formatter that enforces consistent style by parsing your code and reprinting it with its own rules.'
    },
    {
      name: 'Python',
      icon: 'https://www.svgrepo.com/show/376344/python.svg',
      visitLink: 'https://www.python.org/',
      description: 'A versatile, high-level programming language known for its readability and simplicity, used in web development, data analysis, AI, and more.'
    },
    {
      name: 'React',
      icon: 'https://www.svgrepo.com/show/327388/logo-react.svg',
      visitLink: 'https://react.dev/',
      description: 'A popular JavaScript library for building user interfaces, especially single-page applications, with a component-based architecture.'
    },
    {
      name: 'Sass',
      icon: 'https://cdn.iconscout.com/icon/free/png-256/free-sass-3521691-2945135.png',
      visitLink: 'https://sass-lang.com/',
      description: 'A preprocessor scripting language that is interpreted or compiled into CSS, offering variables, nested rules, and functions for more maintainable stylesheets.'
    },
    {
      name: 'Socket.io',
      icon: 'https://cdn.icon-icons.com/icons2/2389/PNG/512/socket_io_logo_icon_144874.png',
      visitLink: 'https://socket.io/',
      description: 'A JavaScript library for real-time, bidirectional communication between web clients and servers, enabling features like chat and notifications.'
    },
    {
      name: 'Raspberry Pi',
      icon: 'https://upload.wikimedia.org/wikipedia/fr/thumb/3/3b/Raspberry_Pi_logo.svg/1200px-Raspberry_Pi_logo.svg.png',
      visitLink: 'https://www.raspberrypi.com/',
      description: 'A low-cost, credit-card-sized computer that plugs into a monitor or TV, used in electronics projects, programming, and small-scale server deployments.'
    },
    {
      name: 'Tailwind',
      icon: 'https://www.svgrepo.com/show/333609/tailwind-css.svg',
      visitLink: 'https://tailwindcss.com/',
      description: 'A utility-first CSS framework that allows developers to rapidly build custom user interfaces by composing utility classes directly in HTML.'
    },
    {
      name: 'UI/UX',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFruzSMJRcWHdJSDWeiwndqINBExXqN2xsg&s',
      visitLink: 'https://www.code14.nl/kennisbank/wat-is-ux-ui-design',
      description: 'The process of designing user interfaces (UI) and user experiences (UX) that are easy to use, visually appealing, and meet the needs of users.'
    },
    {
      name: 'Xamarin',
      icon: 'https://cdn.worldvectorlogo.com/logos/xamarin.svg',
      visitLink: 'https://dotnet.microsoft.com/en-us/apps/xamarin',
      description: 'A framework for building cross-platform mobile applications using C# and .NET, allowing developers to share code across Android, iOS, and Windows apps.'
    },
    {
      name: 'Vue.js',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png',
      visitLink: 'https://vuejs.org/',
      description: 'A progressive JavaScript framework for building user interfaces, known for its simplicity, flexibility, and ease of integration with existing projects.'
    },
    {
      name: 'Vite',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/1039px-Vitejs-logo.svg.png',
      visitLink: 'https://vitejs.dev/',
      description: 'A fast build tool and development server for modern web projects, offering instant server start, hot module replacement, and optimized production builds.'
    }
  ];
  

  skillList1: { name: string, icon: string, visitLink: string, description: string }[] = [];
  skillList2: { name: string, icon: string, visitLink: string, description: string }[] = [];
  skillList3: { name: string, icon: string, visitLink: string, description: string }[] = [];
  skillList4: { name: string, icon: string, visitLink: string, description: string }[] = [];
  skillList5: { name: string, icon: string, visitLink: string, description: string }[] = [];
  skillList6: { name: string, icon: string, visitLink: string, description: string }[] = [];

  ngOnInit(): void {
    this.distributeSkills();
  }

  distributeSkills() {
    const extendedSkills = this.extendSkills(this.skills, 6);
    const shuffledSkills = this.shuffleArray(extendedSkills);

    const numLists = 6;
    const skillLists: { name: string, icon: string, visitLink: string, description: string }[][] = Array.from({ length: numLists }, () => []);

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

  extendSkills(skills: { name: string, icon: string }[], multiplier: number): { name: string, icon: string, visitLink: string, description: string }[] {
    const extendedSkills = [];
    for (let i = 0; i < multiplier; i++) {
      extendedSkills.push(...skills);
    }
    return Array.from(new Set(extendedSkills.map(skill => JSON.stringify(skill)))
      .values()).map(e => JSON.parse(e));
  }
  

  shuffleArray(array: { name: string, icon: string, visitLink: string, description: string }[]): { name: string, icon: string, visitLink: string, description: string }[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  openPopup(skillItem: {name: string, icon: string, visitLink: string, description: string}) {
    console.log('skillItem: ', skillItem)
    this.selectedItem = skillItem
  }

  closePopup() {
    this.selectedItem = { name: '', icon: '', visitLink: '', description: '' }
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
