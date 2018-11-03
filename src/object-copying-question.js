class TestClass {
    constructor(){
        this.name = "this is in TestClass";
        this.calclsObj = new CalCls(this);
    }
    calltest(subClass){
        subClass.pp = this.calclsObj;
    }
    say(){
        console.log(this.name);
    }
}

class CalCls {
    constructor(passedClass){
        this._passedClass = passedClass;
        this._passedClass.name = "This is in Subclass";
    }
    say(){
        console.log(this._passedClass.name);
    }
}

let parent = new TestClass();
let child = {};
parent.calltest(child);
