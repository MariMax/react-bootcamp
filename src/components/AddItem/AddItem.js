import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddItem.css';

class AddItemComponent extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    buttonText: PropTypes.string,
    onClick: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = { id: props.id || (new Date()).valueOf(), value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  save(){
    if (this.state.value){
      const categoryName = this.state.value;
      this.setState({value: ''}); 
      return this.props.onClick(categoryName);
    }
  }

  render() {
    return (
      <div className={s.wrapper}>
        <div className={s['form-control']}>
          <input value={this.state.value} className={this.state.value.length ? s['not-empty'] : ''} type="text" id={this.state.id} onChange={this.handleChange} />
          <label htmlFor={this.state.id}>{this.props.label}</label>
          <div className={s.bar}></div>
        </div>
        <button type="button" onClick={this.save}>{this.props.buttonText}</button>
      </div>
    );
  }
}

export const AddItem = withStyles(s)(AddItemComponent);