# SwitchView

SwitchView is a 'tabbed' display that shows buttons for each
configured 'view' and renders them when clicked or chosen as default


## Props
| Name  | Type                       | Default | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----- | -------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| views | Array&lt;ViewItemShape&gt; |         | true     | array of objects with are used to generate `control-buttons` that switch<br>between the different view. `views` has the following `PropShape`:<br>`type: string`: the type of view ,<br>`label: string`: button text for control button,<br>`active: boolean`: if true, the `<element type="..">` with the corresponding<br>`type` will be the `element` that is visible<br>onClick on of the `control-button`, the children element (`<element type="..">`) with the corresponding<br>`type` will be the `element` that is visible |
