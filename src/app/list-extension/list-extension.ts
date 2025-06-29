import { Component, OnInit } from '@angular/core';
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

  extensionList: Extension[] = [];
  selectedFilter: string = 'All';

  get filteredExtensions(): Extension[] {
    const filter = this.selectedFilter;
    const list = this.extensionList;
    if (filter === 'Active') return list.filter((e) => e.isActive);
    if (filter === 'Inactive') return list.filter((e) => !e.isActive);
    return list;
  }

  ngOnInit() {
    this.loadExtensions();
  }

  loadExtensions() {
    this.extensionService.getExtensions().subscribe((data) => {
      this.extensionList = data || [];
    });
  }

  onExtensionRemoved(id: number) {
    this.extensionList = this.extensionList.filter((ext) => ext.id !== id);
  }

  onFilterChanged(filter: string) {
    this.selectedFilter = filter;
  }

  deleteExtension(extension: Extension) {
    this.extensionService.removeExtensionById(extension.id).subscribe(() => {
      this.extensionList = this.extensionList.filter(
        (ext) => ext.id !== extension.id
      );
    });
  }

  onDelete = (extension: Extension) => {
    this.deleteExtension(extension);
  };
}
