import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Toaster.css';

export const toasterTypes = {
  success: 'success',
  warning: 'warning',
  error: 'error',
}

class ToasterComponent extends Component {
  static propTypes = {
    type: PropTypes.string,
    autoclose: PropTypes.number,
    onClose: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: toasterTypes.success,
    autoclose: 7000,
  }

  constructor(props) {
    super(props);
    this.state = {active: false};
    // this.closeIcon = `<use xlink:href="#icon-close"/>`;
  }

  timeout(){
    this.setState({active:false});
    setTimeout(()=>this.props.onClose(), 300);
  }

  componentDidMount() {
    setTimeout(()=>this.setState({active: this.props.active}), 300);
    if (this.props.autoclose > 0) {
      setTimeout(()=>this.timeout(), this.props.autoclose-300);
    }
  }

  render() {
    return (
      <div className={`${s.wrapper} ${this.state.active && s.active}`} role="alert" aria-hidden="true">
        <div className={`${s.toast} ${s[this.props.type]}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export const Toaster = withStyles(s)(ToasterComponent);