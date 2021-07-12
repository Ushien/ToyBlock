import './App.css';
import React, { Component } from 'react'

class HandlingBlock extends Component {
  constructor(props) {

    super(props);
    console.log(this.distance)
    this.incrementDistance = this.incrementDistance.bind(this)
    this.state = {distance: 0};
  }

  incrementDistance() {
    console.log("We entered the parent function")
    console.log(this)
    this.setState({distance: this.state.distance+1});
  }

  render(){ 
    if (this.state.distance === 0){
      console.log("We entered the render")
      console.log(this)
      return (
      <div> <BlocIntro1 onDistanceChange={this.incrementDistance} distance={this.state.distance} /> </div>
      )  
    }
    if (this.state.distance ===1){
      return (
      <div><BlocIntro2 />

      <div>{this.state.distance}</div>
      </div>
      )
    }
  }
}

class BlocIntro1 extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    console.log("We are in the Intro block")
    console.log(this)
  }

  componentDidMount(){
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e) => {
    console.log("The screen is clicked")
    this.props.onDistanceChange();
  }

  render(){
    return <div>Au beau milieu de la forêt se trouve un village...</div>
  }
}

class BlocIntro2 extends Component {
  render(){
    return <div>Peuplé de petits animaux sympathiques</div>
  }
}

class Bloc1 extends Component { //Notation des transactions
  
  render(){
    return (
      <div>
        Bloc 1
      </div>
    );
  }
}


class Bloc2 extends Component { //Décentralisation de la monnaie
  
  render(){
    return (
      <div>
        Bloc 2
      </div>
    );
  }
}

class Bloc3 extends Component { //Signature électronique
  
  render(){
    return (
      <div>
        Bloc 3
      </div>
    );
  }
}

class Bloc4 extends Component { //Listes d'attentes
  
  render(){
    return (
      <div>
        Bloc 4
      </div>
    );
  }
}

class Bloc5 extends Component { //Blockchain
  
  render(){
    return (
      <div>
        Bloc 5
      </div>
    );
  }
}

class Bloc6 extends Component { //Proof of work
  
  render(){
    return (
      <div>
        Bloc 6
      </div>
    );
  }
}

class Bloc7 extends Component { //Rétribution
  
  render(){
    return (
      <div>
        Bloc 7
      </div>
    );
  }
}

class Bloc8 extends Component { //Travail d'équipe
  
  render(){
    return (
      <div>
        Bloc 8
      </div>
    );
  }
}

const moneyname = 'Infocoin';

class App extends Component {
  render() {
    return <HandlingBlock />
  }
}

export default App;
