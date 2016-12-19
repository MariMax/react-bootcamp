import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TaskDetails.css';
import history from '../../core/history';
import { CheckBox } from '../CheckBox';
import { MaterialInput } from '../MaterialInput';
import { MaterialTextArea } from '../MaterialTextArea';
import { connect } from 'react-redux';
import { reducerName, taskListReducer } from '../TaskList/taskListReducer';
import { updateTask } from '../TaskList/taskListActions';


class TaskDetailsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.saveSvg = `<use xlink:href="#icon-check"/>`;
    this.cancelSvg = `<use xlink:href="#icon-close"/>`;
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCompletion = this.handleCompletion.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.disableFormSubmit = this.disableFormSubmit.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.model = {
      title: this.props.title,
      description: this.props.description,
      done: this.props.done,
    };
  }

  componentWillMount() {
    this.props.storeManager.addReducer(reducerName, taskListReducer);
  }

  disableFormSubmit(event) {
    if (event.keyCode === 13) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  handleTitleChange(value) {
    this.model.title = value;
  }

  handleDescriptionChange(value) {
    this.model.description = value;
  }

  handleCompletion(value) {
    this.model.done = value;
  }

  save() {
    this.props.save({id:this.props.taskId, ...this.model});
    this.cancel();
  }

  cancel() {
    history.push(`/Category/${this.props.categoryId}`);
  }

  render() {
    console.log(this.props.title);
    return (
      <section className={s.wrapper}>
        <form name="task-details">
          <div className={s.container}>

            <div className={s['form-control']} onKeyDown={this.disableFormSubmit}>
              <MaterialInput
                focus={true}
                id={`Title${this.props.taskId}`}
                value={this.props.title}
                onChange={this.handleTitleChange}
                label="Task title"
                />
            </div>

            <div className={s['form-control']}>
              <CheckBox
                onChange={this.handleCompletion}
                label="Completed"
                checked={this.props.done}
                id={`Completed${this.props.taskId}`} />
            </div>

            <div className={s['form-control']}>
              <MaterialTextArea
                id={`Description${this.props.taskId}`}
                value={this.props.description}
                onChange={this.handleDescriptionChange}
                label="Task description"
                />
            </div>

            <div className={s['form-control']}>
              <div className={s['form-actions']}>
                <button className={s.save} type="button" onClick={this.save}>
                  <svg width="20" height="20" dangerouslySetInnerHTML={{ __html: this.saveSvg }} />
                  save
                            </button>
                <button className={s.cancel} type="button" onClick={this.cancel}>
                  <svg width="20" height="20" dangerouslySetInnerHTML={{ __html: this.cancelSvg }} />
                  cancel
                            </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

const mapState = (state, ownProps) => {
  const task = state[reducerName] && state[reducerName].tasks[ownProps.taskId];
  return {
    title: task && task.title,
    done: task && task.done,
    description: task && task.description,
  }
};

const mapDispatch = {
  save: updateTask,
}

export const TaskDetails = connect(mapState, mapDispatch)(withStyles(s)(TaskDetailsComponent));