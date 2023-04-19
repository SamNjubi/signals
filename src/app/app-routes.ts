import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
      path : '',
      children : [
        {
          path: 'edit',
          loadComponent: () => import('./edit-country/edit-country.component').then(m => m.EditCountryComponent)
        }
      ]
  }
]