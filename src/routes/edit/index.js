import React from 'react';
import {Edit} from './Edit';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/edit',

  async action() {

    return {
      title: 'To Do List',
      component: <Layout><Edit /></Layout>,
    };
  },

};
