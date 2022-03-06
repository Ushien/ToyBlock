import { sendLetter } from './components.js'

// TODO Remettre de l'ordre dans les propriétés

/**
 * Represents a transaction between two villagers
 * 
 * @property {string} from - The villager who gives the money
 * @property {string} to - The villager who receives the money
 * @property {number} amount - The amount of money spent
 * @property {boolean} validated - Whether or not the transaction is validated
 */
class Transaction {
        /**
         * Creates a transaction
         * 
         * @param {string} from - The villager who gives the money
         * @param {string} to - The villager who receives the money
         * @param {number} amount - The amount of money spent
         * @param {boolean} validated - Whether or not the transaction is validated
         */
        constructor(from, to, amount, validated) {
                this.from = from;
                this.to = to;
                this.amount = amount;
                this.validated = validated;
        }

        /**
         * Returns a clone of the transaction
         * 
         * @returns {Transaction} - A clone of the transaction
         */
        clone() {
                return new Transaction(this.getFrom(), this.getTo(), this.getAmount(), this.isValidated())
        }

        /**
         * Get the isValidated property of the transaction
         * 
         * @returns {boolean} - Wheter or not the transaction is validated
         */
        isValidated() {
                return this.validated;
        }

        /**
         * Get the amount property of the transaction
         * 
         * @returns {number} - The amount of the transaction
         */
        getAmount() {
                return this.amount;
        }

        /**
         * Set the amount property of the transaction
         * 
         * @param {number} amount - The new amount of the transaction
         */
        setAmount(amount) {
                this.amount = amount;
        }

        /**
         * Get the from property of the transaction
         * 
         * @returns {string} - The from property of the transaction
         */
        getFrom() {
                return this.from;
        }

        /**
         * Set the from property of the transaction
         * 
         * @param {string} from - The new from property of the transaction
         */
        setFrom(from) {
                this.from = from;
        }

        /**
         * Get the to property of the transaction
         * 
         * @returns {string} - The to property of the transaction
         */
        getTo() {
                return this.to;
        }

        /**
         * Set the to property of the transaction
         * 
         * @param {string} to - The new to property of the transaction
         */
        setTo(to) {
                this.to = to;
        }

        /**
         * Validate a transaction
         */
        validate() {
                console.assert(this.from != this.to, "Sender and receiver are the same");
                console.assert(this.amount >= 0, "Amount is negative")
                this.validated = true;
        }
}

/**
 * Represents a notebook containing a list of transactions
 * 
 * @property {string} property - The villager who owns the notebook
 * @property {Transaction[]} transactions - The list of transactions written in the notebook
 * @property {number} startmoney - The amount of money every villagers own at the beginning
 * @property {string[]} villagers - All the villagers composing the village
 * @property {Object} currentAccounts - The current account of every villager of the village
 * @property {Object} neighbors - The notebooks and the distance of the neighbors of the notebook owner
 * @property {boolean} invalidNotebook - Wheter or not the notebook received an incompatible transaction
 * @property {boolean} obsolete - Wheter or not the notebook is part of a resetted village
 */
class Notebook {
        /**
         * Creates a transaction
         * 
         * @param {string} property - The villager who owns the notebook
         * @param {number} startmoney - The amount of money every villagers own at the beginning
         * @param {string[]} animals - All the villagers composing the village
         * @param {boolean} [fillEmptyTransaction = true] - Wheter or not the empty notebook should be filled with an empty transaction (optional - default = true)
         */
        constructor(property, startmoney, animals, fillEmptyTransaction = false) {
                this.property = property;
                this.transactions = [];
                this.startmoney = startmoney;
                this.villagers = animals;
                this.currentAccounts = {};
                this.neighbors = {};
                this.invalidNotebook = false;
                this.obsolete = false;

                for (let index = 0; index < animals.length; index++) {
                        this.currentAccounts[animals[index]] = startmoney;
                }

                if (fillEmptyTransaction) {
                        this.addTransaction(new Transaction(animals[0], animals[1], 0, false))
                }
        }

        /**
         * Returns a clone of the notebook
         * 
         * @returns {Notebook} - A clone of the notebook
         */
        clone() {
                let cloneNotebook = new Notebook(this.getProperty(), this.getStartMoney(), this.getVillagers(), false)

                // Clone les transactions
                for (let index = 0; index < this.getTransactions().length; index++) {
                        cloneNotebook.addTransaction(this.getTransactions()[index].clone())
                }

                // Clone les comptes
                for (let account in this.getCurrentAccounts()) {
                        cloneNotebook.setCurrentAccount(account, this.getCurrentAccounts()[account])
                }

                // Clone les voisins
                cloneNotebook.neighbors = this.neighbors;

                // Clone la validité du notebook
                cloneNotebook.setInvalidNotebook(this.isNotebookInvalid())

                return cloneNotebook;
        }

