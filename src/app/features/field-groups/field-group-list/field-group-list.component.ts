import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-field-group-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './field-group-list.component.html',
  styleUrl: './field-group-list.component.css',
})
export class FieldGroupListComponent {
  defaultFieldGroups = [
    {
      id: 1,
      name: 'Personal Details',
      description: 'Contains personal information fields.',
    },
    {
      id: 2,
      name: 'Contact Info',
      description: 'Includes email and phone number fields.',
    },
    {
      id: 3,
      name: 'Work Experience',
      description: 'Fields for job details and experience.',
    },
  ];

  newlyCreatedGroups: Array<{ id: number; name: string; description: string }> =
    [];
  showCreateForm = false;

  newGroup = { name: '', description: '' };

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }

  createFieldGroup(): void {
    if (this.newGroup.name.trim() && this.newGroup.description.trim()) {
      const newGroupId =
        this.defaultFieldGroups.length + this.newlyCreatedGroups.length + 1;
      this.newlyCreatedGroups.push({ id: newGroupId, ...this.newGroup });
      this.newGroup = { name: '', description: '' };
      this.showCreateForm = false;
    } else {
      alert('Please fill in both Name and Description.');
    }
  }

  cancelCreateForm(): void {
    this.newGroup = { name: '', description: '' };
    this.showCreateForm = false;
  }

  selectFieldGroup(id: number): void {
    console.log('Selected Field Group ID:', id);
    // Integration with Middle Pane will be added later.
  }
}
