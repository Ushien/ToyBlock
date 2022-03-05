import React, { Component } from 'react'

import chatVisual from './visuals/Chat.png';
import grenouilleVisual from './visuals/Grenouille.png'
import paresseuxVisual from './visuals/Paresseux.png'
import pingouinVisual from './visuals/Pingouin.png'
import singeVisual from './visuals/Singe.png'
import toucanVisual from './visuals/Toucan.png'
import flechVisual from './visuals/flech.png'
import chatmaison from './visuals/chatmaison.png'
import grenouillemaison from './visuals/grenouillemaison.png'
import singemaison from './visuals/singemaison.png'
import pingouinmaison from './visuals/pingouinmaison.png'
import paresseuxmaison from './visuals/paresseuxmaison.png'
import toucanmaison from './visuals/toucanmaison.png'
import lettre from './visuals/lettre.png'

// TODO Corriger les erreurs js

// Village and transactions machines

// Class definition

const animals = ["Paresseux", "Pingouin", "Toucan", "Grenouille", "Singe", "Chat"]
const neighbors = {"Paresseux" : {"Toucan" : 2, "Grenouille" : 2}, "Pingouin" : {"Grenouille" : 1}, "Toucan" : {"Paresseux" : 2, "Chat" : 1}, "Grenouille" : {"Paresseux" : 2, "Singe" : 1 ,"Pingouin" : 1}, "Singe" : {"Grenouille" : 1}, "Chat" : {"Toucan" : 1}}
const visualMapping = {"Chat" : chatVisual, "Grenouille" : grenouilleVisual, "Paresseux" : paresseuxVisual, "Pingouin" : pingouinVisual, "Singe" : singeVisual, "Toucan" : toucanVisual}

// TODO Optimiser findVisual

function findVisual(animal){
        return visualMapping[animal]
}

function sendLetter(from, to){

        let movementclass = ""
        let positions = {"Singe" : [1,1], "Grenouille" : [1,2], "Pingouin" : [1,3], "Paresseux" : [2,2], "Toucan" : [3,2], "Chat" : [3,3]}
        let x_movement = positions[to][0] - positions[from][0];
        let y_movement = positions[to][1] - positions[from][1];

        // assert les 2 mouvements sont compris entre 1 et -1
        // assert un des mouvements doit être égal à 0 et l'autre être différent

        if(x_movement == 1){
                movementclass = "-left-right"
        }
        if(x_movement == -1){
                movementclass = "-right-left"
        }
        if(y_movement == 1){
                movementclass = "-up-down"
        }
        if(y_movement == -1){
                movementclass = "-down-up"
        }
        
        var newElement = document.createElement("img");
        // TODO change with letter
        newElement.src = lettre;
        newElement.width = "120"
        newElement.height = "120"
        newElement.className = from+"letter"+movementclass+" letter"

        document.getElementById("villageContainer").appendChild(newElement);
}

class Transaction{
        constructor(from, to, amount, validated){
                this.from = from;
                this.to = to;
                this.amount = amount;
                this.validated = validated;
        }

        clone(){
                return new Transaction(this.getFrom(), this.getTo(), this.getAmount(), this.isValidated())
        }

        isValidated(){
                return this.validated;
        }

        getAmount(){
                return this.amount;
        }

        setAmount(amount){
                this.amount = amount;
        }

        getFrom(){
                return this.from;
        }

        setFrom(from){
                this.from = from;
        }

        getTo(){
                return this.to;
        }

        setTo(to){
                this.to = to;
        }

        validate(){
                console.assert(this.from != this.to, "Sender and receiver are the same");
                console.assert(this.amount >= 0, "Amount is negative")
                this.validated = true;
        }
}

class Carnet{
        constructor(property, startmoney, animals, fillEmptyTransaction){
                this.property = property;
                this.transactions = [];
                this.startmoney = startmoney;
                this.currentAccounts = {};
                this.neighbors = {};
                this.villagers = animals;
                this.invalidCarnet = false;
                this.obsolete = false;

                for (let index = 0; index < animals.length; index++){
                        this.currentAccounts[animals[index]] = startmoney;
                }

                if (fillEmptyTransaction){
                        this.addTransaction(new Transaction(animals[0], animals[1], 0, false))
                }
        }

