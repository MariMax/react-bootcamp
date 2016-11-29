import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { AddItem } from '../AddItem';
import { ListItem } from '../ListItem';
import s from './TaskList.css';

import { listData } from './listData';

class TaskListComponent extends React.Component {

  constructor(props) {
    super(props);

    this.items = listData;
    this.save = this.save.bind(this);
  }

  save(){

  }

  render() {
    return (
      <section className={s.wrapper}>
        <div className={s['add-item']}>
          <AddItem label={'Task title'} saveText={'save'} id={s.wrapper} onSave={this.save}/>
        </div>
        <div className={s.list}>
          {this.items.map(i => {
            return (
              <ListItem key={i.id} title={i.title} done={i.done} id={i.id} />
            )
          })}
        </div>
      </section>
    );
  }
}

export const TaskList = withStyles(s)(TaskListComponent);