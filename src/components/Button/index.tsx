import * as React from 'react';

export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
import './style.less';

export interface ButtonProps {
  loading?: boolean;
  type?: ButtonType;
  onClick?: React.FormEventHandler<any>;
  className?: string;
}

export class Button extends React.Component<ButtonProps, any> {
  constructor(props: ButtonProps) {
    super(props);
    this.state = {
      loading: props.loading,
      clicked: false
    };
  }
  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      <div className="button">
        <button {...props}>{children}</button>
      </div>
    );
  }
}
