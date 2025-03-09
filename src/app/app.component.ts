import { Component } from '@angular/core';
import { FieldGroupListComponent } from "./features/field-groups/field-group-list/field-group-list.component";

@Component({
  selector: 'app-root',
  imports: [FieldGroupListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'form-builder-app';
}
