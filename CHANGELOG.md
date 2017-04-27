# Change log

<a name="2.0.0"></a>
## [2.0.0](https://github.com/dunbarcyber/cyclops/compare/1.0.0...2.0.0)

### Added

- Client code coverage in HTML format by running `npm run coverage`.
- Client code coverage pushed to coveralls through travis ci.
- `nodemon.json` configuration file.
- npm coverage scripts outlined in the sphinx documentation.
- `CYPHON_API_VERSION` environment variable.
- Chrome push notifications. Configured by adding `GCM_SENDER_ID` to `cyclops.env` after registering an application on [Firebase](https://firebase.google.com/). More information can be found in the documentation.
- ES6 pollyfills to webpack entry points.
- Webpack entry point for tests.
- React application root file `src/app/index.tsx`.

### Changed

- Updated documentation to reflect new folder structure and npm scripts.
- Server source code is now compiled through ts-node and served in memory instead of outputing javascript source files into `build`.
- Webpack now outputs to `dist` instead of `build`.
- Server source files moved from `src/express` to `server`.
- React application source files moved from `src/react` to `src`.
- Scss source files moved from `src/scss` to `src/styles`.
- `constants.js` renamed to `cyclops.config.ts`.
- Environment configuration variables moved from `server/constants.ts` to `cyclops.config.ts`.
- npm scripts which are outlined in the documentation.
- Removed the build step from `Dockerfile`. It's now done automatically via `postinstall` in `package.json`.
- Webpack config rewritten in typescript.
- Karma config rewritten in typescript.
- Moved server `tsconfig.json` to root.
- Webpack entry point `src/main.ts`.
- Location of API docs moved to `api-docs`.

### Removed

- server code coverage removed in order to add coverage to coveralls and to possibly deprecate the express server and instead serve Cyclops through the Cyphon system to lessen code complexity.
- `CYPHON_API_PATH` environment variable.

<a name="1.0.0"></a>
## [1.0.0](https://github.com/dunbarcyber/cyclops/releases/tag/1.0.0)