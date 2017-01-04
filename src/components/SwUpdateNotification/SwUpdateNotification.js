import React, { PropTypes, Component } from 'react';
import { Toaster, toasterTypes } from '../Toaster';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles.css';

class SwUpdateNotificationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false }
    this.onClose = this.onClose.bind(this);

    this.closeIcon = `<use xlink:href="#icon-close"/>`;
  }

  onClose() {
    this.setState({ active: false });
  }

  componentDidMount() {
    const self = this;
    let version = null;
    if (!('serviceWorker' in navigator) || !navigator) {
      return;
    }
    navigator.serviceWorker.onmessage = function (evt) {
      if (typeof evt.data.version !== 'undefined') {
        if (!version) {
          version = evt.data.version;
        }
        if (version !== evt.data.version) {
          this.setState({ active: true });
        }
      };
    }
  }

  render() {
    return (
      this.state.active && <Toaster
        onClose={this.onClose}
        active={this.state.active}
        >
        <p>Please refresh for better UX</p>
        <button className={s.close} onClick={this.onClose}>
          <svg width="20" height="20" dangerouslySetInnerHTML={{ __html: this.closeIcon }} />
          close
          </button>
      </Toaster>
    )
  }
}

export const SwUpdateNotification = withStyles(s)(SwUpdateNotificationComponent);