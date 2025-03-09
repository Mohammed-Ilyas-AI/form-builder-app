import { Component } from '@angular/core';
import { FieldGroupListComponent } from "./features/field-groups/field-group-list/field-group-list.component";
import { MiddlePaneComponent } from "./features/form-builder/middle-pane/middle-pane.component";
import { FieldGroup } from './models/field-group.model';
import { CommonModule } from '@angular/common';
import { ElementListComponent } from "./features/form-elements/element-list/element-list.component";
import { RightDrawerComponent } from "./features/form-builder/right-drawer/right-drawer.component";
import { FormElement } from './models/form-element.model';

@Component({
  selector: 'app-root',
  imports: [FieldGroupListComponent, MiddlePaneComponent, CommonModule, ElementListComponent, RightDrawerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'form-builder-app';

  selectedFieldGroup: FieldGroup | null = null;
  selectedFormElement: FormElement | null = null;

  onFieldGroupSelected(group: FieldGroup) {
    this.selectedFieldGroup = group;
  }
}
