import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Search.css';

class SearchComponent extends React.Component {
    // static propTypes = {
        // children: PropTypes.node.isRequired,
    // };

    constructor(props) {
        super(props);
        this.state = { value: '', opened:false, active:false };

        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    handleChange(event){
        this.setState({value:event.target.value, active:!!event.target.value});
    }

    open(){
        if (this.state.opened){
            this.search();
        } else {
            // this.refs.search.getDOMNode().focus();
        }
        this.setState({opened:true});
    }

    close(){
        this.setState({opened:false, active:!!this.state.value});
    }

    search(){
        //todo search logic here....
    }

    render() {
        const searchIcon = `<use xlink:href="#icon-search"/>`;
        const closeIcon = `<use xlink:href="#icon-close"/>`;
        return (
            <div className={`${s.module} ${this.state.opened ? s.open : ''}`}>
                <input type="text" id="search-input" name="search" autoComplete="off" value={this.state.value} onChange={this.handleChange} onClick={this.search} />
                <button className={`${this.state.active ? s.active : ''}`} onClick={this.open}>
                    search
                <svg width="24" height="24" dangerouslySetInnerHTML={{ __html: searchIcon }} />
                </button>
                <button className={s['search-close-button']} onClick={this.close}>
                    close
                <svg width="24" height="24" dangerouslySetInnerHTML={{ __html: closeIcon }} />
                </button>
                <label htmlFor="search-input" className={this.state.value.length > 0 ? s.hidden : ''}> Search</label >
            </div>
        );
    }
}

export const Search = withStyles(s)(SearchComponent);