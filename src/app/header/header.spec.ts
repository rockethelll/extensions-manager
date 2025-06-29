import { Header } from './header';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

describe('Header', () => {
  it('should render the header component', async () => {
    await render(Header);
    expect(screen.getByText('Extensions')).toBeTruthy();
  });

  it('should render the header component with the correct title', async () => {
    await render(Header);
    expect(screen.getByText('Extensions')).toBeTruthy();
  });
  it('should render the dark mode toggle button', async () => {
    await render(Header);
    expect(screen.getByText('Toggle dark mode')).toBeTruthy();
  });

  it('should toggle the dark mode when the dark mode toggle button is clicked', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(Header);
    const darkModeToggleButton = screen.getByRole('button', {
      name: /toggle dark mode/i,
    });

    // Check initial state: light mode
    expect(fixture.componentInstance.isDarkMode).toBe(false);
    expect(screen.getByAltText(/switch to dark mode/i)).toBeTruthy();

    await user.click(darkModeToggleButton);
    fixture.detectChanges();
    await fixture.whenStable();

    // Check state after toggle: dark mode
    expect(fixture.componentInstance.isDarkMode).toBe(true);
    expect(screen.getByAltText(/switch to light mode/i)).toBeTruthy();
  });
});
