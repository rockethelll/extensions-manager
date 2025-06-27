import { TestBed } from '@angular/core/testing';

import { ExtensionService } from './extension.service';

describe('Extension', () => {
  let service: ExtensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtensionService);
  });

  it.skip('should be created', () => {
    expect(service).toBeTruthy();
  });
});
