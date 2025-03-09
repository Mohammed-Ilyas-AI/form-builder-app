import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldGroupService } from '../../../core/field-group.service';

@Component({
  selector: 'app-field-group-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './field-group-list.component.html',
  styleUrl: './field-group-list.component.css',

})
export class FieldGroupListComponent {
  @Output() groupSelected = new EventEmitter<{ id: number; name: string; description: string }>();

  defaultFieldGroups: Array<{ id: number; name: string; description: string }> = [];
  newlyCreatedGroups: Array<{ id: number; name: string; description: string }> = [];
  showCreateForm = false;
  newGroup = { name: '', description: '' };

  constructor(private fieldGroupService: FieldGroupService) {}

  ngOnInit(): void {
    // Load field groups from local storage on initialization
    this.defaultFieldGroups = this.fieldGroupService.getFieldGroups();
  }

  selectFieldGroup(group: { id: number; name: string; description: string }): void {
    this.groupSelected.emit(group);
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }

  createFieldGroup(): void {
    if (this.newGroup.name.trim() && this.newGroup.description.trim()) {
      const newGroupId = new Date().getTime(); // Generate unique ID
      const newGroup = { id: newGroupId, ...this.newGroup };
      this.fieldGroupService.addFieldGroup(newGroup); // Persist to local storage
      this.defaultFieldGroups = this.fieldGroupService.getFieldGroups(); // Reload field groups
      this.newGroup = { name: '', description: '' };
      this.showCreateForm = false;
    }
  }

  cancelCreateForm(): void {
    this.newGroup = { name: '', description: '' };
    this.showCreateForm = false;
  }

  deleteFieldGroup(groupId: number): void {
    this.fieldGroupService.deleteFieldGroup(groupId); // Remove from local storage
    this.defaultFieldGroups = this.fieldGroupService.getFieldGroups(); // Reload field groups
  }
}
