    import React, {Component} from 'react';
    import  {connect} from 'react-redux';
    import {Link} from 'react-router';


    class Header extends Component {

        renderLinks() {

            if (this.props.authenticated && this.props.authenticated != undefined) {
                //show link to logout
                return [

                    <li className="nav-item">
                        <Link className="nav-link" to="/signOut" key={3}> Sign Out</Link>
                    </li>

                ];
            } else {
                //show user to login
                return [
                    <li className="nav-item">
                        <Link className="nav-link" to="/signIn" key={1}> Sign In</Link>
                    </li>,
                    <li className="nav-item">
                        <Link className="nav-link" to="/signUp" key={2}> Sign Up</Link>
                    </li>
                ];
            }

        }


        render() {
            return (
                <nav className="navbar navbar-light">
                    <Link to="/" className="navbar-brand"> Redux Auth</Link>
                    <ul className="nav navbar-nav">

                        {this.renderLinks()}
                    </ul>
                </nav>
            );
        }
    }


    function mapStateToProps(state) {
        return {
            authenticated: state.auth.authenticated
        };
    }
    export default connect(mapStateToProps)(Header);