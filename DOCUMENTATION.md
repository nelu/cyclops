# Cyclops Internal Documentation

This documentation outlines the modules that make up the express server and react application. Even though they're two completely different

## Important Files/Directories

### Project Constants

There is a file located at the root of the project named `constants.js` with a Typescript definition file named `constants.d.ts`. This file contains project wide constants that are shared between the `src` and `webpack` directories and constants that keep track of the directory structure off the root of the project.

If a directory name is changed or becomes a subdirectory, then all the developer would has to do is record that change in the `constants.js` file so it's changed throughout the project.

### Webpack Directory

The `webpack` directory contains the webpack configrations for both production and development environments.

It's very important that this directory stays at the root of the project unless it absolutely needs to move. The express server uses some of the constants outlined in `webpack/constants.js`, such as the output public path so that URL routes for webpack bundles are reflected accurately on the server. This is detailed more in Mirrored Express Directories.


### Build Directory

The `build` directory is the output folder for any compiler output, whether it be compiled Typescript, Webpack files, or Sass. It's ignored by git so there are not conflicts whenever the source is compiled. The resulting structure of the build process in it's current state looks like this:

```
|-- express/
|  |-- (express source directory structure)
|
|-- static/
|  |-- css/
|     |-- main.css
|
|-- webpack/
|  |-- bundles/
|  |  |-- app.js
|  |
|  |-- fonts/
|     |-- (bundled fonts)
```

The process that makes this is talked about more in the Build Process section.

## Architecture Choices

This section will hopefully explain some design choices that were made on this project in case there are any questions or if there are any future design choices that would like some reference.

### Express Server

Most React Applications that involve seperate express servers are made to deal with Isomorphic Single Page Applications, but that's not the case with this project. Isomorphic was never the goal. It just didn't make sense to load the entire react application into the browser then display a login page. That's a lot of unnecessary resource loading before the user can even access the other 98% of the application.

Having authentication handled in the react application also adds more complexity to the application architecture. The API token needs to be saved in the user's browser, then brought up on application load, then each route change needs to be watched and checked for authentication, etc. When I decided to add the Express server, the user information was saved in their session, I wrote some middleware to check for authentication base on their session, and then I just denied access to the entire application if they weren't logged in.

If there are entire pages of the application that need to be blocked base on user permissions, then this also gives me the option to create another webpack entry point and hide that behind an express route.

It also has the added benefit of being able to load application dependent variables before rendering the application page, then injecting them into the application. This has a lot of handy uses, such as being able to change the Cyphon URL without having to rebuild the entire React Application.

### Express Cyphon API Proxy

Why is there a proxy on the express server that proxies requests to the Cyphon API? Wouldn't it be easier to just have the React Application communicate directly with the Cyphon isntance? I thought this was the case until we started setting up Cyclops for docker. The Cyphon instance URL was `http://cyphon:8000`, which wouldn't work from the browser. This means that two environment variables had to be used when starting the Express server: one for the Cyphon URL used to authenticated the Express server with Cyphon, and one for the React application to communicate with the Cyphon instance. This seemed unnecessary and possibly confusing to users who just want a plug and play experience.

The other developer I work with suggested using the Express server as a proxy which fixed this issue. It also had the added benefit of hiding the users API token on the Express server. The React Application never has to see it.

### Typescript Express

Converting the express codebase to Typescript adds another level of complexity and is something I wanted to avoid once I decided to add the server. There was one day though when I needed to add a new injected variable into the React application. I had to carefully triple check all my javascript files for the server to make sure that the necessary variables were passed correctly from all the middlewares to the application route. I ended up changing around 10 files to add one variable.

Since this was such a painstaking process for one variable, I thought about how handy it would be if the interface for the injected variables I used on the React application was also used in the Express server. The Typescript compiler would catch any missing passed in variable.

This did have the downside of creating a coupling between the source file directory structure and the build file directory structure, which is outlined in Mirrored Express Directories.

## Directory Restructuring

The directory structure is pretty tightly coupled to the build system. If you plan on changing any of the directories around, make sure to read this first.

### Mirrored Express Directories

Whenever the Express source files from `src/express` get compiled into javascript at `build/express`, the directory structure and depth is mirrored in reference to the root of the project. This was done intentionally because during the process of transitioning the Express codebase to Typescript the build system created a directory structure that looked like this whenever the `allowJs` flag in the `tsconfig.json` was set to `false`.

