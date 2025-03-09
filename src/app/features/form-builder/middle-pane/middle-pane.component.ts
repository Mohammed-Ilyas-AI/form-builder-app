import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldGroupService } from '../../../core/field-group.service';
import { FieldGroup } from '../../../models/field-group.model';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'app-middle-pane',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './middle-pane.component.html',
  styleUrl: './middle-pane.component.css',
})
export class MiddlePaneComponent {
  @Input() selectedField: FieldGroup | null = null;// To display the selected field group dynamically

  pastedFieldGroups: FieldGroup[] = []; // To store copied field groups
  editMode: boolean = false; // Track whether the selected group is in edit mode

  // Properties for delete confirmation popup
  isDeleteConfirmOpen: boolean = false;
  deleteModalTitle: string = '';
  deleteModalMessage: string = '';
  deleteConfirmButtonText: string = '';

  constructor(private fieldGroupService: FieldGroupService) {}

  // Toggle edit mode for the selected field group
  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  // Save changes after editing the selected field group
  saveEdit() {
    if (this.selectedField) {
      this.fieldGroupService.editFieldGroup(
        this.selectedField.id,
        this.selectedField.name,
        this.selectedField.description
      );
    }
    this.editMode = false;
  }

  // Cancel edit mode for the selected field group
  cancelEdit() {
    // Optionally revert changes by reloading the selected group from the service.
    // For simplicity, we just exit edit mode without saving.
    this.editMode = false;
  }

  // Copy the selected field group to the copied groups section
  copyFieldGroup() {
    if (this.selectedField) {
      const copiedGroup: FieldGroup = {
        ...this.selectedField,
        id: new Date().getTime().toString(), // Generate a new unique ID for the copied group
        name: `${this.selectedField.name} (Copied)`,
      };
      this.pastedFieldGroups.push(copiedGroup);
    }
  }

   // Instead of direct deletion, open a delete confirmation modal for the selected field group
   openDeleteConfirmModal() {
    if (this.selectedField) {
      this.isDeleteConfirmOpen = true;
      this.deleteModalTitle = "Confirm Deletion";
      this.deleteModalMessage = "Are you sure you want to remove this field group from the middle pane? It will remain in the left pane.";
      this.deleteConfirmButtonText = "Delete";
    }
  }

  // When delete is confirmed, remove the selected field from the middle pane
  handleDeleteConfirm() {
    this.selectedField = null;
    this.isDeleteConfirmOpen = false;
  }

  // If deletion is canceled, simply close the delete confirmation modal
  handleDeleteCancel() {
    this.isDeleteConfirmOpen = false;
  }
  // Toggle edit mode for a copied group
  toggleEditCopiedGroup(group: FieldGroup) {
    group.editMode = !group.editMode;
  }

  // Save changes to a copied group
  saveCopiedEdit(group: FieldGroup) {
    group.editMode = false;
  }

   // Cancel edit mode for a copied group
   cancelEditCopiedGroup(group: FieldGroup) {
    group.editMode = false;
  }

  // Delete a copied group
  deleteCopiedGroup(group: FieldGroup) {
    const index = this.pastedFieldGroups.findIndex((g) => g.id === group.id);
    if (index > -1) {
      this.pastedFieldGroups.splice(index, 1); // Remove the group from the copied list
    }
  }
}
