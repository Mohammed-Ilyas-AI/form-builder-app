import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPreviewComponent } from './form-preview.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormPreviewComponent', () => {
  let component: FormPreviewComponent;
  let fixture: ComponentFixture<FormPreviewComponent>;
  let debugElement: DebugElement;

  const mockHeaderData = { title: 'Preview Title', description: 'Preview Description' };
  const mockFields = [
    { id: 'f1', label: 'Field 1', type: 'text', placeholder: 'Enter text' },
    { id: 'f2', label: 'Field 2', type: 'date', placeholder: 'Select a date' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPreviewComponent, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPreviewComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    component.headerData = mockHeaderData;
    component.fields = mockFields;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the header title and description', () => {
    fixture.detectChanges(); // Ensure the component renders input

    const titleElement = debugElement.query(By.css('h2'));
    const descriptionElement = debugElement.query(By.css('p'));

    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent.trim()).toBe(mockHeaderData.title);

    expect(descriptionElement).toBeTruthy();
    expect(descriptionElement.nativeElement.textContent.trim()).toBe(mockHeaderData.description);
  });

  it('should render all form fields', () => {
    fixture.detectChanges();

    const fieldElements = debugElement.queryAll(By.css('app-form-renderer'));
    expect(fieldElements.length).toBe(mockFields.length);

    fieldElements.forEach((fieldElement, index) => {
      const fieldComponent = fieldElement.componentInstance;
      expect(fieldComponent.field).toBe(mockFields[index]);
    });
  });

  it('should emit closePreview event when close button is clicked', () => {
    spyOn(component.closePreview, 'emit');

    const closeButton = debugElement.query(By.css('.close-button'));
    expect(closeButton).toBeTruthy(); // Verify button exists
    closeButton.nativeElement.dispatchEvent(new Event('click')); // Simulate click
    fixture.detectChanges(); // Process event changes

    expect(component.closePreview.emit).toHaveBeenCalled();
  });
});
