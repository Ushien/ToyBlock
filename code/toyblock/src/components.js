import React, { Component } from 'react'
import { Transaction, Notebook, Village } from './Classes.js'

import chatVisual from './visuals/Chat.png';
import grenouilleVisual from './visuals/Grenouille.png'
import paresseuxVisual from './visuals/Paresseux.png'
import pingouinVisual from './visuals/Pingouin.png'
import singeVisual from './visuals/Singe.png'
import toucanVisual from './visuals/Toucan.png'
import flechVisual from './visuals/flech.png'
import chatmaison from './visuals/chatmaison.png'
import grenouillemaison from './visuals/grenouillemaison.png'
import singemaison from './visuals/singemaison.png'
import pingouinmaison from './visuals/pingouinmaison.png'
import paresseuxmaison from './visuals/paresseuxmaison.png'
import toucanmaison from './visuals/toucanmaison.png'
import lettre from './visuals/lettre.png'

// TODO Corriger les erreurs js

// TODO Ajouter les derniers dessins

// Village and transactions machines

// Class definition

const animals = ["Paresseux", "Pingouin", "Toucan", "Grenouille", "Singe", "Chat"]
const neighbors = { "Paresseux": { "Toucan": 2, "Grenouille": 2 }, "Pingouin": { "Grenouille": 1 }, "Toucan": { "Paresseux": 2, "Chat": 1 }, "Grenouille": { "Paresseux": 2, "Singe": 1, "Pingouin": 1 }, "Singe": { "Grenouille": 1 }, "Chat": { "Toucan": 1 } }
const visualMapping = { "Chat": chatVisual, "Grenouille": grenouilleVisual, "Paresseux": paresseuxVisual, "Pingouin": pingouinVisual, "Singe": singeVisual, "Toucan": toucanVisual }

// TODO Optimiser findVisual

function findVisual(animal) {
        return visualMapping[animal]
}

function sendLetter(from, to) {

        let movementclass = ""
        let positions = { "Singe": [1, 1], "Grenouille": [1, 2], "Pingouin": [1, 3], "Paresseux": [2, 2], "Toucan": [3, 2], "Chat": [3, 3] }
        let x_movement = positions[to][0] - positions[from][0];
        let y_movement = positions[to][1] - positions[from][1];

        // assert les 2 mouvements sont compris entre 1 et -1
        // assert un des mouvements doit être égal à 0 et l'autre être différent

        if (x_movement == 1) {
                movementclass = "-left-right"
        }
        if (x_movement == -1) {
                movementclass = "-right-left"
        }
        if (y_movement == 1) {
                movementclass = "-up-down"
        }
        if (y_movement == -1) {
                movementclass = "-down-up"
        }

        var newElement = document.createElement("img");

        newElement.src = lettre;
        newElement.width = "120"
        newElement.height = "120"
        newElement.className = from + "letter" + movementclass + " letter"

        document.getElementById("villageContainer").appendChild(newElement);
}

////////////////////////////////////////////////////////
// React components                                   //
////////////////////////////////////////////////////////

//Component displaying a transaction line

//Parler des props attendues

// moneyName
class TransactionLine extends Component {
        constructor(props) {
                super(props);
                this.validateTransaction = this.validateTransaction.bind(this);
                this.handleChangeAmount = this.handleChangeAmount.bind(this);
                this.generateNextVillager = this.generateNextVillager.bind(this);
        }

        handleChangeAmount(e) {
                // Bloque les entrées vides
                let value = 0
                if (e.target.value != '') {
                        value = parseInt(e.target.value)
                }

                this.props.handleChangeAmount(this.props.index, value)

        }

        validateTransaction(e) {
                this.props.validateTransaction(this.props.index)

                // TODO  Assert vérifier que la transaction est validable
        }

        // Change the current to and from state depening on the available villagers.
        generateNextVillager(fromto) {

                this.props.generateNextVillager(this.props.index, fromto)

        }

        check = (e) => {
        }

