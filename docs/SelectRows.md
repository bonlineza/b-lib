# SelectRows

SelectRows can render a list of items which are designed to be removed and added via custom actions
onAddClick can trigger anything the developer requires but should also update the 'rows' prop in the parent
onRemoveClick should simply remove the selected item from the list (by updating the 'rows' prop in the parent)


## Props
| Name                 | Type                 | Default       | Required | Description                                                                                                                                                                  |
| -------------------- | -------------------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| single               | boolean              | true          | false    | If true, only one item can be added to the props row                                                                                                                         |
| rows                 | Array&lt;RowType&gt; | []            | false    | Array of objects with each object having the follow prop shape:<br>`{ key, value }`. each item is used to render a `button element`. onClick<br>`onRemoveClick` is triggered |
| onAddClick           | Function             | () => false   | false    | Function used to append item to `row` from control logic in upperscope                                                                                                       |
| onRemoveClick        | Function             | () => false   | false    | Function used to remove item to `row` from control logic in upperscope                                                                                                       |
| rowClassName         | string               | 'select-rows' | false    | css class name given to each `button element` mapped out from `row` array                                                                                                    |
| placeholder          | string               | 'Add Item'    | false    | button text for `add item button element`                                                                                                                                    |
| addActionRenderer    | Function             | () => false   | false    | function that returns jsx(content) in the `add item button element` after<br>its `placeholder`                                                                               |
| removeActionRenderer | Function             | () => false   | false    | function that renders jsx(content) in for each mapped out row item<br>`(button element)`. This will display after the button's text                                          |
