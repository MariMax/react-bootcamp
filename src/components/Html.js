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

          <link rel="apple-touch-icon" sizes="180x180" href="/img/icons/apple-touch-icon.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#FFFFFF" />
          <meta name="apple-mobile-web-app-title" content="To Do List" />
          <link rel="icon" type="image/png" href="/img/icons/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/img/icons/favicon-16x16.png" sizes="16x16" />
          <link rel="mask-icon" href="/img/icons/safari-pinned-tab.svg" color="#39c2d7" />
          <meta name="theme-color" content="#FFFFFF" />
          <meta name="msapplication-TileImage" content="/img/icons/mstile-144x144.png" />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <link rel="manifest" href="/manifest.json?__addHash" />

          {style && <style id="css" dangerouslySetInnerHTML={{ __html: style }} />}
        </head>
        <body>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: 0, height: 0 }}>
            <symbol id="icon-plus" viewBox="0 0 20 20">
              <path fill="currentColor" d="M16 10c0 0.553-0.048 1-0.601 1h-4.399v4.399c0 0.552-0.447 0.601-1 0.601s-1-0.049-1-0.601v-4.399h-4.399c-0.552 0-0.601-0.447-0.601-1s0.049-1 0.601-1h4.399v-4.399c0-0.553 0.447-0.601 1-0.601s1 0.048 1 0.601v4.399h4.399c0.553 0 0.601 0.447 0.601 1z"></path>
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
            <symbol id="icon-collapse" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 8.016l6 6-1.406 1.406-4.594-4.594-4.594 4.594-1.406-1.406z"></path>
            </symbol>
            <symbol id="icon-expand" viewBox="0 0 24 24">
              <path fill="currentColor" d="M16.594 8.578l1.406 1.406-6 6-6-6 1.406-1.406 4.594 4.594z"></path>
            </symbol>
            <symbol id="icon-logo" viewBox="0 0 35 35">
              <g fill="none" fill-rule="evenodd">
                <path d="M34.65 25.64H15.2c-.15 0-.27.18-.27.4 0 .23.12.42.27.42h19.45c.15 0 .28-.2.28-.4 0-.24-.13-.42-.28-.42z" fill="#A3C644" />
                <path d="M15.33 28.08h13.85c.23 0 .4-.18.4-.4 0-.23-.18-.4-.4-.4H15.33c-.22 0-.4.17-.4.4 0 .22.18.4.4.4z" fill="#39C2D7" />
                <path d="M15.33 29.7h13.85c.23 0 .4-.17.4-.4 0-.22-.18-.4-.4-.4H15.33c-.22 0-.4.18-.4.4 0 .23.18.4.4.4z" fill="#A3C644" />
                <path d="M6.63 34.05c3.16 0 5.74-2.58 5.74-5.75 0-.1 0-.2-.02-.3-.08-.43-.5-.72-.95-.65-.44.08-.74.5-.66.95 0 2.27-1.85 4.12-4.12 4.12S2.5 30.57 2.5 28.3c0-2.27 1.85-4.12 4.13-4.12.35 0 .7.05 1 .14.44.13.9-.12 1.02-.55.12-.44-.13-.9-.56-1-.47-.15-.97-.22-1.47-.22-3.18 0-5.75 2.58-5.75 5.75s2.57 5.75 5.75 5.75z" fill="#39C2D7" />
                <path d="M15.2 5.42h19.45c.15 0 .28-.18.28-.4 0-.23-.13-.4-.28-.4H15.2c-.15 0-.27.17-.27.4 0 .22.12.4.27.4z" fill="#A3C644" />
                <path d="M15.33 7.05h13.85c.23 0 .4-.18.4-.4 0-.23-.18-.4-.4-.4H15.33c-.22 0-.4.17-.4.4 0 .22.18.4.4.4z" fill="#39C2D7" />
                <path d="M15.33 8.68h13.85c.23 0 .4-.18.4-.4 0-.23-.18-.4-.4-.4H15.33c-.22 0-.4.17-.4.4 0 .22.18.4.4.4zM13.3 1.2c-.28-.28-.72-.28-1 0L6.6 6.9 4.85 5.2c-.24-.25-.65-.25-.9 0l-.23.23c-.26.26-.26.67-.02.9l2.43 2.44c.25.25.66.24.9 0l.1-.1.13-.14 6.2-6.2c.27-.26.27-.7 0-1l-.16-.13z" fill="#A3C644" />
                <path d="M6.63 13c3.16 0 5.74-2.57 5.74-5.74 0-.1 0-.18-.02-.28-.08-.44-.5-.73-.95-.66-.44.08-.74.5-.66.94 0 2.28-1.85 4.13-4.12 4.13-2.27-.02-4.12-1.87-4.12-4.14 0-2.27 1.85-4.1 4.13-4.1.35 0 .7.04 1 .13.44.1.9-.13 1.02-.57.12-.43-.13-.88-.56-1-.47-.14-.97-.2-1.47-.2C3.44 1.52.88 4.1.88 7.25.88 10.43 3.44 13 6.63 13z" fill="#39C2D7" />
              </g>
            </symbol>
          </svg>

          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {state && (
            <script
              dangerouslySetInnerHTML={{
                __html:
                `window.APP_STATE=${serialize(state, { isJSON: true })}`
              }}
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
