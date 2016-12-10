import React from 'react';
import { CategoryDetails } from './CategoryDetails';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';
import { reducerName } from '../../components/CategoryTree/CategoryReducer';
import { setActiveSide, RIGHT_ACTIVE } from '../../components/SplitPage/reducer';

export default {

  path: '/Category/:id/task/:taskId?',

  async action({params, storeManager}) {
    const splitterId = `categoryDetailsPageSplitter`;
    const title = `Category Details`;
    
    setTimeout(_ => storeManager.dispatch(setActiveSide(splitterId, RIGHT_ACTIVE)), 100);

    return {
      title,
      component: (
        <Layout>
          <CategoryDetails
            title={title}
            categoryId={params.id}
            taskId={params.taskId}
            splitterId={splitterId}
            storeManager={storeManager} />
        </Layout>
      ),
    };
  },

};
