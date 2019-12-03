# DocumentUploader

Displays a list of Documents and provides a Dropzone to upload aditional Documents


## Props
| Name            | Type                | Default                | Required | Description                                                    |
| --------------- | ------------------- | ---------------------- | -------- | -------------------------------------------------------------- |
| list            | Array&lt;Object&gt; | []                     | false    | an array of objects displayed in previewRenderer               |
| errorMessage    | string              | ''                     | false    | string error message shown in `div.image-preview__footer`      |
| isLoading       | boolean             | false                  | false    | if true, the loadingRenderer prop will trigger                 |
| dataQeId        | string              | 'action-drop-document' | false    | identifier used for `div.image-preview`'s in prop `data-qe-id` |
| showUploader    | boolean             | true                   | false    | If true, shows `<Dropzone>` (uploader)component                |
| addFileRenderer | Function            | () => 'Drop File Here' | false    | Function returns prompt content to add files                   |
| loadingRenderer | Function            | () => 'Loading...'     | false    | Function returns component that acts as loader                 |
| previewRenderer | Function            |                        | true     | Function returns a component that has access to data in `list` |
| baseClass       | string              | 'document-uploader'    | false    | css class in parent div of this component                      |
| uploadHandler   | Function            |                        | true     | callback function that runs when a file is uploaded            |
