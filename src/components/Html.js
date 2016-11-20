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
          <meta name="apple-mobile-web-app-status-bar-style" content="#FFFFFF"/>
          <meta name="apple-mobile-web-app-title" content="To Do List"/>
          <link rel="icon" type="image/png" href="img/icons/favicon-32x32.png" sizes="32x32"/>
          <link rel="icon" type="image/png" href="img/icons/favicon-16x16.png" sizes="16x16"/>
          <link rel="mask-icon" href="img/icons/safari-pinned-tab.svg" color="#39c2d7"/>
          <meta name="theme-color" content="#FFFFFF"/>
          <meta name="msapplication-TileImage" content="img/icons/mstile-144x144.png"/>
          <meta name="msapplication-TileColor" content="#FFFFFF"/>
          <link rel="manifest" href="{{manifest.json|__addHash}}"/>

          {style && <style id="css" dangerouslySetInnerHTML={{ __html: style }} />}
        </head>
        <body>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', width: 0, height: 0}}>
            <symbol id="icon-plus" viewBox="0 0 20 20">
              <path d="M16 10c0 0.553-0.048 1-0.601 1h-4.399v4.399c0 0.552-0.447 0.601-1 0.601s-1-0.049-1-0.601v-4.399h-4.399c-0.552 0-0.601-0.447-0.601-1s0.049-1 0.601-1h4.399v-4.399c0-0.553 0.447-0.601 1-0.601s1 0.048 1 0.601v4.399h4.399c0.553 0 0.601 0.447 0.601 1z"></path>
            </symbol>
            <symbol id="icon-chevron-left" viewBox="0 0 20 20">
              <path fill="currentColor" d="M13.891 17.418c0.268 0.272 0.268 0.709 0 0.979s-0.701 0.271-0.969 0l-7.83-7.908c-0.268-0.27-0.268-0.707 0-0.979l7.83-7.908c0.268-0.27 0.701-0.27 0.969 0s0.268 0.709 0 0.979l-7.141 7.419 7.141 7.418z"></path>
            </symbol>
            <symbol id="icon-chevron-right" viewBox="0 0 20 20">
              <path fill="currentColor" d="M13.25 10l-7.141-7.42c-0.268-0.27-0.268-0.707 0-0.979 0.268-0.27 0.701-0.27 0.969 0l7.83 7.908c0.268 0.271 0.268 0.709 0 0.979l-7.83 7.908c-0.268 0.271-0.701 0.27-0.969 0s-0.268-0.707 0-0.979l7.141-7.417z"></path>
            </symbol>
            <symbol id="icon-logout" viewBox="0 0 20 20">
              <path fill="currentColor" d="M19 10l-6-5v3h-7v4h7v3l6-5zM3 3h8v-2h-8c-1.1 0-2 0.9-2 2v14c0 1.1 0.9 2 2 2h8v-2h-8v-14z"></path>
            </symbol>
            <symbol id="icon-check" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9 16.172l10.594-10.594 1.406 1.406-12 12-5.578-5.578 1.406-1.406z"></path>
            </symbol>
            <symbol id="icon-fb" viewBox="0 0 32 32">
              <path fill="currentColor" d="M19 6h5v-6h-5c-3.86 0-7 3.14-7 7v3h-4v6h4v16h6v-16h5l1-6h-6v-3c0-0.542 0.458-1 1-1z"></path>
            </symbol>
            <symbol id="icon-search" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9.516 14.016c2.484 0 4.5-2.016 4.5-4.5s-2.016-4.5-4.5-4.5-4.5 2.016-4.5 4.5 2.016 4.5 4.5 4.5zM15.516 14.016l4.969 4.969-1.5 1.5-4.969-4.969v-0.797l-0.281-0.281c-1.125 0.984-2.625 1.547-4.219 1.547-3.609 0-6.516-2.859-6.516-6.469s2.906-6.516 6.516-6.516 6.469 2.906 6.469 6.516c0 1.594-0.563 3.094-1.547 4.219l0.281 0.281h0.797z"></path>
            </symbol>
            <symbol id="icon-close" viewBox="0 0 24 24">
              <path fill="currentColor" d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
            </symbol>
          </svg>

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
