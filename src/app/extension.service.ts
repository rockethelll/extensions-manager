import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Extension } from './extension.model';
import { EXTENSIONS } from './mock-data';

@Injectable({
  providedIn: 'root',
})
export class ExtensionService {
  extensions = signal<Extension[]>(EXTENSIONS);

  getExtensionsSignal() {
    return this.extensions;
  }

  removeExtensionById(id: number) {
    this.extensions.update((ext) => ext.filter((ext) => ext.id !== id));
  }
}
