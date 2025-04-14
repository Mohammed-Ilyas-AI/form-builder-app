import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormControlOptions, ValidatorFn, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-renderer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css'],
})
export class FormRendererComponent implements OnInit, OnChanges {
  @Input() field!: any;
  @Output() editField = new EventEmitter<any>();
  @Output() copyField = new EventEmitter<any>();
  @Output() deleteField = new EventEmitter<string>();

  control: FormControl = new FormControl('');

  defaultValue: string = '';
  helperText: string = '';
  cssClass: string = '';
  tooltip: string = '';

  minLength: number | null = null;
  maxLength: number | null = null;

  checkboxValues: any[] = [];

  ngOnInit(): void {
    this.initializeControl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['field'] && !changes['field'].firstChange) {
      this.initializeControl();
    }
  }

  private initializeControl(): void {
    let value = '';
    this.helperText = '';
    this.cssClass = '';
    this.tooltip = '';
    this.minLength = null;
    this.maxLength = null;

    const validatorsArray: FormControlOptions | ValidatorFn | ValidatorFn[] | null | undefined = [];

    if (this.field && Array.isArray(this.field.additionalProperties)) {
      this.field.additionalProperties.forEach((prop: any) => {
        const key = (prop.name || '').toLowerCase();
        const propValue = prop.value;
        if (key === 'defaultvalue') {
          value = propValue;
        }
        if (key === 'helpertext') {
          this.helperText = propValue;
        }
        if (key === 'cssclass') {
          this.cssClass = propValue;
        }
        if (key === 'tooltip') {
          this.tooltip = propValue;
        }
      });
    }

    if (this.field && Array.isArray(this.field.validations)) {
      this.field.validations.forEach((rule: any) => {
        const ruleName = (rule.name || '').toLowerCase();
        const ruleValue = rule.value;
        if (ruleName === 'minlength') {
          const minVal = Number(ruleValue);
          validatorsArray.push(Validators.minLength(minVal));
          this.minLength = minVal;
        }
        if (ruleName === 'maxlength') {
          const maxVal = Number(ruleValue);
          validatorsArray.push(Validators.maxLength(maxVal));
          this.maxLength = maxVal;
        }
        if (ruleName === 'email') {
          // Treat value as truthy (e.g.: true or "true")
          if (ruleValue === true || ruleValue === 'true') {
            validatorsArray.push(Validators.email);
          }
        }
        if (ruleName === 'pattern') {
          validatorsArray.push(Validators.pattern(ruleValue));
        }
      });
    }

    this.control = new FormControl(value, validatorsArray);
  }

  onRadioChange(option: any): void {
    this.control.setValue(option);
  }

  onCheckboxChange(event: any, option: any): void {
    if (event.target.checked) {
      this.checkboxValues.push(option);
    } else {
      const index = this.checkboxValues.indexOf(option);
      if (index >= 0) {
        this.checkboxValues.splice(index, 1);
      }
    }
    this.control.setValue(this.checkboxValues);
  }

  onEdit(): void {
    this.editField.emit(this.field);
  }

  onCopy(): void {
    this.copyField.emit(this.field);
  }

  onDelete(): void {
    this.deleteField.emit(this.field.id);
  }
}
