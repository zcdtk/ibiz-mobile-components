import { Component, Host, h, Prop, Event, EventEmitter, Watch } from '@stencil/core';

import {
  CalendarMonth,
  CalendarModalOptions,
  CalendarComponentOptions,
  CalendarDay,
  CalendarComponentPayloadTypes,
  CalendarComponentMonthChange,
  CalendarComponentTypeProperty,
} from './calendar.model';

import moment from 'moment';

import { CalendarService } from './services/calendar.service';

import { defaults, pickModes } from './config';

@Component({
  tag: 'ibiz-mobile-calendar',
  styleUrl: 'ibiz-mobile-calendar.scss',
})
export class IbizMobileCayanrlendar {

  _d: CalendarModalOptions;
  _options: CalendarComponentOptions;
  _view: 'month' | 'days' = 'days';
  _calendarMonthValue: CalendarDay[] = [null, null];

  _showToggleButtons = true;
  get showToggleButtons(): boolean {
    return this._showToggleButtons;
  }

  set showToggleButtons(value: boolean) {
    this._showToggleButtons = value;
  }

  _showMonthPicker = true;
  get showMonthPicker(): boolean {
    return this._showMonthPicker;
  }

  set showMonthPicker(value: boolean) {
    this._showMonthPicker = value;
  }

  monthOpt: CalendarMonth;

  @Prop()
  format: string = defaults.DATE_FORMAT;
  @Prop()
  type: CalendarComponentTypeProperty = 'string';
  @Prop()
  readonly = false;
  @Event()
  change: EventEmitter<CalendarComponentPayloadTypes>;
  @Event()
  monthChange: EventEmitter<CalendarComponentMonthChange>;
  @Event()
  select: EventEmitter<CalendarDay>;
  @Event()
  selectStart: EventEmitter<CalendarDay>;
  @Event()
  selectEnd: EventEmitter<CalendarDay>;

  @Prop() options: CalendarComponentOptions;

  @Watch('options')
  optionsWatchHandler(newValue: CalendarComponentOptions, oldValue: CalendarComponentOptions) {
    console.log(oldValue);
    this._options = newValue;
    this.initOpt();
    if (this.monthOpt && this.monthOpt.original) {
      this.monthOpt = this.createMonth(this.monthOpt.original.time);
    }
  }

  // 注销 get set 方法  
  // @Prop()
  // set options(value: CalendarComponentOptions) {
  //   this._options = value;
  //   this.initOpt();
  //   if (this.monthOpt && this.monthOpt.original) {
  //     this.monthOpt = this.createMonth(this.monthOpt.original.time);
  //   }
  // }

  // get options(): CalendarComponentOptions {
  //   return this._options;
  // }

  public calSvc: CalendarService = new CalendarService();

  constructor() { }

  componentWillLoad() {
    this.initOpt();
    this.monthOpt = this.createMonth(new Date().getTime());
  }

  // 新的生命周期
  // ngOnInit(): void {
  //   this.initOpt();
  //   this.monthOpt = this.createMonth(new Date().getTime());
  // }

  getViewDate() {
    return this._handleType(this.monthOpt.original.time);
  }

  setViewDate(value: CalendarComponentPayloadTypes) {
    this.monthOpt = this.createMonth(this._payloadToTimeNumber(value));
  }

  switchView(): void {
    this._view = this._view === 'days' ? 'month' : 'days';
  }

  prev(): void {
    if (this._view === 'days') {
      this.backMonth();
    } else {
      this.prevYear();
    }
  }

  next(): void {
    if (this._view === 'days') {
      this.nextMonth();
    } else {
      this.nextYear();
    }
  }

  prevYear(): void {
    if (moment(this.monthOpt.original.time).year() === 1970) return;
    const backTime = moment(this.monthOpt.original.time)
      .subtract(1, 'year')
      .valueOf();
    this.monthOpt = this.createMonth(backTime);
  }

  nextYear(): void {
    const nextTime = moment(this.monthOpt.original.time)
      .add(1, 'year')
      .valueOf();
    this.monthOpt = this.createMonth(nextTime);
  }

