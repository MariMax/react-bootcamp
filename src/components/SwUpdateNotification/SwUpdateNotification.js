import { PropTypes, Component } from 'react';
import { showToaster, toasterTypes } from '../Toaster';
import { connect } from 'react-redux';

class SwUpdateNotificationComponent extends Component {
  componentDidMount() {
    const self = this;
    if (!('serviceWorker' in navigator) || !navigator) {
      return;
    }
    navigator.serviceWorker.onmessage = function (evt) {
      if (typeof evt.data.version !== 'undefined') {
        self.props.showToaster(toasterTypes.success, 'Site is updated, please refresh for better UX');
      };
    }
  }

  render() {
    return null;
  }
}

export const SwUpdateNotification = connect(null, {showToaster})(SwUpdateNotificationComponent);