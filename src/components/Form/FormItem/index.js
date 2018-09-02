import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import classNames from 'classnames';
import { reactChildren } from 'utils';

export default class FormItem extends Component {
    static propTypes = {
        prop: PropTypes.string,
        children: PropTypes.element,
        onChange: PropTypes.func,
        value: PropTypes.node,
        showError: PropTypes.bool,
        rule: PropTypes.object,
        errorMessage: PropTypes.string,
        valiadate: PropTypes.func,
    }

    onChange = value => {
        const { onChange } = this.props;
        onChange(value);
    }

    handleChildren = () => {
        const { prop, value, valiadate, errorMessage } = this.props;
        let rule = this.props.rule;
        if (!Array.isArray(rule)) {
            rule = [rule];
        }
        const children = reactChildren(this.props.children);
        return children.map(item => {
            // 处理监听事件，分类，将不同事件触发的不同验证，进行分类
            const rules = rule.reduce((pre, item) => {
                if (!item.trigger) {
                    return pre;
                }
                if (!pre[item.trigger]) {
                    pre[item.trigger] = [];
                }
                pre[item.trigger].push(item);
                return pre;
            }, {});
            // 然后将对应的 rule 分别绑定到对应事件上
            const triggers = Object.keys(rules).reduce((pre, triggerName) => {
                pre[triggerName] = (val, propT) => {
                    // 验证
                    if (item.props[triggerName]) {
                        // 如果子组件有该时间，则需要执行
                        item.props[triggerName]();
                    }
                    if (triggerName === 'onChange') {
                        this.onChange(val, propT);
                    }
                    setTimeout(() => {
                        // 在 setstate 之后执行
                        valiadate(this.props.prop, this.props.value, rules[triggerName]);
                    }, 0);
                };
                return pre;
            }, {});
            const props = {
                value,
                ...item.props,
                onChange: this.onChange,
                ...triggers,
                errorMessage
            };

            return ({
                ...item,
                props
            });
        });
    }

    render() {
        const { errorMessage, showError, className, rule, value, label, onChange, tipStyle, valiadate, labelStyle, labelTextAlign } = this.props;
        return (
          <div className={classNames('form-item', className)}>
            {label && <div className={classNames('item-label', labelTextAlign)} style={labelStyle}>{label}</div>}
            <div className='item-right'>
              {this.handleChildren()}
              {showError && errorMessage && <div className='error-tip' style={tipStyle}>
                {errorMessage}
                </div>}
            </div>
          </div>
        );
    }
}