        clone(){
                let cloneCarnet = new Carnet(this.getProperty(), this.getStartMoney(), this.getVillagers(), false)

                // Clone les transactions
                for (let index = 0; index < this.getTransactions().length; index++) {
                        cloneCarnet.addTransaction(this.getTransactions()[index].clone())
                }

                // Clone les comptes
                for (let account in this.getCurrentAccounts()){
                        cloneCarnet.setCurrentAccount(account, this.getCurrentAccounts()[account])
                }

                // Clone les voisins
                cloneCarnet.neighbors = this.neighbors;

                // Clone la validité du carnet
                cloneCarnet.setInvalidCarnet(this.isCarnetInvalid())

                // Clone la version du carnet
                cloneCarnet.setVersion(this.getVersion())

                return cloneCarnet;
        }

        setNeighbors(neighbors, villagers){
                for (var i in neighbors){
                        this.neighbors[i] = [];
                        this.neighbors[i].push(villagers[i]);
                        this.neighbors[i].push(neighbors[i]);
                }
                
        }

        setNeighbor(neighbor, carnet, distance){
                this.neighbors[neighbor] = [carnet, distance]
        }

        getNeighbors(){
                return this.neighbors;
        }

        setInvalidCarnet(isCarnetInvalid){
                this.invalidCarnet = isCarnetInvalid;
        }

        isCarnetInvalid(){
                return this.invalidCarnet;
        }

        setCurrentAccount(animal, amount){
                this.currentAccounts[animal] = amount;
        }

        getCurrentAccounts(){
                return this.currentAccounts;
        }

        setVersion(version){
                this.version = version;
        }

        getVersion(){
                return this.version;
        }

        addTransaction(transaction){
                this.transactions.push(transaction)
        }

        addAndApplyTransaction(transaction){
                // console.assert transaction validée
                this.addTransaction(transaction)
                // console.assert(this.transactions.filter().length < 2)
                this.applyTransaction(transaction);
                console.log("Transaction added and applied");
                
        }

        applyTransaction(transaction){
                this.currentAccounts[transaction.getFrom()] = this.currentAccounts[transaction.getFrom()] - transaction.getAmount();
                this.currentAccounts[transaction.getTo()] = this.currentAccounts[transaction.getTo()] + transaction.getAmount();
        }

        getTransactions(){
                return this.transactions;
        }

        getProperty(){
                return this.property;
        }

        getVillagers(){
                return this.villagers;
        }

        getStartMoney(){
                return this.startmoney;
        }

        setObsolete(){
                this.obsolete = true;
        }

        isObsolete(){
                return this.obsolete;
        }

        // Vérifie qu'une nouvelle transaction est compatible avec les transactions déjà en place.
        checkAccount(additionalTransaction){

                let validity = true;

                let newAccounts = {};
                for (let account in this.currentAccounts) {
                        newAccounts[account] = this.currentAccounts[account];
                }
        
                newAccounts[additionalTransaction.getFrom()] = newAccounts[additionalTransaction.getFrom()] - additionalTransaction.getAmount();
                newAccounts[additionalTransaction.getTo()] = newAccounts[additionalTransaction.getTo()] + additionalTransaction.getAmount();  

                for(let account in newAccounts){
                        if(newAccounts[account] < 0){
                                validity = false;
                        }
                }

                return validity;
        
        }

        receiveTransaction(transaction, from, version){

                //vérifie que la transaction est compatible avec les autres
                //si oui, l'ajoute, si non, envoie une erreur
                if(!this.isObsolete()){
                        if (!this.checkAccount(transaction)){
                                // throw "An invalid transaction has been received !"
                                this.setInvalidCarnet();
                                alert(this.getProperty() + " a reçu une transaction incompatible !\nAppuyez sur reset pour réinitialiser le village.")
                        }
                        else{
                                this.addAndApplyTransaction(transaction)
                                //transmet ensuite la transaction aux voisins, sauf au from
                                this.transmitTransaction(transaction, from)
                        }
                }
        }

        transmitTransaction(transaction, exclude){
                console.assert(transaction.isValidated(), "Trying to transmit a invalidated transaction");

                for (var i in this.neighbors){
                        if (i !== exclude){
                                this.sendTransaction(transaction, this.neighbors[i]) 
                        }
                }
        }

