import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {Field} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';


class SignIn extends Component {

    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div className="alert alert-danger">
                    <strong>{this.props.errorMessage}</strong>
                </div>
            )
        }
    }

    handleFormSubmit({email, password}) {
        this.props.signInUser({email, password});
    }
    render() {

        const {handleSubmit, fields} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label > Email </label>
                    <Field name="email" component="input" className="form-control"/>
                </fieldset>
                <fieldset className="form-group">
                    <label > Password </label>
                    <Field name="password" type="password" component="input" className="form-control"/>
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary"> Sign In</button>
            </form>
        );

    }
}

function mapStateToProps(state) {
    return {errorMessage : state.auth.error};
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'signIn',
    })(SignIn)
);