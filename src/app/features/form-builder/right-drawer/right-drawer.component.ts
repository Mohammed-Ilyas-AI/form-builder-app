import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormElement } from '../../../models/form-element.model';

@Component({
  selector: 'app-right-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './right-drawer.component.html',
  styleUrl: './right-drawer.component.css',
})
export class RightDrawerComponent {
  @Input() selectedElement: FormElement | null = null;

  // Local copy for editing to allow cancelling changes
  localElement: FormElement | null = null;

  ngOnChanges() {
    if (this.selectedElement) {
      // Create a shallow copy to work on
      this.localElement = { ...this.selectedElement };
      // For selection fields, you might want to join the options array into a string for editing:
      if (this.localElement.options) {
        this.localElement.optionsString = this.localElement.options.join(', ');
      }
    }
  }

  // Save changes to the selected element (emit event or update service as needed)
  saveChanges() {
    if (this.localElement && this.selectedElement) {
      this.selectedElement.label = this.localElement.label;
      this.selectedElement.description = this.localElement.description;
      this.selectedElement.placeholder = this.localElement.placeholder;
      this.selectedElement.required = this.localElement.required;
      // Convert optionsString back to array if applicable
      if (this.localElement.optionsString !== undefined) {
        this.selectedElement.options = this.localElement.optionsString.split(',').map(v => v.trim());
      }
    }
    // Close or complete drawer update (you can emit an event or simply update the UI)
  }

  // Cancel changes by reverting local copy to the original
  cancelChanges() {
    if (this.selectedElement) {
      this.localElement = { ...this.selectedElement };
      if (this.localElement.options) {
        this.localElement.optionsString = this.localElement.options.join(', ');
      }
    }
  }
}
