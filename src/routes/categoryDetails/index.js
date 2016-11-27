import React from 'react';
import { CategoryDetails } from './CategoryDetails';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';
import { selectCategory } from '../../components/CategoryTree/CategoryActions';
import { categoryReducer, reducerName } from '../../components/CategoryTree/CategoryReducer';

export default {

  path: '/Category/:id',

  async action({params, storeManager}) {
    storeManager.addReducer(reducerName, categoryReducer);
    storeManager.dispatch(selectCategory(params.id));

    return {
      title: `Category details`,
      component: <Layout><CategoryDetails storeManager={storeManager} /></Layout>,
    };
  },

};
