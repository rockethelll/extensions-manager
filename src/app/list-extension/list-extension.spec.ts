import { ListExtension } from './list-extension';
import { render, screen } from '@testing-library/angular';
import { ExtensionService } from '../extension.service';
import { signal } from '@angular/core';
import { EXTENSIONS } from '../mock-data';

// Helper to create a fresh signal for each test
function createExtensionsSignal(initial = EXTENSIONS) {
  return signal([...initial]);
}

describe('ListExtension', () => {
  let mockExtensionService: any;
  let extensionsSignal: any;

  beforeEach(() => {
    extensionsSignal = createExtensionsSignal();
    mockExtensionService = {
      getExtensionsSignal: jest.fn(() => extensionsSignal),
      removeExtensionById: jest.fn((id: number) => {
        extensionsSignal.update((exts: any[]) =>
          exts.filter((e) => e.id !== id)
        );
      }),
    };
  });

  it('should render the list extension component and call getExtensionsSignal', async () => {
    await render(ListExtension, {
      providers: [
        { provide: ExtensionService, useValue: mockExtensionService },
      ],
    });
    expect(mockExtensionService.getExtensionsSignal).toHaveBeenCalled();
    // Check that at least one extension is rendered
    expect(screen.getByText(EXTENSIONS[0].name)).toBeTruthy();
  });

  it('should remove an extension from the list when removeExtensionById is called', async () => {
    await render(ListExtension, {
      providers: [
        { provide: ExtensionService, useValue: mockExtensionService },
      ],
    });
    // Remove the first extension
    mockExtensionService.removeExtensionById(EXTENSIONS[0].id);
    // The removed extension should not be in the list
    expect(
      extensionsSignal().find((e: any) => e.id === EXTENSIONS[0].id)
    ).toBeUndefined();
  });

  it('should update selectedFilter and filter extensions when onFilterChanged is called', async () => {
    const { fixture } = await render(ListExtension, {
      providers: [
        { provide: ExtensionService, useValue: mockExtensionService },
      ],
    });
    // Set filter to 'Active'
    fixture.componentInstance.onFilterChanged('Active');
    fixture.detectChanges();
    const activeExtensions = EXTENSIONS.filter((e) => e.isActive);
    expect(fixture.componentInstance.selectedFilter).toBe('Active');
    expect(fixture.componentInstance.filteredExtensions).toEqual(
      activeExtensions
    );

    // Set filter to 'Inactive'
    fixture.componentInstance.onFilterChanged('Inactive');
    fixture.detectChanges();
    const inactiveExtensions = EXTENSIONS.filter((e) => !e.isActive);
    expect(fixture.componentInstance.selectedFilter).toBe('Inactive');
    expect(fixture.componentInstance.filteredExtensions).toEqual(
      inactiveExtensions
    );

    // Set filter to 'All'
    fixture.componentInstance.onFilterChanged('All');
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedFilter).toBe('All');
    expect(fixture.componentInstance.filteredExtensions).toEqual(EXTENSIONS);
  });
});