        sendTransaction(transaction, destination){
                //envoie une transaction à un autre carnet, après avoir attendu le temps qu'il faut
                
                let version = this.version
                console.log(this.version)
                sendLetter(this.property, destination[0].getProperty())
                setTimeout(() => {destination[0].receiveTransaction(transaction, this.property, version)} , this.getMillisecondsFromDistance(destination[1]));
        }

        getMillisecondsFromDistance(distance){
                // return distance * 1000
                // TODO La finir pardi
                return 9000
        }

}

class Village{

        constructor(startmoney = 0, animals = [], neighbors = {}, fillEmptyTransactions = false, version = 0){

                this.startmoney = startmoney;
                this.villagers = {};
                this.version = version;

                // Creatings villagers transaction lists
                for (let index = 0; index < animals.length; index++) {
                        this.villagers[animals[index]] = new Carnet(animals[index], startmoney, animals, fillEmptyTransactions)
                }

                // Assigning neighbors
                for (let index = 0; index < animals.length; index++) {
                        this.getCarnets()[animals[index]].setNeighbors(neighbors[animals[index]], this.getCarnets())
                }
        }

        clone(){
                let cloneVillage = new Village(this.getStartMoney())
                
                for (let property in this.getCarnets()) {
                        cloneVillage.addCarnet(property, this.getCarnets()[property].clone())
                }

                return cloneVillage
        }

        getCarnets(){
                return this.villagers;
        }

        addCarnet(property, carnet){
                this.getCarnets()[property] = carnet;
        }

        getCarnet(property){
                return this.villagers[property];
        }

        getAnimals(){
                return this.animals;
        }

        getStartMoney(){
                return this.startmoney;
        }

        incrementVersions(){
                for(let carnet in this.getCarnets()){
                        this.getCarnets()[carnet].incrementVersion()
                }
        }

        setObsolete(){
                for(let carnet in this.getCarnets()){
                        this.getCarnets()[carnet].setObsolete()
                }
        }

        // Warning ! Should not be used outside of testing
        addTransaction(property, transaction){
                this.getCarnet(property).addTransaction(transaction)
        }

        // Won't apply any transaction
        // Don't use it outside of testin
        addTransactionToAll(transaction){
                for(let carnet in this.getCarnets()){
                        this.getCarnets()[carnet].addTransaction(transaction)
                }
        }

        // Add a transaction to every carnet
        // If the transaction is validated, apply it
        // If not, add it normally
        addAndApplyTransactionToAll(transaction){
                for(let carnet in this.getCarnets()){
                        if(transaction.isValidated()){
                                this.getCarnets()[carnet].addAndApplyTransaction(transaction.clone())
                        }
                        else{
                                this.getCarnets()[carnet].addTransaction(transaction.clone())
                        }
                }
        }
}

////////////////////////////////////////////////////////
// React components                                   //
////////////////////////////////////////////////////////

//Component displaying a transaction line

//Parler des props attendues

// moneyName
class TransactionLine extends Component{
        constructor(props){
                super(props);
                this.validateTransaction = this.validateTransaction.bind(this);
                this.handleChangeAmount = this.handleChangeAmount.bind(this);
                this.generateNextVillager = this.generateNextVillager.bind(this);
        }

        handleChangeAmount(e){
                // Bloque les entrées vides
                let value = 0
                if(e.target.value != ''){
                        value = parseInt(e.target.value)
                }
                
                this.props.handleChangeAmount(this.props.index, value)

        }

        validateTransaction(e){
                this.props.validateTransaction(this.props.index)

                // TODO  Assert vérifier que la transaction est validable
        }

        // Change the current to and from state depening on the available villagers.
        generateNextVillager(fromto){

                this.props.generateNextVillager(this.props.index, fromto)
                
        }

        check = (e) => {
        }
                
