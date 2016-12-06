import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Header } from '../../components/Header';
import { Search } from '../../components/Search';
import { CheckBox } from '../../components/CheckBox';
import { ProgressBar } from '../../components/ProgressBar';
import { SplitPage } from '../../components/SplitPage';
import { CategoryTree } from '../../components/CategoryTree';
import { TaskList } from '../../components/TaskList';
import s from './CategoryDetails.css';

export const CategoryDetails = withStyles(s)(({storeManager, splitterId}) => {
  return (
    <div className={s.root}>
      <Header>
        <h1 className={s.title}>Category Details</h1>
        <CheckBox checked={false} label={`active only`} id={s.title} />
        <Search />
      </Header>
      <ProgressBar done={9} />
      <SplitPage id={splitterId}>
        <CategoryTree add={true} storeManager={storeManager}/>
        <TaskList></TaskList>
      </SplitPage>
    </div>
  )
});
