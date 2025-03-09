import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/field-groups', pathMatch: 'full' },
  { path: 'field-groups', loadComponent: () => import('./features/field-groups/field-group-list/field-group-list.component').then(m => m.FieldGroupListComponent) },
  { path: 'form-builder', loadComponent: () => import('./features/form-builder/middle-pane/middle-pane.component').then(m => m.MiddlePaneComponent) },
  { path: '**', redirectTo: '/field-groups' }
];
