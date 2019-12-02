# Overlay

Overlay is a simple component designed as a modal background, but also allows multiple children to control which child is rendered (next/prev)


## Props
| Name      | Type                     | Default | Required | Description                                                                                |
| --------- | ------------------------ | ------- | -------- | ------------------------------------------------------------------------------------------ |
| baseClass | string                   | 'modal' | false    | css class for root div. child element css classes will have this `baseClass`<br>preprended |
| children  | &#91;&#93; &#124; Object | []      | false    | Content that `<Overlay />` has wrapped                                                     |
| isOpen    | boolean                  | false   | true     | if true Overlay is visible                                                                 |
| size      | string                   | ''      | false    | Size of the div.${baseClass}__inner                                                        |
