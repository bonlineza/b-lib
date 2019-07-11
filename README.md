# StoryBook Boilerplate

Simple boilerplate to kickstart your styleguide endeavors with [StoryBook](https://storybook.js.org)

Includes:

- Jest Tests configured with coverage
- Prettier
- Babel Config
- Sample config for storybook

## Install

```bash
git clone git@github.com:SaraVieira/storybook-boilerplate.git
cd storybook-boilerplate
rm -rf .git
yarn
yarn start
```

## Update to your info

```bash
git remote add origin git@github.com:YourUsername/YourRepo.git
```

Also make sure to update the package.json with your info

License: MIT

## Testing Changes in Projects

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

