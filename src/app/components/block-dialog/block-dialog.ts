import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { Block } from '../../models/hiit-data.model';

@Component({
  selector: 'app-block-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    DialogModule, 
    ButtonModule, 
    InputTextModule, 
    InputNumberModule,
    TextareaModule
  ],
  templateUrl: './block-dialog.html',
  styleUrl: './block-dialog.css'
})
export class BlockDialogComponent {
  @Input() visible = false;
  @Input() block: Block | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<Block>();

  name = '';
  duration = 30;
  instruction = '';

  ngOnChanges() {
    if (this.block) {
      this.name = this.block.name || '';
      this.duration = this.block.duration;
      this.instruction = this.block.instruction || '';
    }
  }

  onCancel() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onSave() {
    if (this.block) {
      const updatedBlock: Block = {
        ...this.block,
        duration: this.duration
      };

      if (this.block.type !== 'pause') {
        updatedBlock.name = this.name;
        updatedBlock.instruction = this.instruction;
      }

      this.save.emit(updatedBlock);
    }
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
