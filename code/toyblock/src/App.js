import './App.css';
import React, { Component } from 'react'

const moneyname = 'Infocoin';

class Test extends Component {
  renderTest(j) {
    const arraytest = [];
    for (let i = 0; i < j; i++) {
      arraytest.push(<div>Let's make some {this.props.moneyname}!</div>)
    }
    return arraytest;
  }
  render(){
    return this.renderTest(3)
  }
}

class App extends Component {
  render() {
    return <Test moneyname={moneyname} />
  }
}

export default App;
