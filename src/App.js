import React, { Component } from 'react';
import {random} from 'lodash';
import 'typeface-roboto';
import { Grid, withStyles } from '@material-ui/core';
import QuoteMachine from './components/QuoteMachine';


const styles = {
  container: {
    alignItems: 'center',
    display: 'flex', //vertical align
    height: '100vh',
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quotes: [
        // {
        //   "quote" : "i'm asdasdss.",
        //   "author" : 'me'
        // },
        // {
        //   "quote" : "i'm asdasdss.",
        //   "author" : 'x'
        // }, 
        // {
        //   "quote" : "i'm asdasdss.",
        //   "author" : 'p'
        // }, 
        // {
        //   "quote" : "i'm asdasdss.",
        //   "author" : 't'
        // },
        // {
        //   "quote" : "i'm asdasdss.",
        //   "author" : '0'
        // },
      ],
      selectedQuoteIndex: null,
    }
    this.assignNewQuoteIndex = this.assignNewQuoteIndex.bind(this);
    this.generateNewQuoteIndex = this.generateNewQuoteIndex.bind(this);

  }

  componentDidMount() {
    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
      .then(data => data.json())
      .then(quotes => this.setState({quotes} , this.assignNewQuoteIndex));
    
  }

  get selectedQuote() {
    if(!this.state.quotes.length || !Number.isInteger(this.state.selectedQuoteIndex)) {
      return undefined;
    }
    return this.state.quotes[this.state.selectedQuoteIndex];
  }


  // if state.quote is empty return undefined, else return a index
  generateNewQuoteIndex() {
    if (!this.state.quotes.length) {
      return undefined;
    }
    return random(0, this.state.quotes.length - 1);
  }

  nextQuoteClickHandler(){
    console.log('hi!');
  }

  assignNewQuoteIndex(){
    this.setState({selectedQuoteIndex: this.generateNewQuoteIndex() } );
  }


  render() {
    // console.log(this.state.selectedQuoteIndex)
    return (
      <Grid className={this.props.classes.container} id="quote-box" justify="center" container>
        <Grid xs={11} lg={8} item>
          {
            this.selectedQuote ?
            <QuoteMachine selectedQuote={this.selectedQuote} assignNewQuoteIndex={this.assignNewQuoteIndex}/>
            : null
          }
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles) (App);
