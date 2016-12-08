import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SplitPage.css';
import { splitPageReducer, initSplitStore, setActiveSide, LEFT_ACTIVE, RIGHT_ACTIVE } from './reducer';
import { connect } from 'react-redux';

class SplitPageComponent extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    defaultSide: PropTypes.string,
  };

  static defaultProps = {
    defaultSide: LEFT_ACTIVE,
  }

  static contextTypes = {
    storeManager: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.swipe = this.swipe.bind(this);

    this.chevronLeft = `<svg width="24" height="24"><use xlink:href="#icon-chevron-left"/></svg>`;
    this.chevronRight = `<svg width="24" height="24"><use xlink:href="#icon-chevron-right"/></svg>`;
  }

  componentWillMount() {
    this.context.storeManager.addReducer(this.props.id, splitPageReducer, initSplitStore(this.props.id, this.props.defaultSide));
  }

  swipe() {
    this.props.setActiveSide(this.props.id, this.props.activeLeft ? RIGHT_ACTIVE : LEFT_ACTIVE);
  }

  render() {
    return (
      <div className={s.wrapper}>
        <section className={`${s.left} ${this.props.activeLeft ? s.active : ''}`}>{this.props.children[0] || this.props.children}</section>
        {!!this.props.children[1] && <button className={`${s.devider} ${this.props.activeLeft ? s['right-side'] : s['left-side']}`} onClick={this.swipe} dangerouslySetInnerHTML={{ __html: this.props.activeLeft ? this.chevronLeft : this.chevronRight }} />}
        {!!this.props.children[1] && <section className={`${s.right} ${this.props.activeLeft ? '' : s.active}`}>{this.props.children[1]}</section>}
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  activeLeft: state[ownProps.id] ? state[ownProps.id].activeSide === LEFT_ACTIVE : true,
});

const mapDispatch = {
  setActiveSide,
};

export const SplitPage = connect(mapState, mapDispatch)(withStyles(s)(SplitPageComponent));