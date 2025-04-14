import { TestBed } from '@angular/core/testing';
import { FieldPropertyService, FieldPropertyCategory } from './field-properties.service';

describe('FieldPropertyService', () => {
  let service: FieldPropertyService;

  const mockData: FieldPropertyCategory[] = [
    {
      category: 'General',
      properties: [
        { id: 'label', name: 'Label', type: 'text', placeholder: 'Enter field label', icon: 'fas fa-tag' },
        { id: 'placeholder', name: 'Placeholder', type: 'text', placeholder: 'Enter placeholder text', icon: 'fas fa-edit' },
        { id: 'defaultValue', name: 'Default Value', type: 'text', placeholder: 'Enter default value', icon: 'fas fa-check-circle' },
        { id: 'helperText', name: 'Helper Text', type: 'text', placeholder: 'Enter helper text', icon: 'fas fa-info-circle' },
        { id: 'cssClass', name: 'CSS Class', type: 'text', placeholder: 'Enter CSS class', icon: 'fas fa-code' },
        { id: 'tooltip', name: 'Tooltip', type: 'text', placeholder: 'Enter tooltip text', icon: 'fas fa-comment' },
        { id: 'visibility', name: 'Visibility', type: 'checkbox', icon: 'fas fa-eye' },
        { id: 'readonly', name: 'Read-Only', type: 'checkbox', icon: 'fas fa-lock' }
      ]
    },
    {
      category: 'Validation',
      properties: [
        { id: 'required', name: 'Required', type: 'checkbox', icon: 'fas fa-exclamation-circle' },
        { id: 'minLength', name: 'Min Length', type: 'number', placeholder: 'Minimum characters', icon: 'fas fa-arrow-down' },
        { id: 'maxLength', name: 'Max Length', type: 'number', placeholder: 'Maximum characters', icon: 'fas fa-arrow-up' },
        { id: 'email', name: 'Email', type: 'checkbox', icon: 'fas fa-envelope' },
        { id: 'pattern', name: 'Pattern', type: 'text', placeholder: 'Enter regex pattern', icon: 'fas fa-pencil-ruler' }
      ]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldPropertyService);
    // Bypass the asynchronous "fetch" by directly setting the config data.
    (service as any).configSubject.next(mockData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all properties for the "General" category', () => {
    const generalProps = service.getPropertiesByCategory('General');
    expect(generalProps.length).toBe(8);
    expect(generalProps[0].id).toBe('label');
  });

  it('should return all properties for the "Validation" category', () => {
    const validationProps = service.getPropertiesByCategory('Validation');
    expect(validationProps.length).toBe(5);
    expect(validationProps[0].id).toBe('required');
  });

  it('should return an empty array for a non-existing category', () => {
    const nonExistent = service.getPropertiesByCategory('Nonexistent');
    expect(nonExistent.length).toBe(0);
  });
});
