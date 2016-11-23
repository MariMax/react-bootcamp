import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TreeItem.css';

class TreeItemComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    id: PropTypes.string,
    selected: PropTypes.bool,
    expandable: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state={collapsed:true, listView:true, selected:this.props.selected, edit:false};

    this.expandIcon = `<svg width="20" height="20"><use xlink:href="#icon-expand"/></svg>`;
    this.collapseIcon = `<svg width="20" height="20"><use xlink:href="#icon-collapse"/></svg>`;
    this.plusIcon = `<svg width="20" height="20"><use xlink:href="#icon-plus"/></svg>`;

    this.expandHandle = this.expandHandle.bind(this);
    this.addNested = this.addNested.bind(this);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
  }

  expandHandle(event){
    event.stopPropagation();
    this.setState({collapsed:!this.state.collapsed});
    //todo propagate collapsed on top level
  }

  addNested(event){
    event.stopPropagation();
    //todo propagate add nested on top level
  }
  edit(event){
    event.stopPropagation();
    //todo propagate edit on top level
  }
  remove(event){
    event.stopPropagation();
    //todo propagate remove on top level
  }

  render() {
    return (
      <div id={this.props.id} className={`${s.wrapper} ${this.state.selected ? s.selected : ''}`}>
        <button onClick={this.expandHandle} className={s.expand} dangerouslySetInnerHTML={{ __html: this.state.collapsed ? this.expandIcon : this.collapseIcon }} />
        {[...(new Array(this.props.level)).keys()].map((i, index) => <div key={index} className={s.deep}></div>)}
        <span className={s.title}>{this.props.title}</span>
        <button onClick={this.edit} className={s.edit}>edit</button>
        <button onClick={this.remove} className={s.remove}>remove</button>
        <button onClick={this.addNested} className={s.add} dangerouslySetInnerHTML={{ __html: this.plusIcon }} />
      </div>
    );
  }
}

export const TreeItem = withStyles(s)(TreeItemComponent);