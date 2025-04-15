import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormPreviewComponent } from '../../features/form-preview/form-preview.component';
import { FormRendererComponent } from '../../features/form-renderer/form-renderer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RightDrawerComponent } from '../../features/right-drawer/right-drawer.component';
import { FieldGroup } from '../../models/field-group';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { FormElement } from './../../models/form-element';

@Component({
  selector: 'app-middle-pane',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormRendererComponent,
    DragDropModule,
    RightDrawerComponent,
    FormPreviewComponent,
  ],
  templateUrl: './middle-pane.component.html',
  styleUrls: ['./middle-pane.component.css'],
})
export class MiddlePaneComponent implements OnInit {
  form!: FormGroup;
  selectedGroup: FieldGroup | null = null;
  isEditMode = false;
  previewMode = false;
  renderedFields: any[] = [];
  isLoading: boolean = false;
  isRightDrawerOpen: boolean = false;
  isPreviewOpen: boolean = false;
  selectedRenderedField: FormElement | null = null;
  savedFormData: any = null;
  isFormSaved: boolean = false;
  isHeaderSaved: boolean = false;
  isRightDrawerSaved: boolean = false;

  constructor(
    private fb: FormBuilder,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.storageService.selectedFieldGroup$.subscribe(
      (group: FieldGroup | null) => {
        if (group) {
          this.selectedGroup = group;
          this.setFieldGroupData(group);
        } else {
          this.selectedGroup = null;
          this.form.reset();
          this.renderedFields = [];
        }
      }
    );
  }

  initializeForm(): void {
    this.form = this.fb.group({
      fieldGroups: this.fb.array([]),
    });
  }

  get fieldGroups(): FormArray {
    return this.form.get('fieldGroups') as FormArray;
  }

  setFieldGroupData(groupData: FieldGroup): void {
    this.fieldGroups.clear();
    const fg = this.fb.group({
      title: [groupData.name || ''],
      description: [groupData.description || ''],
    });
    this.fieldGroups.push(fg);
  }

  deleteGroup(): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete this group? It will delete the rendered form fields as well.'
    );
    if (confirmDelete) {
      this.storageService.deleteSelectedFieldGroup();
      this.selectedGroup = null;
      this.form.reset();
      this.renderedFields = [];
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDropNative(event: DragEvent): void {
    event.preventDefault();
    this.isLoading = true;

    // Get the dropped data (if any) from text/plain.
    const data = event.dataTransfer?.getData('text/plain');
    let droppedField: any = {};

    if (data && data.trim().length > 0) {
      try {
        droppedField = JSON.parse(data);
      } catch (error) {
        console.error('Error parsing drop data:', error);
        // Use an empty object so that defaults are applied.
        droppedField = {};
      }
    }
    // Always create a new field using dropped values (or defaults)
    const newField = {
      id: Date.now().toString(),
      label: droppedField.label || 'Untitled',
      type: droppedField.type || 'text',
      options: droppedField.options || [],
      placeholder: droppedField.placeholder || '',
      value: droppedField.value || '',
    };

    // Simulate processing delay (the loader will display)
    setTimeout(() => {
      this.renderedFields.push(newField);
      this.isLoading = false;
    }, 1000);
  }

  // 🟦 Header section controls

  enterEditMode(): void {
    this.isEditMode = true;
  }

  cancelEdit(): void {
    if (this.selectedGroup) {
      this.fieldGroups.at(0).patchValue({
        title: this.selectedGroup.name,
        description: this.selectedGroup.description,
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
    this.isHeaderSaved = true;
  }

  copyGroup(): void {
    this.storageService.copySelectedFieldGroup();
  }

  // 🔧 Form Field Controls

  copyField(field: any): void {
    const clonedField = { ...field, id: Date.now().toString() };
    this.renderedFields.push(clonedField);
  }

  deleteField(fieldId: string): void {
    this.renderedFields = this.renderedFields.filter(
      (field) => field.id !== fieldId
    );
  }

  editField(field: any): void {
    this.selectedRenderedField = field;
    this.isRightDrawerOpen = true;
  }

  onCloseDrawer(): void {
    this.isRightDrawerOpen = false;
    this.selectedRenderedField = null;
  }

  onFieldUpdated(updatedField: FormElement): void {
    // Find and update the field in the renderedFields array.
    const index = this.renderedFields.findIndex(
      (field) => field.id === updatedField.id
    );
    if (index !== -1) {
      this.renderedFields[index] = updatedField;
      // Optionally update in local storage.
      this.storageService.updateFormField(this.renderedFields);
    }
    this.isRightDrawerSaved = true;

    this.onCloseDrawer();
  }

  clearForm(): void {
    this.fieldGroups.clear();
    this.renderedFields = [];
    this.form.setControl('formFields', this.fb.array([]));
  }

  get isSaveDisabled(): boolean {
    return !(
      this.isHeaderSaved &&
      this.renderedFields.length >= 2 &&
      this.isRightDrawerSaved
    );
  }

  get isPreviewDisabled(): boolean {
    return !this.isFormSaved;
  }

  get isExportDisabled(): boolean {
    return !this.isFormSaved;
  }

  saveForm(): void {
    if (!this.selectedGroup) return;

    const headerData = this.fieldGroups.value;

    const formFieldsData = this.renderedFields;

    const formDataToSave = {
      fieldGroups: headerData,
      formFields: formFieldsData,
    };

    localStorage.setItem('savedForm', JSON.stringify(formDataToSave));

    alert('Form saved successfully in local storage!');
    this.savedFormData = formDataToSave;
    this.isFormSaved = true;
    this.isEditMode = false;
  }

  previewForm(): void {
    if (this.isFormSaved) {
      this.isPreviewOpen = true;
    }
  }

  exportForm(): void {
    const formFieldsArray = this.renderedFields.map((field) => ({
      id: field.id,
      label: field.label,
      type: field.type,
      placeholder: field.placeholder || '',
      options: field.options || [],
      value: field.value || '',
    }));

    const exportData = JSON.stringify(
      {
        fieldGroups: this.fieldGroups.value,
        formFields: formFieldsArray,
      },
      null,
      2
    );

    const blob = new Blob([exportData], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = 'form.json';
    link.href = window.URL.createObjectURL(blob);
    link.click();
  }

  importForm(event: any): void {
    const userConfirmed = window.confirm(
      'Do you want to import a form? This will clear existing data.'
    );

    if (!userConfirmed) return;

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);

        this.clearForm();

        if (data.fieldGroups && data.fieldGroups.length) {
          this.fieldGroups.push(
            this.fb.group({
              title: [data.fieldGroups[0]?.title || 'Untitled Form'],
              description: [
                data.fieldGroups[0]?.description || 'No Description Available',
              ],
            })
          );
        }

        this.renderedFields = data.formFields || [];
        const formFieldsArray = this.renderedFields.map((field) =>
          this.fb.group({
            id: [field.id],
            label: [field.label],
            type: [field.type],
            placeholder: [field.placeholder || ''],
            options: [field.options || []],
            value: [field.value || ''],
          })
        );

        this.form.setControl('formFields', this.fb.array(formFieldsArray));
      } catch (err) {
        alert('Invalid JSON format. Please try again.');
      }
    };

    reader.readAsText(file);
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}
