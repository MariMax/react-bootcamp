import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RemoveConfirmation.css';
import { Toaster, toasterTypes } from '../Toaster';


class RemoveConfirmationComponent extends Component {
  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    text: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = { active: true }
    this.onClose = this.onClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this);

    this.closeIcon = `<use xlink:href="#icon-close"/>`;
    this.checkIcon = `<use xlink:href="#icon-check"/>`;
  }

  onClose() {
    this.setState({ active: false });
    this.props.onCancel();
  }

  onConfirm() {
    this.setState({ active: false });
    this.props.onConfirm();
  }

  render() {
    return (
      this.state.active && <Toaster
        autoclose={0}
        onClose={this.onClose}
        active={this.state.active}
        type={toasterTypes.error}
        >
        <p>{this.props.text}</p>
        <div className={s.buttons}>
          <button onClick={this.onClose}>
            <svg width="20" height="20" dangerouslySetInnerHTML={{ __html: this.closeIcon }} />
            close
          </button>
          <button onClick={this.onConfirm}>
            <svg width="20" height="20" dangerouslySetInnerHTML={{ __html: this.checkIcon }} />
            confirm
          </button>
        </div>
      </Toaster>
    )
  }
}

export const RemoveConfirmation = withStyles(s)(RemoveConfirmationComponent);