        render() {
                let fulltext = []

                let fromWidth = "80"
                if (this.props.from == "Toucan" || this.props.from == "Singe") {
                        fromWidth = "120"
                }

                let toWidth = "80"
                if (this.props.to == "Toucan" || this.props.to == "Singe") {
                        toWidth = "120"
                }

                if (!(this.props.validated)) {
                        // Transaction non validées non validables
                        if (!(this.props.validable)) {
                                fulltext.push(
                                        <div class="noWrap">
                                                <div class="spriteWrapper">
                                                        <img onClick={() => this.generateNextVillager("From")} src={findVisual(this.props.from)} class="villagerSprite clickable" height="80" width={fromWidth}></img>
                                                </div>
                                                <img src={flechVisual} height="80" width="120"></img>
                                                <div class="spriteWrapper">
                                                        <img onClick={() => this.generateNextVillager("To")} src={findVisual(this.props.to)} class="villagerSprite clickable" height="80" width={toWidth}></img>
                                                </div>
                                                <div class="displayAmount">
                                                        <input class="amountForm" type="number" value={this.props.amount} onChange={this.handleChangeAmount} />
                                                        {this.props.moneyName}s
                                                </div>
                                                <div class="validateWrapper"></div>

                                        </div>
                                )
                        }
                        // Transactions non validées validables
                        else {
                                fulltext.push(
                                        <div class="noWrap">
                                                <div class="spriteWrapper">
                                                        <img onClick={() => this.generateNextVillager("From")} src={findVisual(this.props.from)} class="villagerSprite clickable" height="80" width={fromWidth}></img>
                                                </div>
                                                <img src={flechVisual} height="80" width="120"></img>
                                                <div class="spriteWrapper">
                                                        <img onClick={() => this.generateNextVillager("To")} src={findVisual(this.props.to)} class="villagerSprite clickable" height="80" width={toWidth}></img>
                                                </div>
                                                <div class="displayAmount">
                                                        <input class="amountForm" type="number" value={this.props.amount} onChange={this.handleChangeAmount} />
                                                        {this.props.moneyName}s
                                                </div>
                                                <div class="validateWrapper">

                                                        <button class="button" onClick={() => this.validateTransaction()}>
                                                                <div>
                                                                        Valider
                                                                </div>
                                                        </button>


                                                </div>
                                        </div>)
                        }

                }

                // Transactions validées
                else {
                        fulltext.push(
                                <div class="noWrap">
                                        <div class="spriteWrapper"><img src={findVisual(this.props.from)} class="villagerSprite" height="80" width={fromWidth}></img></div>
                                        <div><img src={flechVisual} height="80" width="120"></img></div>
                                        <div class="spriteWrapper"><img src={findVisual(this.props.to)} class="villagerSprite" height="80" width={toWidth}></img></div>
                                        <div class="displayAmount"><div class="amountForm">{this.props.amount}</div> <div>{this.props.moneyName}s</div></div>
                                        <div class="validateWrapper"></div>
                                </div>
                        )
                }

                return fulltext;
        }
}


// Component displaying a transaction list


// TODO Finir la spec des props
/*
Waited props:

notebook : the notebook object you want to display
limit : the 
resettable = {false}
inVillage : set to true if you call this component from a VillageBlock component
transmitTransaction = a transmission function from a VillageBlock component (don't need to pass it if you're not calling from a VillageBlock)
moneyName : 
*/
class NotebookBlock extends Component {
        constructor(props) {
                super(props);

                let availableVillagers = []
                for (let index = 0; index < this.props.notebook.getTransactions().length; index++) {
                        let newArray = [...this.props.notebook.getVillagers()];
                        newArray.splice(newArray.lastIndexOf(this.props.notebook.getTransactions()[index].getFrom()), 1);
                        newArray.splice(newArray.lastIndexOf(this.props.notebook.getTransactions()[index].getTo()), 1);
                        availableVillagers.push(newArray)
                }

                this.state = {
                        notebook: this.props.notebook,
                        transactions: this.props.notebook.getTransactions(),
                        villagers: this.props.notebook.getVillagers(),
                        availableVillagers: availableVillagers,
                        validable: []
                }

                this.transmitTransaction = this.transmitTransaction.bind(this)
                this.validateTransaction = this.validateTransaction.bind(this);
                this.handleChangeAmount = this.handleChangeAmount.bind(this);
                this.generateNextVillager = this.generateNextVillager.bind(this);

                this.updateValidable();
        }