        // TODO On doit pas submit avec enter
        render(){
                let fulltext = []
                
                let fromWidth = "80"
                if(this.props.from == "Toucan" || this.props.from == "Singe"){
                        fromWidth = "120"
                }

                let toWidth = "80"
                if(this.props.to == "Toucan" || this.props.to == "Singe"){
                        toWidth = "120"
                }

                if (!(this.props.validated)){
                        // Transaction non validées non validables
                        if (!(this.props.validable)){
                                fulltext.push(
                                        <div class="noWrap">
                                                <div class="spriteWrapper">
                                                        <img onClick={() => this.generateNextVillager("From")} src={findVisual(this.props.from)} class = "villagerSprite clickable" height="80" width={fromWidth}></img>
                                                </div>
                                                <img src={flechVisual} height="80" width="120"></img>
                                                <div class="spriteWrapper">
                                                        <img onClick={() => this.generateNextVillager("To")} src={findVisual(this.props.to)} class = "villagerSprite clickable" height="80" width={toWidth}></img>
                                                </div>
                                                <div class="displayAmount">
                                                        <input class = "amountForm" type="number" value={this.props.amount} onChange={this.handleChangeAmount}/>
                                                        {this.props.moneyName}s
                                                </div>
                                                <div class = "validateWrapper"></div>

                                        </div>
                                )
                        }
                        // Transactions non validées validables
                        else{
                                fulltext.push(
                                        <div class="noWrap">
                                                <div class="spriteWrapper">
                                                        <img onClick={() => this.generateNextVillager("From")} src={findVisual(this.props.from)} class = "villagerSprite clickable" height="80" width={fromWidth}></img>
                                                </div>
                                                <img src={flechVisual} height="80" width="120"></img>
                                                <div class="spriteWrapper">
                                                        <img onClick={() => this.generateNextVillager("To")} src={findVisual(this.props.to)} class = "villagerSprite clickable" height="80" width={toWidth}></img>
                                                </div>
                                                <div class="displayAmount">
                                                        <input class = "amountForm" type="number" value={this.props.amount} onChange={this.handleChangeAmount}/>
                                                        {this.props.moneyName}s
                                                </div>
                                                <div class = "validateWrapper">
                                                        
                                                                <button class = "button" onClick={() => this.validateTransaction()}>
                                                                        <div>
                                                                        Valider
                                                                        </div>
                                                                </button>

                                                        
                                                </div>
                                        </div>)
                        }
                        
                }

                // Transactions validées
                else{
                        fulltext.push(
                                <div class="noWrap">
                                        <div class="spriteWrapper"><img src={findVisual(this.props.from)} class = "villagerSprite" height="80" width={fromWidth}></img></div>
                                        <div><img src={flechVisual} height="80" width="120"></img></div>
                                        <div class="spriteWrapper"><img src={findVisual(this.props.to)} class = "villagerSprite" height="80" width={toWidth}></img></div>
                                        <div class = "displayAmount"><div class = "amountForm">{this.props.amount}</div> <div>{this.props.moneyName}s</div></div>
                                        <div class = "validateWrapper"></div>
                                </div>
                        )
                } 

                return fulltext;
        }
}


// Component displaying a transaction list


// TODO Finir la spec des props
/*
Waited props:

carnet : the carnet object you want to display
limit : the 
resettable = {false}
inVillage : set to true if you call this component from a VillageBlock component
transmitTransaction = a transmission function from a VillageBlock component (don't need to pass it if you're not calling from a VillageBlock)
moneyName : 
*/
class CarnetBlock extends Component {
        constructor(props) {
                super(props);

                let availableVillagers = []
                for (let index = 0; index < this.props.carnet.getTransactions().length; index++)
                {
                        let newArray = [...this.props.carnet.getVillagers()];
                        newArray.splice(newArray.lastIndexOf(this.props.carnet.getTransactions()[index].getFrom()), 1);
                        newArray.splice(newArray.lastIndexOf(this.props.carnet.getTransactions()[index].getTo()), 1);
                        availableVillagers.push(newArray)
                }
        
                this.state = {
                        carnet : this.props.carnet,
                        transactions : this.props.carnet.getTransactions(),
                        villagers : this.props.carnet.getVillagers(),
                        availableVillagers : availableVillagers,
                        validable : []
                }

                this.transmitTransaction = this.transmitTransaction.bind(this)
                this.validateTransaction = this.validateTransaction.bind(this);
                this.handleChangeAmount = this.handleChangeAmount.bind(this);
                this.generateNextVillager = this.generateNextVillager.bind(this);

                this.updateValidable();
        }        

