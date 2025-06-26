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
    const darkModeToggleButton = screen.getByText('Toggle dark mode');

    // Check initial state: light mode
    expect(fixture.componentInstance.darkModeSignal()).toBe(false);
    expect(screen.getByAltText(/dark/i)).toBeTruthy();

    await user.click(darkModeToggleButton);

    // Check state after toggle: dark mode
    expect(fixture.componentInstance.darkModeSignal()).toBe(true);
    expect(screen.getByAltText(/light/i)).toBeTruthy();
  });
});
