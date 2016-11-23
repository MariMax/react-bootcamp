import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { AddItem } from '../AddItem';
import { TreeItem } from '../TreeItem';
import s from './CategoryTree.css';

import { treeData } from './treeData';

class CategoryTreeComponent extends React.Component {
  static propTypes = {
    add: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.items = treeData;
  }

  buildList(items, level) {
    if (!items || items.length === 0) return null;
    return items.map(i => {
      return (
        <div key={i.id} className={s['items-block']}>
          <TreeItem className={s['tree-item']} id={i.id} level={level} title={i.title} selected={i.selected} />
          {this.buildList(i.children, level + 1)}
        </div>
      );
    })
  }

  render() {
    const items = this.buildList(this.items, 0);
    return (
      <section className={s.wrapper}>
        {this.props.add && <div className={s['add-item']}>
          <AddItem label={'Category title'} buttonText={'save'} id={s.wrapper} />
        </div>}
        <div className={s.tree}>
          {items}
        </div>
      </section>
    );
  }
}

export const CategoryTree = withStyles(s)(CategoryTreeComponent);