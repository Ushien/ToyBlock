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
                        <div className="text-center">
                                <form>
                                        <input type="text" value={this.state.hashword} onChange={this.handleChange}/>
                                </form>
                                {this.state.hashed}
                        </div>
                )
        }
}

export {hashing, HashingBlock}