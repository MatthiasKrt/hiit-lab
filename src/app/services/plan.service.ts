import { Injectable, signal, computed } from '@angular/core';
import { Plan, Exercise, Block } from '../models/hiit-data.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  // State
  private plansSignal = signal<Plan[]>([]);
  private currentPlanIdSignal = signal<string | null>(null);
  private exercisesSignal = signal<Exercise[]>([]);

  // Selectors
  readonly plans = this.plansSignal.asReadonly();
  readonly exercises = this.exercisesSignal.asReadonly();
  
  readonly currentPlan = computed(() => {
    const id = this.currentPlanIdSignal();
    return this.plansSignal().find(p => p.id === id) || null;
  });

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    // Mock data for now
    const initialExercises: Exercise[] = [
      { id: '1', name: 'Jumping Jacks', instruction: 'Jump with legs apart and hands overhead.' },
      { id: '2', name: 'Push Ups', instruction: 'Keep back straight, lower chest to floor.' },
      { id: '3', name: 'Squats', instruction: 'Keep knees behind toes, lower hips.' },
      { id: '4', name: 'Burpees', instruction: 'Full body exercise.' }
    ];

    const initialPlans: Plan[] = [
      {
        id: 'p1',
        name: 'Morning HIIT',
        blocks: [
          { id: 'b1', type: 'exercise', duration: 30, exerciseId: '1', name: 'Jumping Jacks' },
          { id: 'b2', type: 'pause', duration: 10 },
          { id: 'b3', type: 'exercise', duration: 30, exerciseId: '2', name: 'Push Ups' },
          { id: 'b4', type: 'pause', duration: 10 },
        ]
      }
    ];

    this.exercisesSignal.set(initialExercises);
    this.plansSignal.set(initialPlans);
  }

  // Actions
  addPlan(name: string) {
    const newPlan: Plan = {
      id: crypto.randomUUID(),
      name,
      blocks: []
    };
    this.plansSignal.update(plans => [...plans, newPlan]);
    this.selectPlan(newPlan.id);
  }

  selectPlan(id: string) {
    this.currentPlanIdSignal.set(id);
  }

  updatePlan(updatedPlan: Plan) {
    this.plansSignal.update(plans => 
      plans.map(p => p.id === updatedPlan.id ? updatedPlan : p)
    );
  }

  deletePlan(id: string) {
    this.plansSignal.update(plans => plans.filter(p => p.id !== id));
    if (this.currentPlanIdSignal() === id) {
      this.currentPlanIdSignal.set(null);
    }
  }

  addExercise(exercise: Exercise) {
    this.exercisesSignal.update(exs => [...exs, exercise]);
  }

  updateExercise(updatedExercise: Exercise) {
    this.exercisesSignal.update(exs => 
      exs.map(e => e.id === updatedExercise.id ? updatedExercise : e)
    );
  }
}
