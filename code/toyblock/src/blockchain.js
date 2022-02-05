import React, { Component } from 'react'

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

// Bloc displaying a transaction list

class CarnetBlock extends Component {
        constructor(props) {
                super(props);
                this.state = {property : this.props.property, carnet : this.props.carnet}
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

//Bloc displaying a transaction line

class TransactionLine extends Component{
        constructor(props) {
                super(props);
                // this.state = {from : this.props.from, to : this.props.to, amount : this.props.amount, validated : this.props.validated}
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

export {hashing, HashingBlock, TransactionLine}