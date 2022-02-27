import React, { Component } from 'react'

// Village and transactions machines

// Class definition

const animals = ["Paresseux", "Pingouin", "Toucan", "Grenouille", "Singe", "Chat"]
const neighbors = {"Paresseux" : {"Toucan" : 2, "Grenouille" : 2}, "Pingouin" : {"Grenouille" : 1}, "Toucan" : {"Paresseux" : 2, "Chat" : 1}, "Grenouille" : {"Paresseux" : 2, "Singe" : 1 ,"Pingouin" : 1}, "Singe" : {"Grenouille" : 1}, "Chat" : {"Toucan" : 1}}

class Transaction{
        constructor(from, to, amount, validated){
                this.from = from;
                this.to = to;
                this.amount = amount;
                this.validated = validated;
        }

        isValidated(){
                return this.validated;
        }

        getAmount(){
                return this.amount;
        }

        setAmount(amount){
                this.amount = amount;
        }

        getFrom(){
                return this.from;
        }

        setFrom(from){
                this.from = from;
        }

        getTo(){
                return this.to;
        }

        setTo(to){
                this.to = to;
        }

        validate(){
                console.assert(this.from != this.to, "Sender and receiver are the same");
                console.assert(this.amount >= 0, "Amount is negative")
                this.validated = true;
        }
}

class Carnet{
        constructor(property, startmoney, animals){
                this.property = property;
                this.transactions = [];
                this.startmoney = startmoney;
                this.currentAccounts = {};
                this.neighbors = {};
                this.villagers = animals;

                for (let index = 0; index < animals.length; index++){
                        this.currentAccounts[animals[index]] = startmoney;
                }
        }

        setNeighbors(neighbors, villagers){
                for (var i in neighbors){
                        this.neighbors[i] = [];
                        this.neighbors[i].push(villagers[i]);
                        this.neighbors[i].push(neighbors[i]);
                }
                
        }

        addTransaction(transaction){
                this.transactions.push(transaction)
        }

        addAndValidateTransaction(transaction){
                this.addTransaction(transaction)
                // console.assert(this.transactions.filter().length < 2)
                this.applyTransaction(transaction);
                console.log("Transaction added and applied");
                
        }

        applyTransaction(transaction){
                this.currentAccounts[transaction.getFrom()] = this.currentAccounts[transaction.getFrom()] - transaction.getAmount();
                this.currentAccounts[transaction.getTo()] = this.currentAccounts[transaction.getTo()] + transaction.getAmount();
        }

        getTransactions(){
                return this.transactions;
        }

        getProperty(){
                return this.property;
        }

        getVillagers(){
                return this.villagers;
        }

        getStartMoney(){
                return this.startmoney;
        }

        // Vérifie qu'une nouvelle transaction est compatible avec les transactions déjà en place.
        checkAccount(additionalTransaction){

                let validity = true;

                let newAccounts = {};
                for (let account in this.currentAccounts) {
                        newAccounts[account] = this.currentAccounts[account];
                }
        
                newAccounts[additionalTransaction.getFrom()] = newAccounts[additionalTransaction.getFrom()] - additionalTransaction.getAmount();
                newAccounts[additionalTransaction.getTo()] = newAccounts[additionalTransaction.getTo()] + additionalTransaction.getAmount();  

                for(let account in newAccounts){
                        if(newAccounts[account] < 0){
                                validity = false;
                        }
                }

                return validity;
        
        }

        receiveTransaction(transaction, from){

                //vérifie que la transaction est compatible avec les autres
                //si oui, l'ajoute, si non, envoie une erreur

                if (!this.checkAccount(transaction)){
                        throw "An invalid transaction has been received !"
                }

                this.addAndValidateTransaction(transaction)
        
                //transmet ensuite la transaction aux voisins, sauf au from
                this.transmitTransaction(transaction, from)
        }

        transmitTransaction(transaction, exclude){
                console.assert(transaction.isValidated(), "Trying to transmit a invalidated transaction");

                for (var i in this.neighbors){
                        if (i !== exclude){
                                console.log("On envoie la transaction de ")
                                console.log(this.property)
                                this.sendTransaction(transaction, this.neighbors[i]) 
                                console.log("La transaction de ... est envoyée")
                                console.log(this.property)
                        }
                }
        }

        sendTransaction(transaction, destination){
                //envoie une transaction à un autre carnet, après avoir attendu le temps qu'il faut
                console.log(this.getMillisecondsFromDistance(destination[1]))
                setTimeout(() => {destination[0].receiveTransaction(transaction, this.property)} , this.getMillisecondsFromDistance(destination[1]));
        }

