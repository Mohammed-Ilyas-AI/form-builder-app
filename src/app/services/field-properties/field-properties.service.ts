import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FieldProperty {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  icon?: string;
}

export interface FieldPropertyCategory {
  category: string;
  properties: FieldProperty[];
}

@Injectable({ providedIn: 'root' })
export class FieldPropertyService {
  private configSubject = new BehaviorSubject<FieldPropertyCategory[]>([]);
  config$ = this.configSubject.asObservable();

  constructor() {
    this.loadFromJson();
  }

  /** Load from /assets/field-properties.json */
  private async loadFromJson(): Promise<void> {
    try {
      const res = await fetch('assets/data/field-properties.json');
      if (!res.ok) {
        throw new Error('Failed to load field-properties.json');
      }
      const data: FieldPropertyCategory[] = await res.json();
      this.configSubject.next(data);
    } catch (error) {
      console.error('Error loading field properties:', error);
    }
  }

  /** Returns the properties for a given category */
  getPropertiesByCategory(category: string): FieldProperty[] {
    const config = this.configSubject.value;
    const categoryObj = config.find(
      (cat) => cat.category.toLowerCase() === category.toLowerCase()
    );
    return categoryObj ? categoryObj.properties : [];
  }
}
