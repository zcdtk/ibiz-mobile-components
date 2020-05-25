/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { FrameworkDelegate, MenuChangeEventDetail, OverlayEventDetail, Side, } from "@ionic/core";
export namespace Components {
    interface CalendarMonth {
    }
    interface CalendarWeek {
    }
    interface IbizDrawer {
        /**
          * If `true`, the modal will animate.
         */
        "animated": boolean;
        /**
          * Closes the menu. If the menu is already closed or it can't be closed, it returns `false`.
         */
        "close": (animated?: boolean) => Promise<boolean>;
        "closeView"?: boolean;
        /**
          * The content's id the menu should use.
         */
        "contentId"?: string;
        "delegate"?: FrameworkDelegate;
        /**
          * If `true`, the menu is disabled.
         */
        "disabled": boolean;
        /**
          * Returns `true` is the menu is active.  A menu is active when it can be opened or closed, meaning it's enabled and it's not part of a `ion-split-pane`.
         */
        "isActive": () => Promise<boolean>;
        /**
          * Returns `true` is the menu is open.
         */
        "isOpen": () => Promise<boolean>;
        /**
          * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */
        "keyboardClose": boolean;
        /**
          * The edge threshold for dragging the menu open. If a drag/swipe happens over this value, the menu is not triggered.
         */
        "maxEdgeStart": number;
        /**
          * An id for the menu.
         */
        "menuId"?: string;
        /**
          * Opens the menu. If the menu is already open or it can't be opened, it returns `false`.
         */
        "open": (animated?: boolean) => Promise<boolean>;
        "overlayIndex": number;
        /**
          * Opens or closes the button. If the operation can't be completed successfully, it returns `false`.
         */
        "setOpen": (shouldOpen: boolean, animated?: boolean) => Promise<boolean>;
        /**
          * Which side of the view the menu should be placed.
         */
        "side": Side;
        /**
          * If `true`, swiping the menu is enabled.
         */
        "swipeGesture": boolean;
        /**
          * Toggles the menu. If the menu is already open, it will try to close, otherwise it will try to open it. If the operation can't be completed successfully, it returns `false`.
         */
        "toggle": (animated?: boolean) => Promise<boolean>;
        /**
          * The display type of the menu. Available options: `"overlay"`, `"reveal"`, `"push"`.
         */
        "type"?: string;
    }
    interface IbizMobileCalendar {
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
}
declare global {
    interface HTMLCalendarMonthElement extends Components.CalendarMonth, HTMLStencilElement {
    }
    var HTMLCalendarMonthElement: {
        prototype: HTMLCalendarMonthElement;
        new (): HTMLCalendarMonthElement;
    };
    interface HTMLCalendarWeekElement extends Components.CalendarWeek, HTMLStencilElement {
    }
    var HTMLCalendarWeekElement: {
        prototype: HTMLCalendarWeekElement;
        new (): HTMLCalendarWeekElement;
    };
    interface HTMLIbizDrawerElement extends Components.IbizDrawer, HTMLStencilElement {
    }
    var HTMLIbizDrawerElement: {
        prototype: HTMLIbizDrawerElement;
        new (): HTMLIbizDrawerElement;
    };
    interface HTMLIbizMobileCalendarElement extends Components.IbizMobileCalendar, HTMLStencilElement {
    }
    var HTMLIbizMobileCalendarElement: {
        prototype: HTMLIbizMobileCalendarElement;
        new (): HTMLIbizMobileCalendarElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLElementTagNameMap {
        "calendar-month": HTMLCalendarMonthElement;
        "calendar-week": HTMLCalendarWeekElement;
        "ibiz-drawer": HTMLIbizDrawerElement;
        "ibiz-mobile-calendar": HTMLIbizMobileCalendarElement;
        "my-component": HTMLMyComponentElement;
    }
}
declare namespace LocalJSX {
    interface CalendarMonth {
    }
    interface CalendarWeek {
    }
    interface IbizDrawer {
        /**
          * If `true`, the modal will animate.
         */
        "animated"?: boolean;
        "closeView"?: boolean;
        /**
          * The content's id the menu should use.
         */
        "contentId"?: string;
        /**
          * If `true`, the menu is disabled.
         */
        "disabled"?: boolean;
        /**
          * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */
        "keyboardClose"?: boolean;
        /**
          * The edge threshold for dragging the menu open. If a drag/swipe happens over this value, the menu is not triggered.
         */
        "maxEdgeStart"?: number;
        /**
          * An id for the menu.
         */
        "menuId"?: string;
        "onDropClick"?: (event: CustomEvent<void>) => void;
        /**
          * Emitted when the menu is closed.
         */
        "onIonDidClose"?: (event: CustomEvent<void>) => void;
        /**
          * Emitted when the menu is open.
         */
        "onIonDidOpen"?: (event: CustomEvent<void>) => void;
        /**
          * Emitted after the modal has dismissed.
         */
        "onIonModalDidDismiss"?: (event: CustomEvent<OverlayEventDetail>) => void;
        /**
          * Emitted after the modal has presented.
         */
        "onIonModalDidPresent"?: (event: CustomEvent<void>) => void;
        /**
          * Emitted before the modal has dismissed.
         */
        "onIonModalWillDismiss"?: (event: CustomEvent<OverlayEventDetail>) => void;
        /**
          * Emitted before the modal has presented.
         */
        "onIonModalWillPresent"?: (event: CustomEvent<void>) => void;
        /**
          * Emitted when the menu is about to be closed.
         */
        "onIonWillClose"?: (event: CustomEvent<void>) => void;
        /**
          * Emitted when the menu is about to be opened.
         */
        "onIonWillOpen"?: (event: CustomEvent<void>) => void;
        /**
          * Which side of the view the menu should be placed.
         */
        "side"?: Side;
        /**
          * If `true`, swiping the menu is enabled.
         */
        "swipeGesture"?: boolean;
        /**
          * The display type of the menu. Available options: `"overlay"`, `"reveal"`, `"push"`.
         */
        "type"?: string;
    }
    interface IbizMobileCalendar {
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface IntrinsicElements {
        "calendar-month": CalendarMonth;
        "calendar-week": CalendarWeek;
        "ibiz-drawer": IbizDrawer;
        "ibiz-mobile-calendar": IbizMobileCalendar;
        "my-component": MyComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "calendar-month": LocalJSX.CalendarMonth & JSXBase.HTMLAttributes<HTMLCalendarMonthElement>;
            "calendar-week": LocalJSX.CalendarWeek & JSXBase.HTMLAttributes<HTMLCalendarWeekElement>;
            "ibiz-drawer": LocalJSX.IbizDrawer & JSXBase.HTMLAttributes<HTMLIbizDrawerElement>;
            "ibiz-mobile-calendar": LocalJSX.IbizMobileCalendar & JSXBase.HTMLAttributes<HTMLIbizMobileCalendarElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
        }
    }
}
