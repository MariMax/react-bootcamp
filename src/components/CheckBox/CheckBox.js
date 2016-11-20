import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CheckBox.css';

class CheckBoxComponent extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool
  };
  constructor(props){
    super(props);
        this.state = { checked: props.checked||false, id: props.id || (new Date()).valueOf()};

        this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({checked:!this.state.checked});
    //propogate change event
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