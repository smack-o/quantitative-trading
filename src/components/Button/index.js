import React from 'react';
import './style.less';

// export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
//
// export interface ButtonProps {
//     loading?: boolean;
//     type?: ButtonType;
//     onClick?: React.FormEventHandler<any>;
//     className?: string;
// }

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading,
            clicked: false
        };
    }
    handleClick = e => {
        this.setState({ clicked: true });
        const onClick = this.props.onClick;
        if (onClick) {
            onClick(e);
        }
    }
    render() {
        const { children, className, type } = this.props;
        const props = {
            onClick: this.handleClick,
            className,
            type
        };
        return (
          <div className='button'>
            <button {...props}>{children}</button>
          </div>
        );
    }
}
