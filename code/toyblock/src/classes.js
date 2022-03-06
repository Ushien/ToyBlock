import {sendLetter} from './components.js'

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
                                this.setInvalidCarnet(true);
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
                console.assert(transaction.isValidated(), "Trying to transmit a non-validated transaction");

                for (var i in this.neighbors){
                        if (i !== exclude){
                                this.sendTransaction(transaction, this.neighbors[i]) 
                        }
                }
        }

        sendTransaction(transaction, destination){
                //envoie une transaction à un autre carnet, après avoir attendu le temps qu'il faut
                let version = this.version
                sendLetter(this.property, destination[0].getProperty())
                setTimeout(() => {destination[0].receiveTransaction(transaction, this.property, version)} , this.getMillisecondsFromDistance(destination[1]));
        }

        getMillisecondsFromDistance(distance){
                // return distance * 1000
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
        // Don't use it outside of testing
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

export {Village, Carnet, Transaction}