        // Debug helper
        // Will display in the console the current state of the memory
        check() {
                console.log("===================================================")
                console.log("Les transactions actuelles")
                console.log(this.state.transactions)
                console.log("L'objet Notebook en props")
                console.log(this.props.notebook)
                console.log("L'objet Notebook en state")
                console.log(this.state.notebook)
                console.log("Les villageois disponibles pour chaque transaction")
                console.log(this.state.availableVillagers)
                console.log("Quelle transaction est validable ?")
                console.log(this.state.validable)
                // Add instructions here
        }

        // Debug helper
        // Useful to trigger some functions
        clickMe() {
                console.log("touchMe triggered")
                // Add functions here
        }

        validateTransaction(index) {
                let newtransactions = this.state.transactions
                console.log("On m\'a appelé ?")
                newtransactions[index].validate();

                let newnotebook = this.state.notebook
                newnotebook.applyTransaction(newtransactions[index])

                // S'il reste assez de place, crée une nouvelle transaction vide
                let newavailable = [...this.state.availableVillagers]

                if (this.state.transactions.length < this.props.limit) {
                        newnotebook.addTransaction(new Transaction(newtransactions[index].getFrom(), newtransactions[index].getTo(), 0, false))
                        newavailable.push(this.state.availableVillagers[index])
                }

                // Si y a des voisins, leur envoie une copie de la transaction
                if (this.props.inVillage) {
                        this.transmitTransaction(newtransactions[index], "")
                }

                // Update l'affichage

                this.setState({ transaction: newtransactions, notebook: newnotebook, availableVillagers: newavailable });
                this.updateValidable()
        }

        transmitTransaction(transaction, exclude) {
                if (this.props.inVillage) {
                        this.props.transmitTransaction(this.state.notebook.property, transaction, exclude)
                }
        }

        handleChangeAmount(index, newAmount) {
                let newtransactions = this.state.transactions
                newtransactions[index].setAmount(newAmount);

                // Update l'affichage

                this.setState({ transaction: newtransactions });
                this.updateValidable()
        }

        generateNextVillager(id, fromto) {

                let tempTransactions = this.state.transactions
                let totalArr = [...this.state.availableVillagers]

                let assertionBuddy = 0


                if (fromto == "From") {
                        let arr = [...this.state.availableVillagers][id];
                        arr.push(this.state.transactions[id].getFrom())
                        let newFrom = arr[0]
                        arr.shift()
                        tempTransactions[id].setFrom(newFrom)
                        totalArr[id] = arr

                        assertionBuddy++
                }

                if (fromto == "To") {
                        let arr = [...this.state.availableVillagers][id];
                        arr.push(this.state.transactions[id].getTo())
                        let newTo = arr[0]
                        arr.shift()
                        tempTransactions[id].setTo(newTo)
                        totalArr[id] = arr

                        assertionBuddy++
                }

                console.assert(assertionBuddy == 1, "Incorrect fromTo parameter")

                // Update l'affichage

                this.setState({ availableVillagers: totalArr, transaction: tempTransactions })
                this.updateValidable()
        }

        updateValidable() {
                let temp = [...this.state.transactions];
                let newValidable = []

                for (let i = 0; i < temp.length; i++) {
                        newValidable.push(true)
                        if ((temp[i].isValidated()) || (isNaN(temp[i].getAmount()) || (temp[i].getAmount() <= 0))) {
                                newValidable[i] = false
                        }
                        else {
                                if (this.state.notebook.checkAccount(temp[i])) {
                                        newValidable[i] = true;
                                }
                                else {
                                        newValidable[i] = false;
                                }
                        }
                }

                // Update l'affichage

                this.setState({ validable: newValidable })
        }

        // reset the notebook block with a brand new empty notebook
        fullReset() {

                let notebook = new Notebook(this.state.notebook.getProperty(), this.state.notebook.getStartMoney(), this.state.notebook.getVillagers(), false)
                notebook.addTransaction(new Transaction(
                        this.state.transactions[this.state.transactions.length - 1].getFrom(),
                        this.state.transactions[this.state.transactions.length - 1].getTo(),
                        0,
                        false
                )
                )
                let transactions = notebook.getTransactions()
                let villagers = notebook.getVillagers()
                let availableVillagers = []
                availableVillagers.push(this.state.availableVillagers[this.state.availableVillagers.length - 1])
                let validable = []
                validable.push(false)

                this.setState({
                        notebook: notebook,
                        transactions: transactions,
                        villagers: villagers,
                        availableVillagers: availableVillagers,
                        validable: validable
                })

                this.updateValidable();
        }

