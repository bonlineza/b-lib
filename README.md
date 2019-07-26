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

## Build Package

- this is useful when you need to test a build locally

```
yarn build
```
or
```
yarn build --watch
```

## Publish Package

- after testing is complete and it's ready for other projects to consume

### Prerequisites
- An account on NPMJS.com
- Account is added to the Bonlineza Org

```
yarn run build:publish
``` 

*Note: you will be prompted to login with your username/email/password and for the new version number at the CLI
