import React , {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';





class Feature extends Component{
    componentWillMount(){
     this.props.fetchQuote();
}




renderQuote(){
    if(this.props.quote){
        var quote = this.props.quote;
        return (
            <blockquote className="blockquote-reverse">
                <p>{quote}</p>
                <footer><cite title="hjg">{quote.title}</cite></footer>
            </blockquote>
        
        );
    }

}

renderCard(patient){
    console.log(patient.fname);
    return(
    <div className="col-xs-6 col-sm-3 placeholder" id={patient.id} key={patient.id}>
                <div className="card card-block">
                   <h4> <Link className="card-title" to={'patientDetails/'+patient.fName}>{patient.fName} {patient.lNname}</Link></h4>
                    <p className="card-text">{patient.gender}</p>
                    <p className="card-text">{patient.email}</p>               
                </div>
    </div>
    );
}


    render(){
if(this.props.Patients){
          var patients; 
       
        patients = this.props.Patients;
        
     return (
         <div>
          {this.renderQuote()}<br />
           <div className="row placeholders">
          {patients.map(this.renderCard.bind(this))}
          </div>
          
         </div>
         
        );
} else {
    return(
        <div>Loading ... </div>
    );
}
    }
}

function mapStateToProps(state) {
    return {message : state.auth.quote,
        quote: state.auth.quote,
        Patients : state.auth.Patients,
        matchList : state.cricket.matchList}
}

export default connect (mapStateToProps, actions)(Feature);