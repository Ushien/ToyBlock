import './App.css';
import React, { Component } from 'react'
import {introtext1, introtext2, introtext3, introtext4, text1, text2, text3, text4, text5, text6, text7, text8} from './Blocs.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

/*
Here you can change the base parameters of the website

Pick another startdistance if you want to start the story further (From 1 to 8)
Pick another defaultname if you want to change the default name of the money
*/
const startdistance = 5
const defaultname = "Toycoin"

class HandlingBlock extends Component {

  constructor(props) {
    super(props);
    console.log(this.distance)
    this.incrementDistance = this.incrementDistance.bind(this)
    this.changeName = this.changeName.bind(this)
    this.state = {distance: startdistance, moneyname: defaultname};
    console.log("Voici l'état initial du state")
    console.log(this.state)
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
    var wholetext = [];

    if (this.state.distance === 1){
      console.log("Entered Intro Block 1")
      return (
      <div> <BlocIntro1 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
      </div>
      )  
    }
    if (this.state.distance ===2){
      console.log("Entered Intro Block 2")
      return (
      <div>
        <BlocIntro2 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
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
    if (this.state.distance >= 5){
      console.log("Entered Block 1")
      wholetext.push(<div><Bloc1 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
        </div>)
    }
    if (this.state.distance >= 6){
      console.log("Entered Block 2")
      wholetext.push(<div><Bloc2 onDistanceChange={this.incrementDistance} distance={this.state.distance} moneyname={this.state.moneyname}/>
        </div>)
    }
    if (this.state.distance >=7){
      console.log("Entered Block 3")
      wholetext.push(<div><Bloc3 onDistanceChange={this.incrementDistance} distance={this.state.distance} moneyname={this.state.moneyname}/>
        </div>)
    }
    if (this.state.distance >=8){
      console.log("Entered Block 4")
      wholetext.push(<div><Bloc4 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
        </div>)
    }
    if (this.state.distance >=9){
      console.log("Entered Block 5")
      wholetext.push(<div><Bloc5 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
        </div>)
    }
    if (this.state.distance >=10){
      console.log("Entered Block 6")
      wholetext.push(<div><Bloc6 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
        </div>)
    }
    if (this.state.distance >=11){
      console.log("Entered Block 7")
      wholetext.push(<div><Bloc7 onDistanceChange={this.incrementDistance} distance={this.state.distance} moneyname={this.state.moneyname}/>
        </div>)
    }
    if (this.state.distance >=12){
      console.log("Entered Block 8")
      wholetext.push(<div><Bloc8 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
        </div>)
    }
    return wholetext;
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
    return <div className="text-center"> {introtext1()}
    </div>;
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
    return<div className="text-center">{introtext2()}</div> ;
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
    return <div className="text-center">
      {introtext3()}
      <Button variant="primary" onClick={() => this.handleClick()}>Allons-y</Button>
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
    return <div className="text-center">
      {introtext4()}
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.props.moneyname} onChange={this.handleChange}/>
        <input type="submit" value="Choisir" />
      </form>
    </div>
  }
}

class Bloc1 extends Component { //Notation des transactions
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
    return ( <div className="text-center"> {text1()}
    </div>
    );
  }
}

class Bloc2 extends Component { //Décentralisation de la monnaie
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
    return (<div className="text-center"> {text2(this.props.moneyname)}
    </div>
    );
  }
}

class Bloc3 extends Component { //Signature électronique
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
    return (<div className="text-center"> {text3(this.props.moneyname)}
    </div>
    );
  }
}

class Bloc4 extends Component { //Listes d'attentes
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
    return (<div className="text-center"> {text4()}
    </div>
    );
  }
}

class Bloc5 extends Component { //Blockchain
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
    return (<div className="text-center"> {text5()}
    </div>
    );
  }
}

class Bloc6 extends Component { //Proof of work
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
    return (<div className="text-center"> {text6()}
    </div>
    );
  }
}

class Bloc7 extends Component { //Rétribution
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
    return (<div className="text-center"> {text7(this.props.moneyname)}
    </div>
    );
  }
}

class Bloc8 extends Component { //Travail d'équipe
  
  render(){
    return (<div className="text-center"> {text8()}
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
