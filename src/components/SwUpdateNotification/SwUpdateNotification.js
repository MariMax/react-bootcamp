import React, { PropTypes, Component } from 'react';
import { Toaster, toasterTypes } from '../Toaster';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles.css';

class SwUpdateNotificationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false }
    this.onClose = this.onClose.bind(this);
    this.onReload = this.onReload.bind(this);

    this.closeIcon = `<use xlink:href="#icon-close"/>`;
    this.reloadIcon = `<use xlink:href="#icon-reload"/>`;
  }

  onClose() {
    this.setState({ active: false });
  }

  onReload() {
    window.location.reload(true);
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
        <div className={s.buttons}>
          <button onClick={this.onReload}>
            <svg width="15" height="15" dangerouslySetInnerHTML={{ __html: this.reloadIcon }} />
            reload
          </button>
        </div>

      </Toaster>
    )
  }
}

export const SwUpdateNotification = withStyles(s)(SwUpdateNotificationComponent);