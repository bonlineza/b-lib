# PageReady

## Props
| Name               | Type                      | Default                             | Required | Description                                                                                             |
| ------------------ | ------------------------- | ----------------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| predefinedAction   | Object                    | null                                | false    | dispatch action for store                                                                               |
| getRequestInstance | () =&gt; Promise&lt;*&gt; |                                     | true     | function that returns an promise. on success, the promise has the data from request                     |
| onData             | Function                  | function() {<br>  return true;<br>} | false    | Triggers when promise is successful. in the function's parameter, it will<br>have data from the promise |
| customErrorMessage | string                    | 'Failed to load'                    | false    | String to display custom error message                                                                  |
| customErrorHandler | Function                  | () => null                          | false    | this function triggers on catch of error from the Promise of `getRequestInstance`.                      |
| renderCustomLoader | Function                  | () => null                          | false    | Renders custom loader if set                                                                            |
