import { Component, Host, h, Prop } from '@stencil/core';

import { defaults } from '../config';

@Component({
  tag: 'calendar-week',
  styleUrl: 'calendar-week.scss',
  scoped: true,
})
export class CanlendarWeek {
  _weekArray: string[] = defaults.WEEKS_FORMAT;
  _displayWeekArray: string[] = this._weekArray;
  _weekStart = 0;
  @Prop()
  color: string = defaults.COLOR;

  @Prop() weekArray:string[];

  @Prop() weekStart:number;

  constructor() { }

  componentDidLoad() {
    if (this.weekArray && this.weekArray.length === 7) {
      this._weekArray = [...this.weekArray];
    }
    if (this.weekStart === 0 || this.weekStart === 1) {
      this._weekStart = this.weekStart;
    }
    this.adjustSort();
  }

  adjustSort(): void {
    if (this._weekStart === 1) {
      const cacheWeekArray = [...this._weekArray];
      cacheWeekArray.push(cacheWeekArray.shift());
      this._displayWeekArray = [...cacheWeekArray];
    } else if (this._weekStart === 0) {
      this._displayWeekArray = [...this._weekArray];
    }
  }

  public render() {
    return (
      <Host>
        <slot>
          <ion-toolbar class={'week-toolbar ' + this.color} no-border-top>
            <ul class={'week-title ' + this.color}>
              {
                this._displayWeekArray.map((w: any) => {
                  return <li>{w}</li>
                })
              }
            </ul>
          </ion-toolbar>
        </slot>
      </Host >
    );
  }
}