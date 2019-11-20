# MobileSideMenu

## Props
| Name           | Type     | Default            | Required | Description                                                                                               |
| -------------- | -------- | ------------------ | -------- | --------------------------------------------------------------------------------------------------------- |
| baseClassName  | string   | 'mobile-side-menu' | false    | css class name assigned to root div. All child css class names are appended<br>   from this baseClassName |
| menuItems      | Array    | []                 | false    | array of item that contain jsx                                                                            |
| closeAction    | Function |                    | true     | Method to close `MobileSideMenu`                                                                          |
| footerContent  | any      | null               | false    | Jsx renders with `div.`${baseClassName}__content__footer`                                                 |
| isOpen         | literal  | false              | false    | if true, MobileSideMenu is visible                                                                        |
| menuTitle      | string   | ''                 | false    | title of menu                                                                                             |
| dataIdentifier | string   | 'menu-item'        | false    | data identifier for menu items                                                                            |
