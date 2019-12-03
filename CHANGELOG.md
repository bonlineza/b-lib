
## Changelog
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

