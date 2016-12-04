import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { v4 } from 'uuid';
import s from './Toaster.css';
import { connect } from 'react-redux';

let stateName = 'Toaster';

const SHOW_TOASTER = 'SHOW_TOASTER';
const HIDE_TOASTER = 'HIDE_TOASTER';

export const showToaster = (type, message, autoclose) => ({ type: SHOW_TOASTER, payload: { message, type, autoclose } });
export const hideToaster = _ => ({ type: HIDE_TOASTER });

export const toasterTypes = {
  success: 'success',
  warning: 'warning',
  error: 'error',
}

const reducer = (state = { active: false, message: ``, type: '', autoclose: 7000 }, action) => {
  switch (action.type) {
    case SHOW_TOASTER:
      return {
        ...state,
        active: true,
        message: action.payload.message,
        type: action.payload.type,
        autoclose: action.payload.autoclose,
      }

    case HIDE_TOASTER:
      return {
        ...state,
        active: false,
      }

    default:
      return state;
  }
}

class ToasterComponent extends Component {
  static propTypes = {
    stateName: PropTypes.string.isRequired
  }

  static defaultProps = {
    type: toasterTypes.success,
    active: false,
    message: '',
    autoclose: 7000,
  }

  static contextTypes = { storeManager: PropTypes.object };

  constructor(props) {
    super(props);

    this.closeIcon = `<use xlink:href="#icon-close"/>`;
  }

  componentWillMount() {
    this.context.storeManager.addReducer(this.props.stateName, reducer);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active === true && nextProps.autoclose > 0) {
      setTimeout(this.props.hideToaster, nextProps.autoclose);
    }
  }

  render() {
    return (
      <div className={`${s.wrapper} ${this.props.active && s.active}`} role="alert" aria-hidden="true">
        <div className={`${s.toast} ${s[this.props.type]}`}>
          <p>{this.props.message}</p>
          <button className={s.close} onClick={this.props.hideToaster}>
            <svg width="20" height="20" dangerouslySetInnerHTML={{ __html: this.closeIcon }} />
            close
          </button>
        </div>
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  active: state[stateName] && state[stateName].active,
  autoclose: state[stateName] && state[stateName].autoclose,
  message: state[stateName] && state[stateName].message,
  type: state[stateName] && state[stateName].type || toasterTypes.success,
});

export const Toaster = connect(mapState, {
  hideToaster
})(withStyles(s)(ToasterComponent));