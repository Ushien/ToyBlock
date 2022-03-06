import React, { Component } from 'react'
import { Transaction, Notebook, Village } from './Classes.js'

// Visual imports

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

// Constants definition

// Here you can change the members of the story.
// Note: The current version of the project won't visually handle modification of these data. 
// The Village Notebook and Transaction class will still work perfectly.

const animals = ["Paresseux", "Pingouin", "Toucan", "Grenouille", "Singe", "Chat"]
const neighbors = { "Paresseux": { "Toucan": 2, "Grenouille": 2 }, "Pingouin": { "Grenouille": 1 }, "Toucan": { "Paresseux": 2, "Chat": 1 }, "Grenouille": { "Paresseux": 2, "Singe": 1, "Pingouin": 1 }, "Singe": { "Grenouille": 1 }, "Chat": { "Toucan": 1 } }
const visualMapping = { "Chat": chatVisual, "Grenouille": grenouilleVisual, "Paresseux": paresseuxVisual, "Pingouin": pingouinVisual, "Singe": singeVisual, "Toucan": toucanVisual }
const positions = { "Singe": [1, 1], "Grenouille": [1, 2], "Pingouin": [1, 3], "Paresseux": [2, 2], "Toucan": [3, 2], "Chat": [3, 3] };

/**
 * Returns the image file associated with the villager
 * 
 * @param {string} animal - The name of the villager
 * @returns {Object} - The visual corresponding to the villager
 */
function findVisual(animal) {
        return visualMapping[animal]
}

/**
 * Display an animated letter on DOM depending on the origin and destination
 * 
 * @param {string} from - The villager the transaction comes from
 * @param {string} to - The villager the transaction goes to
 */
