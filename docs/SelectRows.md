# SelectRows

## Props
| Name                 | Type                 | Default       | Required | Description                                                                                                                                                                  |
| -------------------- | -------------------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| single               | Boolean              | true          | false    | If true, only one item can be added to the props row                                                                                                                         |
| rows                 | Array&lt;RowType&gt; | []            | false    | Array of objects with each object having the follow prop shape:<br>`{ key, value }`. each item is used to render a `button element`. onClick<br>`onRemoveClick` is triggered |
| onAddClick           | Function             | () => false   | false    | Function used to append item to `row` from control logic in upperscope                                                                                                       |
| onRemoveClick        | Function             | () => false   | false    | Function used to remove item to `row` from control logic in upperscope                                                                                                       |
| rowClassName         | string               | 'select-rows' | false    | css class name given to each `button element` mapped out from `row` array                                                                                                    |
| placeholder          | string               | 'Add Item'    | false    | button text for `add item button`                                                                                                                                            |
| addActionRenderer    | Function             | () => false   | false    | function that renders jsx after text `add item button`                                                                                                                       |
| removeActionRenderer | Function             | () => false   | false    | function that renders jsx after text of mapped out `button element`<br>from `row` prop                                                                                       |
