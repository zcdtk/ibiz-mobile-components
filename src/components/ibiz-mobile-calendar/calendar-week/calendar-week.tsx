import { Component, Host, h, VNode } from '@stencil/core';

@Component({
    tag: 'calendar-week',
    styleUrl: 'calendar-week.scss',
    scoped: true,
})
export class CanlendarWeek {

    /**
     * 绘制内容
     *
     * @returns {VNode}
     * @memberof CanlendarWeek
     */
    public render(): VNode {
        return (
            <Host>
                <div>这个是日历周组件</div>
            </Host >
        );
    }
}