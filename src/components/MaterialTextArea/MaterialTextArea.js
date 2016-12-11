import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MaterialTextArea.css';

class MaterialTextAreaComponent extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    focus: PropTypes.bool,
  }

  static defaultProps = {
    value: '',
    label: 'textarea',
    focus: false,
  }

  constructor(props) {
    super(props);
    this.state = { value: this.props.value || '', id: this.props.id };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    return this.props.onChange && this.props.onChange(event.target.value);
  }

  componentDidMount() {
    if (this.props.focus) {
      this.textarea.focus();
    }
  }

  render() {
    return (
      <div className={s['form-control']}>
        <textarea
          value={this.state.value}
          className={`${this.state.value.length ? 'not-empty' : ''}`}
          type="text" id={this.state.id}
          ref={textarea => this.textarea = textarea}
          onChange={this.handleChange} />
        <label htmlFor={this.state.id}>{this.props.label}</label>
        <div></div>
      </div>
    );
  }
}

export const MaterialTextArea = withStyles(s)(MaterialTextAreaComponent);