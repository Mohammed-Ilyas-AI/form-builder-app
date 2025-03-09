import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-middle-pane',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './middle-pane.component.html',
  styleUrl: './middle-pane.component.css',
})
export class MiddlePaneComponent {
  @Input() selectedGroup: {
    id: number;
    name: string;
    description: string;
  } | null = null;

  editFieldGroup(): void {
    console.log('Edit clicked for:', this.selectedGroup);
  }

  copyFieldGroup(): void {
    console.log('Copy clicked for:', this.selectedGroup);
  }

  deleteFieldGroup(): void {
    console.log('Delete clicked for:', this.selectedGroup);
  }
}
