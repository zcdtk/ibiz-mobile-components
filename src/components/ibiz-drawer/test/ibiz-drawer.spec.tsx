import { newSpecPage } from '@stencil/core/testing';
import { IbizDrawer } from './ibiz-drawer';

describe('ibiz-drawer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IbizDrawer],
      html: `<ibiz-drawer></ibiz-drawer>`,
    });
    expect(page.root).toEqualHtml(`
      <ibiz-drawer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ibiz-drawer>
    `);
  });
});