```
|-- constants.js
|
|-- webpack/
|  |-- constants.js
|
|-- src/
|  |-- express/
|     |-- (express source directory structure)
```

Since I have the express source files using projects variables declared in `constants.js` and webpack variables declared in `webpack/constants.js`, it copied the directory structure from the root so it could copy the javascript files into the build while keeping the import structure the same.

I didn't like the idea of having two copies of the same config file in the same project, and I didn't like the idea of having to recompile the express source code whenever a constant was changed in either of those files. This meant that I would have to set the `allowJs` flag to `true` in my `tsconfig.json` file to prevent the compiler from copying the two outside constant files and then make sure that the import paths stayed the same. This is why the `build/express` directory has the same directory name and depth as `src/express`.

There was the possibility of transferring the `webpack` and root `constants.js` file into the `src` directory and turning them into pure Typescript files so the entire directory kept the same structure after compilation, but this added too much complexity for the build process. I would have to ensure the webpack configurations were compiled before running the webpack process for the react source files. In the current structure, I can compile the `react`, `express`, and `scss` folders concurrently without any dependencies on one another, which allow for less mistakes for the end user.

If you plan on changing or modifiying the location of either of these directories, the `webpack` directory, or the root project `constants`, keep this in mind and plan accordingly.

## Build Process

Cyclops source files are divided into three directories: `express`, `react`, and `scss`. All of these directories compile into the main build directory `build`. The build process is activated when either the `npm run dev` or `npm run build` commands are called.

### Express

The express server is written in Typescript and compiles into ES6 javascript. The output is placed in the directory `build/express` and retains the same directory structure as it's source directory. When you runs `server:dev` or `server:prod` it looks for the `server.js` file in this directory.

### React

The react application is a collection of Typescript modules connected by a singular webpack entry point: `src/react/app.tsx`. Webpack bundles everything from that entry point and places it into the directory `build/webpack`. The application bundle output is ES5 javascript and is placed in `build/webpack/bundles/app.js`. Any other bundled resources are placed in a subdirectory of `build/webpack` that describes it's contents.

Webpack configurations can be found in the directory `webpack`. The one used depends on the `NODE_ENV` environment variable. If `NODE_ENV=DEV` then the webpack configuration at `webpack/webpack.dev.config.js` is used. If `NODE_ENV=PROD` then the webpack configuration at `webpack/webpack.prod.config.js` is used.

#### `npm run dev` VS `npm run build`

There is a slight difference between the compiled webpack bundles when these commands are run.
 
 When `build` is run, the webpack configuration at `webpack/webpack.prod.config.js` is used which minifies and optimizes the application bundle at `build/webpack/bundle/app.js`, resulting in a smaller file size at the expense of a longer compile time.
 
 `dev` uses the webpack configuration at `webpack/webpack.dev.config.js`, which leaves the bundled sources as they are, resulting in a much quicker compile time at the expense of a much larger file size.
 
 Always run `build` for production environments and `dev` for development environments.

### SCSS

The application uses a singular CSS file across all it's pages thats compiled from the sass file `src/scss/app.scss`. The output is placed in a file named `main.css` in the directory `build/static/css`. It currently includes the path `node_modules/bootstrap-sass/assets/stylesheets` when compiling so it can take advantage of bootstrap styling and components.

## NPM Scripts

### `build:css`

### `build:express`

### `watch:css`

### `watch:express`

### `server:dev`

### `server:prod`

### `webpack:dev`

### `webpack:prod`

### `docs`

### `livereload`

### `clean`

### `build`

### `dev`

## Redux

While developing with redux I went through a few different file architectures. At first I seperated the actions, action types, and reducers into their own files because that's what's recommended by the developers who created Redux. The rationale for this is that multiple reducers can handle the same action, so it's good to seperate out the concerns. The problem is that 98% of my actions across the entire application were not used in mutltiple reducers. I would end up jumping between a bunch of different files that were already closely coupled to create or modify one action.

