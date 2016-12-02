import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditTreeItem.css';
import { Link } from '../Link';
import { renameCategory, cancelEditCategory, removeCategory } from '../CategoryTree/CategoryActions';
import { connect } from 'react-redux';
import { AddItem } from '../AddItem';

class EditTreeItemComponent extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      children: PropTypes.array,
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
  }

  save(categoryName) {
    const {item, renameCategory} = this.props;
    return renameCategory(item.id, categoryName)
  }

  cancel() {
    if (this.props.item.tmp) {
      return this.props.removeCategory(this.props.item.id);
    }
    return this.props.cancelEditCategory();
  }

  render() {
    return (
      <div id={this.props.item.id} className={`${s.wrapper} ${this.props.selected ? s.selected : ''}`}>
        <AddItem
          id={`${this.props.item.id}_edit`}
          value={this.state.value}
          onSave={this.save}
          onCancel={this.cancel}
          saveText="save"
          cancelText="cancel"
          label="Category title"
          focus={true}
          />
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  selected: state[ownProps.reducerName].selected === ownProps.item.id,
});

const mapDispatch = {
  renameCategory,
  cancelEditCategory,
  removeCategory,
};

export const EditTreeItem = connect(mapState, mapDispatch)(withStyles(s)(EditTreeItemComponent));