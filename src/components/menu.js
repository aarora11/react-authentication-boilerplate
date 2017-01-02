import React, {Component} from 'react';
import Radium from 'radium';
import {Link} from 'react-router';
import {stack as Menu} from 'react-burger-menu';
  import  {connect} from 'react-redux';

let RadiumLink = Radium(Link);
class SideMenu extends Component {

    renderMenu(){
        
         if (this.props.authenticated && this.props.authenticated != undefined) {
             console.log("menu",this.props.authenticated);
             return (
         <Menu  pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
             <RadiumLink className="menu-item" to="/feature">Home</RadiumLink>
             <RadiumLink className="menu-item" to="/settings">Settings</RadiumLink>
             <RadiumLink className="menu-item" to="/blablabla">Blablabla</RadiumLink>
         </Menu>
             );
         }
    }


render (){
    return(
<div>
         {this.renderMenu()}
</div>
    );
    
}
}

 function mapStateToProps(state) {
        return {
            authenticated: state.auth.authenticated
        };
    }
    export default connect(mapStateToProps)(SideMenu);