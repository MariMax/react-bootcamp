import React from 'react';
import {Home} from './Home';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';
import { unselectCategory } from '../../components/CategoryTree/CategoryActions';

export default {

  path: '/',

  async action({storeManager}) {
    storeManager.dispatch(unselectCategory());

    return {
      title: 'To Do List',
      component: <Layout><Home storeManager={storeManager} /></Layout>,
    };
  },

};