  nextMonth(): void {
    const nextTime = moment(this.monthOpt.original.time)
      .add(1, 'months')
      .valueOf();
    this.monthChange.emit({
      oldMonth: this.calSvc.multiFormat(this.monthOpt.original.time),
      newMonth: this.calSvc.multiFormat(nextTime),
    });
    this.monthOpt = this.createMonth(nextTime);
  }

  canNext(): boolean {
    if (!this._d.to || this._view !== 'days') return true;
    return this.monthOpt.original.time < moment(this._d.to).valueOf();
  }

  backMonth(): void {
    const backTime = moment(this.monthOpt.original.time)
      .subtract(1, 'months')
      .valueOf();
    this.monthChange.emit({
      oldMonth: this.calSvc.multiFormat(this.monthOpt.original.time),
      newMonth: this.calSvc.multiFormat(backTime),
    });
    this.monthOpt = this.createMonth(backTime);
  }

  canBack(): boolean {
    if (!this._d.from || this._view !== 'days') return true;
    return this.monthOpt.original.time > moment(this._d.from).valueOf();
  }

  monthOnSelect(month: number): void {
    this._view = 'days';
    const newMonth = moment(this.monthOpt.original.time)
      .month(month)
      .valueOf();
    this.monthChange.emit({
      oldMonth: this.calSvc.multiFormat(this.monthOpt.original.time),
      newMonth: this.calSvc.multiFormat(newMonth),
    });
    this.monthOpt = this.createMonth(newMonth);
  }

  onChanged($event: CalendarDay[]): void {
    switch (this._d.pickMode) {
      case pickModes.SINGLE:
        const date = this._handleType($event[0].time);
        this._onChanged(date);
        this.change.emit(date);
        break;

      case pickModes.RANGE:
        if ($event[0] && $event[1]) {
          const rangeDate = {
            from: this._handleType($event[0].time),
            to: this._handleType($event[1].time),
          };
          this._onChanged(rangeDate);
          this.change.emit(rangeDate);
        }
        break;

      case pickModes.MULTI:
        const dates = [];

        for (let i = 0; i < $event.length; i++) {
          if ($event[i] && $event[i].time) {
            dates.push(this._handleType($event[i].time));
          }
        }

        this._onChanged(dates);
        this.change.emit(dates);
        break;

      default:
    }
  }

  swipeEvent($event: any): void {
    const isNext = $event.deltaX < 0;
    if (isNext && this.canNext()) {
      this.nextMonth();
    } else if (!isNext && this.canBack()) {
      this.backMonth();
    }
  }

  _onChanged: Function = () => { };

  _onTouched: Function = () => { };

  _payloadToTimeNumber(value: CalendarComponentPayloadTypes): number {
    let date;
    if (this.type === 'string') {
      date = moment(value, this.format);
    } else {
      date = moment(value);
    }
    return date.valueOf();
  }

  _monthFormat(date: number): string {
    return moment(date).format(this._d.monthFormat.replace(/y/g, 'Y'));
  }

  private initOpt(): void {
    if (this._options && typeof this._options.showToggleButtons === 'boolean') {
      this.showToggleButtons = this._options.showToggleButtons;
    }
    if (this._options && typeof this._options.showMonthPicker === 'boolean') {
      this.showMonthPicker = this._options.showMonthPicker;
      if (this._view !== 'days' && !this.showMonthPicker) {
        this._view = 'days';
      }
    }
    this._d = this.calSvc.safeOpt(this._options || {});
  }

  createMonth(date: number): CalendarMonth {
    return this.calSvc.createMonthsByPeriod(date, 1, this._d)[0];
  }

  _createCalendarDay(value: CalendarComponentPayloadTypes): CalendarDay {
    return this.calSvc.createCalendarDay(this._payloadToTimeNumber(value), this._d);
  }

  _handleType(value: number): CalendarComponentPayloadTypes {
    const date = moment(value);
    // switch (this.type) {
    //   case 'string':
    //     return date.format(this.format);
    //   case 'js-date':
    //     return date.toDate();
    //   case 'moment':
    //     return date;
    //   case 'time':
    //     return date.valueOf();
    //   case 'object':
    //     return date.toObject();
    // }
    return date;
  }

