import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldGroupService {
  private storageKey = 'fieldGroups';

  // Retrieve all field groups
  getFieldGroups(): Array<{ id: number; name: string; description: string }> {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Save all field groups
  saveFieldGroups(groups: Array<{ id: number; name: string; description: string }>): void {
    localStorage.setItem(this.storageKey, JSON.stringify(groups));
  }
}
