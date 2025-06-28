import { Component, OnInit, signal, computed } from '@angular/core';
import { Extension } from '../extension.model';
import { ExtensionService } from '../extension.service';
import { Filters } from '../filters/filters';
import { CardItem } from '../card-item/card-item';

@Component({
  selector: 'app-list-extension',
  imports: [Filters, CardItem],
  templateUrl: './list-extension.html',
})
export class ListExtension implements OnInit {
  constructor(private extensionService: ExtensionService) {}

  extensionList = signal<Extension[]>([]);
  selectedFilter = signal('All');

  filteredExtensions = computed(() => {
    const filter = this.selectedFilter();
    const list = this.extensionList();
    if (filter === 'Active') return list.filter((e) => e.isActive);
    if (filter === 'Inactive') return list.filter((e) => !e.isActive);
    return list;
  });

  ngOnInit() {
    this.loadExtensions();
  }

  loadExtensions() {
    this.extensionService.getExtensions().subscribe((data) => {
      this.extensionList.set(data || []);
    });
  }

  onExtensionRemoved(id: number) {
    this.extensionList.set(this.extensionList().filter((ext) => ext.id !== id));
  }

  onFilterChanged(filter: string) {
    this.selectedFilter.set(filter);
  }
}
