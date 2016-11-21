import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SplitPage.css';

class SplitPageComponent extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.swipe = this.swipe.bind(this);
    this.state = {activeLeft:true};

    this.leftSection = props.children[0];
    this.rightSection = props.children[1];

    this.chevronLeft = `<use xlink:href="#icon-chevron-left"/>`;
    this.chevronRight = `<use xlink:href="#icon-chevron-right"/>`;
    this.activeLeft = true;
  }

  swipe(){
    this.setState({activeLeft:!this.state.activeLeft})
  }

  render() {
    return (
      <div className={s.wrapper}>
        <section className={`${s.left} ${this.state.activeLeft?s.active:''}`}>{this.leftSection}</section>
        <button className={`${s.devider} ${this.state.activeLeft?s['right-side']:s['left-side']}`} onClick={this.swipe}>
          <svg width="24" height="24" dangerouslySetInnerHTML={{ __html: this.state.activeLeft ? this.chevronLeft : this.chevronRight }} />
        </button>
        <section className={`${s.right} ${this.state.activeLeft?'':s.active}`}>{this.rightSection}</section>
      </div>
    );
  }
}

export const SplitPage = withStyles(s)(SplitPageComponent);