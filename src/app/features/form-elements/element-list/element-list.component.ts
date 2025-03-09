import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementService } from '../../../core/form-element.service';
import { FormElement } from '../../../models/form-element.model';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-element-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './element-list.component.html',
  styleUrl: './element-list.component.css',
})
export class ElementListComponent {
  availableElements: FormElement[] = [];
  searchTerm: string = '';

  // Define categories – these group which types appear together.
  categories: Category[] = [
    { title: 'Text Fields', types: ['text', 'multiline', 'integer'] },
    { title: 'Date/Time Fields', types: ['date', 'time', 'datetime'] },
    { title: 'Selection Fields', types: ['dropdown', 'single-select', 'multi-select'] },
    { title: 'Media Fields', types: ['upload'] },
  ];

  constructor(private formElementService: FormElementService) {
    this.loadElements();
  }

  loadElements(): void {
    // Load all elements from the service.
    this.availableElements = this.formElementService.getAvailableElements()();
  }

  // Returns the available elements filtered by search term.
  get filteredElements(): FormElement[] {
    if (!this.searchTerm.trim()) {
      return this.availableElements;
    }
    return this.availableElements.filter(el =>
      el.label.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (el.description && el.description.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  // Filter elements by a given set of types.
  filterByTypes(types: string[]): FormElement[] {
    return this.filteredElements.filter(el => types.includes(el.type));
  }

  // When an element is selected (e.g., for drag/drop), you can handle it here.
  selectElement(element: FormElement): void {
    console.log('Selected element:', element);
    // Implement further logic, e.g., emitting event for drag-and-drop.
  }
}
