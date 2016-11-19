import React, { PropTypes } from 'react';
import serialize from 'serialize-javascript';

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    style: PropTypes.string,
    script: PropTypes.string,
    chunk: PropTypes.string,
    state: PropTypes.object,
    children: PropTypes.string,
  };

  render() {
    const { title, description, style, script, chunk, state, children } = this.props;
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="apple-touch-icon" sizes="180x180" href="img/icons/apple-touch-icon.png"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="#464547"/>
          <meta name="apple-mobile-web-app-title" content="To Do List"/>
          <link rel="icon" type="image/png" href="img/icons/favicon-32x32.png" sizes="32x32"/>
          <link rel="icon" type="image/png" href="img/icons/favicon-16x16.png" sizes="16x16"/>
          <link rel="mask-icon" href="img/icons/safari-pinned-tab.svg" color="#39c2d7"/>
          <meta name="theme-color" content="#464547"/>
          <meta name="msapplication-TileImage" content="img/icons/mstile-144x144.png"/>
          <meta name="msapplication-TileColor" content="#464547"/>
          <link rel="manifest" href="{{manifest.json|__addHash}}"/>

          {style && <style id="css" dangerouslySetInnerHTML={{ __html: style }} />}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {state && (
            <script
              dangerouslySetInnerHTML={{ __html:
              `window.APP_STATE=${serialize(state, { isJSON: true })}` }}
            />
          )}
          {script && <script src={script} />}
          {chunk && <script src={chunk} />}
        </body>
      </html>
    );
  }
}

export default Html;
