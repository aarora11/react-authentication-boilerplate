import React , {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import CricketHome from './cricketHome';




class Feature extends Component{
    componentWillMount(){
  
    this.props.fetchQuote();
    //this.props.fetchMatches();
}

renderQuote(){
    if(this.props.quote){
        var quote = this.props.quote[0];
        return (
            <blockquote className="blockquote-reverse">
                <p>{quote.content.replace(/<(?:.|\n)*?>/gm, '')}</p>
                <footer><cite title="hjg">{quote.title}</cite></footer>
            </blockquote>
        
        );
    }

}

    render(){
     return (
         <div>
         <div> {this.renderQuote()}<br />
         </div>
         <CricketHome />
         </div>
         
        );
    }
}

function mapStateToProps(state) {
    return {message : state.auth.quote,
        quote: state.auth.quote,
        matchList : state.cricket.matchList}
}

export default connect (mapStateToProps, actions)(Feature);