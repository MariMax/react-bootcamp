import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { AddItem } from '../AddItem';
import { TreeItem } from '../TreeItem';
import { EditTreeItem } from '../EditTreeItem';
import s from './CategoryTree.css';
import { reducerName, categoryReducer } from './CategoryReducer';
import { addCategory } from './CategoryActions';

class CategoryTreeComponent extends React.Component {
  static propTypes = {
    add: PropTypes.bool,
    storeManager: PropTypes.shape({
      getState: PropTypes.func,
    })
  };

  constructor(props) {
    super(props);
    this.props.storeManager.addReducer(reducerName, categoryReducer);

    this.addCategory = this.addCategory.bind(this);
  }

  addCategory(categoryName) {
    return this.props.addCategory(null, categoryName);
  }

  buildList(items, level, allItems) {
    if (!items || Object.keys(items).length === 0) return null;
    return items.map(item => {
      return item && (
        <div key={item.id} className={s['items-block']}>
          {this.props.edit !== item.id ?
            <TreeItem className={s['tree-item']} level={level} item={item} reducerName={reducerName} /> :
            <EditTreeItem className={s['tree-item']} item={item} reducerName={reducerName} />}
          {this.props.expandedItems.find(i => i === item.id) && this.buildList(item.children.map(i => allItems.find(item => item && item.id === i)), level + 1, allItems)}
        </div>
      );
    })
  }

  render() {

    const items = this.buildList(this.props.items.filter(i => i && !i.parent), 0, this.props.items);

    return (
      <section className={s.wrapper}>
        {this.props.add && <div className={s['add-item']}>
          <AddItem label={'Category title'} saveText={'save'} id={s.wrapper} onSave={this.addCategory} />
        </div>}
        <div className={s.tree}>
          {items}
          {(!items) && <div className={s.empty}>Nothing here yet</div>}
        </div>
      </section>
    );
  }
}

const mapState = (state) => ({
  expandedItems: state[reducerName].expanded,
  items: state[reducerName].items.map(i => state.globalStorage[i]),
  edit: state[reducerName].edit,
});

const mapDispatch = {
  addCategory,
};

export const CategoryTree = connect(mapState, mapDispatch)(withStyles(s)(CategoryTreeComponent));