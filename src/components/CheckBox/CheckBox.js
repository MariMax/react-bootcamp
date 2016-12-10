import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { v4 } from 'uuid';
import s from './CheckBox.css';

class CheckBoxComponent extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    id: PropTypes.string,
  };

  static defaultProps = {
    checked: false,
    label: '',
  }

  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked, id:  this.props.id || v4()};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ checked: !this.state.checked });
    this.props.onChange && this.props.onChange(this.state.checked);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.checked !== nextProps.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  render() {
    return (
      <div className={s.wrapper}>
        <input id={this.state.id} type="checkbox" onChange={this.handleChange} checked={this.state.checked} />
        <label htmlFor={this.state.id}>{this.props.label}</label>
      </div>
    );
  }
}

export const CheckBox = withStyles(s)(CheckBoxComponent);