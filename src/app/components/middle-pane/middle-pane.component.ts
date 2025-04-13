import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { FieldGroup } from '../../models/field-group';
import { FormRendererComponent } from '../../features/form-renderer/form-renderer.component';

@Component({
  selector: 'app-middle-pane',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormRendererComponent],
  templateUrl: './middle-pane.component.html',
  styleUrl: './middle-pane.component.css',
})
export class MiddlePaneComponent implements OnInit {
  form!: FormGroup;
  selectedGroup: FieldGroup | null = null;
  isEditMode = false;
  previewMode = false;

  constructor(
    private fb: FormBuilder,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.storageService.selectedFieldGroup$.subscribe((group: FieldGroup | null) => {
      if (!group) return;

      this.selectedGroup = group;

      const headerGroup = this.fb.group({
        title: [group.name || ''],
        description: [group.description || '']
      });

      this.fieldGroups.clear();
      this.fieldGroups.push(headerGroup);
    });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      fieldGroups: this.fb.array([]),  // Header section
      formFields: this.fb.array([])    // Local form field builder
    });
  }

  get fieldGroups(): FormArray {
    return this.form.get('fieldGroups') as FormArray;
  }

  get formFields(): FormArray {
    return this.form.get('formFields') as FormArray;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const data = event.dataTransfer?.getData('formElement');
    if (!data) return;
    const field = JSON.parse(data);
    // Directly add a new FormGroup representation of the field into our reactive form.
    this.formFields.push(this.createFieldGroup(field));
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault(); // ✅ REQUIRED to enable drop
  }

  createFieldGroup(field: any): FormGroup {
    return this.fb.group({
      label: [field.label],
      type: [field.type],
      placeholder: [field.placeholder || ''],
      options: [field.options || []],
      value: field.type === 'checkbox'
        ? this.fb.array((field.value || []) as string[])
        : [field.value || '']
    });
  }

  // 🟦 Header section controls

  enterEditMode(): void {
    this.isEditMode = true;
  }

  cancelEdit(): void {
    if (this.selectedGroup) {
      this.fieldGroups.at(0).patchValue({
        title: this.selectedGroup.name,
        description: this.selectedGroup.description
      });
    }
    this.isEditMode = false;
  }

  saveHeader(): void {
    if (!this.selectedGroup) return;

    const header = this.fieldGroups.at(0).value;

    this.selectedGroup.name = header.title;
    this.selectedGroup.description = header.description;

    this.storageService.updateSelectedFieldGroup(this.selectedGroup);
    this.isEditMode = false;
  }

  copyGroup(): void {
    this.storageService.copySelectedFieldGroup();
  }

  deleteGroup(): void {
    if (confirm('Are you sure you want to delete this group?')) {
      this.storageService.deleteSelectedFieldGroup();
      this.selectedGroup = null;
      this.clearForm();
    }
  }

  // 🧩 Save Full Form (Header + Fields)

  saveForm(): void {
    if (!this.selectedGroup) return;
    const header = this.fieldGroups.at(0).value;
    const updatedGroup: FieldGroup = {
      ...this.selectedGroup,
      name: header.title,
      description: header.description,
    };
    this.storageService.updateSelectedFieldGroup(updatedGroup);
    alert('Form saved successfully ✅');
    this.isEditMode = false;
  }

  previewForm(): void {
    this.previewMode = true;
  }

  // 🔧 Form Field Controls

  copyField(index: number): void {
    const field = this.formFields.at(index).value;
    this.formFields.insert(index + 1, this.createFieldGroup(field));
  }

  deleteField(index: number): void {
    if (confirm('Are you sure you want to delete this field?')) {
      this.formFields.removeAt(index);
    }
  }

  editField(index: number): void {
    console.log('Edit field:', index);
  }

  clearForm(): void {
    this.fieldGroups.clear();
    this.formFields.clear();
  }

  // Export / Import

  exportForm(): void {
    const exportData = JSON.stringify({
      header: this.fieldGroups.at(0).value,
      fields: this.formFields.value
    }, null, 2);

    const blob = new Blob([exportData], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = 'form.json';
    link.href = window.URL.createObjectURL(blob);
    link.click();
  }

  importForm(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);

        this.clearForm();

        this.fieldGroups.push(this.fb.group({
          title: [data.header.title],
          description: [data.header.description]
        }));

        (data.fields || []).forEach((field: any) => {
          this.formFields.push(this.createFieldGroup(field));
        });

      } catch (err) {
        alert('Invalid JSON');
      }
    };

    reader.readAsText(file);
  }

  trackByFn(index: number, item: AbstractControl): number {
    return index;
  }

  onFileChange(eventData: { fileEvent: Event; index: number }): void {
    console.log('File change', eventData.index);
  }

  onCheckboxChange(eventData: { event: Event; index: number }): void {
    console.log('Checkbox change', eventData.index);
  }
}
