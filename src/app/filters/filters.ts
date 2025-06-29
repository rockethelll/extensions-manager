import { Component, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-filters',
  imports: [NgClass],
  templateUrl: './filters.html',
  standalone: true,
})
export class Filters {
  filters = ['All', 'Active', 'Inactive'];
  selectedFilter: string = 'All';

  @Output() filterChanged = new EventEmitter<string>();

  selectFilter(filter: string) {
    this.selectedFilter = filter;
    this.filterChanged.emit(filter);
  }
}
