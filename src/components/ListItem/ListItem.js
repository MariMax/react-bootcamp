import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListItem.css';
import {CheckBox} from '../CheckBox';

class ListItemComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    id: PropTypes.string,
    done: PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={this.props.id} className={`${s.wrapper}`}>
        <CheckBox label={this.props.title} checked={this.props.done} id={`${s.wrapper}${this.props.id}`}/>
        <button className={s.edit}>edit</button>
      </div>
    );
  }
}

export const ListItem = withStyles(s)(ListItemComponent);