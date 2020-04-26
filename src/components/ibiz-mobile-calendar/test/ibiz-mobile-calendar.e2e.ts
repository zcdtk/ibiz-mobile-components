import { newE2EPage } from '@stencil/core/testing';

describe('ibiz-mobile-calendar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ibiz-mobile-calendar></ibiz-mobile-calendar>');

    const element = await page.find('ibiz-mobile-calendar');
    expect(element).toHaveClass('hydrated');
  });
});
