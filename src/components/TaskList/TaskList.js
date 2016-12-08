import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { AddItem } from '../AddItem';
import { ListItem } from '../ListItem';
import s from './TaskList.css';
import { reducerName, taskListReducer } from './taskListReducer';
import { showTasks } from './taskListActions';


class TaskListComponent extends React.Component {
  static propTypes = {
    categoryId: PropTypes.string.isRequired,
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

  save() {

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
              <ListItem key={i.id} title={i.title} done={i.done} id={i.id} />
            )
          })}
        </div>
      </section>
    );
  }
}

const mapState = (state, ownProps) => ({
  items: state[reducerName] && Object.keys(state[reducerName].tasks)
    .filter(i => state[reducerName].tasks[i].categoryId === ownProps.categoryId)
    .map(i => state[reducerName].tasks[i]) || []
})

export const TaskList = connect(mapState)(withStyles(s)(TaskListComponent));