import * as React from 'react';

export interface LoadingProps {
  loading: boolean;
}

export interface State {
  loadingText: string;
}

export class Loading extends React.Component<LoadingProps, State> {
  constructor(props: LoadingProps, context?: any) {
    super(props, context);
    this.state = {
      loadingText: this.handleLoadingText(props.loading)
    };
  }

  handleLoadingText = (loading: boolean) => loading ? 'loading' : 'loaded';

  componentWillReceiveProps(nextProps: LoadingProps) {
    this.setState({
      loadingText: this.handleLoadingText(nextProps.loading)
    });
  }
  render() {
    return (
      <div>
        {this.state.loadingText}
      </div>
    );
  }
}
