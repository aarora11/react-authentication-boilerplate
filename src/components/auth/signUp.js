import React , {Component} from 'react';
import {Field,reduxForm} from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class SignUp extends Component {

    handleSignin({ email, password }){
         // Call action creator
         this.props.signUpUser({email:email,password:password})
    };


    renderAlert(){
        console.log(this.props.errorMessage);
        if(this.props.errorMessage){
            return (
              <div className="alert alert-danger">
                  <strong>Oops!</strong>{this.props.errorMessage}
              </div>
            );
        }
    }

    render (){

        const {handleSubmit, fields : {
            email, password, passwordConfirm
        }} = this.props;
        return(
            <form className="signInForms" onSubmit={handleSubmit(this.handleSignin.bind(this))}>
                <fieldset className="form-group">
                    <Field component={renderField} type="text" name="email" label="Email"/>
                </fieldset>
                <fieldset className="form-group">
                    <Field label="Password" name="password" component={renderField} className="form-control" type="password" {...password}/>
                </fieldset>
                <fieldset className="form-group">
                    <Field label="Confirm Password" name="passwordConfirm" component={renderField} className="form-control" type="password" {...passwordConfirm}/>
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign Up</button>
            </form>
        );
    }

}



const renderField = ({input,label, type, meta : {touched, error , invalid} }) => {
    //Construct form-group class depending on form state
    const groupClass = touched ? (invalid ? 'form-group has-danger':'form-group has-success') : 'form-group';
    //Construct form-control class depending on form state
    const inputClass = touched ? (invalid ? 'form-control form-control-danger':'form-control form-control-success') : 'form-control';

    return (
      <div className={groupClass}>
          <label>{label}</label>
          <input {...input} placeholder={label} type={type} className={inputClass} />
          <div className="form-control-feedback">
              {touched ? <span>{error}</span> : ''}

              </div>

      </div>
    );
}


function validate(formProps){
    const error = {};

    if(!formProps.email){
        error.email = 'Please enter an email';
    }
    if(!formProps.password){
        error.password = 'Please enter an password';
    }
    if(!formProps.passwordConfirm){
        error.passwordConfirm = 'Please enter an password confirmation';
    }

    if(formProps.password !== formProps.passwordConfirm){
        error.password = 'Passwords do not match';
    }

    return error;
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actions, dispatch);
}


function mapStateToProps(state) {
    return {errorMessage : state.auth.error};
}

export default connect (mapStateToProps, mapDispatchToProps)(reduxForm({
    form : 'signUp',
    fields:['email', 'password', 'passwordConfirm'],
    validate
})(SignUp));