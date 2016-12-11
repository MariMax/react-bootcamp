import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddItem.css';
import { MaterialInput } from '../MaterialInput';
import { v4 } from 'uuid';

class AddItemComponent extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    saveText: PropTypes.string,
    cancelText: PropTypes.string,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    value: PropTypes.string,
    
    focus: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = { id: props.id || v4(), value: this.props.value || '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleControls = this.handleControls.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);

    this.saveSvg = `<use xlink:href="#icon-check"/>`;
    this.cancelSvg = `<use xlink:href="#icon-close"/>`;
  }

  handleChange(value) {
    this.setState({ value });
  }

  handleControls(event) {
    switch (event.keyCode) {
      case 13: return this.save(event);
      case 27: return this.cancel(event);
    }
  }

  save(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.value) {
      const categoryName = this.state.value;
      this.setState({ value: '' });
      return this.props.onSave && this.props.onSave(categoryName);
    }
  }

  cancel(event) {
    event.preventDefault();
    event.stopPropagation();
    return this.props.onCancel && this.props.onCancel();
  }

  render() {
    return (
      <div className={s.wrapper} onKeyDown={this.handleControls}>
        <MaterialInput focus={this.props.focus} id={this.state.id} value={this.state.value} onChange={this.handleChange} label={this.props.label} />
        {this.props.onSave && <button type="button" onClick={this.save}>
          <svg width="20" height="20" dangerouslySetInnerHTML={{ __html: this.saveSvg }} />
          {this.props.saveText}
        </button>}
        {this.props.onCancel && <button type="button" onClick={this.cancel}>
          <svg width="20" height="20" dangerouslySetInnerHTML={{ __html: this.cancelSvg }} />
          {this.props.cancelText}
        </button>}
      </div>
    );
  }
}

export const AddItem = withStyles(s)(AddItemComponent);