        // TODO Comment gérer une transaction qui entre alors que c'est complet ?

        render() {
                let fullRender = []

                for (let index = 0; index < this.state.transactions.length; index++) {
                        fullRender.push(
                                <div class="transactionLine">
                                        <div key={index} class="inline">
                                                <TransactionLine
                                                        index={index}
                                                        from={this.state.transactions[index].getFrom()}
                                                        to={this.state.transactions[index].getTo()}
                                                        amount={this.state.transactions[index].getAmount()}
                                                        validated={this.state.transactions[index].isValidated()}
                                                        validable={this.state.validable[index]}
                                                        validateTransaction={this.validateTransaction}
                                                        handleChangeAmount={this.handleChangeAmount}
                                                        generateNextVillager={this.generateNextVillager}
                                                        moneyName={this.props.moneyName}
                                                />
                                        </div></div>)
                }

                // If the component is resettable add a reset button
                if (this.props.resettable) {
                        fullRender.push(
                                <button onClick={() => this.fullReset()} class="button">
                                        Reset
                                </button>
                        )
                }

                // Debug buttons
                if (this.props.testing) {
                        fullRender.push(
                                <div>
                                        <button onClick={() => this.check()}>
                                                Vérifier l'état du notebook
                                        </button>
                                        <button onClick={() => this.clickMe()}>
                                                Bouton de test
                                        </button>
                                </div>
                        )
                }

                return (
                        <div>
                                {fullRender}
                        </div>
                )
        }

}

//Component displaying a village

/*
Waited props:

village : village object you want to display (village)
limit : the number of transactions a notebook can handle (integer)
resettable : if the village can be resetted (boolean)
moneyName : 

*/
class VillageBlock extends Component {
        constructor(props) {
                super(props);

                let village = new Village(this.props.basemoney, this.props.animals, this.props.neighbors, this.props.fillEmptyTransaction);
                this.state = {
                        startMoney: village.getStartMoney(),
                        village: village,
                        invalidNotebook: false,
                        selectedVillager: ""
                }

                this.transmitTransaction = this.transmitTransaction.bind(this)
        }

        clickMe(e) {

                // Add functions here

        }

        transmitTransaction(property, transaction, exclude) {
                console.log("Let's go")
                this.state.village.getNotebook(property).transmitTransaction(transaction, exclude)
                this.setState({ village: this.state.village })
                setTimeout(() => { this.setState({}) }, 9000);
                setTimeout(() => { this.alertInvalidNotebook() }, 9000);
                setTimeout(() => { this.setState({}) }, 18000);
                setTimeout(() => { this.alertInvalidNotebook() }, 18000);
                setTimeout(() => { this.setState({}) }, 27000);
                setTimeout(() => { this.alertInvalidNotebook() }, 27000);
                setTimeout(() => { this.setState({}) }, 36000);
                setTimeout(() => { this.alertInvalidNotebook() }, 36000);
        }

        alertInvalidNotebook() {
                if (!(this.state.invalidNotebook)) {
                        for (let index in this.state.village.getNotebooks()) {
                                if (this.state.village.getNotebooks()[index].isNotebookInvalid()) {
                                        this.setState({ invalidNotebook: true })
                                }
                        }
                }
        }

        fullReset() {

                this.state.village.setObsolete();

                let newVillage = new Village(this.props.basemoney, this.props.animals, this.props.neighbors, this.props.fillEmptyTransaction);
                this.setState({
                        startMoney: newVillage.getStartMoney(),
                        village: newVillage,
                        invalidNotebook: false,
                        selectedVillager: ""
                })

                const letters = document.getElementsByClassName('letter');
                while (letters.length > 0) letters[0].remove();

        }

        //TODO Faire en sorte que ça s'ajoute pas en dernière place

        check(e) {
                console.log("===================================================")
                console.log("Etat du village en state")
                console.log(this.state.village)
                console.log("Etat du clone du village")
                console.log(this.state.cloneVillage)
                console.log("Villageois sélectionné")
                console.log(this.state.selectedVillager)
        }

        selectVillager(animal) {
                if (this.state.selectedVillager == animal) {
                        this.setState({ selectedVillager: "" })
                }
                else {
                        this.setState({ selectedVillager: animal })
                }
        }

