import { Injectable, WritableSignal, signal } from '@angular/core';
import { FormElement } from '../models/form-element.model';

@Injectable({
  providedIn: 'root'
})
export class FormElementService {
  private elements: WritableSignal<FormElement[]> = signal([
    {
      id: '1',
      type: 'text',
      label: 'Single Line Text',
      description: 'Single text area',
      placeholder: 'Enter text...',
      required: false
    },
    {
      id: '2',
      type: 'multiline',
      label: 'Multi Line Text',
      description: 'Multi text area',
      placeholder: 'Enter long text here...',
      required: false
    },
    {
      id: '3',
      type: 'integer',
      label: 'Integer',
      description: 'Integer type area',
      placeholder: 'Enter integer type',
      required: false
    },
    {
      id: '4',
      type: 'date',
      label: 'Date',
      description: 'Select date from date-picker',
      required: false
    },
    {
      id: '5',
      type: 'time',
      label: 'Time',
      description: 'Select time from time-picker',
      required: false
    },
    {
      id: '6',
      type: 'date', // You might store this as separate or combine date & time
      label: 'Date & Time',
      description: 'Select date & time from picker',
      required: false
    },
    {
      id: '7',
      type: 'single-select',
      label: 'Single Select',
      description: 'Select single option',
      options: ['Option A', 'Option B', 'Option C'],
      required: false
    },
    {
      id: '8',
      type: 'multi-select',
      label: 'Multi Select',
      description: 'Select multiple options',
      options: ['Choice 1', 'Choice 2', 'Choice 3'],
      required: false
    },
    {
      id: '9',
      type: 'dropdown',
      label: 'Dropdown',
      description: 'Select options from dropdown',
      options: ['Option 1', 'Option 2', 'Option 3'],
      required: false
    },
    {
      id: '10',
      type: 'upload',
      label: 'Upload Field',
      description: 'upload document/media files',
      required: false
    }
  ]);

  getAvailableElements(): WritableSignal<FormElement[]> {
    return this.elements;
  }
}