        // Debug helper
        // Will display in the console the current state of the memory
        check(){
                console.log("===================================================")
                console.log("Les transactions actuelles")
                console.log(this.state.transactions)
                console.log("L'objet Carnet en props")
                console.log(this.props.carnet)
                console.log("L'objet Carnet en state")
                console.log(this.state.carnet)
                console.log("Les villageois disponibles pour chaque transaction")
                console.log(this.state.availableVillagers)
                console.log("Quelle transaction est validable ?")
                console.log(this.state.validable)
                // Add instructions here
        }

        // Debug helper
        // Useful to trigger some functions
        clickMe(){
                console.log("touchMe triggered")
                // Add functions here
        }

        validateTransaction(index){
                let newtransactions = this.state.transactions
                console.log("On m\'a appelé ?")
                newtransactions[index].validate();

                let newcarnet = this.state.carnet
                newcarnet.applyTransaction(newtransactions[index])

                // S'il reste assez de place, crée une nouvelle transaction vide
                let newavailable = [...this.state.availableVillagers]

                if(this.state.transactions.length < this.props.limit){
                        newcarnet.addTransaction(new Transaction(newtransactions[index].getFrom(), newtransactions[index].getTo(), 0, false))
                        newavailable.push(this.state.availableVillagers[index])
                }

                // TODO Si y a des voisins, leur envoie une copie de la transaction
                if(this.props.inVillage){
                        this.transmitTransaction(newtransactions[index], "")
                }

                // Update l'affichage

                this.setState({transaction : newtransactions, carnet : newcarnet, availableVillagers : newavailable});
                this.updateValidable()
        }

        transmitTransaction(transaction, exclude){
                if(this.props.inVillage){
                        this.props.transmitTransaction(this.state.carnet.property, transaction, exclude)
                }
        }

        handleChangeAmount(index, newAmount){
                let newtransactions = this.state.transactions
                newtransactions[index].setAmount(newAmount);
                
                // Update l'affichage

                this.setState({transaction : newtransactions});
                this.updateValidable()
        }

        generateNextVillager(id, fromto){ 

                let tempTransactions = this.state.transactions
                let totalArr = [...this.state.availableVillagers]

                let assertionBuddy = 0


                if(fromto == "From"){
                        let arr = [...this.state.availableVillagers][id];
                        arr.push(this.state.transactions[id].getFrom())
                        let newFrom = arr[0]
                        arr.shift()
                        tempTransactions[id].setFrom(newFrom)
                        totalArr[id] = arr

                        assertionBuddy ++
                }

                if(fromto == "To"){
                        let arr = [...this.state.availableVillagers][id];
                        arr.push(this.state.transactions[id].getTo())
                        let newTo = arr[0]
                        arr.shift()
                        tempTransactions[id].setTo(newTo)
                        totalArr[id] = arr

                        assertionBuddy ++
                }        

                console.assert(assertionBuddy == 1, "Incorrect fromTo parameter")

                // Update l'affichage

                this.setState({availableVillagers : totalArr, transaction : tempTransactions})
                this.updateValidable()
        }

        updateValidable(){
                let temp = [...this.state.transactions];
                let newValidable = []

                for(let i = 0; i < temp.length ; i++){
                        newValidable.push(true)
                        if((temp[i].isValidated())||(isNaN(temp[i].getAmount())||(temp[i].getAmount()<=0))){
                                newValidable[i] = false
                        }
                        else{
                                if(this.state.carnet.checkAccount(temp[i])){
                                        newValidable[i] = true;
                                }
                                else{
                                        newValidable[i] = false;
                                }
                        }
                }

                // Update l'affichage

                this.setState({validable : newValidable})
        }

        // reset the carnet block with a brand new empty carnet
        fullReset(){

                let carnet = new Carnet(this.state.carnet.getProperty(), this.state.carnet.getStartMoney(), this.state.carnet.getVillagers(), false)
                carnet.addTransaction(new Transaction(
                        this.state.transactions[this.state.transactions.length-1].getFrom(), 
                        this.state.transactions[this.state.transactions.length-1].getTo(),
                        0,
                        false
                        )
                )
                let transactions = carnet.getTransactions()
                let villagers = carnet.getVillagers()
                let availableVillagers = []
                availableVillagers.push(this.state.availableVillagers[this.state.availableVillagers.length-1])
                let validable = []
                validable.push(false)

                this.setState({
                        carnet : carnet,
                        transactions : transactions,
                        villagers : villagers,
                        availableVillagers : availableVillagers,
                        validable : validable
                })

                this.updateValidable();
        }
                
