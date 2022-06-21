
## Changelog

### 4.0.0
- upgrade react to react 17.0.2
- upgrade storybook to 6.5.9
- remove storybook read me
- update the config for storybook and babel to match the latest storybook version
- remove pdfjss

### 3.2.2
- Add `errorObjectToString` function that returns object as a string
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
09:17
# Bonline Component Library
### Includes:
- [Documentation](https://bonlineza.github.io/b-lib/)
- [Storybook](https://bonlineza.github.io/b-lib/storybook/index.html)
- [CHANGELOG](https://github.com/bonlineza/b-lib/blob/master/CHANGELOG.md)
- React Components and base styles
- JS/React Testing suite
- Rollup build system

## Components in this Library
- ActionBar
- AsideSlide
- ButtonGroup
- CategoryList
- DocumentUploader
   - DocumentUploaderProps
- DropOptions
- EllipsisLoader
- Filter
- MobileSideMenu
- Overlay
- PageReady
- Paginator
- SimplePopup
- SwitchView
- ToolTip
- WYSIWYG
- SelectRows
- UntilReady
- MultiLineSelect
- SimpleList
   - Body 
   - ButtonOrDiv 
   - Header 
   - Sections 
   - SimpleItem 
   - SimpleListContext 

### Example Import:

```js
// via full bundle - leads to bigger app sizes
import { ActionBar } from '@bonlineza/b-lib';
// or with tree shaking for slimmer app buundle sizes
import ActionBar from '@bonlineza/b-lib/ActionBar';
```

## Functions in this Library
- constrainSearch
- debounced
- flattenObject
- getMoment
- getTokenFromStorage
- hasOwn
- hasValue
- isObjectEmpty
- moveItemInArray
- parseDate
- removeWhiteSpaces
- replaceUnderscoreWithSpace,
- sanitizeInputForConstraints
- scrollToSelector
- smoothScrollTo,
- snakeCaseTitleCase
- stringOccurances
- usePrevious (Hook)
- toTitleCase
- validateEmail
- validatePhone
- validateWebsite
- errorObjectToString

## Commands
- `yarn` - install npm dependencies
- `yarn start` - Open Storybook
- `yarn docs` - run both lint and tests
- `yarn build` - generate built js files
- `yarn build --watch` - build and watch files
- `yarn test` - run both lint and tests
- `yarn lint` - run linter only
- `yarn jest --watch` - watch tests (reccomended)

### Advanced
- define the Maps API key and run storybook using this command: `STORYBOOK_MAPS_API_KEY=[your long api key] yarn start` - see: (https://storybook.js.org/docs/configurations/env-vars/) for more info

## Testing your local Changes in other Projects
### tl;dr
1. Checkout your Fork of this Repo
2. Run this in the fork root folder: `yarn link`
3. Run this in the root folder of the project you would like to use this module: `yarn link @bonlineza/b-lib`

You will now be able to import this module like any normal npm module like so:

```js
import { SimplePopup } from '@bonlineza/b-lib';
```

## Publish Package
- after testing is complete and your changes have been merged to master in this Library

### Prerequisites
- Your personal account on `NPMJS.com`
- Your Account is added to the `Bonlineza Org` - see: https://www.npmjs.com/org/bonlineza

### Steps:
1. checkout/pull latest UPSTREAM `master` and run...
2. `yarn test`
3. `yarn build`
4. Update your `Package.json` version info
5. Update you `CHANGELOG.MD` and `README.MD` file with relevant info for your new version
6. `yarn login`
7. `npm publish --dry-run` - to confirm that your files will be packaged into the npm repo
8. `npm publish` - commit the published files to the npm repo
9. `yarn docs` - generates all documentation
10. `yarn build:storybook` - ensure static stybook site is uptodate
11. `Commit` and `TAG` this commit with the Tag name the same as the package version number to UPSTREAM `master`


## Testing Changes in Projects (alternative Method)
### tl;dr

Node will resolve to the nearest `/node_modules` containing the package we are importing.

So to test versions against existing projects - we can merely create a `node_modules` folder as a parent of our
current folder and clone the version that we would like to test.

### Using node's resolver to our benefit-
First a thing or two about the Node Resolver-

When we write

```js
import foo from 'bar';
```

node will try to resolve this by appending `/node_modules` to the parent directory and will look for the `bar` folder.

If it is not there, node will search the next parent, and the next, and the next, until it finds a `node_modules/bar` folder.

*webpack aliases and relative paths work a bit different, this behaviour is only for absolute and non-aliased imports*

We can use this design to "override" certain packages.

So if our project has a depedancy on `"b-lib": "1.0.3"` and we would like to test out `b-lib@2.0.0` we can simply to the following-

```sh
# in bash
cd /path/to/project/resources/assets/js
mkdir node_modules
cd node_modules
git clone git@github.com:bonlineza/b-lib --branch 2.0.0
```

Or if we're working on a new feature we'd like to implement in a project and we'd like to take it for a spin for making the pull request
to the `b-lib` we can run...

```sh
# in bash
cd /path/to/project/resources/assets/js
mkdir node_modules
cd node_modules
git clone git@github.com:{author}/b-lib --branch {branch-name}
```
