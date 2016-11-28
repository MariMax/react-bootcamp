import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditTreeItem.css';
import { Link } from '../Link';
import { renameCategory, cancelEditCategory } from '../CategoryTree/CategoryActions';
import { connect } from 'react-redux';

class EditTreeItemComponent extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      children: PropTypes.array,
      tasks: PropTypes.array,
    }),
    reducerName: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.saveSvg = `<use xlink:href="#icon-check"/>`;
    this.cancelSvg = `<use xlink:href="#icon-close"/>`;
    this.state = { value: this.props.item.title };

    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  save(event) {
    event.preventDefault();
    event.stopPropagation();
    const {item, renameCategory} = this.props;
    return renameCategory(item.id, this.state.value)
  }

  cancel(event) {
    event.preventDefault();
    event.stopPropagation();
    return this.props.cancelEditCategory();
  }

  handleChange(event) {
    this.setState({value:event.target.value});
  }

  render() {
    return (
      <div id={this.props.item.id} className={`${s.wrapper} ${this.props.selected ? s.selected : ''}`}>
        <div className={s['form-control']}>
          <input className={this.state.value.length ? s['not-empty'] : ''} id={`${this.props.item.id}_edit`} type="text" value={this.state.value} onChange={this.handleChange} />
          <label htmlFor={`${this.props.item.id}_edit`}>Category title</label>
          <div className={s.bar}></div>
        </div>

        <button className={s.save} onClick={this.save} type="button">
          <svg width="20" height="20" dangerouslySetInnerHTML={{ __html: this.saveSvg }} />
          save
        </button>
        <button className={s.cancel} onClick={this.cancel} type="button">
          <svg width="20" height="20" dangerouslySetInnerHTML={{ __html: this.cancelSvg }} />
          cancel
        </button>
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  selected: state[ownProps.reducerName].selected === ownProps.item.id,
});

const mapDispatch = {
  renameCategory,
  cancelEditCategory
};

export const EditTreeItem = connect(mapState, mapDispatch)(withStyles(s)(EditTreeItemComponent));