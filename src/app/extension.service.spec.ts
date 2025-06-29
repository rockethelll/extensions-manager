import { ExtensionService } from './extension.service';
import { EXTENSIONS } from './mock-data';
import { firstValueFrom } from 'rxjs';

describe('ExtensionService', () => {
  let service: ExtensionService;

  beforeEach(() => {
    service = new ExtensionService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getExtensions should return all extensions', async () => {
    const extensions = await firstValueFrom(service.getExtensions());
    expect(Array.isArray(extensions)).toBe(true);
    expect(extensions?.length).toBe(EXTENSIONS.length);
    expect(extensions).toEqual(EXTENSIONS);
  });

  it('removeExtensionById should remove the extension with the given id', async () => {
    const removedId = 1;
    const extensions = await firstValueFrom(
      service.removeExtensionById(removedId)
    );
    expect(Array.isArray(extensions)).toBe(true);
    expect(extensions?.find((ext) => ext.id === removedId)).toBeUndefined();
    expect(extensions?.length).toBe(EXTENSIONS.length - 1);
  });
});
