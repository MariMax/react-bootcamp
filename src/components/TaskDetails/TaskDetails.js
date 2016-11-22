import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TaskDetails.css';
import { CheckBox } from '../CheckBox';

class TaskDetailsComponent extends React.Component {
    constructor(props) {
        super(props);

        this.saveSvg = `<use xlink:href="#icon-check"/>`;
        this.cancelSvg = `<use xlink:href="#icon-close"/>`;
    }

    render() {
        return (
            <section className={s.wrapper}>
                <form name="task-details">
                    <div>
                        <div className={s['form-control']}>
                            <input name="title" type="text" id="title" />
                            <label htmlFor="title">Task title</label>
                            <div className={s.bar}></div>
                        </div>

                        <CheckBox id="done" label="Completed" />


                        <div className={s['form-control']}>
                            <textarea name="description" id="description" cols="30" rows="10" ></textarea>
                            <label htmlFor="description">Description</label>
                            <div className={s.bar}></div>
                        </div>

                        <div className={s['form-control']}>
                            <div className={s['form-actions']}>
                                <button className={s.save} type="button">
                                    <svg width="20" height="20" dangerouslySetInnerHTML={{ __html: this.saveSvg }} />
                                    save
                            </button>
                                <button className={s.cancel} type="button">
                                    <svg width="20" height="20" dangerouslySetInnerHTML={{ __html: this.cancelSvg }} />
                                    cancel
                            </button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        );
    }
}

export const TaskDetails = withStyles(s)(TaskDetailsComponent);