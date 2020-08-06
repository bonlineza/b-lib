
## Changelog
### 3.2.1
- Fix `react-pdf-js` library from failing to import when using NPM to install
- Add `package-lock.json` for NPM
- Update PeerDependencies to allow any latest version of React 16 to be used

### 3.2.0
- Add `If` component that conditionally renders children based on `condition` prop truthyness
- Add `SimpleErrorBoundary` component that catches thrown errors in child components
- Add `removeKeyFromObject` function that simply removes a key from a given object - returning the new object
- Updated the `hasValue` function that now correctly supports `Array` objects
- Fixed a warning from `SimpleItem` about the `text` property being passed invalid types

### 3.1.0
- Add `SimpleRowComponent` property to `SimpleList->Body` enabling a Custom Row renderer to be passed
- `SimpleItem` now uses the `flex` property by default from the passed in `headings` config
- `ButtonOrDiv` now generates the `data-qe-id` for both clickable and non-clickable modes
- Removed the className `disable-hover` from `ButtonOrDiv` as this name is too explicit and the behaviour is not included with the component  

### 3.0.0
- BREAKING: Function signature for SimpleList->headings->`customFormatter`/`customRenderer` changed to `(itemValue, rowData, columnName)`
  - When Upgrading: Be sure to update all your usages of `customFormatter`/`customRenderer` to the new arguments
- Export `DivOrButton` Component

### 2.2.0
- Add `usePrevious` function hook - [more info](https://usehooks.com/usePrevious/)

### 2.1.5
- Fix: Component build files are now available in NPM repo
  - now we can import a component via code `import ActionBar from '@bonlineza/b-lib/ActionBar`

### 2.1.4
- Fix: `PredefinedFilter` now correctly hides when clicking outside of the component

### 2.1.3
- Fix: Added missing `initialize.js` from `DateRangePicker` to the `npm tarball`

### 2.1.2
- Added missing `initialize.js` from `DateRangePicker` to the `npm tarball`
- Moved `react-dom-factories` back to the normal package dependencies

### 2.1.1
- Added missing `init.js` and `functions.js` to the `files` list in the `package.json`

### 2.1.0
- Added new `Functions` to bundle: {
  `debounced`,
  `hasValue`,
  `isObjectEmpty`,
  `moveItemInArray`,
  `snakeCaseToTitleCase`,
  `toTitleCase`,
  `replaceUnderscoreWithSpace`,
  `removeWhiteSpaces`,
}
- Greatly improved Functions documentation according to JSDoc spec

### 2.0.0
- BREAKING: `Functions` are now bundled separately and can be imported via: `import { parseDate } from @bonlineza/b-lib/functions`
- Moved Documentation generation modules to `devDependencies`

### 1.1.0
- Added HorizontalProgressBar Component
- Updated line breaks in some Readmes 
- Re-generated Storybook build 

### 1.0.4
- Added `Readme` storybook addon
- Added Class Descriptions doc blocks in Readmes
- Moved `CHANGELOG` to own File

### 1.0.3
- Added Storybook static build to GH-Pages
- Added Documentation Links in GH-Pages
- Fixed a few incorrect type definitions causing test warnings

### 1.0.2
- Added tests and stories for SimpleSelect
- Fixed broken reference in ToolTip

### 1.0.1
- Added generated Markdown Documentation for each Component
- Added GitHub Pages Landing Page to `docs/index.md`

### 1.0.0
- BREAKING: `interpretErrorMessage` function has been internally replaced in PageReady, as a prop - ensure you pass in your project specific interpreter as `errorMessageInterpreter` when updating to this version
- Added prop `errorMessageInterpreter` to `PageReady`
- Added Doc blocks to all function files in `src/util`
- Added exports for `functions`: {
  `constrainSearch`,
  `sanitizeInputForConstraints`,
  `parseDate`,
  `getMoment`,
  `flattenObject`,
  `getTokenFromStorage`,
  `hasOwn`,
  `smoothScrollTo`,
  `scrollToSelector`,
  `stringOccurances`,
  `validateEmail`,
  `validatePhone`,
  `validateWebsite`,
}

