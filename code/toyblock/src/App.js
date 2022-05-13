// Imports

import React, { Component } from 'react'

import './App.css';
import { introtext1, introtext2, introtext3, introtext4, text1, text1_1, text2, text3, text3_1, text4, text5, text6, text6_1, text7, text8, text9 } from './Blocs.js'
import { NotebookBlock, VillageBlock, HashingBlock, animals, neighbors } from './Components.js'
import { BlocTest } from './Test.js'
import { Notebook } from './Classes.js'

// Visual imports

import coffreVisual from './visuals/coffre.png'
import flechVisual from './visuals/flech.png'

/*
Here you can change the base parameters of the website

Pick another startdistance if you want to start the story further (From 1 to 13)
Pick another defaultname if you want to change the default name of the currency
Pick another baseword if you can to change the default word of the hash machine
Set test to true if you want to load a test version of the website
*/
const startdistance = 1;
const defaultname = "Toycoin";
const baseword = "Bonjour";

const test = false;

class HandlingBlock extends Component {

  constructor(props) {
    super(props);
    this.incrementDistance = this.incrementDistance.bind(this)
    this.changeName = this.changeName.bind(this)
    this.state = { distance: startdistance, moneyname: defaultname };
  }

  incrementDistance() {
    if (this.state.distance < 13) {
      console.log("We move forward in the document. New distance:" + this.state.distance);
      this.setState({ distance: this.state.distance + 1 });
    }
    console.assert(this.state.distance <= 13)
  }

  changeName(newname) {
    this.setState({ moneyname: newname })
    console.log("Moneyname is changed to " + this.state.moneyname)
  }

  render() {
    if (test) {
      return <BlocTest />
    }

    var fulltext = [];

    if (this.state.distance === 1) {
      console.log("Entered Intro Block 1")
      return (
        <div> <BlocIntro1 onDistanceChange={this.incrementDistance} distance={this.state.distance} />
        </div>
      )
    }
    if (this.state.distance === 2) {
      console.log("Entered Intro Block 2")
      return (
        <div>
          <BlocIntro2 onDistanceChange={this.incrementDistance} distance={this.state.distance} />
        </div>
      )
    }
    if (this.state.distance === 3) {
      console.log("Entered Intro Block 3")
      return (
        <div><BlocIntro3 onDistanceChange={this.incrementDistance} distance={this.state.distance} />
        </div>
      )
    }
    if (this.state.distance === 4) {
      console.log("Entered Intro Block 4")
      return (
        <div><BlocIntro4 onDistanceChange={this.incrementDistance} onNameChange={this.changeName} distance={this.state.distance} moneyname={this.state.moneyname} />
        </div>
      )
    }
    if (this.state.distance >= 5) {
      console.log("Entered Block 1")
      fulltext.push(<div><Bloc1 onDistanceChange={this.incrementDistance} distance={this.state.distance} moneyname={this.state.moneyname} />
      </div>)
    }
    if (this.state.distance >= 6) {
      console.log("Entered Block 2")
      fulltext.push(<div>
        <Bloc2 onDistanceChange={this.incrementDistance} distance={this.state.distance} moneyname={this.state.moneyname} />
      </div>)
    }
    if (this.state.distance >= 7) {
      console.log("Entered Block 3")
      fulltext.push(<div><Bloc3 onDistanceChange={this.incrementDistance} distance={this.state.distance} moneyname={this.state.moneyname} />
      </div>)
    }
    if (this.state.distance >= 8) {
      console.log("Entered Block 4")
      fulltext.push(<div><Bloc4 onDistanceChange={this.incrementDistance} distance={this.state.distance} moneyname={this.state.moneyname}/>
      </div>)
    }
    if (this.state.distance >= 9) {
      console.log("Entered Block 5")
      fulltext.push(<div><Bloc5 onDistanceChange={this.incrementDistance} distance={this.state.distance} moneyname={this.state.moneyname}/>
      </div>)
    }
    if (this.state.distance >= 10) {
      console.log("Entered Block 6")
      fulltext.push(
        <div>
          <div>
            <Bloc6 onDistanceChange={this.incrementDistance} distance={this.state.distance} moneyname={this.state.moneyname}/>
          </div>
        </div>)
    }
    if (this.state.distance >= 11) {
      console.log("Entered Block 7")
      fulltext.push(<div><Bloc7 onDistanceChange={this.incrementDistance} distance={this.state.distance} moneyname={this.state.moneyname} />
      </div>)
    }
    if (this.state.distance >= 12) {
      console.log("Entered Block 8")
      fulltext.push(<div><Bloc8 onDistanceChange={this.incrementDistance} distance={this.state.distance} moneyname={this.state.moneyname}/>
      </div>)
    }
    if (this.state.distance >= 13) {
      console.log("Entered Block 9")
      fulltext.push(<div><Bloc9 onDistanceChange={this.incrementDistance} distance={this.state.distance} moneyname={this.state.moneyname}/>
      </div>)
    }

    fulltext.push(<div id="whiteParagraph"></div>)

    return fulltext;
  }
}

class BlocIntro1 extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e) => {
    this.props.onDistanceChange();
  }

  render() {
    return <div class="centeredscreen">
      <div class="paragraph centeredtext">
        <div>
          {introtext1()}
        </div>
      </div>
    </div>;
  }
}

