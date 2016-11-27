import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TreeItem.css';
import { Link } from '../Link';
import { expandCategory, collapseCategory } from '../CategoryTree/CategoryActions';

class TreeItemComponent extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      children: PropTypes.array,
      tasks: PropTypes.array,
    }),
    store: PropTypes.shape({
      getState: PropTypes.func,
      subscribe: PropTypes.func,
      dispatch: PropTypes.func,
    }),
    level: PropTypes.number,
    reducerName: PropTypes.string
  };

  constructor(props) {
    super(props);
    const {store, reducerName, item} = props;
    const state = store.getState();
    this.state = {
      expanded: state[reducerName].expanded.find(i => i === item.id),
      listView: true,
      selected: state[reducerName].selected === item.id,
      edit: false
    };

    this.expandIcon = `<svg width="20" height="20"><use xlink:href="#icon-expand"/></svg>`;
    this.collapseIcon = `<svg width="20" height="20"><use xlink:href="#icon-collapse"/></svg>`;
    this.plusIcon = `<svg width="20" height="20"><use xlink:href="#icon-plus"/></svg>`;

    this.expandHandle = this.expandHandle.bind(this);
    this.addNested = this.addNested.bind(this);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    const {reducerName, item, store } = this.props;
    this.s = store.subscribe(_ => {
      const state = store.getState();
      this.setState({
        selected: state[reducerName].selected === item.id,
        expanded: state[reducerName].expanded.find(i => i === item.id)
      })
    })
  }

  componentWillUnmount() {
    return this.s && this.s();
  }

  expandHandle(event) {
    event.preventDefault();
    event.stopPropagation();
    const {item, store} = this.props;
    store.dispatch(this.state.expanded ? collapseCategory(item.id) : expandCategory(item.id));
  }

  addNested(event) {
    event.preventDefault();
    event.stopPropagation();
    //todo propagate add nested on top level
  }

  edit(event) {
    event.preventDefault();
    event.stopPropagation();
    //todo propagate edit on top level
  }

  remove(event) {
    event.preventDefault();
    event.stopPropagation();
    //todo propagate remove on top level
  }

  render() {
    return (
      <Link to={`/Category/${this.props.item.id}`} id={this.props.item.id} className={`${s.wrapper} ${this.state.selected ? s.selected : ''}`}>
        <button onClick={this.expandHandle} className={s.expand} dangerouslySetInnerHTML={{ __html: this.state.expanded ? this.collapseIcon : this.expandIcon }} />
        {[...(new Array(this.props.level)).keys()].map((i, index) => <div key={index} className={s.deep}></div>)}
        <span className={s.title}>{this.props.item.title}</span>
        <button onClick={this.edit} className={s.edit}>edit</button>
        <button onClick={this.remove} className={s.remove}>remove</button>
        <button onClick={this.addNested} className={s.add} dangerouslySetInnerHTML={{ __html: this.plusIcon }} />
      </Link>
    );
  }
}

export const TreeItem = withStyles(s)(TreeItemComponent);