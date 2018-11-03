// 원하지 않은 객체 생성을 막는다.
'use strict';

//`__변수명`은 c++에서 메크로 같은 역할로 쓰기로하였다.
const __defprty = Object.defineProperty;



function toggleDescriptor(key, descriptors = 0){
    let _a, _b, _c;

    if (descriptors)
        [_a, _b, _c] = descriptors;
    else
        [_a, _b, _c] = ["writable", "enumerable", "configurable"];

    if(this[key] == undefined)
        __defprty(this, key, {[_a] : true, [_b] : true, [_c] : true});
    else
        __defprty(this, key, {[_a] : false, [_b] : false, [_c] : false});
}

//TODO: contrete state객체 생성을 풀 패턴으로 형성하기. 그래서 쓸때마다 가져다쓰기. : useing pool pattern!! yay
class Interface{
    constructor(app){
        this._app = app;
    }
    //TODO: destructuring 을 이용해서 인수를 무작위로 받아와도 정해진 순서로 실행되는 기능 만들기.
    set state(nextstate){
        //application객체에서 굳이 이 객체들을 가지고 있을 필요가 없어진다.
        //check if the nnextstate is validate state. that is, 메시지등록 페턴을 만들어서 없는 메시지의 경우 애러
        if(nextstate == "init") this._state = new ApplicationInit(this.app);
        if(nextstate == "run") this._state = new ApplicationRunning(this.app);
        if(nextstate == "destroy") this._state = new ApplicationTerminated();
    }

    get state(){
        return this._state;
    }

    get app(){
        return this._app;
    }
}

class Application {
    constructor(state){
        if(!state)
            //interface는 수정이 불가능하기 때문에 미리 유효성검사를 해야한다.
            throw new Error("No initial state is provided");

        this.interface = new Interface(this);
        this.interface.state = state;
        toggleDescriptor.call(this,"interface"); //all flags set to false;
    }

    run(){
        this.interface.state.handle();
    }
}

class ApplicationInit {
    constructor(app){
        this._app = app;
    }
    handle(){
        console.log("application init");
        this._app.interface.state = "run";
    }
}

class ApplicationRunning {
    constructor(app){
        this._app = app;
    }
    handle(){
        console.log("application running");
        this._app.interface.state = "destroy";
    }
}

class ApplicationTerminated {
    handle(){
        console.log("application terminated");
    }
}

