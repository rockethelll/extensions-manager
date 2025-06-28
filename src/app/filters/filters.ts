import { Component, signal, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-filters',
  imports: [NgClass],
  templateUrl: './filters.html',
  standalone: true,
})
export class Filters {
  filters = ['All', 'Active', 'Inactive'];
  selectedFilter = signal('All');

  @Output() filterChanged = new EventEmitter<string>();

  selectFilter(filter: string) {
    this.selectedFilter.set(filter);
    this.filterChanged.emit(filter);
  }
}
