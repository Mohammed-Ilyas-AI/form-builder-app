import { Component } from '@angular/core';
import { FieldGroupListComponent } from "./features/field-groups/field-group-list/field-group-list.component";
import { MiddlePaneComponent } from "./features/form-builder/middle-pane/middle-pane.component";

@Component({
  selector: 'app-root',
  imports: [FieldGroupListComponent, MiddlePaneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'form-builder-app';

  selectedGroup: { id: number; name: string; description: string } | null = null;

  // This method will receive the emitted group from FieldGroupListComponent
  onGroupSelected(group: { id: number; name: string; description: string }): void {
    this.selectedGroup = group;
  }
}
