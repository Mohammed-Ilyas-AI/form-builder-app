import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldGroupService } from '../../../core/field-group.service';

@Component({
  selector: 'app-middle-pane',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './middle-pane.component.html',
  styleUrl: './middle-pane.component.css',
})
export class MiddlePaneComponent {
  @Input() selectedGroup: {
    id: number;
    name: string;
    description: string;
  } | null = null;

  pastedFieldGroups: Array<{
    id: number;
    name: string;
    description: string;
    editMode?: boolean;
  }> = [];

  editMode = false;

  constructor(private fieldGroupService: FieldGroupService) {
    this.pastedFieldGroups = this.fieldGroupService.getFieldGroups(); // Load stored groups
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveEdit(): void {
    this.editMode = false;
    if (this.selectedGroup) {
      this.fieldGroupService.saveFieldGroups(this.pastedFieldGroups);
    }
  }

  copyFieldGroup(): void {
    if (this.selectedGroup) {
      const copiedGroup = {
        ...this.selectedGroup,
        id: new Date().getTime(), // Unique ID
        name: `${this.selectedGroup.name} (Copy)`,
        editMode: false, // Initialize editMode for the copied group
      };
      this.pastedFieldGroups.push(copiedGroup);
      this.fieldGroupService.saveFieldGroups(this.pastedFieldGroups); // Persist changes
    }
  }

  deleteFieldGroup(): void {
    if (this.selectedGroup) {
      this.selectedGroup = null;
      this.fieldGroupService.saveFieldGroups(this.pastedFieldGroups); // Update storage
    }
  }

  toggleEditCopiedGroup(group: {
    id: number;
    name: string;
    description: string;
    editMode?: boolean;
  }): void {
    group.editMode = !group.editMode;
  }

  saveCopiedEdit(group: {
    id: number;
    name: string;
    description: string;
    editMode?: boolean;
  }): void {
    group.editMode = false;
    this.fieldGroupService.saveFieldGroups(this.pastedFieldGroups); // Persist changes
  }

  deleteCopiedGroup(group: {
    id: number;
    name: string;
    description: string;
    editMode?: boolean;
  }): void {
    this.pastedFieldGroups = this.pastedFieldGroups.filter(
      (g) => g.id !== group.id
    );
    this.fieldGroupService.saveFieldGroups(this.pastedFieldGroups); // Update storage
  }
}
