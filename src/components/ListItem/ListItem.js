import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListItem.css';
import { CheckBox } from '../CheckBox';
import history from '../../core/history';
import { Link } from '../Link';

class ListItemComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    id: PropTypes.string,
    done: PropTypes.bool,
    selectRoute: PropTypes.string,
    changeState: PropTypes.func,
    editRoute: PropTypes.string,
    selected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.editTask = this.editTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  editTask(event) {
    event.preventDefault();
    event.stopPropagation();
    history.push(this.props.editRoute);
  }

  handleChange(value){
    this.props.changeState(this.props.id, value);
  }

  render() {
    return (
      <Link to={this.props.selectRoute} id={this.props.id} className={`${s.wrapper} ${this.props.selected ? s.selected : ''}`}>
        <CheckBox onChange={this.handleChange} label={this.props.title} checked={this.props.done} id={`${s.wrapper}${this.props.id}`} />
        <button className={s.edit} onClick={this.editTask}>edit</button>
      </Link>
    );
  }
}

export const ListItem = withStyles(s)(ListItemComponent);