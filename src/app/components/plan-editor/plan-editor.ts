import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { PlanService } from '../../services/plan.service';
import { Block, Exercise } from '../../models/hiit-data.model';
import { ExerciseLibraryComponent } from '../exercise-library/exercise-library';
import { BlockDialogComponent } from '../block-dialog/block-dialog';

@Component({
  selector: 'app-plan-editor',
  standalone: true,
  imports: [CommonModule, DragDropModule, ExerciseLibraryComponent, BlockDialogComponent],
  templateUrl: './plan-editor.html',
  styleUrl: './plan-editor.css'
})
export class PlanEditorComponent {
  private planService = inject(PlanService);
  currentPlan = this.planService.currentPlan;

  blockDialogVisible = false;
  selectedBlock: Block | null = null;

  drop(event: CdkDragDrop<Block[]>) {
    if (event.previousContainer === event.container) {
      // Reordering within the plan
      const newBlocks = [...this.currentPlan()!.blocks];
      moveItemInArray(newBlocks, event.previousIndex, event.currentIndex);
      this.updatePlanBlocks(newBlocks);
    } else {
      // Dropping from library
      const data = event.item.data;
      let newBlock: Block;

      if (data.type === 'pause') {
        newBlock = {
          id: crypto.randomUUID(),
          type: 'pause',
          duration: 10, // Default duration 10s as requested
          name: 'Pause',
          instruction: 'Rest and recover'
        };
      } else {
        const exercise = data as Exercise;
        newBlock = {
          id: crypto.randomUUID(),
          type: 'exercise',
          duration: exercise.defaultDuration || 30,
          exerciseId: exercise.id,
          name: exercise.name,
          instruction: exercise.instruction
        };
      }
      
      const newBlocks = [...this.currentPlan()!.blocks];
      newBlocks.splice(event.currentIndex, 0, newBlock);
      this.updatePlanBlocks(newBlocks);
    }
  }

  addBlockFromLibrary(item: Exercise | { type: 'pause' }) {
    let newBlock: Block;

    if ('type' in item && item.type === 'pause') {
      newBlock = {
        id: crypto.randomUUID(),
        type: 'pause',
        duration: 10, // Default duration 10s
        name: 'Pause',
        instruction: 'Rest and recover'
      };
    } else {
      const exercise = item as Exercise;
      newBlock = {
        id: crypto.randomUUID(),
        type: 'exercise',
        duration: exercise.defaultDuration || 30,
        exerciseId: exercise.id,
        name: exercise.name,
        instruction: exercise.instruction
      };
    }

    const plan = this.currentPlan();
    if (plan) {
      const newBlocks = [...plan.blocks, newBlock];
      this.updatePlanBlocks(newBlocks);
    }
  }

  private updatePlanBlocks(blocks: Block[]) {
    const plan = this.currentPlan();
    if (plan) {
      this.planService.updatePlan({ ...plan, blocks });
    }
  }

  deleteBlock(index: number) {
    const plan = this.currentPlan();
    if (plan) {
      const newBlocks = [...plan.blocks];
      newBlocks.splice(index, 1);
      this.updatePlanBlocks(newBlocks);
    }
  }

  editBlock(block: Block) {
    this.selectedBlock = block;
    this.blockDialogVisible = true;
  }

  onBlockSave(updatedBlock: Block) {
    const plan = this.currentPlan();
    if (plan) {
      const newBlocks = plan.blocks.map(b => b.id === updatedBlock.id ? updatedBlock : b);
      this.updatePlanBlocks(newBlocks);
    }
  }

  get totalDuration() {
    const plan = this.currentPlan();
    if (!plan) return 0;
    return plan.blocks.reduce((acc, block) => acc + block.duration, 0);
  }

  formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
