# UntilReady

## Props
| Name                  | Type     | Default                    | Required | Description                                                                                                   |
| --------------------- | -------- | -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| children              | any      |                            | true     | all jsx that this component has wrapped                                                                       |
| ready                 | boolean  | false                      | true     | when true display `children`, over-rides `waiting`                                                            |
| waiting               | boolean  | false                      | true     | when true display some waiting text                                                                           |
| notReadyOrWaitingText | string   | 'Error completing request' | false    | fallback text for if `!waiting && !ready`                                                                     |
| loadingRenderer       | Function | () => 'loading'            | false    | Function that render custom component that acts as loader                                                     |
| baseClass             | string   | 'until-ready'              | false    | css class given to root div of this component. All child css classes will<br>have `baseClass` prepended to it |