        // TODO Affichage des soldes actuels
        // TODO que le bouton de validation s'affiche au premier tour
        // TODO Comment gérer une transaction qui entre alors que c'est complet ?

        render(){
                let fullRender = []

                for (let index = 0; index < this.state.transactions.length; index++) {
                        fullRender.push(
                                <div class = "transactionLine">
                                <div key = {index} class = "inline">
                                        <TransactionLine
                                                index ={index} 
                                                from = {this.state.transactions[index].getFrom()} 
                                                to = {this.state.transactions[index].getTo()} 
                                                amount = {this.state.transactions[index].getAmount()} 
                                                validated = {this.state.transactions[index].isValidated()}
                                                validable = {this.state.validable[index]}
                                                validateTransaction = {this.validateTransaction} 
                                                handleChangeAmount = {this.handleChangeAmount}
                                                generateNextVillager = {this.generateNextVillager}
                                                moneyName = {this.props.moneyName}
                                        />
                                </div></div>)
                }

                // If the component is resettable add a reset button
                if(this.props.resettable){
                        fullRender.push(
                                <button onClick={() => this.fullReset()} class = "button"> 
                                        Reset 
                                </button>
                        )
                }

                // Debug buttons
                if (this.props.testing){
                        fullRender.push(
                                <div>
                                        <button onClick={() => this.check()}> 
                                                Vérifier l'état du carnet 
                                        </button>
                                        <button onClick={() => this.clickMe()}>
                                                        Bouton de test 
                                        </button>
                                </div>
                        )
                }

                return(
                        <div>
                                {fullRender}
                        </div>
                )
        }

}

//Component displaying a village

