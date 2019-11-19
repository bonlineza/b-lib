# AsideSlide

## Props
| Name            | Type                 | Default | Required | Description                                                                                                                                 |
| --------------- | -------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| isOpen          | boolean              | false   | true     | Controls whether `AsideSlide` is open or not  on initial load                                                                               |
| children        | any                  |         | true     | all jsx that this component has wrapped                                                                                                     |
| title           | string               |         | true     | String rendered within component                                                                                                            |
| toggle          | Function             |         | true     | Function that toggles AsideSlide whether is it open or not                                                                                  |
| bgcAlt          | boolean              | false   | false    | if true, uses this css class `aside-slide--bgc-alt`                                                                                         |
| toggleButton    | Function             | null    | false    | Function that also toggles whether `<AsideSlide />` is open or closed.<br>Function is triggered on click of button located in the component |
| actionComponent | any                  | null    | false    | button element that is rendered in the<br>`<div class"aside-slide__inner__header__item--right">` of this component                          |
| renderEmpty     | boolean              | false   | false    |                                                                                                                                             |
| slideBar        | Function &#124; null | null    | false    | Function that returns jsx that acts as sidebar.<br>If true, css modifier class `aside-slide__inner--padded` is used.                        |
| innerId         | string               | ''      | false    | identifier appended to the wrapper div of `div.aside-slide__inner`                                                                          |
| qeId            | string               | ''      | false    | identifier appended to parent div for data attribute                                                                                        |
