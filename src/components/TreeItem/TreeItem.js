import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TreeItem.css';
import { Link } from '../Link';
import {
  expandCategory,
  collapseCategory,
  editCategory,
  addCategory,
} from '../CategoryTree/CategoryActions';
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

    this.expandIcon = `<svg width="20" height="20"><use xlink:href="#icon-expand"/></svg>`;
    this.collapseIcon = `<svg width="20" height="20"><use xlink:href="#icon-collapse"/></svg>`;
    this.plusIcon = `<svg width="20" height="20"><use xlink:href="#icon-plus"/></svg>`;

    this.expandHandle = this.expandHandle.bind(this);
    this.addNested = this.addNested.bind(this);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
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

  remove(event) {
    event.preventDefault();
    event.stopPropagation();
    return this.props.removeCategory(this.props.item.id);
  }

  render() {
    return (
      <Link to={`/Category/${this.props.item.id}${this.props.query}`} id={this.props.item.id} className={`${s.wrapper} ${this.props.selected ? s.selected : ''}`}>
        <button onClick={this.expandHandle} className={s.expand} dangerouslySetInnerHTML={{ __html: this.props.expanded ? this.collapseIcon : this.expandIcon }} />
        {[...(new Array(this.props.level)).keys()].map((i, index) => <div key={index} className={s.deep}></div>)}
        <span className={s.title}>{this.props.item.title}</span>
        <button onClick={this.edit} className={s.edit}>edit</button>
        <button onClick={this.remove} className={s.remove}>remove</button>
        <button onClick={this.addNested} className={s.add} dangerouslySetInnerHTML={{ __html: this.plusIcon }} />
      </Link>
    );
  }
}

const mapState = (state, ownProps) => ({
  expanded: state[ownProps.reducerName].expanded.find(i => i === ownProps.item.id)
});

const mapDispatch = {
  expandCategory,
  collapseCategory,
  editCategory,
  addCategory
};

export const TreeItem = connect(mapState, mapDispatch)(withStyles(s)(TreeItemComponent));