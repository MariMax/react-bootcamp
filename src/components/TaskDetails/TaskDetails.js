import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TaskDetails.css';
import { CheckBox } from '../CheckBox';
import { MaterialInput } from '../MaterialInput';
import { MaterialTextArea } from '../MaterialTextArea';

class TaskDetailsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.saveSvg = `<use xlink:href="#icon-check"/>`;
    this.cancelSvg = `<use xlink:href="#icon-close"/>`;
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCompletion = this.handleCompletion.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.disableFormSubmit = this.disableFormSubmit.bind(this);
  }

  disableFormSubmit(event){
    if (event.keyCode === 13){
      event.stopPropagation();
      event.preventDefault();
    }
  }

  handleTitleChange(value) {

  }

  handleDescriptionChange(value) {

  }

  handleCompletion(value) {

  }

  render() {
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
                <button className={s.save} type="button">
                  <svg width="20" height="20" dangerouslySetInnerHTML={{ __html: this.saveSvg }} />
                  save
                            </button>
                <button className={s.cancel} type="button">
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

export const TaskDetails = withStyles(s)(TaskDetailsComponent);