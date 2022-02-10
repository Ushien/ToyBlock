import React, { Component } from 'react'
import {Transaction, CarnetBlock, Carnet, animals, neighbors, VillageBlock, Village } from './blockchain';

let village = new Village(10, animals, neighbors);
village.addTransaction("Grenouille", "Paresseux", "Toucan", 6, true)
village.addTransaction("Grenouille", "Paresseux", "Chat", 3, true)
village.addTransaction("Grenouille", "Paresseux", "Grenouille", 15, true)
let grencarnet = village.getCarnet("Grenouille");
grencarnet.transmitTransaction(grencarnet.getTransactions()[2], "Singe")
// grencarnet.transmitTransaction(grencarnet.getTransactions()[1], "Singe")


class BlocTest extends Component{

  render(){
    return <div>
      <VillageBlock village={village}/>
      </div>
  }
}

export {BlocTest}