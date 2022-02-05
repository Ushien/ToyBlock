import React, { Component } from 'react'
import {Transaction, CarnetBlock, Carnet } from './blockchain';

let carnet = new Carnet("Paresseux")
carnet.addTransaction(new Transaction("Paresseux", "Pingouin", 25, true))
carnet.addTransaction(new Transaction("Paresseux", "Pingouin", 35, true))
carnet.addTransaction(new Transaction("Paresseux", "Pingouin", 55, true))


class BlocTest extends Component{

  render(){
    return <div>
      <CarnetBlock carnet={carnet} validated={false}/>
      </div>
  }
}

export {BlocTest}