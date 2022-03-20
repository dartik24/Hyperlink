import React from 'react';
import * as _ from 'lodash'
import { withRouter, Route } from 'react-router-dom';

class Authenticator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: this.props.children,
            user: this.props.user
        }
    }

    static getDerivedStateFromProps = (nextProps) => {
        console.log('user updated in authenticator');
        return({
            user: nextProps.user
        });  
    }

    render() {
        // Parse data from state/props
        const user = this.state.user;
        const routes = this.props.routes;

        // Determine if we are on a route that requires authentication
        const page = this.props.location.pathname.replaceAll('/', '');
        const requiresAuth = _.find(this.props.routes, route => route===page);

        // Static error page
        const error = () => <h3> You must be logged in to view this content </h3>;

        // Render children inside of respective routes
        const children = () => {
            if(user) {
                return React.Children.map(this.props.children, (element, i) => 
                    <Route exact path={'/' + routes[i]}> {React.cloneElement(element, {user: user})} </Route>
                )
            }   
            return error();
        }

        return (<>{requiresAuth ? children() : <></>}</>)
    }
}

export default withRouter(Authenticator);