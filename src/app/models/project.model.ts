export class Project {
    constructor(
      public id: string = '',
      public title: string = '',
      public category: string = '',
      public image: string = '',
      public isNewArea: boolean = false,
      public areaTime: string = '',
      public areaTitle: string = '',
      public areaDescription: string = '',
      public description: string = '',
      public link: string = '',
      public largeDescription: string = '',
      public skills: string = '',
      public projectInfoSmallTitle: string = '',
      public projectInfoTitle: string = '',
      public projectInfo: string = '',
    ) {}
  }