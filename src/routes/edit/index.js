import React from 'react';
import { Edit } from './Edit';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';
import { setActiveSide, RIGHT_ACTIVE } from '../../components/SplitPage/reducer';

export default {

  path: '/Category/:id/edit/:taskId',

  async action({params, storeManager}) {
    const splitterId = 'editTaskPageSplitter';
    const title = 'Task Details';
    setTimeout(_ => storeManager.dispatch(setActiveSide(splitterId, RIGHT_ACTIVE)), 100);
    
    return {
      title,
      component: (
        <Layout>
          <Edit
            storeManager={storeManager}
            title={title}
            categoryId={params.id}
            taskId={params.taskId}
            splitterId={splitterId} />
        </Layout>
      ),
    };
  },

};