        /**
         * Assign the neighbors to the notebook
         * 
         * @param {Object} neighbors - An object containing every neighbor of the notebook, associated with the distance between them
         * @param {Object} villagers - The list of every notebook composing the village
         */
        assignNeighbors(neighbors, villagers) {
                console.log(neighbors)
                console.log(villagers)
                for (var i in neighbors) {
                        this.neighbors[i] = [];
                        this.neighbors[i].push(villagers[i]);
                        this.neighbors[i].push(neighbors[i]);
                }
        }

        /**
         * Get the neighbors property of the notebook
         * 
         * @returns {Object} The notebooks and the distance of the neighbors of the notebook owner
         */
        getNeighbors() {
                return this.neighbors;
        }

        /**
         * Set the isNotebookInvalid property of the notebook
         * 
         * @param {boolean} isNotebookInvalid - Wheter the notebook is invalid or not
         */
        setInvalidNotebook(isNotebookInvalid) {
                this.invalidNotebook = isNotebookInvalid;
        }

        /**
         * Get the isNotebookInvalid property of the notebook
         * 
         * @returns {boolean} Wheter the notebook is invalid or not
         */
        isNotebookInvalid() {
                return this.invalidNotebook;
        }

        /**
         * Set the current account of a villager to a given amount
         * 
         * @param {string} animal - The villager account who needs to be modified
         * @param {number} amount - The new amount of money the villager needs to own
         */
        setCurrentAccount(animal, amount) {
                this.currentAccounts[animal] = amount;
        }

        /**
         * Get the currentAccounts property of the notebook
         * 
         * @returns {Object} currentAccounts - The current account of every villager of the village
         */
        getCurrentAccounts() {
                return this.currentAccounts;
        }

        /**
         * Add a transaction to the transaction list of the notebook without doing anything else
         * 
         * @param {Transaction} transaction - The transaction you need to add
         */
        addTransaction(transaction) {
                this.transactions.push(transaction)
        }

        /**
         * Add a transaction to the transaction list of the notebook and update the accounts
         * 
         * @param {Transaction} transaction - The transaction you need to add
         */
        addAndApplyTransaction(transaction) {
                // console.assert transaction validée
                this.addTransaction(transaction)
                // console.assert(this.transactions.filter().length < 2)
                this.applyTransaction(transaction);
                console.log("Transaction added and applied");
        }

        /**
         * Update the accounts of the notebook depending of a transaction
         * Does not add any transaction in the transactions property
         * 
         * @param {Transaction} transaction - The transaction you need to apply on the accounts
         */
        applyTransaction(transaction) {
                this.currentAccounts[transaction.getFrom()] = this.currentAccounts[transaction.getFrom()] - transaction.getAmount();
                this.currentAccounts[transaction.getTo()] = this.currentAccounts[transaction.getTo()] + transaction.getAmount();
        }

        /**
         * Get the transactions attribute of the notebook
         * 
         * @returns {Transaction[]} - The list of transactions written in the notebook
         */
        getTransactions() {
                return this.transactions;
        }

        /**
         * Get the property attribute of the notebook
         * 
         * @returns {string} - The villager who owns the notebook
         */
        getProperty() {
                return this.property;
        }


        /**
         * Get the villagers attribute of the notebook
         * 
         * @returns {string[]} villagers - All the villagers composing the village
         */
        getVillagers() {
                return this.villagers;
        }

        /**
         * Get the startMoney attribute of the notebook
         * 
         * @returns {number} - The amount of money every villagers own at the beginning
         */
        getStartMoney() {
                return this.startmoney;
        }

        /**
         * Set the obsolete attribute of the notebook to true
         */
        setObsolete() {
                this.obsolete = true;
        }

        /**
         * Get the obsolete attribute of the notebook
         * 
         * @returns {boolean} Wheter or not the notebook is part of a resetted village
         */
        isObsolete() {
                return this.obsolete;
        }

        /**
         * Check wheter or not a transaction is compatible with the current transactions of the transaction list
         * A transaction is not compatible if the money sender doesn't own enough money
         * 
         * @param {Transaction} additionalTransaction - The transaction you want to check the compatibility
         * @returns {boolean} - Wheter the transaction is compatible with the notebook or not
         */
        checkAccount(additionalTransaction) {

                let validity = true;

                let newAccounts = {};
                for (let account in this.currentAccounts) {
                        newAccounts[account] = this.currentAccounts[account];
                }

                newAccounts[additionalTransaction.getFrom()] = newAccounts[additionalTransaction.getFrom()] - additionalTransaction.getAmount();
                newAccounts[additionalTransaction.getTo()] = newAccounts[additionalTransaction.getTo()] + additionalTransaction.getAmount();

                for (let account in newAccounts) {
                        if (newAccounts[account] < 0) {
                                validity = false;
                        }
                }

                return validity;

        }

