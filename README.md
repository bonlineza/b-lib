# Bonline Component Library
### Includes:
- Storybook
- Testing suite
- Rollup
- Components and base styles

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
- PDFPreview
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

## Functions in this Library
- constrainSearch
- sanitizeInputForConstraints
- parseDate
- getMoment
- flattenObject
- getTokenFromStorage
- hasOwn
- smoothScrollTo,
- scrollToSelector
- stringOccurances
- validateEmail
- validatePhone
- validateWebsite

## Setup
1. `yarn` - install dependencies
2. `yarn start` - To open Storybook

### Advanced
- define the Maps API key and run storybook using this command: `STORYBOOK_MAPS_API_KEY=[you long api key] yarn start` - see: (https://storybook.js.org/docs/configurations/env-vars/) for more info

## Commands
- `yarn test` - run both lint and tests
- `yarn lint` - run linter only
- `yarn jest --watch` - watch tests (reccomended)

## Build Package
- this is useful when you need to test a build locally

```sh
yarn build
```
or
```sh
yarn build --watch
```

## Testing your local Changes in other Projects
### tl;dr
1. Checkout your Fork of this Repo
2. Run this in the fork root folder: `yarn link`
3. Run this in the root folder of the project you would like to use this module: `yarn link b-lib`

You will now be able to import this module like any normal npm module like so:

```javascript
import { SimplePopup } from 'b-lib';
```

## When Done with Dev on your Project
1. Ensure the PR was merged and master was re-deployed
2. install module like so: `yarn add https://github.com/bonlineza/b-lib#newtag --force`
3. Ensure all project tests pass as before

Read more here: [https://yarnpkg.com/lang/en/docs/cli/link/]

## Publish Package
- after testing is complete and it's ready for other projects to consume

### Prerequisites
- An account on NPMJS.com
- Account is added to the Bonlineza Org

```sh
yarn run build:publish
``` 

*Note: you will be prompted to login with your username/email/password and for the new version number at the CLI

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

## Changelog
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
