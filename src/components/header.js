    import React, {Component} from 'react';
    import  {connect} from 'react-redux';
    import {Link} from 'react-router';
    import Menu from './menu';


    class Header extends Component {

        renderLinks() {

            if (this.props.authenticated && this.props.authenticated != undefined) {
                //show link to logout
                return [
                    <div>
                        <Link className="nav-link" to="/home" key={5}>Home </Link>
                    
                    
                        <Link className="nav-link" to="/settings" key={4}>Settings </Link>
                    
                        <Link className="nav-link" to="/signOut" key={3}> Sign Out</Link>
                    </div>

                ];
            } else {
                //show user to login
                return [
                    <div>
                        <Link className="nav-link" to="/signIn" key={1}> Sign In</Link>
                    
                        <Link className="nav-link" to="/signUp" key={2}> Sign Up</Link>
                    </div>
                ];
            }

        }


        render() {
            return (
                <div>
                <nav id="navbar" className="navbar navbar-default custom-navbar">
                <Menu />
                    <Link to="/" className="navbar-brand"> Portal </Link>
         
                 <div id="navigation"  className="custom">
                    
                        {this.renderLinks()}
                    
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