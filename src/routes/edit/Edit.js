import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Header } from '../../components/Header';
import { Search } from '../../components/Search';
import { CheckBox } from '../../components/CheckBox';
import { ProgressBar } from '../../components/ProgressBar';
import { SplitPage } from '../../components/SplitPage';
import { TaskTree } from '../../components/TaskTree';
import { TaskList } from '../../components/TaskList';
import s from './Edit.css';

export const Edit = withStyles(s)(_ => {
  return (
    <div className={s.root}>
      <Header>
        <h1 className={s.title}>To Do List</h1>
      </Header>
      <SplitPage>
        <TaskTree />
        <div>task details here</div>
      </SplitPage>
    </div>
  )
});
