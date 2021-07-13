import './App.css';
import React, { Component } from 'react'

class HandlingBlock extends Component {

  constructor(props) {
    super(props);
    console.log(this.distance)
    this.incrementDistance = this.incrementDistance.bind(this)
    this.changeName = this.changeName.bind(this)
    this.state = {distance: 1, moneyname: "Toycoin"};
  }

  incrementDistance() {
    console.log("We move forward in the document")
    this.setState({distance: this.state.distance+1});
  }

  changeName(newname) {
    console.log("This is the old money name: " + this.state.moneyname)
    this.setState({moneyname: newname})
    console.log("The name is changed to " + this.state.moneyname)
  }

  render(){ 
    if (this.state.distance === 1){
      console.log("Entered Intro Block 1")
      return (
      <div> <BlocIntro1 onDistanceChange={this.incrementDistance} distance={this.state.distance} /> </div>
      )  
    }
    if (this.state.distance ===2){
      console.log("Entered Intro Block 2")
      return (
      <div><BlocIntro2 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
      </div>
      )
    }
    if (this.state.distance ===3){
      console.log("Entered Intro Block 3")
      return (
      <div><BlocIntro3 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
      </div>
      )
    }
    if (this.state.distance ===4){
      console.log("Entered Intro Block 4")
      return (
      <div><BlocIntro4 onDistanceChange={this.incrementDistance} onNameChange={this.changeName} distance={this.state.distance} moneyname={this.state.moneyname}/>
      </div>
      )
    }
    if (this.state.distance ===5){
      console.log("Entered Block 1")
      return (
      <div><Bloc1 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
      </div>
      )
    }
    if (this.state.distance ===6){
      console.log("Entered Block 2")
      return (
      <div><Bloc2 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
      </div>
      )
    }
    if (this.state.distance ===7){
      console.log("Entered Block 3")
      return (
      <div><Bloc3 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
      </div>
      )
    }
    if (this.state.distance ===8){
      console.log("Entered Block 4")
      return (
      <div><Bloc4 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
      </div>
      )
    }
    if (this.state.distance ===9){
      console.log("Entered Block 5")
      return (
      <div><Bloc5 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
      </div>
      )
    }
    if (this.state.distance ===10){
      console.log("Entered Block 6")
      return (
      <div><Bloc6 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
      </div>
      )
    }
    if (this.state.distance ===11){
      console.log("Entered Block 7")
      return (
      <div><Bloc7 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
      </div>
      )
    }
    if (this.state.distance ===12){
      console.log("Entered Block 8")
      return (
      <div><Bloc8 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
      </div>
      )
    }
  }
}

class BlocIntro1 extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
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
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
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
    return <div>Peuplé de petits animaux sympathiques</div>
  }
}

class BlocIntro3 extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    console.log("The button is clicked")
    this.props.onDistanceChange();
  }

  render(){
    return <div>
      <div>Les pommes de pins ça prend beaucoup de place dans les poches... Et si on créait une vraie monnaie ?</div>
      <div>Êtes-vous prêt à leur donner un coup de main ?</div>
      <button onClick={() => this.handleClick()}>Allons-y</button>
      </div>
  }
}

class BlocIntro4 extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    console.log("The form is submitted")
    this.props.onDistanceChange();
  }

  handleChange = (e) => {
    this.props.onNameChange(e.target.value);
  }

  render(){
    return <div>
      <div>Commencons par choisir un nom sympa: </div>
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.props.moneyname} onChange={this.handleChange}/>
        <input type="submit" value="Choisir" />
      </form>
    </div>
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

class App extends Component {
  render() {
    return <HandlingBlock />
  }
}

export default App;
