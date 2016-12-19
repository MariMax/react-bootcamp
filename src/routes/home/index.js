import React from 'react';
import { Home } from './Home';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/',

  async action({storeManager, query}) {

    return {
      title: 'To Do List',
      component: (
        <Layout>
          <Home
            showDone={!!query.showDone}
            searchTerm={query.searchTerm}
            storeManager={storeManager} />
        </Layout>),
    };
  },

};
