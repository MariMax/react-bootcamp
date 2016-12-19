import React, { PropTypes, Component } from 'react';
import { Header } from '../../components/Header';
import { Search } from '../../components/Search';
import { CheckBox } from '../../components/CheckBox';
import { ProgressBar } from '../../components/ProgressBar';
import { SplitPage } from '../../components/SplitPage';
import { CategoryTree } from '../../components/CategoryTree';
import { TaskList } from '../../components/TaskList';
import { buildQueryString } from '../../core/helpers/buildQueryString';
import s from './Home.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../core/history';

class HomeComponent extends Component {
  static propTypes = {
    storeManager: PropTypes.shape({
      addReducer: PropTypes.func,
    }),
    splitterId: PropTypes.string,
    categoryId: PropTypes.string,
    title: PropTypes.string,
    showDone: PropTypes.bool,
    searchTerm: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = { showDone: this.props.showDone, searchTerm: this.props.searchTerm };
    this.handleShowDoneChange = this.handleShowDoneChange.bind(this);
  }

  handleShowDoneChange(value) {
    this.setState({ showDone: value });
    const query = buildQueryString(value && { name: 'showDone', value }, this.state.searchTerm && { name: 'searchTerm', value: this.state.searchTerm });
    history.push(`/${query}`);
  }

  render() {
    const {storeManager} = this.props;
    return (
      <div className={s.root}>
        <Header>
          <h1 className={s.title}>To Do List</h1>
          <CheckBox onChange={this.handleShowDoneChange} checked={false} label={`show done`} id={s.title} />
          <Search />
        </Header>
        <ProgressBar storeManager={storeManager} />
        <SplitPage id="homePageSplitter" >
          <CategoryTree
            showDone={this.state.showDone}
            add={true}
            storeManager={storeManager} />
        </SplitPage>
      </div>
    )
  }
}

export const Home = withStyles(s)(HomeComponent);
