# AsideSlide

## Props
| Name            | Type                 | Default | Required | Description                                                                                                                                 |
| --------------- | -------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| isOpen          | boolean              | false   | true     | Controls whether `AsideSlide` is open or not initaial load                                                                                  |
| children        | any                  |         | true     | Content rendered inside component                                                                                                           |
| title           | string               |         | true     | String rendered within component                                                                                                            |
| toggle          | Function             |         | true     | Function that toggle AsideSlide is open or not                                                                                              |
| bgcAlt          | boolean              | false   | false    | if true, uses this css class `aside-slide--bgc-alt`                                                                                         |
| toggleButton    | Function             | null    | false    | Function that also toggles whether `<AsideSlide />` is open or closed.<br>Function is triggered on click of button located in the component |
| actionComponent | any                  | null    | false    | component that is rendered in the `<div class"aside-slide__inner__header__item--right">` of this component                                  |
| renderEmpty     | boolean              | false   | false    |                                                                                                                                             |
| slideBar        | Function &#124; null | null    | false    |                                                                                                                                             |
| innerId         | string               | ''      | false    | identifier appended to the wrapper div of `div.aside-slide__inner`                                                                          |
| qeId            | string               | ''      | false    | identifier appended to parent div for data attribute                                                                                        |
