import { ExtensionService } from './extension.service';
import { EXTENSIONS } from './mock-data';

describe('ExtensionService', () => {
  let service: ExtensionService;

  beforeEach(() => {
    service = new ExtensionService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getExtensionsSignal should return all extensions', async () => {
    const extensions = service.getExtensionsSignal();
    expect(Array.isArray(extensions())).toBe(true);
    expect(extensions()?.length).toBe(EXTENSIONS.length);
    expect(extensions()).toEqual(EXTENSIONS);
  });

  it('removeExtensionById should remove the extension with the given id', () => {
    const removedId = 1;
    service.removeExtensionById(removedId);
    const extensions = service.getExtensionsSignal();
    expect(Array.isArray(extensions())).toBe(true);
    expect(extensions().find((ext) => ext.id === removedId)).toBeUndefined();
    expect(extensions().length).toBe(EXTENSIONS.length - 1);
  });
});
