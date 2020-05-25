# ibiz-drawer



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                        | Type               | Default     |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------ | ----------- |
| `animated`      | `animated`       | If `true`, the modal will animate.                                                                                 | `boolean`          | `true`      |
| `closeView`     | `close-view`     |                                                                                                                    | `boolean`          | `false`     |
| `contentId`     | `content-id`     | The content's id the menu should use.                                                                              | `string`           | `undefined` |
| `disabled`      | `disabled`       | If `true`, the menu is disabled.                                                                                   | `boolean`          | `false`     |
| `keyboardClose` | `keyboard-close` | If `true`, the keyboard will be automatically dismissed when the overlay is presented.                             | `boolean`          | `true`      |
| `maxEdgeStart`  | `max-edge-start` | The edge threshold for dragging the menu open. If a drag/swipe happens over this value, the menu is not triggered. | `number`           | `50`        |
| `menuId`        | `menu-id`        | An id for the menu.                                                                                                | `string`           | `undefined` |
| `side`          | `side`           | Which side of the view the menu should be placed.                                                                  | `"end" \| "start"` | `'start'`   |
| `swipeGesture`  | `swipe-gesture`  | If `true`, swiping the menu is enabled.                                                                            | `boolean`          | `true`      |
| `type`          | `type`           | The display type of the menu. Available options: `"overlay"`, `"reveal"`, `"push"`.                                | `string`           | `undefined` |


## Events

| Event                 | Description                                  | Type                                   |
| --------------------- | -------------------------------------------- | -------------------------------------- |
| `dropClick`           |                                              | `CustomEvent<void>`                    |
| `ionDidClose`         | Emitted when the menu is closed.             | `CustomEvent<void>`                    |
| `ionDidOpen`          | Emitted when the menu is open.               | `CustomEvent<void>`                    |
| `ionModalDidDismiss`  | Emitted after the modal has dismissed.       | `CustomEvent<OverlayEventDetail<any>>` |
| `ionModalDidPresent`  | Emitted after the modal has presented.       | `CustomEvent<void>`                    |
| `ionModalWillDismiss` | Emitted before the modal has dismissed.      | `CustomEvent<OverlayEventDetail<any>>` |
| `ionModalWillPresent` | Emitted before the modal has presented.      | `CustomEvent<void>`                    |
| `ionWillClose`        | Emitted when the menu is about to be closed. | `CustomEvent<void>`                    |
| `ionWillOpen`         | Emitted when the menu is about to be opened. | `CustomEvent<void>`                    |


## Methods

### `close(animated?: boolean) => Promise<boolean>`

Closes the menu. If the menu is already closed or it can't be closed,
it returns `false`.

#### Returns

Type: `Promise<boolean>`



### `isActive() => Promise<boolean>`

Returns `true` is the menu is active.

A menu is active when it can be opened or closed, meaning it's enabled
and it's not part of a `ion-split-pane`.

#### Returns

Type: `Promise<boolean>`



### `isOpen() => Promise<boolean>`

Returns `true` is the menu is open.

#### Returns

Type: `Promise<boolean>`



### `open(animated?: boolean) => Promise<boolean>`

Opens the menu. If the menu is already open or it can't be opened,
it returns `false`.

#### Returns

Type: `Promise<boolean>`



### `setOpen(shouldOpen: boolean, animated?: boolean) => Promise<boolean>`

Opens or closes the button.
If the operation can't be completed successfully, it returns `false`.

#### Returns

Type: `Promise<boolean>`



### `toggle(animated?: boolean) => Promise<boolean>`

Toggles the menu. If the menu is already open, it will try to close, otherwise it will try to open it.
If the operation can't be completed successfully, it returns `false`.

#### Returns

Type: `Promise<boolean>`




## CSS Custom Properties

| Name           | Description                |
| -------------- | -------------------------- |
| `--background` | Background of the menu     |
| `--height`     | Height of the menu         |
| `--max-height` | Maximum height of the menu |
| `--max-width`  | Maximum width of the menu  |
| `--min-height` | Minimum height of the menu |
| `--min-width`  | Minimum width of the menu  |
| `--width`      | Width of the menu          |


## Dependencies

### Depends on

- ion-backdrop

### Graph
```mermaid
graph TD;
  ibiz-drawer --> ion-backdrop
  style ibiz-drawer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
