# Bonline Component Library

Includes:

- Storybook
- Testing suite
- Rollup
- Components and base styles

## Components in this Library

- AsideSlide
- ButtonGroup
- DropOptions
- EllipsisLoader
- MobileSideMenu
- Overlay
- PageReady
- PDFPreview
- SimplePopup
- SwitchView
- ToolTip
- WYSIWYG
- SelectRows

## Setup

1. `yarn && yarn start` - To open Storybook

## Commands

- `yarn test` - run both lint and tests
- `yarn lint` - run linter only
- `yarn jest --watch` - watch tests (reccomended)

## Build Package

- this is useful when you need to test a build locally

```
yarn build
```
or
```
yarn build --watch
```

## Testing your local Changes in other Projects

### tl;dr

1. Checkout your Fork of this Repo
2. Run this in the fork root folder: `yarn link`
3. Run this in the root folder of the project you would like to use this module: `yarn link b-lib`

You will now be able to import this module like any normal npm module like so:

```
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

```
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

```
# in bash
cd /path/to/project/resources/assets/js

mkdir node_modules

cd node_modules

git clone git@github.com:bonlineza/b-lib --branch 2.0.0
```

Or if we're working on a new feature we'd like to implement in a project and we'd like to take it for a spin for making the pull request
to the `b-lib` we can run...

```
# in bash
cd /path/to/project/resources/assets/js

mkdir node_modules

cd node_modules

git clone git@github.com:{author}/b-lib --branch {branch-name}
```

