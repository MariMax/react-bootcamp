import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { AddItem } from '../AddItem';
import { TreeItem } from '../TreeItem';
import s from './CategoryTree.css';
import { reducerName } from './CategoryReducer';

class CategoryTreeComponent extends React.Component {
  static propTypes = {
    add: PropTypes.bool,
    storeManager: PropTypes.shape({
      getState: PropTypes.func,
    })
  };

  constructor(props) {
    super(props);
    this.store = props.storeManager;
    const state = this.store.getState();
    this.state = {expandedItems:state[reducerName].expanded};
  }

  componentDidMount() {
    const {storeManager } = this.props;
    this.s = this.store.subscribe(_ => {
      const state = this.store.getState();
      this.setState({
        expandedItems: state[reducerName].expanded
      })
    })
  }

  componentWillUnmount() {
    return this.s && this.s();
  }

  buildList(items, level, state) {
    if (!items || Object.keys(items).length === 0) return null;
    return Object.keys(items).map(key => {
      return (
        <div key={items[key].id} className={s['items-block']}>
          <TreeItem className={s['tree-item']} store={this.store} level={level} item={items[key]} reducerName={reducerName} />
          {this.state.expandedItems.find(i => i === items[key].id) && this.buildList(items[key].children.map(i => state.globalStorage[i]), level + 1, state)}
        </div>
      );
    })
  }

  render() {
    const state = this.store.getState();
    const items = this.buildList(state[reducerName].items.map(i => state.globalStorage[i]).filter(i => !i.parent), 0, state);

    return (
      <section className={s.wrapper}>
        {this.props.add && <div className={s['add-item']}>
          <AddItem label={'Category title'} buttonText={'save'} id={s.wrapper} />
        </div>}
        <div className={s.tree}>
          {items}
          {(!items) && <div className={s.empty}>Nothing here yet</div>}
        </div>
      </section>
    );
  }
}

export const CategoryTree = withStyles(s)(CategoryTreeComponent);