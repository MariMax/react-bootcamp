import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Header } from '../../components/Header';
import { Search } from '../../components/Search';
import { CheckBox } from '../../components/CheckBox';
import { ProgressBar } from '../../components/ProgressBar';
import { SplitPage } from '../../components/SplitPage';
import { CategoryTree } from '../../components/CategoryTree';
import { TaskDetails } from '../../components/TaskDetails';
import s from './Edit.css';

export const Edit = withStyles(s)(({taskId, storeManager, splitterId, title, categoryId}) => {
  return (
    <div className={s.root}>
      <Header>
        <h1 className={s.title}>{title}</h1>
      </Header>
      <ProgressBar storeManager={storeManager} />
      <SplitPage id={splitterId}>
        <CategoryTree categoryId={categoryId} storeManager={storeManager}/>
        <TaskDetails taskId={taskId} categoryId={categoryId} storeManager={storeManager}/>
      </SplitPage>
    </div>
  )
});
