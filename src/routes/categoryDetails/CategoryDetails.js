import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Header } from '../../components/Header';
import { Search } from '../../components/Search';
import { CheckBox } from '../../components/CheckBox';
import { ProgressBar } from '../../components/ProgressBar';
import { SplitPage } from '../../components/SplitPage';
import { CategoryTree } from '../../components/CategoryTree';
import { TaskList } from '../../components/TaskList';
import { buildQueryString } from '../../core/helpers/buildQueryString';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CategoryDetails.css';
import history from '../../core/history';

class CategoryDetailsComponent extends Component {
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
    this.searchHandler = this.searchHandler.bind(this);
  }

  redirectToQuery() {
    const query = buildQueryString(this.state.showDone && { name: 'showDone', value: this.state.showDone }, this.state.searchTerm && { name: 'searchTerm', value: this.state.searchTerm });
    history.push(`/Category/${this.props.categoryId}${query}`);
  }

  searchHandler(value) {
    this.setState({ searchTerm: value });
    this.redirectToQuery();
  }

  handleShowDoneChange(value) {
    this.setState({ showDone: value });
    this.redirectToQuery();
  }

  render() {
    const {storeManager, splitterId, categoryId, title, taskId, showDone, searchTerm} = this.props;
    return (
      <div className={s.root}>
        <Header>
          <h1 className={s.title}>{title}</h1>
          <CheckBox onChange={this.handleShowDoneChange} checked={showDone} label={`show done`} id={s.title} />
          <Search search={this.searchHandler} value={searchTerm}/>
        </Header>
        <ProgressBar storeManager={storeManager} />
        <SplitPage id={splitterId}>
          <CategoryTree
            categoryId={categoryId}
            showDone={this.state.showDone}
            searchTerm={this.state.searchTerm}
            add={true}
            storeManager={storeManager} />
          <TaskList
            categoryId={categoryId}
            showDone={this.state.showDone}
            searchTerm={this.state.searchTerm}
            storeManager={storeManager}></TaskList>
        </SplitPage>
      </div>
    )
  }
}


export const CategoryDetails = withStyles(s)(CategoryDetailsComponent);