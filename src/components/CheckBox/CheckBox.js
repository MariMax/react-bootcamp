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
    this.state = { isChecked: this.props.checked, id: this.props.id || v4() };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.stopEvent = this.stopEvent.bind(this);
  }

  handleCheckboxChange(event) {
    this.setState({ isChecked: event.target.checked });
    this.props.onChange && this.props.onChange(event.target.checked);
  }

  stopEvent(event){
    event.stopPropagation();
  }

  render() {
    return (
      <div className={s.wrapper} onClick={this.stopEvent}>
        <input id={this.state.id} type="checkbox" onChange={this.handleCheckboxChange}
          checked={this.state.isChecked} />
        <label htmlFor={this.state.id} >{this.props.label}</label>
      </div>
    );
  }
}

export const CheckBox = withStyles(s)(CheckBoxComponent);