import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { Exercise } from '../../models/hiit-data.model';

@Component({
  selector: 'app-exercise-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    DialogModule, 
    ButtonModule, 
    InputTextModule, 
    TextareaModule,
    InputNumberModule
  ],
  templateUrl: './exercise-dialog.html',
  styleUrl: './exercise-dialog.css'
})
export class ExerciseDialogComponent {
  @Input() visible = false;
  @Input() exercise: Exercise | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<Omit<Exercise, 'id'>>();

  name = '';
  instruction = '';
  defaultDuration = 30;

  ngOnChanges() {
    if (this.exercise) {
      this.name = this.exercise.name;
      this.instruction = this.exercise.instruction;
      this.defaultDuration = this.exercise.defaultDuration || 30;
    } else {
      this.name = '';
      this.instruction = '';
      this.defaultDuration = 30;
    }
  }

  onCancel() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onSave() {
    this.save.emit({
      name: this.name,
      instruction: this.instruction,
      defaultDuration: this.defaultDuration
    });
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
