import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';

class HeaderComponent extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <header className={s.wrapper}>
        {this.props.children}
      </header>
    );
  }
}

export const Header = withStyles(s)(HeaderComponent);