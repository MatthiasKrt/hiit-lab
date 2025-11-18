import { Component, OnInit, OnDestroy, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlanService } from '../../services/plan.service';
import { Block } from '../../models/hiit-data.model';

@Component({
  selector: 'app-run-training',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './run-training.component.html',
  styleUrls: ['./run-training.component.css']
})
export class RunTrainingComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private planService = inject(PlanService);

  currentPlan = this.planService.currentPlan;
  
  // State
  currentBlockIndex = signal(0);
  timeLeft = signal(0);
  isRunning = signal(false);
  isPaused = signal(false);
  
  // Computed
  currentBlock = computed(() => {
    const plan = this.currentPlan();
    if (!plan || !plan.blocks.length) return null;
    return plan.blocks[this.currentBlockIndex()];
  });

  nextBlock = computed(() => {
    const plan = this.currentPlan();
    if (!plan) return null;
    const nextIndex = this.currentBlockIndex() + 1;
    return nextIndex < plan.blocks.length ? plan.blocks[nextIndex] : null;
  });

  totalBlocks = computed(() => this.currentPlan()?.blocks.length || 0);

  private timer: any;
  private audioCtx: AudioContext | null = null;

  constructor() {
    effect(() => {
      const plan = this.currentPlan();
      if (plan && !this.isRunning() && this.currentBlockIndex() === 0 && this.timeLeft() === 0) {
        // Initialize first block
        this.resetBlock();
      }
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.planService.selectPlan(id);
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.stopTimer();
    if (this.audioCtx) {
      this.audioCtx.close();
    }
  }

  togglePause() {
    this.isPaused.update(p => !p);
  }

  start() {
    if (!this.currentPlan()) return;
    this.isRunning.set(true);
    this.isPaused.set(false);
    this.resetBlock();
    this.startTimer();
  }

  private startTimer() {
    this.timer = setInterval(() => {
      if (this.isPaused()) return;

      if (this.timeLeft() > 0) {
        this.timeLeft.update(t => t - 1);
      } else {
        this.playBeep();
        this.next();
      }
    }, 1000);
  }

  private stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private next() {
    const plan = this.currentPlan();
    if (!plan) return;

    if (this.currentBlockIndex() < plan.blocks.length - 1) {
      this.currentBlockIndex.update(i => i + 1);
      this.resetBlock();
    } else {
      // Finished
      this.finish();
    }
  }

  private resetBlock() {
    const block = this.currentBlock();
    if (block) {
      this.timeLeft.set(block.duration);
    }
  }

  private finish() {
    this.stopTimer();
    this.isRunning.set(false);
    this.playBeep(880, 0.5); // Higher pitch, longer for finish
    // Maybe navigate back or show summary? For now just stop.
    alert('Training Complete!');
    this.router.navigate(['/']);
  }

  private playBeep(freq = 440, duration = 0.2) {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    
    osc.frequency.value = freq;
    osc.type = 'sine';
    
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, this.audioCtx.currentTime + duration);
    osc.stop(this.audioCtx.currentTime + duration);
  }
}
