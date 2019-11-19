# ActionBar

Shows a text message from a given list for a set amount of time


## Props
| Name            | Type                              | Default                  | Required | Description                                              |
| --------------- | --------------------------------- | ------------------------ | -------- | -------------------------------------------------------- |
| id              | string                            | 'view-showing-actionbar' | false    | Unique identifier under: data-qe-id                      |
| focus           | Function                          | () => null               | false    | callback function triggers when a message arrives        |
| messages        | Array&lt;string&gt;               | []                       | false    | Array of message strings                                 |
| clearList       | Function                          | () => null               | false    | Triggers on unMount - useable for emptying message queue |
| formatter       | null &#124; (string =&gt; string) | null                     | false    | formatter function that processes a message string       |
| baseClassName   | string                            | 'action-bar'             | false    | base class name                                          |
| visibleDuration | number                            | 2000                     | false    | the number of milliseconds to 'show' the latest message  |
