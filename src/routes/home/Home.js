import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Header} from '../../components/Header';
import {Search} from '../../components/Search';
import s from './Home.css';

class Home extends React.Component {
  // static propTypes = {
  //   news: PropTypes.arrayOf(PropTypes.shape({
  //     title: PropTypes.string.isRequired,
  //     link: PropTypes.string.isRequired,
  //     contentSnippet: PropTypes.string,
  //   })).isRequired,
  // };

  render() {
    return (
      <div className={s.root}>
        <Header>
          <h1 className={s.title}>Mega App</h1>
          <Search/>
        </Header>
      </div>
    );
  }
}

export default withStyles(s)(Home);
