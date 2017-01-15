import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TreeItem.css';
import { Link } from '../Link';
import { RemoveConfirmation } from '../RemoveConfirmation';
import {
  expandCategory,
  collapseCategory,
  editCategory,
  addCategory,
} from '../CategoryTree/CategoryActions';
import { reducerName } from '../TaskDetails/taskDetailsReducer';
import { setTaskCategory } from '../TaskDetails/taskDetailsActions';

import { connect } from 'react-redux';

class TreeItemComponent extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      children: PropTypes.array,
      tasks: PropTypes.array,
    }),
    level: PropTypes.number,
    reducerName: PropTypes.string,
    selected: PropTypes.bool,
    query: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { confirm: false };

    this.expandIcon = `<svg width="20" height="20"><use xlink:href="#icon-expand"/></svg>`;
    this.collapseIcon = `<svg width="20" height="20"><use xlink:href="#icon-collapse"/></svg>`;
    this.plusIcon = `<svg width="20" height="20"><use xlink:href="#icon-plus"/></svg>`;
    this.checkIcon = `<svg width="20" height="20"><use xlink:href="#icon-check"/></svg>`;

    this.expandHandle = this.expandHandle.bind(this);
    this.addNested = this.addNested.bind(this);
    this.edit = this.edit.bind(this);
    this.assign = this.assign.bind(this);
    this.remove = this.remove.bind(this);
    this.confirmRemove = this.confirmRemove.bind(this);
    this.closeConfirmation = this.closeConfirmation.bind(this);
  }

  expandHandle(event) {
    event.preventDefault();
    event.stopPropagation();
    const {item, collapseCategory, expandCategory, expanded} = this.props;
    return expanded ? collapseCategory(item.id) : expandCategory(item.id);
  }

  addNested(event) {
    event.preventDefault();
    event.stopPropagation();
    return this.props.addCategory(this.props.item.id, 'new category');
  }

  edit(event) {
    event.preventDefault();
    event.stopPropagation();
    return this.props.editCategory(this.props.item.id);
  }

  assign(event) {
    event.preventDefault();
    event.stopPropagation();
    return this.props.setTaskCategory(this.props.item.id);
  }

  remove(event) {
    return this.props.removeCategory(this.props.item.id);
  }

  confirmRemove(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ confirm: true });
  }

  closeConfirmation() {
    this.setState({ confirm: false });
  }

  render() {
    return (
      <div>
        <Link to={`/Category/${this.props.item.id}${this.props.query}`} id={this.props.item.id} className={`${s.wrapper} ${this.props.selected ? s.selected : ''}`}>
          <button onClick={this.expandHandle} className={s.expand} dangerouslySetInnerHTML={{ __html: this.props.expanded ? this.collapseIcon : this.expandIcon }} />
          {[...(new Array(this.props.level)).keys()].map((i, index) => <div key={index} className={s.deep}></div>)}
          <span className={s.title}>{this.props.item.title}</span>
          {!this.props.assignTask && <button onClick={this.edit} className={s.edit}>edit</button>}
          {!this.props.assignTask && <button onClick={this.confirmRemove} className={s.remove}>remove</button>}
          {!this.props.assignTask && <button onClick={this.addNested} className={s.add} dangerouslySetInnerHTML={{ __html: this.plusIcon }} />}
          {this.props.assignTask && this.props.item.id !== this.props.currentTaskCategory && <button onClick={this.assign} className={s.assign} dangerouslySetInnerHTML={{ __html: this.checkIcon }} />}
        </Link>
        {this.state.confirm && <RemoveConfirmation onConfirm={this.remove} onCancel={this.closeConfirmation} text="Are you sure if you want to remove it?" />}
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  expanded: state[ownProps.reducerName].expanded.find(i => i === ownProps.item.id),
  assignTask: !!state[reducerName],
  currentTaskCategory: state[reducerName] && state[reducerName].categoryId,
});

const mapDispatch = {
  expandCategory,
  collapseCategory,
  editCategory,
  addCategory,
  setTaskCategory,
};

export const TreeItem = connect(mapState, mapDispatch)(withStyles(s)(TreeItemComponent));