/*
Waited props:

village : village object you want to display (village)
limit : the number of transactions a carnet can handle (integer)
resettable : if the village can be resetted (boolean)
moneyName : 

*/
class VillageBlock extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        startMoney: this.props.village.getStartMoney(), 
                        village : this.props.village,
                        invalidCarnet : false,
                        selectedVillager : ""
                }

                this.transmitTransaction = this.transmitTransaction.bind(this)
        }

        //TODO Reset du village

        clickMe(e){
                
                // Add functions here
                this.state.village.incrementVersions();
        }

        transmitTransaction(property, transaction, exclude){
                console.log("Let's go")
                this.state.village.getCarnet(property).transmitTransaction(transaction, exclude)
                this.setState({village : this.state.village})
                setTimeout(() => {this.setState({})}, 9000);
                setTimeout(() => {this.alertInvalidCarnet()}, 9000);
                setTimeout(() => {this.setState({})}, 18000);
                setTimeout(() => {this.alertInvalidCarnet()}, 18000);
                setTimeout(() => {this.setState({})}, 27000);
                setTimeout(() => {this.alertInvalidCarnet()}, 27000);
                setTimeout(() => {this.setState({})}, 36000);
                setTimeout(() => {this.alertInvalidCarnet()}, 36000);
        }

        alertInvalidCarnet(){
                if(!(this.state.invalidCarnet)){
                        for (let index in this.state.village.getCarnets()) {
                                if (this.state.village.getCarnets()[index].isCarnetInvalid()){
                                        this.setState({invalidCarnet : true})
                                }
                        }
                }
        }

        fullReset(){

                this.state.village.setObsolete();

                let newVillage = new Village(this.props.parameters[0], this.props.parameters[1], this.props.parameters[2], this.props.parameters[3])
                this.setState({startMoney: newVillage.getStartMoney(), 
                        village : newVillage,
                        invalidCarnet : false,
                        selectedVillager : ""
                })

                const letters = document.getElementsByClassName('letter');
                while (letters.length > 0) letters[0].remove();

        }

        //TODO Faire en sorte que ça s'ajoute pas en dernière place

        check(e){
                console.log("===================================================")
                console.log("Etat du village en state")
                console.log(this.state.village)
                console.log("Etat du clone du village")
                console.log(this.state.cloneVillage)
                console.log("Villageois sélectionné")
                console.log(this.state.selectedVillager)
                console.log("Version du clone")
                console.log(this.state.cloneVillage.getCarnet("Paresseux").version)
                console.log("Version du state")
                console.log(this.state.village.getCarnet("Paresseux").version)
        }

        selectVillager(animal){
                console.log("In selectVillager")
                if(this.state.selectedVillager == animal){
                        this.setState({selectedVillager : ""})
                }
                else{
                        this.setState({selectedVillager : animal})
                }
                console.log("Out selectVillager")
        }
                
        render(){
                var fulltext = []

                let valid = true;

                for (let index in this.state.village.getCarnets()) {
                        if (this.state.village.getCarnets()[index].isCarnetInvalid()){
                                valid = false;
                        }
                }

                // D'abord, affiche le village
                // TODO Bouton reset

                if(valid){
                        fulltext.push(<div id="villageContainer" class="villageContainer">
                                <div id = "h-l-pathway"></div>
                                <div id = "v-l-pathway"></div>
                                <div id = "v-s-pathway"></div>
                                <img src={singemaison} onClick={() => this.selectVillager("Singe")} id="singevillager" class = "clickable" width="120" height="120"></img>
                                <img src={grenouillemaison} onClick={() => this.selectVillager("Grenouille")} id="grenouillevillager" class = "clickable" width="120" height="120"></img>
                                <img src={pingouinmaison} onClick={() => this.selectVillager("Pingouin")} id="pingouinvillager" class = "clickable" width="120" height="120"></img>
                                <img src={paresseuxmaison} onClick={() => this.selectVillager("Paresseux")} id="paresseuxvillager" class = "clickable" width="120" height="120"></img>
                                <img src={toucanmaison} onClick={() => this.selectVillager("Toucan")} id="toucanvillager" class = "clickable" width="120" height="120"></img>
                                <img src={chatmaison} onClick={() => this.selectVillager("Chat")} id="chatvillager" class = "clickable" width="120" height="120"></img>
                                <button id = "buttonResetVillage" class = "button" onClick={() => this.fullReset()}> Reset </button>
                        </div>)
                }
                else{
                        fulltext.push(<div id="villageContainer" class="villageContainer">
                                <div id = "h-l-pathway"></div>
                                <div id = "v-l-pathway"></div>
                                <div id = "v-s-pathway"></div>
                                <img src={singemaison} id="singevillager" width="120" height="120"></img>
                                <img src={grenouillemaison} id="grenouillevillager" width="120" height="120"></img>
                                <img src={pingouinmaison} id="pingouinvillager" width="120" height="120"></img>
                                <img src={paresseuxmaison} id="paresseuxvillager" width="120" height="120"></img>
                                <img src={toucanmaison} id="toucanvillager" width="120" height="120"></img>
                                <img src={chatmaison} id="chatvillager" width="120" height="120"></img>
                                <button id = "buttonResetVillage" class = "button" onClick={() => this.fullReset()}> Reset </button>
                        </div>)                        
                }


                // Si un carnet est sélectionné, l'affiche en dessous

                if(valid){
                        for (let index in this.state.village.getCarnets()) {
                                if(this.state.village.getCarnets()[index].getProperty() == this.state.selectedVillager){
                                        fulltext.push(<div key = {index}>
                                                {this.state.village.getCarnets()[index].getProperty()}
                                                        <CarnetBlock 
                                                                carnet = {this.state.village.getCarnets()[index]}
                                                                limit = {this.props.limit}
                                                                resettable = {false}
                                                                inVillage = {true}
                                                                transmitTransaction = {this.transmitTransaction}
                                                                moneyName = {this.props.moneyName}
                                                        />
                                                </div>
                                        )
                                }
                        }
                }

                if (this.props.testing){
                        fulltext.push(
                                <div>
                                <button onClick={() => this.clickMe()}>
                                        Bouton de test 
                                </button>
                                <button onClick={() => this.check()}>
                                        Vérifier état 
                                </button>
                                </div>
                        )
                }

                return(
                        <ul>
                                {fulltext}
                        </ul>
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

                                <input type="text" value={this.state.hashword} onChange={this.handleChange} class="input"/>

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