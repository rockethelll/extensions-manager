import { Component, OnInit, signal } from '@angular/core';
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
}
