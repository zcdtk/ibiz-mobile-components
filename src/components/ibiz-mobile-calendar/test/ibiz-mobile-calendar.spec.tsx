import { newSpecPage } from '@stencil/core/testing';
import { IbizMobileCalendar } from '../ibiz-mobile-calendar';

describe('ibiz-mobile-calendar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IbizMobileCalendar],
      html: `<ibiz-mobile-calendar></ibiz-mobile-calendar>`,
    });
    expect(page.root).toEqualHtml(`
      <ibiz-mobile-calendar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ibiz-mobile-calendar>
    `);
  });
});
