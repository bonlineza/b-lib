# Bonline Component Library

Includes:

- Storybook
- Testing suite
- Rollup
- Components and base styles

## Testing Changes in Projects

### tl;dr

1. Checkout your Fork of this Repo
2. Run this in the fork root folder: `yarn link`
3. Run this in the root folder of the project you would like to use this module: `yarn link b-lib`

You will now be able to import this module like any normal npm module like so:

```
import { SimplePopup } from 'b-lib';
```

## When Done with Dev on your Project

1. install module like so: `yarn add https://github.com/youruser/b-lib#yourtag --force`
2. all project tests should pass as before, no other code changes are required

Read more here: [https://yarnpkg.com/lang/en/docs/cli/link/]
