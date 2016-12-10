import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { AddItem } from '../AddItem';
import { ListItem } from '../ListItem';
import s from './TaskList.css';
import { reducerName, taskListReducer } from './taskListReducer';
import { addTask, changeTaskState } from './taskListActions';


class TaskListComponent extends React.Component {
  static propTypes = {
    categoryId: PropTypes.string.isRequired,
    taskId: PropTypes.string,
    storeManager: PropTypes.shape({
      addReducer: PropTypes.func,
    }),
  }

  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
  }

  componentWillMount() {
    this.props.storeManager.addReducer(reducerName, taskListReducer);
  }

  save(taskName) {
    this.props.addTask(this.props.categoryId, taskName);
  }

  render() {
    return (
      <section className={s.wrapper}>
        <div className={s['add-item']}>
          <AddItem label={'Task title'} saveText={'save'} id={s.wrapper} onSave={this.save} />
        </div>
        <div className={s.list}>
          {this.props.items.map(i => {
            return (
              <ListItem key={i.id}
                title={i.title}
                done={i.done}
                changeState={changeTaskState}
                editRoute={`/edit/${i.id}`}
                selectRoute={`/Category/${this.props.categoryId}/task/${i.id}`}
                selected={this.props.taskId === i.id}
                id={i.id} />
            )
          })}
          <div className={s.empty}>Nothing here yet</div>
        </div>
      </section>
    );
  }
}

const mapState = (state, ownProps) => ({
  items: state[reducerName] && Object.keys(state[reducerName].tasks)
    .filter(i => state[reducerName].tasks[i].categoryId === ownProps.categoryId)
    .map(i => state[reducerName].tasks[i]) || []
});

const mapDispatch = {
  addTask,
};

export const TaskList = connect(mapState, mapDispatch)(withStyles(s)(TaskListComponent));