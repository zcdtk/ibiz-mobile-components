import { Component, Host, h, VNode } from '@stencil/core';

@Component({
    tag: 'ibiz-mobile-calendar',
    styleUrl: 'ibiz-mobile-calendar.scss',
    scoped: true,
})
export class IbizMobileCalendar {

    /**
     * 绘制内容
     *
     * @returns {VNode}
     * @memberof IbizMobileCalendar
     */
    public render(): VNode {
        return (
            <Host>
                <div>这个是日历组件</div>
            </Host>
        );
    }

}
