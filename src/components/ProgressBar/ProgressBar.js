import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProgressBar.css';
import {reducerName, taskListReducer} from '../TaskList/taskListReducer';

class ProgressBarComponent extends React.Component {
  static propTypes = {
    done: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number
  };

  static defaultProps = {
    min: 0,
    max: 100,
  };

  componentWillMount(){
    this.props.storeManager.addReducer(reducerName, taskListReducer);
  }

  render() {
    return (
      <div className={s.progress} role="progressbar"
      aria-valuemin={this.props.min} aria-valuemax={this.props.max} 
      aria-valuenow={this.props.done}>
        <div className={s.done}  style={{ width: `${this.props.done}%` }} >
        </div>
        <div className={s.pending} style={{ width: `${100 - this.props.done}%` }} >
        </div>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  const tasksCount = state[reducerName] && Object.keys(state[reducerName].tasks).length || 0;
  let done =  state[reducerName] && Object.keys(state[reducerName].tasks)
    .filter(i => state[reducerName].tasks[i].done).length || 0;

  done = tasksCount && done/tasksCount*100 || 0;
  return {
    min: 0,
    max: 100,
    done,
  }
};

export const ProgressBar = connect(mapState)(withStyles(s)(ProgressBarComponent));