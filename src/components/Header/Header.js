import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import {Link} from '../Link';

class HeaderComponent extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    this.logo = `<svg width="35" height="35"><use xlink:href="#icon-logo"/></svg>`;
    return (
      <header className={s.wrapper}>
        <Link to={'/'} dangerouslySetInnerHTML={{ __html: this.logo }}/>
        {this.props.children}
      </header>
    );
  }
}

export const Header = withStyles(s)(HeaderComponent);