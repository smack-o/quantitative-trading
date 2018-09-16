import React from 'react';
import { store } from '@';
import { withRouter } from 'react-router-dom';
import { getQuery } from 'utils';

@withRouter
export default class Bundle extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // this.load(this.props);
    }

    render() {
        return this.props.children;
    }
}
