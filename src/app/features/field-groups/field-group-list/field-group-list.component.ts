import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldGroupService } from '../../../core/field-group.service';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { FieldGroup } from '../../../models/field-group.model';

@Component({
  selector: 'app-field-group-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './field-group-list.component.html',
  styleUrls: ['./field-group-list.component.css'],
})
export class FieldGroupListComponent {
  @Output() selectedFieldGroupChange = new EventEmitter<FieldGroup>(); // Notify parent of the selected group

  // Signals for groups
  defaultGroups: WritableSignal<FieldGroup[]> = signal([]); // Default groups
  newlyCreatedGroups: WritableSignal<FieldGroup[]> = signal([]); // User-created groups

  selectedGroupId: WritableSignal<string | null> = signal(null);

  // Modal-specific states
  isModalOpen: WritableSignal<boolean> = signal(false);
  isCreateMode: WritableSignal<boolean> = signal(false);
  modalTitle: WritableSignal<string> = signal('');
  fieldGroupName: string = '';
  fieldGroupDescription: string = '';

  constructor(private fieldGroupService: FieldGroupService) {
    this.loadFieldGroups();
  }

  // Load and separate field groups
  loadFieldGroups() {
    const allGroups = this.fieldGroupService.getFieldGroups()();

    // Separate into default and newly created groups
    this.defaultGroups.set(
      allGroups.filter((group) =>
        this.fieldGroupService.isDefaultGroup(group.id)
      )
    );
    this.newlyCreatedGroups.set(
      allGroups.filter(
        (group) =>
          !this.fieldGroupService.isDefaultGroup(group.id) &&
          group.name.trim() !== '' // Exclude groups with empty names
      )
    );
  }

  // Select a field group
  selectFieldGroup(id: string) {
    this.selectedGroupId.set(id);
    const selectedGroup = this.fieldGroupService
      .getFieldGroups()()
      .find((group) => group.id === id);

    if (selectedGroup) {
      this.selectedFieldGroupChange.emit(selectedGroup); // Emit the selected group
    }
  }

  // Open the Create Modal
  openCreateModal() {
    this.isModalOpen.set(true);
    this.isCreateMode.set(true);
    this.modalTitle.set('Create New Field Group');
    this.fieldGroupName = '';
    this.fieldGroupDescription = '';
  }

  // Handle Confirm Action for Create
  handleConfirmAction(data: { name: string; description: string }) {
    if (this.isCreateMode()) {
      // Add the new field group with data from the modal
      this.fieldGroupService.addFieldGroup(data.name, data.description);

      // Refresh the UI immediately after adding the group
      this.loadFieldGroups();
    }
    // Close the modal
    this.closeModal();
  }

  // Close the Modal
  closeModal() {
    this.isModalOpen.set(false);
    this.isCreateMode.set(false);
    this.modalTitle.set('');
    this.fieldGroupName = '';
    this.fieldGroupDescription = '';
  }
}
