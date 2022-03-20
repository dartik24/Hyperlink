import React from 'react';
import * as _ from 'lodash'
import { withRouter } from 'react-router-dom';

class Authenticator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: this.props.children,
            user: this.props.user || null
        }
    }

    render() {
        const page = this.props.location.pathname.replaceAll('/', '');
        const requiresAuth = _.find(this.props.routes, route => route===page);

        const error = () => <h3> You must be logged in to view this content </h3>;
        const children = () => this.state.user ? this.state.children : error();

        const content = () => requiresAuth ? children() : <></>;

        return (<>{content()}</>)
    }
}

export default withRouter(Authenticator);