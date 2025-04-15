import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RightPaneComponent } from './right-pane.component';
import { FormElementService, FormCategory } from '../../services/form-element/form-element.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('RightPaneComponent', () => {
  let component: RightPaneComponent;
  let fixture: ComponentFixture<RightPaneComponent>;
  let mockService: jasmine.SpyObj<FormElementService>;

  const mockCategories: FormCategory[] = [
    {
      category: 'Input',
      fields: [{ id: '1', category: 'Input', label: 'Text Field', type: 'text', icon: 'fas fa-font' }]
    },
    {
      category: 'Selection',
      fields: [{ id: '2', category: 'Selection', label: 'Checkbox', type: 'checkbox', icon: 'fas fa-check-square' }]
    }
  ];

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('FormElementService', ['filterCategories'], {
      categories$: of(mockCategories),
    });

    await TestBed.configureTestingModule({
      imports: [RightPaneComponent, CommonModule, FormsModule, DragDropModule],
      providers: [{ provide: FormElementService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(RightPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch categories from service on init', () => {
    expect(component.categories.length).toBe(2);
  });

  it('should filter categories based on search query', () => {
    component.searchQuery = 'Text';
    fixture.detectChanges();
    const result = component.filteredCategories;
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].fields[0].label).toContain('Text');
  });

  it('should set drag data on dragstart', () => {
    const event = jasmine.createSpyObj('DragEvent', ['dataTransfer']);
    event.dataTransfer = new DataTransfer();

    const element = { label: 'Text Field', type: 'text', icon: 'fas fa-font' };
    component.onDragStart(event as DragEvent, element);

    expect(event.dataTransfer.getData('text/plain')).toBe(JSON.stringify(element));
  });
});
