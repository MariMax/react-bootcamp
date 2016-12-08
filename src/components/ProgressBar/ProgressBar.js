import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProgressBar.css';

class ProgressBarComponent extends React.Component {
  static propTypes = {
    done: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number
  };

  constructor(props){
    super(props);
    const min = this.props.min||0;
    const max = this.props.max||100;  
    let value = this.props.done;
    let scale = value/(max-min)*100;
    this.state = {
      min: min,
      max: max,
      value: value,
      scale: scale};
  }

  render() {
    return (
      <div className={s.progress} role="progressbar"
      aria-valuemin={this.state.min} aria-valuemax={this.state.max} 
      aria-valuenow={this.state.value}>
        <div className={s.done}  style={{ width: `${this.props.done}%` }} >
        </div>
        <div className={s.pending} style={{ width: `${100 - this.props.done}%` }} >
        </div>
      </div>
    );
  }
}

export const ProgressBar = withStyles(s)(ProgressBarComponent);