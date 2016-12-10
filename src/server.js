import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import routes from './routes';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import { getStoreManager } from './store/storeManager';
import { setRuntimeVariable } from './actions/runtime';
import { port } from './config';
import { Provider } from 'react-redux';

import { treeData } from './components/CategoryTree/treeData';
import { reducerName, categoryReducer } from './components/CategoryTree/CategoryReducer';
import { setData } from './components/CategoryTree/CategoryActions';

import { listData } from './components/TaskList/listData';
import { reducerName as tasksReducerName, taskListReducer } from './components/TaskList/taskListReducer';
import { setData as setTasks } from './components/TaskList/taskListActions';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const storeManager = getStoreManager({
      user: req.user || null,
    }, {
        cookie: req.headers.cookie,
      });

    // storeManager.addReducer(reducerName, categoryReducer, setData(treeData));
    // storeManager.addReducer(tasksReducerName, taskListReducer);
    // treeData.forEach(i => storeManager.dispatch(setTasks(listData(i.id))));

    storeManager.dispatch(setRuntimeVariable({
      name: 'initialNow',
      value: Date.now(),
    }));

    const css = new Set();

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      // Initialize a new Redux store
      // http://redux.js.org/docs/basics/UsageWithReact.html
      storeManager,
    };

    const route = await UniversalRouter.resolve(routes, {
      ...context,
      path: req.path,
      query: req.query,
    });

if (route.redirect) {
  res.redirect(route.status || 302, route.redirect);
  return;
}

const data = { ...route };
data.children = ReactDOM.renderToString(<Provider store={context.storeManager}><App context={context}>{route.component}</App></Provider>);
data.style = [...css].join('');
data.script = assets.main.js;
data.state = context.storeManager.getState();
data.chunk = assets[route.chunk] && assets[route.chunk].js;
const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

res.status(route.status || 200);
res.send(`<!doctype html>${html}`);
  } catch (err) {
  next(err);
}
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      style={errorPageStyle._getCss()} // eslint-disable-line no-underscore-dangle
      >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});

/* eslint-enable no-console */
