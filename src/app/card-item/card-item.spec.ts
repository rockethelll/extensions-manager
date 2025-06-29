import { CardItem } from './card-item';
import { render, screen } from '@testing-library/angular';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Extension } from '../extension.model';
import { ExtensionService } from '../extension.service';
import userEvent from '@testing-library/user-event';
import { of } from 'rxjs';

describe('CardItem', () => {
  const mockExtension: Extension = {
    id: 1,
    logo: 'https://test.com',
    name: 'Test Extension',
    description: 'Test Description',
    isActive: true,
  };

  const mockExtensionService = {
    removeExtensionById: jest.fn(() => of({})),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create the card item component', async () => {
    await render(CardItem, {
      providers: [
        provideHttpClientTesting(),
        { provide: ExtensionService, useValue: mockExtensionService },
      ],
      componentProperties: { extension: mockExtension },
    });
    expect(screen.getByText('Test Extension')).toBeTruthy();
    expect(screen.getByText('Test Description')).toBeTruthy();
    expect(screen.getByAltText('Test Extension')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Remove' })).toBeTruthy();
    expect(screen.getByRole('switch', { checked: true })).toBeTruthy();
  });

  it('should remove the extension when the remove button is clicked', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(CardItem, {
      providers: [
        provideHttpClientTesting(),
        { provide: ExtensionService, useValue: mockExtensionService },
      ],
      componentProperties: { extension: mockExtension },
    });
    const extensionRemovedSpy = jest.fn();
    fixture.componentInstance.onDelete = extensionRemovedSpy;

    const removeButton = screen.getByRole('button', { name: 'Remove' });
    await user.click(removeButton);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(extensionRemovedSpy).toHaveBeenCalledWith(mockExtension);
  });

  it('should toggle the extension when the switch is clicked', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(CardItem, {
      providers: [
        provideHttpClientTesting(),
        { provide: ExtensionService, useValue: mockExtensionService },
      ],
      componentProperties: { extension: mockExtension },
    });

    const switchButton = screen.getByRole('switch');
    // Initial state should be true
    expect(fixture.componentInstance.isActive).toBe(true);
    expect(fixture.componentInstance.extension.isActive).toBe(true);

    await user.click(switchButton);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.componentInstance.isActive).toBe(false);
    expect(fixture.componentInstance.extension.isActive).toBe(false);
  });
});
