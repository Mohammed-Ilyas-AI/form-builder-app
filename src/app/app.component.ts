import { Component } from '@angular/core';
import { FieldGroupListComponent } from "./features/field-groups/field-group-list/field-group-list.component";
import { MiddlePaneComponent } from "./features/form-builder/middle-pane/middle-pane.component";
import { FieldGroup } from './models/field-group.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FieldGroupListComponent, MiddlePaneComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'form-builder-app';

  selectedFieldGroup: FieldGroup | null = null;

  onFieldGroupSelected(group: FieldGroup) {
    this.selectedFieldGroup = group;
  }
}
