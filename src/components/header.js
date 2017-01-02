    import React, {Component} from 'react';
    import  {connect} from 'react-redux';
    import {Link} from 'react-router';
    import Menu from './menu';


    class Header extends Component {

        renderLinks() {

            if (this.props.authenticated && this.props.authenticated != undefined) {
                //show link to logout
                return [
                    <li className="nav-item">
                        <Link className="nav-link" to="/home" key={5}>Home </Link>
                    </li>,
                    <li className="nav-item">
                        <Link className="nav-link" to="/settings" key={4}>Settings </Link>
                    </li>,
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
                <div>
                <nav id="navbar" className="navbar navbar-default custom-navbar">
                <Menu />
                    <Link to="/" className="navbar-brand"> Portal </Link>
         
                 <div id="navbar-right" className="custom">
                    <ul className="nav navbar-nav navbar-right">
                        {this.renderLinks()}
                    </ul>
                </div>
                </nav>
                </div>
            );
        }
    }


    function mapStateToProps(state) {
        return {
            authenticated: state.auth.authenticated
        };
    }
    export default connect(mapStateToProps)(Header);