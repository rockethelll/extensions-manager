import { Header } from './header';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

describe('Header', () => {
  beforeEach(async () => {
    await render(Header);
  });
  it('should render the header component', async () => {
    expect(screen.getByText('Extensions')).toBeTruthy();
  });

  it('should render the header component with the correct title', async () => {
    expect(screen.getByText('Extensions')).toBeTruthy();
  });
  it('should render the dark mode toggle button', async () => {
    expect(screen.getByText('Toggle dark mode')).toBeTruthy();
  });

  it('should toggle the dark mode when the dark mode toggle button is clicked', async () => {
    const user = userEvent.setup();
    const darkModeToggleButton = screen.getByText('Toggle dark mode');
    let body = document.body;

    expect(screen.getByAltText('Dark mode')).toBeTruthy();
    expect(body.classList.contains('dark')).toBe(false);

    await user.click(darkModeToggleButton);

    expect(screen.getByAltText('Light mode')).toBeTruthy();
    expect(body.classList.contains('dark')).toBe(true);
  });
});