class BlocIntro2 extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e) => {
    this.props.onDistanceChange();
  }
  render() {
    return <div class="centeredscreen">
      <div class="paragraph centeredtext">
        <div>
          {introtext2()}
        </div>
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
    this.props.onDistanceChange();
  }

  render() {
    return <div class="centeredscreen">
      <div class="paragraph centeredtext">
        <div>{introtext3()}</div>
        <div class="button" onClick={() => this.handleClick()}>Allons-y</div>
      </div>
    </div>
  }
}

class BlocIntro4 extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    this.props.onDistanceChange();
  }

  handleChange = (e) => {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return <div class="centeredscreen">
      <div class="paragraph centeredtext">
        <div>{introtext4()}</div>

        <form onSubmit={this.handleSubmit} class="marged">
          <input type="text" value={this.props.moneyname} onChange={this.handleChange} class="input" />
          <input type="submit" value="Choisir ce nom" class="button" />
        </form>
      </div>
    </div>
  }
}

/* END OF THE INTRO */

class Bloc1 extends Component { //Notation des transactions
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll, false);
  }

  handleScroll = (e) => {
    const event = e.target.scrollingElement;
    const bottom = Math.abs(event.scrollHeight - (event.scrollTop + event.clientHeight)) <= 1;

    if (bottom) {
      this.props.onDistanceChange();
    }
  }

  render() {

    let notebook = new Notebook("Toucan", 15, animals, true)

    return (<div>
      <div id="flechcontainer">
        <img id="scrollsign" src={flechVisual} height="80" width="120"></img>
      </div>
      <div class="paragraph">
        {text1(this.props.moneyname)}
      </div>
      <div class="machine">
        <div class="paragraph">
          Voici un exemple de carnet, avec lequel tu peux t'amuser.

          Tu peux peux cliquer sur la tête des villageois pour indiquer l'origine et le destinataire, et choisir le montant qu'il te plaît.
          <br />
          <br />
          Ici, on imagine que chaque habitant a reçu le solde de base de 15 {this.props.moneyname}s.
        </div>
        <div class="marged centeredtext">
          <NotebookBlock
            notebook={notebook}
            limit={6}
            resettable={true}
            inVillage={false}
            moneyName={this.props.moneyname}
          />
        </div>
        <div class="paragraph">
          Essaie de faire dépenser à Grenouille plus de 40 {this.props.moneyname}s d'un seul coup !
          <br />
          <br />
          Si ton carnet est rempli, tu peux appuyer sur reset pour le remettre à zéro.
        </div>
      </div>
      <div class="paragraph">
        {text1_1()}
      </div>
    </div>
    );
  }
}

class Bloc2 extends Component { //Décentralisation de la monnaie

  render() {
    return (<div class="paragraph"> <br /> <br /> <br /> <div>{text2(this.props.moneyname)}</div>
    </div>
    );
  }
}

class Bloc3 extends Component { //Signature électronique
  render() {
    return (<div>
      <div class="paragraph"> <br /> <br /> <br />
        <div>
          {text3(this.props.moneyname)}
        </div>
        <img src={coffreVisual} class="responsiveImage"></img>
        <div>
          {text3_1(this.props.moneyname)}
        </div>
      </div>

      <div class="machine">
        <div class="paragraph">
          Voici un village imaginaire avec lequel tu peux interagir. Il suffit de cliquer sur la maison d'un villageois pour ouvrir son propre carnet, et y écrire des transactions !
          Encore une fois, on imagine ici qu'au départ, tous les villageois ont 15 {this.props.moneyname}s.<br />

          Amuse-toi à écrire des transactions et les voir se transmettre de carnet en carnet !
        </div>
        <div class="marged centeredtext">
          <VillageBlock
            basemoney={15}
            animals={animals}
            neighbors={neighbors}
            fillEmptyTransaction={true}

            limit={8}
            resettable={true}
            moneyName={this.props.moneyname}
          />
        </div>
        <div class="paragraph">
          Penses-tu être capable de créer le même problème que Renard ?
        </div>
      </div>
    </div>
    );
  }
}

class Bloc4 extends Component { //Listes d'attentes

  render() {
    return (<div class="paragraph"> <br /> <br /> <br /> <div>{text4(this.props.moneyname)}</div>
    </div>
    );
  }
}

class Bloc5 extends Component { //Blockchain

  render() {
    return (<div class="paragraph"> <br /> <br /> <br /> <div>{text5()}</div>
    </div>
    );
  }
}

class Bloc6 extends Component { //Proof of work

  render() {
    return (
      <div> <br /> <br /> <br />
        <div class="paragraph">
          {text6()}
        </div>
        <div class="machine">
          <div class="paragraph">
            Tu peux essayer de hasher tes propres mots ! Pourquoi ne pas essayer avec ton prénom, pour commencer ?
          </div>
          <div>
            <HashingBlock baseword={baseword} />
          </div>
          <div class="paragraph">
            Voici un petit défi : Essaie de trouver un mot dont le hash commence par le chiffre 5.
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

  render() {
    return (<div class="paragraph"> <br /> <br /> <br /> <div>{text7(this.props.moneyname)}</div>
    </div>
    );
  }
}

class Bloc8 extends Component { //Travail d'équipe

  render() {
    return (
      <div class="paragraph"> <br /> <br /> <br />
        <div>
          {text8()}
        </div>
      </div>
    );
  }
}

class Bloc9 extends Component { //Conclusion

  render() {
    return (
      <div class="paragraph"> <br /> <br /> <br />
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
