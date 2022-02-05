import React, { Component } from 'react'

// Village and transactions machines

// Class definition

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
        constructor(property){
                this.property = property;
                this.transactions = [];
        }

        addTransaction(transaction){
                this.transactions.push(transaction)
                // console.assert(this.transactions.filter().length < 2)
        }

        getTransactions(){
                return this.transactions
        }

}

/*
class Village{
        constructor(startmoney){
                this.startmoney = startmoney;
        }
}
*/

// Bloc displaying a transaction list

class CarnetBlock extends Component {
        constructor(props) {
                super(props);
                this.state = {carnet : this.props.carnet}
        }
                
        render(){
                var wholetext = []
                for (let index = 0; index < this.state.carnet.getTransactions().length; index++) {
                        wholetext.push(<div> {this.state.carnet.getTransactions[index]} </div>);
                    }
                return(
                        <div>
                                {wholetext}
                        </div>
                )
        }

}

//Bloc displaying a transaction line

class TransactionLine extends Component{
        constructor(props) {
                super(props);
                this.state = {amount : this.props.amount, validated : this.props.validated}
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

export {hashing, HashingBlock, TransactionLine, Transaction, CarnetBlock, Carnet}