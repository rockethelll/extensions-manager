import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Extension } from './extension.model';
import { EXTENSIONS } from './mock-data';

@Injectable({
  providedIn: 'root',
})
export class ExtensionService {
  private extensions: Extension[] = EXTENSIONS;

  constructor(private http: HttpClient) {}

  getExtensions(): Observable<Extension[]> {
    return of(this.extensions);
  }

  removeExtensionById(id: number) {
    this.extensions = this.extensions.filter((ext) => ext.id !== id);
    return of(this.extensions);
  }
}
