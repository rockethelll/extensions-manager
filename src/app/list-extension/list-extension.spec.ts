import { ListExtension } from './list-extension';
import { render, screen } from '@testing-library/angular';
import { ExtensionService } from '../extension.service';
import { of } from 'rxjs';
import { EXTENSIONS } from '../mock-data';

describe('ListExtension', () => {
  let mockExtensionService: any;

  beforeEach(() => {
    mockExtensionService = {
      getExtensions: jest.fn(() => of(EXTENSIONS)),
    };
  });

  it('should render the list extension component and call loadExtensions', async () => {
    await render(ListExtension, {
      providers: [
        { provide: ExtensionService, useValue: mockExtensionService },
      ],
    });
    expect(mockExtensionService.getExtensions).toHaveBeenCalled();
    // Check that at least one extension is rendered
    expect(screen.getByText(EXTENSIONS[0].name)).toBeTruthy();
  });

  it('should remove an extension from the list when onExtensionRemoved is called', async () => {
    const { fixture } = await render(ListExtension, {
      providers: [
        { provide: ExtensionService, useValue: mockExtensionService },
      ],
    });
    // Set initial list
    fixture.componentInstance.extensionList.set(EXTENSIONS);
    fixture.detectChanges();
    // Remove the first extension
    fixture.componentInstance.onExtensionRemoved(EXTENSIONS[0].id);
    fixture.detectChanges();
    // The removed extension should not be in the list
    expect(
      fixture.componentInstance
        .extensionList()
        .find((e) => e.id === EXTENSIONS[0].id)
    ).toBeUndefined();
  });
});
