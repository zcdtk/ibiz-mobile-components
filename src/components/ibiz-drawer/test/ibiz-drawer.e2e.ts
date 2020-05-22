import { newE2EPage } from '@stencil/core/testing';

describe('ibiz-drawer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ibiz-drawer></ibiz-drawer>');

    const element = await page.find('ibiz-drawer');
    expect(element).toHaveClass('hydrated');
  });
});
