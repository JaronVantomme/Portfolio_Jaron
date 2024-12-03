import { Routes } from '@angular/router';
import { HomePageComponent } from './view/home-page/home-page.component'
import { ProjectComponent } from './components/project/project.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        pathMatch: 'full',
    },
    {
        path: 'project/:projectnaam',
        component: ProjectComponent,
    },
    {
        path: '**',
        redirectTo: ''
    },
];
