import React, { Component } from 'react'
import { TransactionLine, NotebookBlock, animals, neighbors, VillageBlock } from './Components';
import { Notebook, Village, Transaction } from './Classes.js'

// Freely use this space to individually test the components

let village = new Village(10, animals, neighbors);
let transaction1 = new Transaction("Paresseux", "Grenouille", 5, true);
let transaction2 = new Transaction("Chat", "Singe", 3, false);

village.addAndApplyTransactionToAll(transaction1);
village.addAndApplyTransactionToAll(transaction2);

class BlocTest extends Component {

  render() {
    return <div>
      <VillageBlock village={village} limit={8} resettable={true} />
    </div>
  }

}

export { BlocTest }