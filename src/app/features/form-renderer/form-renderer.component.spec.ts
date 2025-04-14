import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRendererComponent } from './form-renderer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FormRendererComponent', () => {
  let component: FormRendererComponent;
  let fixture: ComponentFixture<FormRendererComponent>;

  // Create a mock field that simulates a text field with additional properties and validations.
  const mockField = {
    id: '1',
    label: 'Test Field',
    type: 'text',
    placeholder: 'Enter text',
    additionalProperties: [
      { id: 'defaultValue', name: 'defaultValue', value: 'mohammed' },
      { id: 'helperText', name: 'helperText', value: 'Minimum length is 6' },
      { id: 'cssClass', name: 'cssClass', value: 'custom-class' },
      { id: 'tooltip', name: 'tooltip', value: 'Enter your name' }
    ],
    validations: [
      { id: 'minLength', name: 'minLength', value: '6' },
      { id: 'maxLength', name: 'maxLength', value: '10' }
    ],
    options: [] // For text fields, options are not used.
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRendererComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormRendererComponent);
    component = fixture.componentInstance;
    // Set the input field for the component.
    component.field = mockField;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the FormControl with the default value from additional properties', () => {
    expect(component.control.value).toBe('mohammed');
  });

  it('should apply minLength and maxLength validators', () => {
    // Set a value that is too short.
    component.control.setValue('abc');
    fixture.detectChanges();
    expect(component.control.errors).toBeTruthy();
    expect(component.control.errors?.['minlength']).toBeTruthy();

    // Set a value that is too long.
    component.control.setValue('abcdefghijk'); // 11 characters; maxLength is 10.
    fixture.detectChanges();
    expect(component.control.errors).toBeTruthy();
    expect(component.control.errors?.['maxlength']).toBeTruthy();

    // Set a valid value.
    component.control.setValue('abcdef'); // 6 characters, valid.
    fixture.detectChanges();
    expect(component.control.errors).toBeNull();
  });

  it('should display helper text from additional properties', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Look for the helper text element.
    const helperEl = compiled.querySelector('div.text-gray-500');
    expect(helperEl).toBeTruthy();
    expect(helperEl?.textContent).toContain('Minimum length is 6');
  });

  it('should apply custom cssClass and tooltip from additional properties', () => {
    fixture.detectChanges();
    // Check that the input element has the custom CSS class.
    const inputElem = fixture.debugElement.query(By.css('input'));
    expect(inputElem.nativeElement.classList).toContain('custom-class');

    // Check that the container div receives the tooltip as its title attribute.
    const containerDiv = fixture.debugElement.query(By.css('div[title]'));
    expect(containerDiv.nativeElement.getAttribute('title')).toBe('Enter your name');
  });
});
