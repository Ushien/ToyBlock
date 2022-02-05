import React, { Component } from 'react'

// Village and transactions machines

// Class definition

const animals = ["Paresseux", "Pingouin", "Toucan", "Grenouille", "Singe", "Chat"]
const neighbors = {"Paresseux" : {"Toucan" : 2, "Grenouille" : 2}, "Pingouin" : {" Grenouille" : 1}, "Toucan" : {"Paresseux" : 2, "Chat" : 1}, "Grenouille" : {"Paresseux" : 2, "Singe" : 1 ,"Pingouin" : 1}, "Singe" : {"Grenouille" : 1}, "Chat" : {"Toucan" : 1}}

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

        validate(){
                this.validated = true;
        }
}

class Carnet{
        constructor(property, neighbors){
                this.property = property;
                this.transactions = [];
                this.neighbors = neighbors;
        }

        addTransaction(transaction){
                this.transactions.push(transaction)
                // console.assert(this.transactions.filter().length < 2)
        }

        getTransactions(){
                return this.transactions
        }

        receiveTransaction(transaction, from){
                //vérifie que la transaction est compatible avec les autres
                //si oui, l'ajoute, si non, envoie une erreur
                //transmet ensuite la transaction aux voisins, sauf au from
        }

        transmitTransaction(transaction, exclude){
                console.assert(transaction.isValidated(), "Trying to transmit a invalidated transaction");

                let transmissionList = {}

                for (var i in this.neighbors){
                        if (i !== exclude){
                                transmissionList[i] = this.neighbors[i];
                        }
                }


                //assert que la transaction est validée
                //attend un petit moment en fonction de la distance, et envoie aux gens qu'il faut, mais pas au exclude
        }

        sendTransaction(transaction, destination){
                //envoie à un autre carnet
        }

}

class Village{
        constructor(startmoney, animals, neighbors){
                this.startmoney = startmoney;
                this.villagers = {};

                for (let index = 0; index < animals.length; index++) {
                        this.villagers[animals[index]] = new Carnet(animals[index], neighbors[animals[index]])
                }
        }

        getCarnets(){
                return this.villagers;
        }

        getCarnet(property){
                return this.villagers[property]
        }

        addTransaction(property, from, to, amount){
                this.getCarnet(property).addTransaction(new Transaction(from, to, amount))
        }
}

// Component displaying a transaction list

class CarnetBlock extends Component {
        constructor(props) {
                super(props);
                this.state = {carnet : this.props.carnet}
        }

        //ajouter une fonction pour valider et transmettre une transaction
                
        render(){
                var fulltext = []
                for (let index = 0; index < this.state.carnet.getTransactions().length; index++) {
                        fulltext.push(<div> {this.state.carnet.getTransactions()[index].getAmount()} </div>);
                    }
                return(
                        <div>
                                {fulltext}
                        </div>
                )
        }

}

//Component displaying a transaction line

class TransactionLine extends Component{
        constructor(props) {
                super(props);
                this.state = {transaction : this.state.transaction}
        }

        handleChangeAmount = (e) => {
                this.setState({amount : (e.target.value)})
                }

        validate = (e) => {

        }
                
        render(){
                if (this.state.validated){
                        return(
                                <div className="centeredtext">
                                        {this.state.amount}
                                </div>
                        )
                }
                else{
                        return(
                                <div className="centeredtext">
                                        <form>
                                                <input type="text" value={this.state.amount} onChange={this.handleChangeAmount} class="input"/>
                                        </form>
                                        {this.state.amount}
                                </div>
                        )
                }
                
        }
}

//Component displaying a transaction line

class VillageBlock extends Component {
        constructor(props) {
                super(props);
                this.state = {village : this.props.village}
        }
                
        render(){
                var fulltext = []

                for (let index = 0; index < this.state.village.getCarnets().length; index++) {
                        fulltext.push(<div> {this.state.village.getCarnets()[index]} </div>);
                    }

                console.log(this.state.village)

                return(
                        <div>
                                {fulltext}
                        </div>
                )
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