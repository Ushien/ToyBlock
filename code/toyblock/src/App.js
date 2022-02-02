// Imports

import './App.css';
import React, { Component } from 'react'
import {introtext1, introtext2, introtext3, introtext4, text1, text2, text3, text4, text5, text6, text6_1, text7, text8, text9} from './Blocs.js'
import {hashing, HashingBlock} from './blockchain.js'

//import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from 'react-bootstrap/Button';

/*
Here you can change the base parameters of the website

Pick another startdistance if you want to start the story further (From 1 to 13)
Pick another defaultname if you want to change the default name of the currency
Pick another baseword if you can to change the default word of the hash machine
*/
const startdistance = 1
const defaultname = "Toycoin"
const baseword = "Bonjour"

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
    if(this.state.distance < 13){
      console.log("We move forward in the document")
      this.setState({distance: this.state.distance+1});
    }
    console.assert(this.state.distance <= 13)
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
      wholetext.push(<div>
        <Bloc2 onDistanceChange={this.incrementDistance} distance={this.state.distance} moneyname={this.state.moneyname}/>
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
      wholetext.push(
        <div>
          <div>
            <Bloc6 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
          </div>
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
    if (this.state.distance >=13){
      console.log("Entered Block 9")
      wholetext.push(<div><Bloc9 onDistanceChange={this.incrementDistance} distance={this.state.distance}/>
        </div>)
    }

    wholetext.push(<div><br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> </div>)

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
    return <div class="paragraph intro"> 
    <div>
      {introtext1()}
    </div>
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
    return<div class="paragraph intro"> 
    <div>
      {introtext2()}
    </div>
    </div>;
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
    return <div class="paragraph intro">
      <div>{introtext3()}</div>
      <div class="button" onClick={() => this.handleClick()}>Allons-y</div>
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
    return <div class="paragraph intro">
      <div>{introtext4()}</div>
      
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.props.moneyname} onChange={this.handleChange}/>
        <input type="submit" value="Choisir" />
      </form>
    </div>
  }
}

/* END OF THE INTRO */

class Bloc1 extends Component { //Notation des transactions
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    document.addEventListener('scroll', this.handleClick, false);
  }

  componentWillUnmount(){
    document.removeEventListener('scroll', this.handleClick, false);
  }

  handleClick = (e) => {
    const event = e.target.scrollingElement;
    console.log("The screen is scrolled");
    //const bottom = e.target.scrollingElement.scrollHeight - e.target.scrollingElement.scrollTop === e.target.scrollingElement.clientHeight;
    const bottom = Math.abs(event.scrollHeight - (event.scrollTop + event.clientHeight)) <= 1;

    if (bottom){
      console.log("Enter the condition")
      this.props.onDistanceChange();
    }
  }

  render(){
    return ( <div class="paragraph"> <br/> <br/> <br/> <div>{text1()}</div>
    </div>
    );
  }
}

class Bloc2 extends Component { //Décentralisation de la monnaie
  constructor(props) {
    super(props);
  }

  render(){
    return (<div class="paragraph"> <br/> <br/> <br/> <div>{text2(this.props.moneyname)}</div>
    </div>
    );
  }
}

class Bloc3 extends Component { //Signature électronique
  constructor(props) {
    super(props);
  }

  render(){
    return (
    <div class="paragraph"> <br/> <br/> <br/> 
      <div>
        {text3(this.props.moneyname)}
      </div>
    </div>
    );
  }
}

class Bloc4 extends Component { //Listes d'attentes
    constructor(props) {
    super(props);
  }

  render(){
    return (<div class="paragraph"> <br/> <br/> <br/> <div>{text4()}</div>
    </div>
    );
  }
}

class Bloc5 extends Component { //Blockchain
    constructor(props) {
    super(props);
  }

  render(){
    return (<div class="paragraph"> <br/> <br/> <br/> <div>{text5()}</div>
    </div>
    );
  }
}

class Bloc6 extends Component { //Proof of work
    constructor(props) {
    super(props);
  }

  render(){
    return (
    <div> <br/> <br/> <br/> 
      <div class="paragraph">
        {text6()}
      </div>
      <div class = "machine">
        <div class = "paragraph">
        Tu peux essayer de hasher tes propres mots ! Tu peux par exemple essayer de hasher ton prénom.
        <HashingBlock baseword = {baseword}/>
        Voilà un petit défi: Essaie de trouver un mot dont le hash commence par le chiffre 5.
        </div>
      </div>
      <div class="paragraph">
        {text6_1()}
      </div>
    </div>
    );
  }
}

class Bloc7 extends Component { //Rétribution
    constructor(props) {
    super(props);
  }

  render(){
    return (<div class="paragraph"> <br/> <br/> <br/> <div>{text7(this.props.moneyname)}</div>
    </div>
    );
  }
}

class Bloc8 extends Component { //Travail d'équipe
  
  render(){
    return (
    <div class="paragraph"> <br/> <br/> <br/> 
      <div>
        {text8()}
      </div>
    </div>
    );
  }
}

class Bloc9 extends Component { //Conclusion
  
  render(){
    return (
    <div class="paragraph"> <br/> <br/> <br/> 
      <div>
        {text9()}
      </div>
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
