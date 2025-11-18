import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar';
import { PlanEditorComponent } from './components/plan-editor/plan-editor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, PlanEditorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hiit-planner');
}
