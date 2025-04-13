import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-renderer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css'],
})
export class FormRendererComponent {
  @Input() field!: any;
  @Output() editField = new EventEmitter<any>();
  @Output() copyField = new EventEmitter<any>();
  @Output() deleteField = new EventEmitter<string>();

  onEdit(): void {
    this.editField.emit(this.field);
  }

  onCopy(): void {
    this.copyField.emit(this.field);
  }

  onDelete(): void {
    this.deleteField.emit(this.field.id);
  }
}