        render() {
                var fulltext = []

                let valid = true;

                for (let index in this.state.village.getNotebooks()) {
                        if (this.state.village.getNotebooks()[index].isNotebookInvalid()) {
                                valid = false;
                        }
                }

                // D'abord, affiche le village

                if (valid) {
                        fulltext.push(<div id="villageContainer" class="villageContainer">
                                <div id="h-l-pathway"></div>
                                <div id="v-l-pathway"></div>
                                <div id="v-s-pathway"></div>
                                <img src={singemaison} onClick={() => this.selectVillager("Singe")} id="singevillager" class="clickable" width="120" height="120"></img>
                                <img src={grenouillemaison} onClick={() => this.selectVillager("Grenouille")} id="grenouillevillager" class="clickable" width="120" height="120"></img>
                                <img src={pingouinmaison} onClick={() => this.selectVillager("Pingouin")} id="pingouinvillager" class="clickable" width="120" height="120"></img>
                                <img src={paresseuxmaison} onClick={() => this.selectVillager("Paresseux")} id="paresseuxvillager" class="clickable" width="120" height="120"></img>
                                <img src={toucanmaison} onClick={() => this.selectVillager("Toucan")} id="toucanvillager" class="clickable" width="120" height="120"></img>
                                <img src={chatmaison} onClick={() => this.selectVillager("Chat")} id="chatvillager" class="clickable" width="120" height="120"></img>
                                <button id="buttonResetVillage" class="button" onClick={() => this.fullReset()}> Reset </button>
                        </div>)
                }
                else {
                        fulltext.push(<div id="villageContainer" class="villageContainer">
                                <div id="h-l-pathway"></div>
                                <div id="v-l-pathway"></div>
                                <div id="v-s-pathway"></div>
                                <img src={singemaison} id="singevillager" width="120" height="120"></img>
                                <img src={grenouillemaison} id="grenouillevillager" width="120" height="120"></img>
                                <img src={pingouinmaison} id="pingouinvillager" width="120" height="120"></img>
                                <img src={paresseuxmaison} id="paresseuxvillager" width="120" height="120"></img>
                                <img src={toucanmaison} id="toucanvillager" width="120" height="120"></img>
                                <img src={chatmaison} id="chatvillager" width="120" height="120"></img>
                                <button id="buttonResetVillage" class="button" onClick={() => this.fullReset()}> Reset </button>
                        </div>)
                }


                // Si un notebook est sélectionné, l'affiche en dessous

                if (valid) {
                        for (let index in this.state.village.getNotebooks()) {
                                if (this.state.village.getNotebooks()[index].getProperty() == this.state.selectedVillager) {
                                        fulltext.push(<div key={index}>
                                                {this.state.village.getNotebooks()[index].getProperty()}
                                                <NotebookBlock
                                                        notebook={this.state.village.getNotebooks()[index]}
                                                        limit={this.props.limit}
                                                        resettable={false}
                                                        inVillage={true}
                                                        transmitTransaction={this.transmitTransaction}
                                                        moneyName={this.props.moneyName}
                                                />
                                        </div>
                                        )
                                }
                        }
                }

                if (this.props.testing) {
                        fulltext.push(
                                <div>
                                        <button onClick={() => this.clickMe()}>
                                                Bouton de test
                                        </button>
                                        <button onClick={() => this.check()}>
                                                Vérifier état
                                        </button>
                                </div>
                        )
                }

                return (
                        <ul>
                                {fulltext}
                        </ul>
                )
        }

}

////////////////////////////////////////////////////////

// Hashing machine

const SHA256 = require("crypto-js/sha256");

function hashing(number) {
        return SHA256(number).toString()
}

class HashingBlock extends Component {
        constructor(props) {
                super(props);
                this.state = { hashword: this.props.baseword, hashed: hashing(this.props.baseword) }
        }

        handleChange = (e) => {
                this.setState({ hashword: (e.target.value) })
                this.setState({ hashed: hashing(e.target.value) })
        }

        render() {
                return (
                        <div className="centeredtext">

                                <input type="text" value={this.state.hashword} onChange={this.handleChange} class="input" />

                                <div class="centeredelement">
                                        <div class="output">
                                                {this.state.hashed}
                                        </div>
                                </div>
                        </div>
                )
        }
}

export {
        hashing, sendLetter,
        TransactionLine, NotebookBlock, VillageBlock, HashingBlock,
        animals, neighbors
}