class ATMMachine {
    constructor(){
        this.state = new NoCard(this);
    }
    insertCard(){
        this.state.insertCard();

    }
    ejectCard(){
        this.state.ejectCard();
    }
    insertPin(){
        this.state.insertPin();
    }
    requestCash(){
        this.state.requestCash();
    }
}

class NoCard {
    constructor(stateContainer){
        this._stateContainer = stateContainer;
    }
    insertCard(){
        console.log("card inserting done!");
        this._stateContainer.state = new HasCard(this._stateContainer);
    }
    ejectCard(){
        console.log("you already ejected");
    }
    insertPin(){
        console.log("insert card first!");
    }
    requestCash(){
        console.log("insert card first!");
    }
}

class HasCard {
    constructor(stateContainer){
        this._stateContainer = stateContainer;
    }
    insertCard(){
        console.log("you already have card in!");
    }
    ejectCard(){
        console.log("ejecting card done!");
        this._stateContainer.state = new NoCard;
    }
    insertPin(){
        console.log("insert pin number correct!");
        this._stateContainer.state = new HasPin(this._stateContainer);
    }
    requestCash(){
        console.log("insert Pin Number!");
    }
}

class HasPin{
    constructor(stateContainer){
        this._stateContainer = stateContainer;
    }
    insertCard(){
        console.log("you already have card in! you can check your money");
    }
    ejectCard(){
        console.log("ejecting card done!");
        this._stateContainer.state = new NoCard;
    }
    insertPin(){
        console.log("you already inserted Pin munber");
    }
    requestCash(){
        console.log("requesting monuey..... fail no money!");
        this._stateContainer.state = new NoCash(this._stateContainer);
    }
}

class NoCash{
    constructor(stateContainer){
        this._stateContainer = stateContainer;
    }
    insertCard(){
        console.log("you already have card in! ");
    }
    ejectCard(){
        console.log("ejecting card done!");
        this._stateContainer.state = new NoCard;
    }
    insertPin(){
        console.log("you already inserted Pin munber");
    }
    requestCash(){
        console.log("requesting monuey fail no money!");
    }
}
