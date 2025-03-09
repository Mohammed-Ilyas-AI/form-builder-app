import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldGroupService {
  private storageKey = 'fieldGroups';

  // Retrieve all field groups from local storage
  getFieldGroups(): Array<{ id: number; name: string; description: string }> {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading field groups from local storage', error);
      return [];
    }
  }

  // Save all field groups to local storage
  saveFieldGroups(groups: Array<{ id: number; name: string; description: string }>): void {
    localStorage.setItem(this.storageKey, JSON.stringify(groups));
  }

  // Add a new field group
  addFieldGroup(group: { id: number; name: string; description: string }): void {
    const fieldGroups = this.getFieldGroups();
    fieldGroups.push(group);
    this.saveFieldGroups(fieldGroups);
  }

  // Update an existing field group
  updateFieldGroup(updatedGroup: { id: number; name: string; description: string }): void {
    const fieldGroups = this.getFieldGroups().map(group =>
      group.id === updatedGroup.id ? updatedGroup : group
    );
    this.saveFieldGroups(fieldGroups);
  }

  // Delete a field group
  deleteFieldGroup(groupId: number): void {
    const fieldGroups = this.getFieldGroups().filter(group => group.id !== groupId);
  }
}
