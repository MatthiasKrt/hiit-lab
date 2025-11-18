import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { PlanService } from '../../services/plan.service';
import { ExerciseDialogComponent } from '../exercise-dialog/exercise-dialog';
import { Exercise } from '../../models/hiit-data.model';

@Component({
  selector: 'app-exercise-library',
  standalone: true,
  imports: [CommonModule, DragDropModule, ButtonModule, ExerciseDialogComponent],
  templateUrl: './exercise-library.html',
  styleUrl: './exercise-library.css'
})
export class ExerciseLibraryComponent {
  @Input() connectedTo: string[] | string = [];
  @Output() itemDoubleClicked = new EventEmitter<Exercise | { type: 'pause' }>();
  private planService = inject(PlanService);
  exercises = this.planService.exercises;

  dialogVisible = false;
  selectedExercise: Exercise | null = null;

  onDoubleClick(item: Exercise | { type: 'pause' }) {
    this.itemDoubleClicked.emit(item);
  }

  openNewDialog() {
    this.selectedExercise = null;
    this.dialogVisible = true;
  }

  openEditDialog(exercise: Exercise) {
    this.selectedExercise = exercise;
    this.dialogVisible = true;
  }

  onSave(data: Omit<Exercise, 'id'>) {
    if (this.selectedExercise) {
      this.planService.updateExercise({
        ...this.selectedExercise,
        ...data
      });
    } else {
      this.planService.addExercise({
        id: crypto.randomUUID(),
        ...data
      });
    }
  }
}
