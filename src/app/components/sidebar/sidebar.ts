import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanService } from '../../services/plan.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, ButtonModule, InputTextModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  private planService = inject(PlanService);
  plans = this.planService.plans;
  currentPlan = this.planService.currentPlan;

  // Dialog state
  createDialogVisible = false;
  newPlanName = '';
  
  deleteDialogVisible = false;
  planToDeleteId: string | null = null;

  selectPlan(id: string) {
    this.planService.selectPlan(id);
  }

  createNewPlan() {
    this.newPlanName = '';
    this.createDialogVisible = true;
  }

  saveNewPlan() {
    if (this.newPlanName.trim()) {
      this.planService.addPlan(this.newPlanName.trim());
      this.createDialogVisible = false;
    }
  }

  deletePlan(id: string) {
    this.planToDeleteId = id;
    this.deleteDialogVisible = true;
  }

  confirmDelete() {
    if (this.planToDeleteId) {
      this.planService.deletePlan(this.planToDeleteId);
      this.deleteDialogVisible = false;
      this.planToDeleteId = null;
    }
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      try {
        await this.planService.importPlan(input.files[0]);
        // Reset input
        input.value = '';
      } catch (error) {
        alert('Failed to import plan. Please check the file format.');
      }
    }
  }
}
