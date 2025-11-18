import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  private planService = inject(PlanService);
  plans = this.planService.plans;
  currentPlan = this.planService.currentPlan;

  selectPlan(id: string) {
    this.planService.selectPlan(id);
  }

  createNewPlan() {
    const name = prompt('Enter plan name:');
    if (name) {
      this.planService.addPlan(name);
    }
  }

  deletePlan(id: string) {
    if (confirm('Are you sure you want to delete this plan?')) {
      this.planService.deletePlan(id);
    }
  }
}