This is when I adapted the proposal [Ducks: Redux Reducer Bundles](https://github.com/erikras/ducks-modular-redux). This places all the action types, actions, and reducers into one file, and then exports the actions and reducer. When an action needs to be used in another reducer, then the action type is exported.

I had to modify this architecture to fit into Typescripts Type system. I wanted everything to fit into the same file, but I also wanted to make sure that every action and the main reducer was type checked, so I ended up making small bundles within the file that contained an action, it's interface, and the associated handler in the reducer.

The first thing to do in the file is to define the reducer's state interface and initial state, because they will be used in each bundle.

```
/**
 * Interface for the returned state from this files reducer. This is
 * exported so that it can be put onto the interface for the entire
 * redux store. This creates accurate type checking whenever
 * store.getState() is called.
 */
export interface ExampleState {
  name?: string;
  count?: number;
}

/**
 * Initial state for this files reducer.
 */
const INITIAL_STATE: ExampleState = {
  name: '',
  count: 0,
};
```

Then we define a reducer map, which are from the [redux actions](https://github.com/acdlite/redux-actions) package, and a string constant that will be used to prefix any action names created in this file. This is mainly to differentiate from other reducer bundles so there aren't any action name conflicts.

```
const reducerMap: ReducerMap<ExampleState, any> = {};
const ACTION_PREFIX = 'EXAMPLE';
```

Now we create our first action/reducer handler bundle, which looks like this:

```
// -----------------------------------------------------------------
// Change Name
// -----------------------------------------------------------------

/**
 * Action type for the action. Export this if this action is used in
 * another reducer.
 */
const CHANGE_NAME: string = `${ACTION_PREFIX}/CHANGE_NAME`;

/**
 * Payload interface for the action. I try to enforce all payloads
 * to be an object because it makes it easier to add or remove any
 * new properties. It also forces any action creator function
 * to only take one argument, which makes it easier to enforce
 * a singular interface for creating actions.
 */
interface ActionPayload {
  name: string;
}

/**
 * Action creator function for the action type. This uses the helper
 * function createAction which is located at
 * /src/react/modules/shared/helpers/utils.ts.
 * It's based off of redux-actions createAction function, which
 * I don't use because the Typescript compiler returns an action
 * creator with a complex type based on the number of arguments it
 * takes. This function only takes one argument, the action type,
 * and returns an action creator that only takes one argument, the
 * action payload. This simplifies the returned type drastically.
 */
export const changeName = createAction<ActionPayload>(CHANGE_NAME);

/**
 * Reducer function that handles the action. This uses the Reducer
 * type in @types/redux-actions to type check, and uses the helper
 * function assign located at
 * src/react/modules/shared/helpers/utils.ts to modify the
 * existing state with the new state.
 */
const changeNameReducer:
  Reducer<ExampleState, ActionPayload> =
  (state, action) => assign<ExampleState>(state, {
    name: action.payload.name,
  });

/**
 * The final step is to map the reducer function to the reducer map,
 * which will be exported at the bottom of the file.
 */
reducerMap[CHANGE_NAME] = changeNameReducer;
```

I typically like to include the name of the action at the top of action/reducer handler bundle to give some sort of visual separation between bundles.

After all these bundles, I then write out any Thunk actions that use these actions.

```
/**
 * This function returns a thunk action that makes an ajax request to
 * get the name for the current state. It uses the custom type
 * ThunkActionPromise, which is a located at
 * src/react/modules/app/appTypes.ts. It's a standardized version
 * of the ThunkAction type from @types/redux-thunk that returns a
 * promise that returns void.
 */
export function getName(): ThunkActionPromise {
  return (dispatch) => {
    // Make an ajax request to get the name for the current state.
    return ajaxRequest.getName()
      .then((response) => {
        // Dispatch the previous action we created.
        dispatch(changeName({ name: response.data.name }));
      });
  };
}
```

Then after all the thunk actions are written, the main reducer is created
and exported using redux-actions [handleActions](https://github.com/acdlite/redux-actions#handleactionsreducermap-defaultstate) function.

```
/**
 * This is the main reducer for the file. It's created using
 * redux-actions handleActions function.
 */
export const exampleReducer =
  handleActions<ExampleState, any>(reducerMap, INITIAL_STATE);
```

### Redux with Typescript

Most of redux plays well with Typescripts type system. Creating 

Redux reducer functions are inherently flexible. In a typed based system, this is a problem since it's difficult to track what kind of data is passed into the function.

### Container Placement

I've placed redux containers on react router Route components only. I've found this to be the easiest way to keep track of data flow for a few reasons.

* **One Source of Truth:** Keeping the data sources confined to routes means that a developer can start at one file, `Routes.tsx`, and work his way down the property tree to see where a particular component for a page is getting their property data from.
* **Inject Route Parameters:** The Route components inject properties into the components passed to them. This means that only containers will deal with route parameters, creating an understanding that if a developer needs to change route parameters they should look at Container elements.

