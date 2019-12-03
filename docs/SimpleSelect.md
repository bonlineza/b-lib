# SimpleSelect

SimpleSelect is an implementation of 'reat-selectize' - providing a few defaults and a common interface


## Props
| Name            | Type                      | Default     | Required | Description                                                                                                                                                                            |
| --------------- | ------------------------- | ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onChange        | Function&lt;ItemShape&gt; | () => false | false    | `(selectedValue){}` invoked when the user selects an option (by click on enter).<br>`onChange` accepts the an object with the `shape` which will equate to<br>the current `value` prop |
| value           | Object&lt;ItemShape&gt;   | {}          | false    | the selected value, i.e. one of the objects in the options array                                                                                                                       |
| options         | Array&lt;ItemShape&gt;    | []          | false    | list of items by default each option object MUST have `label` & `value` property,<br>otherwise you must implement the render* & filterOptions methods                                  |
| hideResetButton | boolean                   | true        | false    | If true, hides the reset button, even if the select element is not empty                                                                                                               |
| open            | boolean                   | false       | false    | controls the visibility of the dropdown menu                                                                                                                                           |
