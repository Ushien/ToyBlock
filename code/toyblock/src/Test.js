import React, { Component } from 'react'
import {Transaction, TransactionLine, CarnetBlock, Carnet, animals, neighbors, VillageBlock, Village } from './blockchain';


//village.addTransaction("Grenouille", "Paresseux", "Toucan", 6, true)
//village.addTransaction("Grenouille", "Paresseux", "Chat", 3, true)
//village.addTransaction("Grenouille", "Paresseux", "Grenouille", 15, true)
//let grencarnet = village.getCarnet("Grenouille");
//grencarnet.transmitTransaction(grencarnet.getTransactions()[0], "Singe")
// grencarnet.transmitTransaction(grencarnet.getTransactions()[1], "Singe")

let village = new Village(10, animals, neighbors);
let carnet = new Carnet("Toucan", 10, animals)
let transaction1 = new Transaction("Paresseux", "Grenouille", 5, true);
let transaction2 = new Transaction("Chat", "Singe", 3, false);

carnet.addAndValidateTransaction(transaction1);
carnet.addTransaction(transaction2);


class BlocTest extends Component{

  render(){
    return <div>
      <CarnetBlock carnet = {carnet} limit = {8} resettable = {true}/>
    </div>
  }

}

export {BlocTest}