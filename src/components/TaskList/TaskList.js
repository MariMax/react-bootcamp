import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { AddItem } from '../AddItem';
import { ListItem } from '../ListItem';
import s from './TaskList.css';
import { reducerName, taskListReducer } from './taskListReducer';
import { addTask, changeTaskState } from './taskListActions';
import { getFilteredTasks } from '../../core/helpers/getFilteredTasks';


class TaskListComponent extends React.Component {
  static propTypes = {
    categoryId: PropTypes.string.isRequired,
    taskId: PropTypes.string,
    showDone: PropTypes.bool,
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
                changeState={this.props.changeTaskState}
                editRoute={`/Category/${this.props.categoryId}/edit/${i.id}`}
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
  items: state[reducerName] && getFilteredTasks(Object.keys(state[reducerName].tasks)
    .map(i => state[reducerName].tasks[i]), ownProps.categoryId, ownProps.showDone, ownProps.searchTerm) || []
});

const mapDispatch = {
  addTask,
  changeTaskState,
};

export const TaskList = connect(mapState, mapDispatch)(withStyles(s)(TaskListComponent));