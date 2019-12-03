# ButtonGroup

ButtonGroup is a wrapper that transforms given buttons into a small set of buttons with a dropdown menu based on the configuration given


## Props
| Name                 | Type          | Default           | Required | Description                                           |
| -------------------- | ------------- | ----------------- | -------- | ----------------------------------------------------- |
| alt                  | boolean       | false             | false    | If true append modifier string `--alt` to `baseClass` |
| children             | any           | []                | false    | Array of that renders buttons                         |
| openOnFirstChild     | boolean       | false             | false    | Open on click of buttons outside menu                 |
| numButtons           | number        | 2                 | false    | Number of buttons displayed outside the menu          |
| disableButtons       | boolean       | false             | false    | if true added `disabled prop` to all rendered buttons |
| toggleButtonContents | React$Element | <span>Menu</span> | false    | Renders content in menu button                        |
| baseClass            | string        | 'button-group'    | false    | css class for parent div of this component            |
