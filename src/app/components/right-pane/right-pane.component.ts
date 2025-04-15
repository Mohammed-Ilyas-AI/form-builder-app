import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormCategory, FormElementService } from '../../services/form-element/form-element.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-right-pane',
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './right-pane.component.html',
  styleUrls: ['./right-pane.component.css']
})
export class RightPaneComponent implements OnInit{
  searchQuery: string = '';
  categories: FormCategory[] = [];

  constructor(private formElementService: FormElementService) {}

  ngOnInit(): void {
    this.formElementService.categories$.subscribe(data => {
      this.categories = data;
    });
  }

  get filteredCategories(): FormCategory[] {
    return this.formElementService.filterCategories(this.searchQuery);
  }

  onDragStart(event: DragEvent, element: any): void {
    event.dataTransfer?.setData("text/plain", JSON.stringify(element));
  }

}
