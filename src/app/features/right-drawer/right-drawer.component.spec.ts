import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RightDrawerComponent } from './right-drawer.component';
import { FormElement } from '../../models/form-element';
import { DebugElement } from '@angular/core';

describe('RightDrawerComponent', () => {
  let component: RightDrawerComponent;
  let fixture: ComponentFixture<RightDrawerComponent>;

  // Sample test field with minimal properties.
  const testField: FormElement = {
    id: '1',
    type: 'text',
    label: 'Test Field',
    category: 'general',
    placeholder: 'Enter text',
    options: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RightDrawerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightDrawerComponent);
    component = fixture.componentInstance;

    component.fieldData = testField;

    fixture.detectChanges();
  });

  it('should create the component and patch the form from fieldData', () => {
    expect(component).toBeTruthy();

    expect(component.editForm.get('fieldName')?.value).toBe('Test Field');
    expect(component.editForm.get('placeholder')?.value).toBe('Enter text');

    expect(component.editForm.get('required')?.value).toBe(false);
  });

  it('should add and remove additional properties', () => {
    const initialLength = component.additionalProperties.length;
    component.addProperty();
    fixture.detectChanges();
    expect(component.additionalProperties.length).toBe(initialLength + 1);

    component.removeProperty(0);
    fixture.detectChanges();
    expect(component.additionalProperties.length).toBe(initialLength);
  });

  it('should add and remove validations', () => {
    const initialLength = component.validations.length;
    component.addValidation();
    fixture.detectChanges();
    expect(component.validations.length).toBe(initialLength + 1);

    component.removeValidation(0);
    fixture.detectChanges();
    expect(component.validations.length).toBe(initialLength);
  });

  it('should emit updated field with an asterisk appended when required is true on save', () => {
    component.editForm.patchValue({
      fieldName: 'Email',
      required: true,
      description: 'User email field',
      placeholder: 'Enter your email'
    });

    component.addValidation();
    const validationGroup = component.validations.at(0);
    validationGroup.patchValue({ name: 'maxLength', value: '10' });

    spyOn(component.saveField, 'emit');

    component.onSave();
    fixture.detectChanges();

    expect(component.saveField.emit).toHaveBeenCalled();
    const emittedField: FormElement & { required?: boolean; description?: string; additionalProperties?: any[]; validations?: any[] } = (component.saveField.emit as jasmine.Spy).calls.mostRecent().args[0];

    expect(emittedField.label).toBe('Email *');
    expect(emittedField.placeholder).toBe('Enter your email');
    expect(emittedField.description).toBe('User email field');
    expect(emittedField.required).toBe(true);
    expect(emittedField.validations?.length).toBe(1);
    expect(emittedField.validations![0].name).toBe('maxLength');
    expect(emittedField.validations![0].value).toBe('10');
  });

  it('should slide out and then emit closeDrawer when close() is called', fakeAsync(() => {
    spyOn(component.closeDrawer, 'emit');

    expect(component.drawerOpen).toBe(true);

    component.close();
    fixture.detectChanges();

    expect(component.drawerOpen).toBe(false);

    tick(300);
    expect(component.closeDrawer.emit).toHaveBeenCalled();
  }));

  it('should have correct CSS classes based on drawerOpen state', () => {
    const drawerDe: DebugElement = fixture.debugElement.query(By.css('.right-drawer'));

    expect(drawerDe.nativeElement.classList).toContain('open');

    component.drawerOpen = false;
    fixture.detectChanges();
    expect(drawerDe.nativeElement.classList).toContain('closed');
  });
});
