import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/plan-editor/plan-editor').then(m => m.PlanEditorComponent)
  },
  {
    path: 'run/:id',
    loadComponent: () => import('./components/run-training/run-training.component').then(m => m.RunTrainingComponent)
  }
];
