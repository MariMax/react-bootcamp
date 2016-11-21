import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TreeItem.css';

class TreeItemComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    id: PropTypes.string,
    selected: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={this.props.id} className={`${s.wrapper} ${this.props.selected?s.selected:''}`}>
        {[...(new Array(this.props.level)).keys()].map((i,index)=><div key={index} className={s.deep}></div>)}
        <span className={s.title}>{this.props.title}</span>
        <button className={s.edit}>edit</button>
        <button className={s.remove}>remove</button>
      </div>
    );
  }
}

export const TreeItem = withStyles(s)(TreeItemComponent);