import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() modalTitle: string = '';
  @Input() fieldGroupName: string = '';
  @Input() fieldGroupDescription: string = '';
  @Output() confirmAction: EventEmitter<{ name: string; description: string }> = new EventEmitter();
  @Input() confirmButtonText: string = 'OK';
  @Input() isConfirmOnly: boolean = false; // When true, show confirmation message only
  @Output() cancelAction: EventEmitter<void> = new EventEmitter<void>();

    // For confirm-only mode, we use modalMessage (optional)
    @Input() modalMessage: string = '';

  // Confirm the action and pass data to the parent
  confirmModal(): void {
    this.confirmAction.emit({
      name: this.fieldGroupName,
      description: this.fieldGroupDescription,
    });
  }

  // Cancel the modal
  cancelModal(): void {
    this.cancelAction.emit();
  }
}
