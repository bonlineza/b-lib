# DropOptions

DropOptions provides a sinple replacement for a 'select' component when heavy customisability is required


## Props
| Name         | Type     | Default              | Required | Description                                                                |
| ------------ | -------- | -------------------- | -------- | -------------------------------------------------------------------------- |
| baseElement  | Function | () => 'Base Element' | false    | Function that return jsx in the clickable button used to open the dropdown |
| children     | any      | []                   | false    | Generates options                                                          |
| wrapperClass | string   | ''                   | false    | CSS class append to where div.drop-options-container is                    |
