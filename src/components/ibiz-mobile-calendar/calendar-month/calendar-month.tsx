import { Component, Host, h, VNode } from '@stencil/core';

@Component({
    tag: 'calendar-month',
    styleUrl: 'calendar-month.scss',
    scoped: true,
})
export class CanlendarMonth {


    /**
     * 绘制内容
     *
     * @returns {VNode}
     * @memberof CanlendarMonth
     */
    public render(): VNode {
        return (
            <Host>
                <div>这是日历月组件</div>
            </Host >
        );
    }
}