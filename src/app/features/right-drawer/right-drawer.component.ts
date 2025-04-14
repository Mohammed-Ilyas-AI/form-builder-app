import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormElement } from '../../models/form-element';
import { CommonModule } from '@angular/common';
import {
  FieldPropertyService,
  FieldProperty,
} from '../../services/field-properties/field-properties.service';

@Component({
  selector: 'app-right-drawer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './right-drawer.component.html',
  styleUrls: ['./right-drawer.component.css'],
})
export class RightDrawerComponent implements OnInit {
  @Input() fieldData: FormElement | null = null;
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() saveField = new EventEmitter<FormElement>();

  editForm: FormGroup;

  drawerOpen: boolean = true;

  validationOptions: FieldProperty[] = [];
  generalOptions: FieldProperty[] = [];

  constructor(
    private fb: FormBuilder,
    private fieldPropertyService: FieldPropertyService
  ) {
    this.editForm = this.fb.group({
      fieldName: ['', Validators.required],
      description: [''],
      placeholder: [''],
      required: [false],
      additionalProperties: this.fb.array([]),
      validations: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.fieldPropertyService.config$.subscribe(config => {
      if (config && config.length) {
        const generalCategory = config.find(cat => cat.category.toLowerCase() === 'general');
        const validationCategory = config.find(cat => cat.category.toLowerCase() === 'validation');
        this.generalOptions = generalCategory ? generalCategory.properties : [];
        this.validationOptions = validationCategory ? validationCategory.properties : [];
      }
    });

    if (this.fieldData) {
      let currentName = this.fieldData.label.trim();
      if (currentName.endsWith('*')) {
        currentName = currentName.slice(0, -1).trim();
      }
      this.editForm.patchValue({
        fieldName: currentName,
        description: (this.fieldData as any).description || '',
        placeholder: this.fieldData.placeholder || '',
        required: (this.fieldData as any).required || false,
      });

      if (
        (this.fieldData as any).additionalProperties &&
        Array.isArray((this.fieldData as any).additionalProperties)
      ) {
        const props = (this.fieldData as any).additionalProperties;
        props.forEach((prop: any) => {
          this.additionalProperties.push(
            this.fb.group({
              key: [prop.name, Validators.required],
              value: [prop.value],
            })
          );
        });
      }

      if (
        (this.fieldData as any).validations &&
        Array.isArray((this.fieldData as any).validations)
      ) {
        const vals = (this.fieldData as any).validations;
        vals.forEach((val: any) => {
          this.validations.push(
            this.fb.group({
              name: [val.name, Validators.required],
              value: [val.value, Validators.required],
            })
          );
        });
      }
    }

    if (
      (this.fieldData as any).validations &&
      Array.isArray((this.fieldData as any).validations)
    ) {
      const vals = (this.fieldData as any).validations;
      vals.forEach((val: any) => {
        this.validations.push(
          this.fb.group({
            name: [val.name, Validators.required],
            value: [val.value, Validators.required],
          })
        );
      });
    }
  }

  get additionalProperties(): FormArray {
    return this.editForm.get('additionalProperties') as FormArray;
  }

  get validations(): FormArray {
    return this.editForm.get('validations') as FormArray;
  }

  addProperty(): void {
    this.additionalProperties.push(
      this.fb.group({
        key: [
          this.generalOptions.length ? this.generalOptions[0].id : '',
          Validators.required,
        ],
        value: [''],
      })
    );
  }

  removeProperty(index: number): void {
    this.additionalProperties.removeAt(index);
  }

  addValidation(): void {
    this.validations.push(
      this.fb.group({
        name: [
          this.validationOptions.length ? this.validationOptions[0].id : '',
          Validators.required,
        ],
        value: ['', Validators.required],
      })
    );
  }

  removeValidation(index: number): void {
    this.validations.removeAt(index);
  }

  onSave(): void {
    if (!this.fieldData) {
      return;
    }

    const formValues = this.editForm.value;
    const updatedLabel =
      formValues.fieldName + (formValues.required ? ' *' : '');
    const updatedField: FormElement & {
      description?: string;
      required?: boolean;
      additionalProperties?: any[];
      validations?: { id: string; name: string; value: any }[];
    } = {
      ...this.fieldData,
      label: updatedLabel,
      placeholder: formValues.placeholder,
      description: formValues.description,
      required: formValues.required,
      additionalProperties: formValues.additionalProperties.map(
        (prop: any) => ({
          id: this.fieldData!.id + '-' + prop.key,
          name: prop.key,
          value: prop.value,
        })
      ),
      validations: formValues.validations.map((val: any) => ({
        id: this.fieldData!.id + '-' + val.name,
        name: val.name,
        value: val.value,
      })),
    };

    this.saveField.emit(updatedField);
    this.close();
  }

  close(): void {
    this.drawerOpen = false;
    setTimeout(() => {
      this.closeDrawer.emit();
    }, 300);
  }
}