        getMillisecondsFromDistance(distance){
                // return distance * 1000
                // TODO La finir pardi
                return 4000
        }

}

class Village{
        constructor(startmoney = 0, animals = [], neighbors = {}){

                this.startmoney = startmoney;
                this.villagers = {};

                // Creatings villagers transaction lists
                for (let index = 0; index < animals.length; index++) {
                        this.villagers[animals[index]] = new Carnet(animals[index], startmoney, animals)
                }

                // Assigning neighbors
                for (let index = 0; index < animals.length; index++) {
                        this.getCarnets()[animals[index]].setNeighbors(neighbors[animals[index]], this.getCarnets())
                }
        }

        getCarnets(){
                return this.villagers;
        }

        getCarnet(property){
                return this.villagers[property];
        }

        getStartMoney(){
                return this.startmoney;
        }

        // Warning ! Should not be used outside of testing
        addTransaction(property, from, to, amount, validated){
                this.getCarnet(property).addTransaction(new Transaction(from, to, amount, validated))
        }
}

// Component displaying a transaction list

class CarnetBlock extends Component {
        constructor(props) {
                super(props);

                let availableVillagers = []
                for (let index = 0; index < this.props.carnet.getTransactions().length; index++)
                {
                        let newArray = [...this.props.carnet.getVillagers()];
                        newArray.splice(newArray.lastIndexOf(this.props.carnet.getTransactions()[index].getFrom()), 1);
                        newArray.splice(newArray.lastIndexOf(this.props.carnet.getTransactions()[index].getTo()), 1);
                        availableVillagers.push(newArray)
                }
        
                this.state = {
                        carnet : this.props.carnet,
                        transactions : this.props.carnet.getTransactions(),
                        villagers : this.props.carnet.getVillagers(),
                        availableVillagers : availableVillagers,
                        validable : []
                }

                this.validateTransaction = this.validateTransaction.bind(this);
                this.handleChangeAmount = this.handleChangeAmount.bind(this);
                this.generateNextVillager = this.generateNextVillager.bind(this);

                this.updateValidable();
        }        

        // Debug helper
        // Will display in the console the current state of the memory
        check(){
                console.log("===================================================")
                console.log("Les transactions actuelles")
                console.log(this.state.transactions)
                console.log("L'objet Carnet en props")
                console.log(this.props.carnet)
                console.log("L'objet Carnet en state")
                console.log(this.state.carnet)
                console.log("Les villageois disponibles pour chaque transaction")
                console.log(this.state.availableVillagers)
                console.log("Quelle transaction est validable ?")
                console.log(this.state.validable)
                // Add instructions here
        }

        // Debug helper
        // Useful to trigger some functions
        touchMe(){
                console.log("touchMe triggered")
                // Add functions here
        }

        validateTransaction(index){
                let newtransactions = this.state.transactions
                newtransactions[index].validate();

                let newcarnet = this.state.carnet
                newcarnet.applyTransaction(newtransactions[index])

                // S'il reste assez de place, crée une nouvelle transaction vide
                let newavailable = [...this.state.availableVillagers]

                if(this.state.transactions.length < this.props.limit){
                        newcarnet.addTransaction(new Transaction(newtransactions[index].getFrom(), newtransactions[index].getTo(), 0, false))
                        newavailable.push(this.state.availableVillagers[index])
                }

                // Update l'affichage

                this.setState({transaction : newtransactions, carnet : newcarnet, availableVillagers : newavailable});
                this.updateValidable()

                // TODO Si y a des voisins, leur envoie une copie de la transaction
        }

        handleChangeAmount(index, newAmount){
                let newtransactions = this.state.transactions
                newtransactions[index].setAmount(newAmount);
                
                // Update l'affichage

                this.setState({transaction : newtransactions});
                this.updateValidable()
        }

        generateNextVillager(id, fromto){ 

                let tempTransactions = this.state.transactions
                let totalArr = [...this.state.availableVillagers]

                let assertionBuddy = 0


                if(fromto == "From"){
                        let arr = [...this.state.availableVillagers][id];
                        arr.push(this.state.transactions[id].getFrom())
                        let newFrom = arr[0]
                        arr.shift()
                        tempTransactions[id].setFrom(newFrom)
                        totalArr[id] = arr

                        assertionBuddy ++
                }

                if(fromto == "To"){
                        let arr = [...this.state.availableVillagers][id];
                        arr.push(this.state.transactions[id].getTo())
                        let newTo = arr[0]
                        arr.shift()
                        tempTransactions[id].setTo(newTo)
                        totalArr[id] = arr

                        assertionBuddy ++
                }        

                console.assert(assertionBuddy == 1, "Incorrect fromTo parameter")

                // Update l'affichage

                this.setState({availableVillagers : totalArr, transaction : tempTransactions})
                this.updateValidable()
        }

