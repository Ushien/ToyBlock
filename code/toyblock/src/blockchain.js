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
                this.transactions.push(transaction);
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

                this.addTransaction(transaction)
        
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

        addTransaction(property, from, to, amount, validated){
                this.getCarnet(property).addTransaction(new Transaction(from, to, amount, validated))
        }
}

// Component displaying a transaction list

class CarnetBlock extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        transactions : this.props.carnet.getTransactions(),
                        villagers : this.props.carnet.getVillagers()}
        }

        //ajouter une fonction pour valider et transmettre une transaction
        
        check(){
                console.log("Les transactions actuelles")
                console.log(this.state.transactions)
        }

                
        render(){
                let fullRender = []

                for (let index = 0; index < this.state.transactions.length; index++) {
                        fullRender.push(<li key = {index}><TransactionLine transaction = {this.state.transactions[index]} villagers = {this.state.villagers}/></li>)
                }

                return(
                        <div>
                                {fullRender}
                                <button onClick={() => this.check()}> Vérifier l'état du carnet </button>
                        </div>
                )
        }

}

//Component displaying a transaction line

class TransactionLine extends Component{
        constructor(props) {
                super(props);

                // On supprime le villageois s'il est pas disponible
                let arr = [...this.props.villagers];
                arr.splice(arr.lastIndexOf(this.props.transaction.from), 1);
                arr.splice(arr.lastIndexOf(this.props.transaction.to), 1);

                this.state = {from : this.props.transaction.getFrom(), 
                        to : this.props.transaction.getTo(), 
                        validated : this.props.transaction.isValidated(), 
                        amount : this.props.transaction.getAmount(),
                        availableVillagers : arr, 
                        // validable : validable
                }

        }

        handleChangeAmount = (e) => {
                // Empêcher de mettre des valeurs négatives ou 0 ou null
                this.setState({amount : (e.target.value)})
                this.props.transaction.setAmount(e.target.value)
                }

        validate = (e) => {
                this.setState({validated : true});
                this.props.transaction.validate();

                // Envoyer un signal au carnet pour qu'il dise si la transaction est validable ou pas
        }

        // Change the current to and from state depening on the available villagers.
        generateNextVillager = (fromto) => {

                if(fromto == "From"){
                        let arr = [...this.state.availableVillagers];
                        arr.push(this.state.from)
                        let newVillager = arr[0]
                        arr.shift()
                        this.setState({from : newVillager, availableVillagers : arr})
                        this.props.transaction.setFrom(newVillager)
                }

                if(fromto == "To"){
                        let arr = [...this.state.availableVillagers];
                        arr.push(this.state.to)
                        let newVillager = arr[0]
                        arr.shift()
                        this.setState({to : newVillager, availableVillagers : arr})
                        this.props.transaction.setTo(newVillager)
                }
                
        }

        check = (e) => {
                console.log("Available villagers: ")
                console.log(this.state.availableVillagers)
                console.log("From")
                console.log(this.state.from)
                console.log("To")
                console.log(this.state.to)
                /*
                console.log(this.state.validated);
                console.log(this.props.transaction.isValidated());
                console.log(this.state.amount)
                console.log(this.props.transaction.getAmount())
                */
        }
                
        render(){
                if (this.state.validated){
                        return(
                                <div className="centeredtext">
                                        <div>{this.state.from}</div>
                                        <div>{this.state.to}</div>
                                        <div>{this.state.amount}</div>
                                        <button onClick={() => this.check()}> Vérifier l'état de la transaction </button>
                                        C'est validé
                                </div>
                        )
                }
                else{
                        return(
                                <div className="centeredtext">
                                        <button onClick={() => this.generateNextVillager("From")}>{this.state.from}</button>
                                        <button onClick={() => this.generateNextVillager("To")}>{this.state.to}</button>
                                        <form>
                                                <input type="number" value={this.state.amount} onChange={this.handleChangeAmount}/>
                                        </form>
                                        <button onClick={() => this.validate()}> Valider la transaction </button>
                                        <button onClick={() => this.check()}> Vérifier l'état de la transaction</button>
                                        C'est pas validé
                                </div>
                        )
                }
                
        }
}

//Component displaying a village

class VillageBlock extends Component {
        constructor(props) {
                super(props);
                this.state = {startMoney: this.props.village.getStartMoney(), carnets : this.props.village.getCarnets()}
        }

        clickMe(e){
                //let newVillage = Object.assign({}, this.state.village);

                let newCarnets = {};
                        console.log("Wow")
                        console.log(this.state.carnets)
                        console.log(newCarnets)
                for (let key in this.state.carnets) {
                        newCarnets[key] = this.state.carnets[key]; // copies each property to the objectCopy object
                }
                // let newVillage = this.state.village;
                /*console.log(this.state.village["villagers"]["Grenouille"]["currentAccounts"])
                console.log(newVillage["villagers"]["Grenouille"]["currentAccounts"])*/
                        console.log("Wow2")
                        console.log(this.state.carnets)
                        console.log(newCarnets)
                // newVillage.addTransaction("Grenouille", "Paresseux", "Pingouin", 3, true);
                newCarnets["Grenouille"].addTransaction(new Transaction("Paresseux", "Pingouin", 3, true))
                        console.log("Wow3")
                        console.log(this.state.carnets)
                        console.log(newCarnets)
                this.setState({ carnets : newCarnets })
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