import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldGroupEditorComponent } from './field-group-editor.component';

describe('FieldGroupEditorComponent', () => {
  let component: FieldGroupEditorComponent;
  let fixture: ComponentFixture<FieldGroupEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldGroupEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldGroupEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
