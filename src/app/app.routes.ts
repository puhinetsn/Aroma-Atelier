import { Routes } from '@angular/router';
import { PerfumesList } from './components/perfumes-list/perfumes-list';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';

export const routes: Routes = [
  { path: '', redirectTo: '/perfumes', pathMatch: 'full' },
  {
    path: 'perfumes',
    component: PerfumesList,
  },

  {
    path: 'login',
    component: Login,
  },

  {
    path: 'register',
    component: Register,
  },
];
