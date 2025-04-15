import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-preview',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-preview.component.html',
  styleUrl: './form-preview.component.css'
})
export class FormPreviewComponent {
  @Input() headerData: { title?: string; description?: string } = {};
  @Input() fields: any[] = [];
  @Output() closePreview = new EventEmitter<void>();

  onClose(): void {
    this.closePreview.emit();
  }
}
