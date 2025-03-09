import { Injectable, WritableSignal, signal } from '@angular/core';
import { FieldGroup } from '../models/field-group.model';

@Injectable({
  providedIn: 'root',
})
export class FieldGroupService {
  private storageKey = 'userFieldGroups'; // Local storage key for user-created field groups

  // Writable signal to track all field groups (default + user-created)
  private fieldGroups: WritableSignal<FieldGroup[]> = signal([]);
  private activeFieldGroupId: WritableSignal<string | null> = signal(null);

  // Default field groups
  private defaultGroups: FieldGroup[] = [
    {
      id: '1',
      name: 'Personal Details',
      description: 'Group for personal information like name and DOB',
      editMode: false,
    },
    {
      id: '2',
      name: 'Contact Info',
      description: 'Group for contact details like phone and email',
      editMode: false,
    },
    {
      id: '3',
      name: 'Employment Details',
      description: 'Group for job-related information',
      editMode: false,
    },
  ];

  constructor() {
    this.loadFieldGroups();
  }

  // Load field groups: retrieve from local storage or fallback to default groups
  private loadFieldGroups(): void {
    const storedGroups = localStorage.getItem(this.storageKey);
    if (storedGroups) {
      // Load user-created groups if found in local storage
      const userCreatedGroups = JSON.parse(storedGroups) as FieldGroup[];
      this.fieldGroups.set([...this.defaultGroups, ...userCreatedGroups]);
    } else {
      // Fallback to only default groups
      this.fieldGroups.set(this.defaultGroups);
    }
  }

  // Get all field groups (signal)
  getFieldGroups(): WritableSignal<FieldGroup[]> {
    return this.fieldGroups;
  }

  // Add a new field group
  addFieldGroup(name: string, description?: string): void {
    const newGroup: FieldGroup = {
      id: new Date().getTime().toString(), // Generate a unique ID
      name: name.trim(),
      description: description?.trim() || '',
      editMode: false,
    };

    // Add to user-created groups
    const userCreated = this.fieldGroups().filter(
      (group) => !this.isDefaultGroup(group.id)
    );
    const updatedGroups = [...userCreated, newGroup];
    this.fieldGroups.set([...this.defaultGroups, ...updatedGroups]);
    this.saveUserCreatedGroups(updatedGroups); // Save user-created groups
  }

  // Edit an existing field group
  editFieldGroup(groupId: string, name: string, description?: string): void {
    const updatedGroups = this.fieldGroups().map((group) =>
      group.id === groupId
        ? {
            ...group,
            name: name.trim(),
            description: description?.trim() || group.description,
          }
        : group
    );

    this.fieldGroups.set(updatedGroups);
    const userCreated = updatedGroups.filter(
      (group) => !this.isDefaultGroup(group.id)
    );
    this.saveUserCreatedGroups(userCreated); // Save user-created groups
  }

  // Delete a field group
  deleteFieldGroup(groupId: string): void {
    const updatedGroups = this.fieldGroups().filter(
      (group) => group.id !== groupId
    );
    this.fieldGroups.set(updatedGroups);
    const userCreated = updatedGroups.filter(
      (group) => !this.isDefaultGroup(group.id)
    );
    this.saveUserCreatedGroups(userCreated); // Save user-created groups
  }

  // Set the currently active field group
  setActiveFieldGroup(id: string): void {
    this.activeFieldGroupId.set(id);
  }

  // Get the currently active field group (as a signal, if needed)
  getActiveFieldGroup(): WritableSignal<string | null> {
    return this.activeFieldGroupId;
  }

  // New helper: Get the selected field group by activeFieldGroupId
  getSelectedFieldGroup(): FieldGroup | null {
    const activeId = this.activeFieldGroupId();
    if (!activeId) return null;
    return this.fieldGroups().find((group) => group.id === activeId) || null;
  }

  // Save user-created field groups (exclude default groups) to local storage
  private saveUserCreatedGroups(groups: FieldGroup[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(groups));
  }

  // Helper to check if a group is a default group
  isDefaultGroup(groupId: string): boolean {
    return this.defaultGroups.some(
      (defaultGroup) => defaultGroup.id === groupId
    );
  }
}