  writeValue(obj: any): void {
    this._writeValue(obj);
    if (obj) {
      if (this._calendarMonthValue[0]) {
        this.monthOpt = this.createMonth(this._calendarMonthValue[0].time);
      } else {
        this.monthOpt = this.createMonth(new Date().getTime());
      }
    }
  }

  registerOnChange(fn: () => {}): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  _writeValue(value: any): void {
    if (!value) {
      this._calendarMonthValue = [null, null];
      return;
    }

    switch (this._d.pickMode) {
      case 'single':
        this._calendarMonthValue[0] = this._createCalendarDay(value);
        break;

      case 'range':
        if (value.from) {
          this._calendarMonthValue[0] = value.from ? this._createCalendarDay(value.from) : null;
        }
        if (value.to) {
          this._calendarMonthValue[1] = value.to ? this._createCalendarDay(value.to) : null;
        }
        break;

      case 'multi':
        if (Array.isArray(value)) {
          this._calendarMonthValue = value.map(e => {
            return this._createCalendarDay(e);
          });
        } else {
          this._calendarMonthValue = [null, null];
        }
        break;

      default:
    }
  }

  /**
   * 绘制显示选择月
   *
   * @returns
   * @memberof IbizMobileCalendar
   */
  public render_showMonthPicker() {
    if (this._showMonthPicker) {
      return (
          <ion-button type="button"
            fill="clear"
            class="switch-btn"
            onClick={() => this.switchView()}>
            {this._monthFormat(this.monthOpt.original.time)}
            <ion-icon class="arrow-dropdown"
              name={this._view === 'days' ? 'caret-down-outline' : 'caret-up-outline'}></ion-icon>
          </ion-button>
      );
    }
  }

  /**
   * 绘制切换按钮
   *
   * @returns
   * @memberof IbizMobileCalendar
   */
  public render_showToggleButtons() {
    if (this._showToggleButtons) {
      return (
        <div>
          <ion-button type="button" fill="clear" class="back" disabled={!this.canBack()} onClick={() => this.prev()}>
            <ion-icon slot="icon-only" size="small" name="chevron-back-outline"></ion-icon>
          </ion-button>
          <ion-button type="button" fill="clear" class="forward" disabled={!this.canNext()} onClick={() => this.next()}>
            <ion-icon slot="icon-only" size="small" name="chevron-forward-outline"></ion-icon>
          </ion-button>
        </div>
      );
    }
  }

  /**
   * 绘制日历内容区
   *
   * @returns
   * @memberof IbizMobileCalendar
   */
  public render_view() {
    if (Object.is(this._view, 'days')) {
      return (
        <div>
          <calendar-week color="transparent"
            weekArray={this._d.weekdays}
            weekStart={this._d.weekStart}>
          </calendar-week>
          <calendar-month class="component-mode"
            value={this._calendarMonthValue}
            month={this.monthOpt}
            readonly={this.readonly}
            onChange={($event: any) => this.onChanged($event)}
            onSwipe={($event: any) => this.swipeEvent($event)}
            onSelect={($event: any) => this.select.emit($event)}
            onSelectStart={($event: any) => this.selectStart.emit($event)}
            onSelectEnd={($event: any) => this.selectEnd.emit($event)}
            pickMode={this._d.pickMode}
            color={this._d.color}>
          </calendar-month>
        </div>
      );
    }
    return (
      <ion-calendar-month-picker color={this._d.color}
        monthFormat={this._options ? this._options.monthPickerFormat : null}
        onSelect={($event: any) => this.monthOnSelect($event)}
        month={this.monthOpt}>
      </ion-calendar-month-picker>
    );
  }

  /**
   * 绘制内容
   *
   * @returns
   * @memberof IbizMobileCalendar
   */
  render() {
    return (
      <Host>
        <div class="title">
          {this.render_showMonthPicker()}
          {this.render_showToggleButtons()}
        </div>
        {this.render_view()}
      </Host>
    );
  }

}