        updateValidable(){
                let temp = [...this.state.transactions];
                let newValidable = []

                for(let i = 0; i < temp.length ; i++){
                        newValidable.push(true)
                        if((temp[i].isValidated())||(isNaN(temp[i].getAmount())||(temp[i].getAmount()<=0))){
                                newValidable[i] = false
                        }
                        else{
                                if(this.state.carnet.checkAccount(temp[i])){
                                        newValidable[i] = true;
                                }
                                else{
                                        newValidable[i] = false;
                                }
                        }
                }

                // Update l'affichage

                this.setState({validable : newValidable})
        }

        // reset the carnet block with a brand new empty carnet
        fullReset(){

                let carnet = new Carnet(this.state.carnet.getProperty(), this.state.carnet.getStartMoney(), this.state.carnet.getVillagers())
                carnet.addTransaction(new Transaction(
                        this.state.transactions[this.state.transactions.length-1].getFrom(), 
                        this.state.transactions[this.state.transactions.length-1].getTo(),
                        0,
                        false
                        )
                )
                let transactions = carnet.getTransactions()
                let villagers = carnet.getVillagers()
                let availableVillagers = []
                availableVillagers.push(this.state.availableVillagers[this.state.availableVillagers.length-1])
                let validable = []
                validable.push(false)

                this.setState({
                        carnet : carnet,
                        transactions : transactions,
                        villagers : villagers,
                        availableVillagers : availableVillagers,
                        validable : validable
                })

                this.updateValidable();
        }
                
        // TODO Affichage des soldes actuels
        // TODO que le bouton de validation s'affiche au premier tour
        // TODO Comment gérer une transaction qui entre alors que c'est complet ?

        render(){
                let fullRender = []

                for (let index = 0; index < this.state.transactions.length; index++) {
                        fullRender.push(
                                <li key = {index}>
                                        <TransactionLine 
                                                index ={index} 
                                                from = {this.state.transactions[index].getFrom()} 
                                                to = {this.state.transactions[index].getTo()} 
                                                amount = {this.state.transactions[index].getAmount()} 
                                                validated = {this.state.transactions[index].isValidated()}
                                                validable = {this.state.validable[index]}
                                                validateTransaction = {this.validateTransaction} 
                                                handleChangeAmount = {this.handleChangeAmount}
                                                generateNextVillager = {this.generateNextVillager}
                                        />
                                </li>)
                }

                // If the component is resettable add a reset button
                if(this.props.resettable){
                        fullRender.push(
                                <button onClick={() => this.fullReset()}> 
                                        Reset 
                                </button>
                        )
                }

                // Debug buttons
                fullRender.push(
                        <div>
                                <button onClick={() => this.check()}> 
                                        Vérifier l'état du carnet 
                                </button>
                                <button onClick={() => this.touchMe()}>
                                                Bouton de test 
                                </button>
                        </div>
                )

                return(
                        <div>
                                {fullRender}
                        </div>
                )
        }

}

//Component displaying a transaction line

class TransactionLine extends Component{
        constructor(props){
                super(props);
                this.validateTransaction = this.validateTransaction.bind(this);
                this.handleChangeAmount = this.handleChangeAmount.bind(this);
                this.generateNextVillager = this.generateNextVillager.bind(this);
        }

        handleChangeAmount(e){
                // Bloque les entrées vides
                let value = 0
                if(e.target.value != ''){
                        value = parseInt(e.target.value)
                }
                
                this.props.handleChangeAmount(this.props.index, value)

        }

        validateTransaction(e){
                this.props.validateTransaction(this.props.index)

                // TODO Vérifier que la transaction est validable
                // TODO Préparer une nouvelle transaction si c'est bon

                // Envoyer un signal au carnet pour qu'il dise si la transaction est validable ou pas
        }

        // Change the current to and from state depening on the available villagers.
        generateNextVillager(fromto){

                this.props.generateNextVillager(this.props.index, fromto)
                
        }

