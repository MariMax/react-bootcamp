import React, { PropTypes } from 'react';
import history from '../../core/history';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export class Link extends React.Component {
  static propTypes = {
    to: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    this.props.to && history.push(this.props.to);
  };

  render() {
    const { to, children, ...props } = this.props;
    return <a href={to||''} {...props} onClick={this.handleClick}>{children}</a>;
  }
}
