import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Header } from '../../components/Header';
import { Search } from '../../components/Search';
import { CheckBox } from '../../components/CheckBox';
import { ProgressBar } from '../../components/ProgressBar';
import { SplitPage } from '../../components/SplitPage';
import { TaskTree } from '../../components/TaskTree';
import s from './Home.css';

export const Home = withStyles(s)(_ => {
  return (
    <div className={s.root}>
      <Header>
        <h1 className={s.title}>To Do List</h1>
        <CheckBox checked={false} label={`active only`} id={s.title} />
        <Search />
      </Header>
      <ProgressBar done={9} />
      <SplitPage>
        <TaskTree />
        <div>Right section</div>
      </SplitPage>
    </div>
  )
});
