import React, { Component } from 'react'
import { TransactionLine } from './blockchain';

class BlocTest extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return <div><TransactionLine amount={15} validated={false}/></div>
  }
}

export {BlocTest}