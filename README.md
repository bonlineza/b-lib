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
