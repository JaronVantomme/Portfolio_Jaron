import { Routes } from '@angular/router';
import { HomePageComponent } from './view/home-page/home-page.component'

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: ''
    }
];
