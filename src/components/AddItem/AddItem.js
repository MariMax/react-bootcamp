import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddItem.css';
import { MaterialInput } from '../MaterialInput';

class AddItemComponent extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    saveText: PropTypes.string,
    cancelText: PropTypes.string,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    value: PropTypes.string,
    topClass: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { id: props.id || (new Date()).valueOf(), value: this.props.value || '' };

    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);

    this.saveSvg = `<use xlink:href="#icon-check"/>`;
    this.cancelSvg = `<use xlink:href="#icon-close"/>`;
  }

  handleChange(value) {
    this.setState({ value });
  }

  save(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.value) {
      const categoryName = this.state.value;
      this.setState({ value: '' });
      return this.props.onSave(categoryName);
    }
  }

  cancel(event) {
    event.preventDefault();
    event.stopPropagation();
    return this.props.onCancel();
  }

  render() {
    return (
      <div className={s.wrapper}>
        <MaterialInput topClass={this.props.topClass} id={this.state.id} value={this.state.value} onChange={this.handleChange} label={this.props.label} />
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