        check = (e) => {
                /*
                console.log("Available villagers: ")
                console.log(this.state.availableVillagers)
                console.log("From")
                console.log(this.state.from)
                console.log("To")
                console.log(this.state.to)
                console.log(this.state.validated);
                console.log(this.props.transaction.isValidated());
                console.log(this.state.amount)
                console.log(this.props.transaction.getAmount())
                */
        }
                
        render(){
                let fulltext = []
                if (!(this.props.validated)){
                        fulltext.push(<div>
                                <button onClick={() => this.generateNextVillager("From")}>
                                        {this.props.from}
                                </button>
                                <button onClick={() => this.generateNextVillager("To")}>
                                        {this.props.to}
                                </button>
                                <form>
                                        <input type="number" value={this.props.amount} onChange={this.handleChangeAmount}/>
                                </form>
                                </div>)
                        if (this.props.validable){
                                fulltext.push(
                                        <button onClick={() => this.validateTransaction()}>
                                                Valider la transaction 
                                        </button>)
                        }
                        
                }
                else{
                        fulltext.push(<div>
                                        {this.props.from}
                                        {this.props.to}
                                        {this.props.amount}
                                </div>)
                } 

                return fulltext;
        }
}

//Component displaying a village

class VillageBlock extends Component {
        constructor(props) {
                super(props);
                this.state = {startMoney: this.props.village.getStartMoney(), carnets : this.props.village.getCarnets()}
        }

        clickMe(e){

                /*
                //let newVillage = Object.assign({}, this.state.village);

                let newCarnets = {};
                        console.log("Wow")
                        console.log(this.state.carnets)
                        console.log(newCarnets)
                for (let key in this.state.carnets) {
                        newCarnets[key] = this.state.carnets[key]; // copies each property to the objectCopy object
                }
                // let newVillage = this.state.village;
                console.log(this.state.village["villagers"]["Grenouille"]["currentAccounts"])
                console.log(newVillage["villagers"]["Grenouille"]["currentAccounts"])
                        console.log("Wow2")
                        console.log(this.state.carnets)
                        console.log(newCarnets)
                // newVillage.addTransaction("Grenouille", "Paresseux", "Pingouin", 3, true);
                newCarnets["Grenouille"].addTransaction(new Transaction("Paresseux", "Pingouin", 3, true))
                        console.log("Wow3")
                        console.log(this.state.carnets)
                        console.log(newCarnets)
                this.setState({ carnets : newCarnets })

                */
        }
                
        render(){
                /*
                var fulltext = []

                for (let index in this.state.village.getCarnets()) {
                        if(this.state.village.getCarnets()[index].getTransactions()["Chat"] > 10){
                                fulltext.push(<li> {this.state.village.getCarnets()[index].getProperty()} - Bien reçu ! </li>);
                        }
                        else{
                                fulltext.push(<li> {this.state.village.getCarnets()[index].getProperty()} - Pas reçu </li>);
                        }
                    }
                */

                if(this.state.carnets['Grenouille'].getTransactions()["Chat"] > 10){
                        return (<div> {this.state.carnets['Grenouille'].getProperty()} - Bien reçu ! <button onClick={this.clickMe.bind(this)}>Click me</button></div>);
                }
                else{
                        return (<div> {this.state.carnets['Grenouille'].getProperty()} - Pas reçu <button onClick={this.clickMe.bind(this)}>Click me</button></div>);
                }

                /*
                console.log(this.state.village)

                return(
                        <ul onClick={() => this.clickMe()}>
                                {fulltext}
                        </ul>
                )
                */
        }

}

class VillagerBlock extends Component {
        constructor(props) {
                super(props);
                this.state = {carnet : this.props.carnet}
        }

        render(){
                return(<div>Villager</div>)
        }
}


////////////////////////////////////////////////////////

// Hashing machine

const SHA256 = require("crypto-js/sha256");

function hashing(number){
        return SHA256(number).toString()
}

class HashingBlock extends Component {
        constructor(props) {
                super(props);
                this.state = {hashword : this.props.baseword, hashed : hashing(this.props.baseword)}
        }
        
        handleChange = (e) => {
                this.setState({hashword : (e.target.value)})
                this.setState({hashed : hashing(e.target.value)})
        }
        
        render(){
                return(
                        <div className="centeredtext">
                                <form>
                                        <input type="text" value={this.state.hashword} onChange={this.handleChange} class="input"/>
                                </form>
                                <div class="centeredelement">
                                <div class="output">
                                        {this.state.hashed}
                                </div>
                                </div>
                        </div>
                )
        }
}

export {hashing, HashingBlock, TransactionLine, Transaction, CarnetBlock, Carnet, Village, VillageBlock, animals, neighbors}