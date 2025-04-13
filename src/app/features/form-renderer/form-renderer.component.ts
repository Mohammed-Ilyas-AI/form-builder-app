import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-renderer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './form-renderer.component.html',
  styleUrl: './form-renderer.component.css',
})
export class FormRendererComponent {
  @Input() formFields!: FormArray;

  @Output() edit = new EventEmitter<number>();
  @Output() copy = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() fileChange = new EventEmitter<{ fileEvent: Event; index: number }>();
  @Output() checkboxChange = new EventEmitter<{ event: Event; index: number }>();

  onFileChange(event: Event, index: number) {
    this.fileChange.emit({ fileEvent: event, index });
  }

  onCheckboxChange(event: Event, index: number) {
    this.checkboxChange.emit({ event, index });
  }

  getFieldGroup(index: number): FormGroup {
    return this.formFields.at(index) as FormGroup;
  }
}
