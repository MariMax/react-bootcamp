import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TreeItem.css';
import { Link } from '../Link';
import { expandCategory, collapseCategory, editCategory } from '../CategoryTree/CategoryActions';
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
    //todo propagate add nested on top level
  }

  edit(event) {
    console.log('edit click');
    event.preventDefault();
    event.stopPropagation();
    return this.props.editCategory(this.props.item.id);
  }

  remove(event) {
    event.preventDefault();
    event.stopPropagation();
    //todo propagate remove on top level
  }

  render() {
    return (
      <Link to={`/Category/${this.props.item.id}`} id={this.props.item.id} className={`${s.wrapper} ${this.props.selected ? s.selected : ''}`}>
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
  expanded: state[ownProps.reducerName].expanded.find(i => i === ownProps.item.id),
  selected: state[ownProps.reducerName].selected === ownProps.item.id,
});

const mapDispatch = {
  expandCategory,
  collapseCategory,
  editCategory
};

export const TreeItem = connect(mapState, mapDispatch)(withStyles(s)(TreeItemComponent));