import React, { Component } from 'react'
import {Transaction, CarnetBlock, Carnet, animals, neighbors, VillageBlock, Village } from './blockchain';

let village = new Village(10, animals, neighbors);
village.addTransaction("Grenouille", "Paresseux", "Toucan", 6)
let grencarnet = village.getCarnet("Grenouille");
console.log("Tout va bien ?")
console.log(grencarnet)
grencarnet.transmitTransaction(grencarnet.getTransactions()[0], "Singe")

class BlocTest extends Component{

  render(){
    return <div>
      <VillageBlock village={village}/>
      </div>
  }
}

export {BlocTest}