function sendLetter(from, to) {

        // Defines which movement we will need
        let movementclass = ""
        let x_movement = positions[to][0] - positions[from][0];
        let y_movement = positions[to][1] - positions[from][1];

        // Assertions
        console.assert(x_movement <= 1 && x_movement >= -1, "x should be between -1 and 1")
        console.assert(y_movement <= 1 && y_movement >= -1, "y should be between -1 and 1")
        console.assert((y_movement == 0 && x_movement != 0)||(y_movement != 0 && x_movement == 0), "x and y can't equal or be different of 0 at the same time")

        // Associate each movement with a name
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

        // Add a new element to DOM
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

/**
 * Component displaying a transaction line
 */
class TransactionLine extends Component {
        /**
         * Display a transaction line
         * 
         * @param {number} index - The index of the transaction
         * @param {string} from - The villager who gives the money
         * @param {string} to - The villager who receives the money
         * @param {number} amount - The amount of money spent
         * @param {boolean} validated - Whether or not the transaction is validated
         * @param {boolean} validable - Whether or not the transaction can be validated
         * @param {string} moneyName - The name of the money
         * 
         * @param {function} [validateTransaction] - Passed by the notebook component
         * @param {function} [handleChangeAmount] - Passed  by notebook component
         * @param {function} [generateNextVillager] - Passed by the notebook component
         */
        constructor(props) {
                super(props);

                // Binding functions
                this.validateTransaction = this.validateTransaction.bind(this);
                this.handleChangeAmount = this.handleChangeAmount.bind(this);
                this.generateNextVillager = this.generateNextVillager.bind(this);
        }

        /**
         * Update the amount of the transaction
         * 
         * @param {event} e - The value of the input box
         */
        handleChangeAmount(e) {
                // Prevent empty entries
                let value = 0
                if (e.target.value != '') {
                        value = parseInt(e.target.value)
                }

                this.props.handleChangeAmount(this.props.index, value)

        }

        /**
         * Validate the transaction
         */
        validateTransaction() {
                this.props.validateTransaction(this.props.index)
        }

        /**
         * Change the current to and from properties depending on the available villagers.
         * 
         * @param {string} fromto - Whether the origin villager or the destination villager needs to change
         */
        generateNextVillager(fromto) {

                this.props.generateNextVillager(this.props.index, fromto)

        }

        /**
         * Debug function
         * @param {event} e 
         */
        check = (e) => {
        }

        /**
         * Defines the displaying of the transaction
         * 
         * @returns {html} - The displaying of the transaction
         */
        render() {
                let fulltext = []

                // Define the size of the villager sprites
                let fromWidth = "80"
                if (this.props.from == "Toucan" || this.props.from == "Singe") {
                        fromWidth = "120"
                }

                let toWidth = "80"
                if (this.props.to == "Toucan" || this.props.to == "Singe") {
                        toWidth = "120"
                }

                if (!(this.props.validated)) {
                        // Non validated non validable transaction
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
                        // Non validated validable transaction
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

                // Validated transactions
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

/**
 * Component displaying a notebook
 * 
 * @property {Notebook} notebook - The notebook we want to display
 * @property {Transaction[]} transactions - The list of transactions contained in the notebook
 * @property {string[]} villagers - All the villagers composing the village
 * @property {string[][]} availableVillagers - The list of all the villagers available to be changed to
 * @property {boolean[]} validable - Whether or not each transaction is validable
 */
class NotebookBlock extends Component {
        /**
         * Display a notebook block
         * 
         * @param {Notebook} notebook - The notebook we want to display
         * @param {number} limit - The maximum number of transactions we want to handle
         * @param {boolean} resettable - Wheather or not the notebook component is resettable
         * @param {string} moneyName - The name of the money
         * 
         * @param {boolean} [testing] - Wheather or not the test buttons should be displayed
         * @param {boolean} [inVillage] - Wheather or not the component is part of a village component
         * @param {function} [transmitTransaction] - Passed by the village component
         */
        constructor(props) {
                super(props);

                // Define the available villagers for every transaction
                let availableVillagers = []
                for (let index = 0; index < this.props.notebook.getTransactions().length; index++) {
                        let newArray = [...this.props.notebook.getVillagers()];
                        newArray.splice(newArray.lastIndexOf(this.props.notebook.getTransactions()[index].getFrom()), 1);
                        newArray.splice(newArray.lastIndexOf(this.props.notebook.getTransactions()[index].getTo()), 1);
                        availableVillagers.push(newArray)
                }

                // Set state
                this.state = {
                        notebook: this.props.notebook,
                        transactions: this.props.notebook.getTransactions(),
                        villagers: this.props.notebook.getVillagers(),
                        availableVillagers: availableVillagers,
                        validable: []
                }

                // Binding functions
                this.transmitTransaction = this.transmitTransaction.bind(this)
                this.validateTransaction = this.validateTransaction.bind(this);
                this.handleChangeAmount = this.handleChangeAmount.bind(this);
                this.generateNextVillager = this.generateNextVillager.bind(this);

                this.updateValidable();
        }

        /**
         * Debug tool
         * Display the current state of the component
         */
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

        /**
         * Debug tool
         * Add functions to freely trigger them
         */
        clickMe() {
                console.log("touchMe triggered")
                // Add instructions here
        }

        /**
         * Validate the transaction located at a given index
         * 
         * @param {number} index - The index of the transaction to validate
         */
        validateTransaction(index) {
                let newtransactions = this.state.transactions

                // Validate the transaction
                newtransactions[index].validate();
                console.log("Transaction validated")

                // Apply the transaction
                let newnotebook = this.state.notebook
                newnotebook.applyTransaction(newtransactions[index])

                // Create a new empty transaction if there's enough space
                let newavailable = [...this.state.availableVillagers]

                if (this.state.transactions.length < this.props.limit) {
                        newnotebook.addTransaction(new Transaction(newtransactions[index].getFrom(), newtransactions[index].getTo(), 0, false))
                        newavailable.push(this.state.availableVillagers[index])
                }

                // Transmit the transaction if the component is part of a village
                if (this.props.inVillage) {
                        this.transmitTransaction(newtransactions[index], "")
                }

                // Render the displaying
                this.setState({ transaction: newtransactions, notebook: newnotebook, availableVillagers: newavailable });
                this.updateValidable()
        }

        /**
         * Transmit the transaction
         * 
         * @param {Transaction} transaction - The transaction to transmit
         * @param {string} exclude - The neighbor name to exclude from the transmission
         */
        transmitTransaction(transaction, exclude) {
                if (this.props.inVillage) {
                        this.props.transmitTransaction(this.state.notebook.property, transaction, exclude)
                }
        }

        /**
         * Update the amount of the transaction
         * 
         * @param {number} index - The index of the transaction we need to change the amount
         * @param {number} newAmount - The new amount of the transaction
         */
        handleChangeAmount(index, newAmount) {

                // Update the amount of the transaction
                let newtransactions = this.state.transactions
                newtransactions[index].setAmount(newAmount);

                // Render the displaying
                this.setState({ transaction: newtransactions });
                this.updateValidable()
        }

        /**
         * Generates the next villager to switch for
         * 
         * @param {number} id - The index of the transaction we need to change the origin/destination
         * @param {string} fromto - The property of the transaction we want to switch (from or to)
         */
        generateNextVillager(id, fromto) {

                let tempTransactions = this.state.transactions
                let totalArr = [...this.state.availableVillagers]

                let assertionBuddy = 0

                // If the origin villager needs to change
                if (fromto == "From") {
                        let arr = [...this.state.availableVillagers][id];
                        // Add the current origin villager to the queue
                        arr.push(this.state.transactions[id].getFrom())
                        // Pop the first villager in queue to the role
                        let newFrom = arr[0]
                        arr.shift()
                        tempTransactions[id].setFrom(newFrom)
                        totalArr[id] = arr

                        assertionBuddy++
                }

                // If the destination villager needs to change
                if (fromto == "To") {
                        let arr = [...this.state.availableVillagers][id];
                        // Add the current destination villager to the queue
                        arr.push(this.state.transactions[id].getTo())
                        // Pop the first villager in queue to the role
                        let newTo = arr[0]
                        arr.shift()
                        tempTransactions[id].setTo(newTo)
                        totalArr[id] = arr

                        assertionBuddy++
                }

                console.assert(assertionBuddy == 1, "Incorrect fromTo parameter")

                // Render the displaying

                this.setState({ availableVillagers: totalArr, transaction: tempTransactions })
                this.updateValidable()
        }

        /**
         * Update the validable property depending on if the transaction is validated or incompatible
         */
        updateValidable() {
                let temp = [...this.state.transactions];
                let newValidable = []

                // Check every transaction
                for (let i = 0; i < temp.length; i++) {
                        newValidable.push(true)
                        // Validated transactions or problematic amount transactions are not validable
                        if ((temp[i].isValidated()) || (isNaN(temp[i].getAmount()) || (temp[i].getAmount() <= 0))) {
                                newValidable[i] = false
                        }
                        else {
                                // Compatible transactions are validable
                                if (this.state.notebook.checkAccount(temp[i])) {
                                        newValidable[i] = true;
                                }
                                else {
                                        newValidable[i] = false;
                                }
                        }
                }

                // Render the displaying

                this.setState({ validable: newValidable })
        }

        /**
         * Create a new notebook with the same parameters and pass it to the component
         */
        fullReset() {

                // Create a new notebook
                let notebook = new Notebook(this.state.notebook.getProperty(), this.state.notebook.getStartMoney(), this.state.notebook.getVillagers(), false)
                
                // Add the last transaction to this new notebook
                // Note that the last transaction is the non validated one
                notebook.addTransaction(
                        new Transaction(
                                this.state.transactions[this.state.transactions.length - 1].getFrom(),
                                this.state.transactions[this.state.transactions.length - 1].getTo(),
                                0,
                                false
                        )
                )

                // Set the other elements of the state
                let transactions = notebook.getTransactions()
                let villagers = notebook.getVillagers()
                let availableVillagers = []
                availableVillagers.push(this.state.availableVillagers[this.state.availableVillagers.length - 1])
                let validable = []
                validable.push(false)

                // Render the displaying

                this.setState({
                        notebook: notebook,
                        transactions: transactions,
                        villagers: villagers,
                        availableVillagers: availableVillagers,
                        validable: validable
                })

                this.updateValidable();
        }

        /**
         * Define the displaying of the notebook
         * 
         * @returns {html} - The displaying of the notebook
         */
        render() {
                let fullRender = []

                // Display every transaction
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

                // If the component is in test mode add debug buttons
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