import { Component } from '@angular/core';
import { Extension } from '../extension.model';
import { ExtensionService } from '../extension.service';
import { Filters } from '../filters/filters';
import { CardItem } from '../card-item/card-item';

@Component({
  selector: 'app-list-extension',
  imports: [Filters, CardItem],
  templateUrl: './list-extension.html',
})
export class ListExtension {
  constructor(private extensionService: ExtensionService) {}

  selectedFilter: string = 'All';

  get extensionList() {
    return this.extensionService.getExtensionsSignal();
  }

  get filteredExtensions(): Extension[] {
    const filter = this.selectedFilter;
    const list = this.extensionList();
    if (filter === 'Active') return list.filter((e) => e.isActive);
    if (filter === 'Inactive') return list.filter((e) => !e.isActive);
    return list;
  }

  onFilterChanged(filter: string) {
    this.selectedFilter = filter;
  }
}
