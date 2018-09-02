import React from 'react';
import AsyncValidator from 'async-validator';
import FormItem from './FormItem';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { reactChildren } from 'utils';
import './style.less';

exports.FormItem = FormItem;

export class Form extends React.Component {
    static propTypes = {
        className: PropTypes.string, // form class
        showError: PropTypes.bool, // 是否需要展示错误信息
        onChange: PropTypes.func // form data change
    }

    static defaultProps = {
        showError: true
    }

    constructor(props) {
        super(props);
        this.resetData = JSON.parse(JSON.stringify(props.model));
        this.state = {
            form: props.model,
            errorState: {},
        };
        // console.log(this);

        // this.valiadateOnly();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            form: nextProps.model
        });
    }

    onChange = (value, prop) => {
        const form = {
            ...this.state.form,
            [prop]: value
        };
        this.setState({
            form
        });
        setTimeout(() => {
            this.valiadate(true).then(result => {
                this.props.onChange && this.props.onChange(form, result, prop);
            });
        }, 0);
    }

    // 单独验证
    valiadateChild = (prop, val, rules, onlyValiadate) => new Promise((resolve, reject) => {
        const value = val || this.state.form[prop];
        const rule = rules || this.props.rules[prop];

        if (!rule) {
            resolve();
            return;
        }
        if (prop === 'vatImage') {
            console.log(prop, val);
        }
        const validator = new AsyncValidator({
            [prop]: rule
        });
        validator.validate({ [prop]: value }, (errors, fields) => {
            let errorMessage = '';
            if (errors) {
                errorMessage = fields[prop] && fields[prop][0].message;
                reject({ errors, fields });
            } else {
                resolve();
            }
            if (onlyValiadate) {
                setTimeout(() => {
                    this.setState({
                        errorState: {
                            ...this.state.errorState
                        }
                    });
                }, 0);
                return;
            }
            setTimeout(() => {
                this.setState({
                    errorState: {
                        ...this.state.errorState,
                        [prop]: errorMessage
                    }
                });
            }, 0);
        });
    })

    // 移除整个表单的校验结果
    clearValidate = () => {
        this.setState({
            errorState: {}
        });
    }

    // 对整个表单进行校验的方法
    valiadate = onlyValiadate => {
        const promiseList = Object.keys(this.state.form).map(prop => this.valiadateChild(prop, null, null, onlyValiadate));
        console.log('promiseList', promiseList);
        return Promise.all(promiseList).then(() => ({})).catch(error => error);
    }

    // 对指定表单项进行校验的方法
    valiadateOptions = props => {
        const promiseList = Object.keys(this.state.form)
        .filter(key => props.includes(key))
        .map(prop => this.valiadateChild(prop, null, null, false));
        return Promise.all(promiseList).then(() => ({})).catch(error => error);
    }

    render() {
        const { className, showError, labelTextAlign, labelStyle, rules } = this.props;
        const { form, errorState } = this.state;

        const children = reactChildren(this.props.children).map((item, index) => {
            if (!item || item.type.name !== 'FormItem') {
                return item;
            }
            const prop = item.props.prop;
            return {
                ...item,
                props: {
                    ...item.props,
                    value: form[prop] || '',
                    rule: rules[prop],
                    prop,
                    labelTextAlign: labelTextAlign,
                    labelStyle: labelStyle,
                    errorMessage: errorState[prop],
                    onChange: value => {
                        this.onChange(value, prop);
                    },
                    valiadate: this.valiadateChild,
                    showError
                }
            };
        });
        return (
          <div className={classNames('component-form-pc', className)}>
            {children}
          </div>
        );
    }
}
