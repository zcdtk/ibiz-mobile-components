import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ibiz-mobile-calendar',
  styleUrl: 'ibiz-mobile-calendar.scss',
})
export class IbizMobileCalendar {

  render() {
    return (
      <Host>
        <slot>ibiz-mobile-calendar</slot>
      </Host>
    );
  }

}
