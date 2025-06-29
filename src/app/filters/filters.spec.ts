import { render, screen } from '@testing-library/angular';
import { Filters } from './filters';
import userEvent from '@testing-library/user-event';

describe('Filters', () => {
  it('should render the filters component', async () => {
    await render(Filters);
    expect(screen.getByText('Extensions List')).toBeTruthy();
  });

  it('should render the 3 buttons', async () => {
    await render(Filters);
    expect(screen.getAllByRole('button').length).toBe(3);
    expect(screen.getByText('All')).toBeTruthy();
    expect(screen.getByText('Active')).toBeTruthy();
    expect(screen.getByText('Inactive')).toBeTruthy();
  });

  it('should toggle the selected filter when a button is clicked', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(Filters);
    const allButton = screen.getByText('All');
    const activeButton = screen.getByText('Active');
    const inactiveButton = screen.getByText('Inactive');

    expect(fixture.componentInstance.selectedFilter).toBe('All');

    await user.click(activeButton);

    expect(fixture.componentInstance.selectedFilter).toBe('Active');

    await user.click(inactiveButton);

    expect(fixture.componentInstance.selectedFilter).toBe('Inactive');

    await user.click(allButton);

    expect(fixture.componentInstance.selectedFilter).toBe('All');
  });
});