        /**
         * Receive a transaction and transmit it to the next neighbors of the notebook
         * The transmission doesn't happen if the notebook is obsolete
         * If the transaction is not compatible, display an alert popup and don't transmit it
         * 
         * @param {Transaction} transaction - The received transaction
         * @param {string} from - The villager who sent the transaction
         */
        receiveTransaction(transaction, from) {

                //vérifie que la transaction est compatible avec les autres
                //si oui, l'ajoute, si non, envoie une erreur
                if (!this.isObsolete()) {
                        if (!this.checkAccount(transaction)) {
                                // throw "An invalid transaction has been received !"
                                this.setInvalidNotebook(true);
                                alert(this.getProperty() + " a reçu une transaction incompatible !\nAppuyez sur reset pour réinitialiser le village.")

                        }
                        else {
                                this.addAndApplyTransaction(transaction)
                                //transmet ensuite la transaction aux voisins, sauf au from
                                this.transmitTransaction(transaction, from)
                        }
                }
        }

        /**
         * Send a transaction to every neighbor of the notebook (except exclude)
         * 
         * @param {Transaction} transaction - The transaction to send
         * @param {string} exclude - The villager who won't receive the transaction
         */
        transmitTransaction(transaction, exclude) {
                console.assert(transaction.isValidated(), "Trying to transmit a non-validated transaction");

                for (var i in this.neighbors) {
                        if (i !== exclude) {
                                this.sendTransaction(transaction, this.neighbors[i][0], this.neighbors[i][1])
                        }
                }
        }

        /**
         * Send a transaction to a single notebook
         * The destination notebook receives the transaction after a certain amount of time, depening on the distance
         * 
         * @param {Transaction} transaction - The transaction to send
         * @param {Notebook} destination - The notebook who will receive the transaction
         * @param {number} distance - The distance between the notebook and the destination notebook
         */
        sendTransaction(transaction, destination, distance) {
                //envoie une transaction à un autre notebook, après avoir attendu le temps qu'il faut
                sendLetter(this.property, destination.getProperty())
                setTimeout(() => { destination.receiveTransaction(transaction, this.property) }, this.getMillisecondsFromDistance(distance));
        }

        /**
         * Computes which time need a transaction to travel a certain distance
         * 
         * @param {number} distance - The distance the transaction needs to travel
         * @returns {number} - The time that the transaction needs to travel the distance (milliseconds)
         */
        getMillisecondsFromDistance(distance) {
                // return distance * 1000
                return 9000
        }

}

class Village {

        constructor(startmoney = 0, animals = [], neighbors = {}, fillEmptyTransactions = false) {

                this.startmoney = startmoney;
                this.villagers = {};

                // Creatings villagers transaction lists
                for (let index = 0; index < animals.length; index++) {
                        this.villagers[animals[index]] = new Notebook(animals[index], startmoney, animals, fillEmptyTransactions)
                }

                // Assigning neighbors
                for (let index = 0; index < animals.length; index++) {
                        this.getNotebooks()[animals[index]].assignNeighbors(neighbors[animals[index]], this.getNotebooks())
                }
        }

        clone() {
                let cloneVillage = new Village(this.getStartMoney())

                for (let property in this.getNotebooks()) {
                        cloneVillage.addNotebook(property, this.getNotebooks()[property].clone())
                }

                return cloneVillage
        }

        getNotebooks() {
                return this.villagers;
        }

        addNotebook(property, notebook) {
                this.getNotebooks()[property] = notebook;
        }

        getNotebook(property) {
                return this.villagers[property];
        }

        getAnimals() {
                return this.animals;
        }

        getStartMoney() {
                return this.startmoney;
        }

        setObsolete() {
                for (let notebook in this.getNotebooks()) {
                        this.getNotebooks()[notebook].setObsolete()
                }
        }

        // Warning ! Should not be used outside of testing
        addTransaction(property, transaction) {
                this.getNotebook(property).addTransaction(transaction)
        }

        // Won't apply any transaction
        // Don't use it outside of testing
        addTransactionToAll(transaction) {
                for (let notebook in this.getNotebooks()) {
                        this.getNotebooks()[notebook].addTransaction(transaction)
                }
        }

        // Add a transaction to every notebook
        // If the transaction is validated, apply it
        // If not, add it normally
        addAndApplyTransactionToAll(transaction) {
                for (let notebook in this.getNotebooks()) {
                        if (transaction.isValidated()) {
                                this.getNotebooks()[notebook].addAndApplyTransaction(transaction.clone())
                        }
                        else {
                                this.getNotebooks()[notebook].addTransaction(transaction.clone())
                        }
                }
        }
}

export { Transaction, Notebook, Village }