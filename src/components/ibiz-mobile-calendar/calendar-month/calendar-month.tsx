import { Component, Host, h, Prop, Event, EventEmitter, Watch } from '@stencil/core';

import { CalendarDay, CalendarMonth, CalendarOriginal } from '../calendar.model';
import { defaults, pickModes } from '../config';

@Component({
  tag: 'calendar-month',
  styleUrl: 'calendar-month.scss',
  scoped: true,
})
export class CanlendarMonth {
  @Prop()
  month: CalendarMonth;
  @Prop()
  pickMode: string;
  @Prop()
  isSaveHistory: boolean;
  @Prop()
  _id: any;
  @Prop()
  readonly = false;
  @Prop()
  color: string = defaults.COLOR;

  @Event()
  change: EventEmitter<CalendarDay[]>;
  @Event()
  select: EventEmitter<CalendarDay>;
  @Event()
  selectStart: EventEmitter<CalendarDay>;
  @Event()
  selectEnd: EventEmitter<CalendarDay>;

  _date: Array<CalendarDay | null> = [null, null];
  _isInit = false;
  _onChanged: Function;
  _onTouched: Function;

  get _isRange(): boolean {
    return this.pickMode === pickModes.RANGE;
  }

  public ref: any = null;

  constructor() { }

  ngAfterViewInit(): void {
    this._isInit = true;
  }

  @Prop() value: CalendarDay[];

  @Watch('value')
  valueWatchValue(newValue: CalendarDay, oldValue: CalendarDay) {
    console.log(oldValue);
    if (Array.isArray(newValue)) {
      this._date = newValue;
    }
  }

  // get value() {
  //   return this._date;
  // }

  // writeValue(obj: any): void {
  //   if (Array.isArray(obj)) {
  //     this._date = obj;
  //   }
  // }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  trackByTime(index: number, item: CalendarOriginal): number {
    return item ? item.time : index;
  }

  isEndSelection(day: CalendarDay): boolean {
    if (!day) return false;
    if (this.pickMode !== pickModes.RANGE || !this._isInit || this._date[1] === null) {
      return false;
    }

    return this._date[1].time === day.time;
  }

  isBetween(day: CalendarDay): boolean {
    if (!day) return false;

    if (this.pickMode !== pickModes.RANGE || !this._isInit) {
      return false;
    }

    if (this._date[0] === null || this._date[1] === null) {
      return false;
    }

    const start = this._date[0].time;
    const end = this._date[1].time;

    return day.time < end && day.time > start;
  }

  isStartSelection(day: CalendarDay): boolean {
    if (!day) return false;
    if (this.pickMode !== pickModes.RANGE || !this._isInit || this._date[0] === null) {
      return false;
    }

    return this._date[0].time === day.time && this._date[1] !== null;
  }

  isSelected(time: number): boolean {
    if (Array.isArray(this._date)) {
      if (this.pickMode !== pickModes.MULTI) {
        if (this._date[0] !== null) {
          return time === this._date[0].time;
        }

        if (this._date[1] !== null) {
          return time === this._date[1].time;
        }
      } else {
        return this._date.findIndex(e => e !== null && e.time === time) !== -1;
      }
    } else {
      return false;
    }
  }

  onSelected(item: CalendarDay): void {
    if (this.readonly) return;
    item.selected = true;
    this.select.emit(item);
    if (this.pickMode === pickModes.SINGLE) {
      this._date[0] = item;
      this.change.emit(this._date);
      return;
    }

    if (this.pickMode === pickModes.RANGE) {
      if (this._date[0] === null) {
        this._date[0] = item;
        this.selectStart.emit(item);
      } else if (this._date[1] === null) {
        if (this._date[0].time < item.time) {
          this._date[1] = item;
          this.selectEnd.emit(item);
        } else {
          this._date[1] = this._date[0];
          this.selectEnd.emit(this._date[0]);
          this._date[0] = item;
          this.selectStart.emit(item);
        }
      } else if (this._date[0].time > item.time) {
        this._date[0] = item;
        this.selectStart.emit(item);
      } else if (this._date[1].time < item.time) {
        this._date[1] = item;
        this.selectEnd.emit(item);
      } else {
        this._date[0] = item;
        this.selectStart.emit(item);
        this._date[1] = null;
      }

      this.change.emit(this._date);
      return;
    }

    if (this.pickMode === pickModes.MULTI) {
      const index = this._date.findIndex(e => e !== null && e.time === item.time);

      if (index === -1) {
        this._date.push(item);
      } else {
        this._date.splice(index, 1);
      }
      this.change.emit(this._date.filter(e => e !== null));
    }
  }

  public render_day(day: CalendarDay) {
    const _day = (day: CalendarDay) => {
      if (day) {
        return (
          <button type='button'
            class={{
              ['days-btn ' + day.cssClass]: true,
              today: day.isToday,
              marked: day.marked,
              'last-month-day': day.isLastMonth,
              'next-month-day': day.isNextMonth,
              'on-selected': this.isSelected(day.time),
            }}
            onClick={() => this.onSelected(day)}
            disabled={day.disable}>
            <p>{day.title}</p>
            {day.subTitle ? <small >{day.subTitle}</small> : null}
          </button>
        );
      }
      return '';
    }
    if (this._isRange) {
      return (
        <div class="days">
          {_day(day)}
        </div>
      );
    }
    return (
      <div
        class={{
          ['days']: true,
          'startSelection': this.isStartSelection(day),
          'endSelection': this.isEndSelection(day),
          'is-first-wrap': day.isFirst,
          'is-last-wrap': day.isLast,
          'between': this.isBetween(day),
        }}>
        {_day(day)}
      </div>
    );
  }

  public render() {
    return (
      <Host>
        <div class={this.color}>
          <div class="days-box">
            {
              this.month.days.map((day: CalendarDay) => {
                return this.render_day(day);
              })
            }
          </div>
        </div>
      </Host >
    );
  }
}