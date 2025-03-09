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

  constructor(private fieldGroupService: FieldGroupService) { }

  ngOnInit(): void {
    this.pastedFieldGroups = this.fieldGroupService.getFieldGroups(); // Load stored groups
  }


  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveEdit(): void {
    this.editMode = false;
    if (this.selectedGroup) {
      const index = this.pastedFieldGroups.findIndex(
        (group) => group.id === this.selectedGroup!.id
      );
      if (index !== -1) {
        this.pastedFieldGroups[index] = this.selectedGroup; // Update the group
      }
      this.fieldGroupService.saveFieldGroups(this.pastedFieldGroups); // Persist changes
    }
  }

  copyFieldGroup(): void {
    if (this.selectedGroup) {
      const copiedGroup = JSON.parse(JSON.stringify(this.selectedGroup)); // Deep copy
      copiedGroup.id = new Date().getTime(); // Unique ID
      copiedGroup.name = `${this.selectedGroup.name} (Copy)`;
      copiedGroup.editMode = false;
      this.pastedFieldGroups.push(copiedGroup);
      this.fieldGroupService.saveFieldGroups(this.pastedFieldGroups); // Persist changes
    }
  }

  deleteFieldGroup(): void {
    if (this.selectedGroup) {
      this.pastedFieldGroups = this.pastedFieldGroups.filter(
        (group) => group.id !== this.selectedGroup!.id
      );
      this.selectedGroup = null; // Clear selection
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
