# OOP

## Property flags and descriptors

js에서 object의 속성(property)은 다음 3가지 flag를 갖는다. 

 - `writable`: 쓰기 가능한가
 - `enumerable`: 순회가능한 자료구조인가 
 - `configurable`: 해당 프로퍼티가 지워지거나 수정될 수 있는가

다음 메소드로 flag를 확인하거나 수정 할 수 있다.
  
 - `Object.defineProperty(obj, "key", {flag: bool})` : key는 string으로 해야한다. 
 - `Object.getOwnPropertyDescriptor(obj, "key")` : 반환되는 결과값은 true인 값만 보인다.
 
 
*oop언어에서 protected는 파생클레스에서만 접근이 되는 속성이다.* js에는 따로 public 이나 private같은 속성이 없기때문에 getter와 setter를 사용하는 것이 좋다. 혹은 클로저를 이용하여 private변수를 만들 수 있다.

`for..in`을 통해서 순회할 때 `enumerable` 속성이 false이면 순회하지 않는다. 즉 외부에서 for로 찾을 수 없는 속성이 된다. 

`writable`과 `configurable`이 false이면 수정이 불가하며 flage또한 수정 불가능하다. 따라서 한번정해졌으면 수정이 아얘 불가능한 속성이된다. 

### 이 속성들의 flags를 모두 한거번에 복사하려면? 

```javascript
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

//그러나 다음과 같이 for in 으로 복사하면 flags는 복사되지않는다.
for (let key in user) {
  clone[key] = user[key]
}
```

## Property getters and setters

프로퍼티는 다음 두가지가 있다.

 - *data properties*
 - *accessor properties* : getter, setter
   - `getter` : obj.property
   - `setter` : obj.property = "value"

 `getter`와 `setter`의 정의 하는가 안하는가로 외부에서 값을 수정여부와 접근여부를 설정할 수 있다. 이 방식이 필연적인 이유는 접근자 프로퍼티는 value를 애초에 정의하지 않으며 `writable`도 가지지 않기 때문이다. 또한 접근자를 이용하면 속성에 값을 할당할때 `setter`에서 값이 유효한지 검사 할 수 있다.  

참고로 접근자에 대하여  MDN 문서에는 다음과 같이 기술되어있다.
> 객체로 표현되는 속성 기술자(Property descriptors)는 두 가지 타입으로 되어있다: 데이터 기술(data descriptors) 또는 데이터 접근기술(accessor descriptors)이다. 데이터 기술에는 value속성이 있고 읽기전용인지 쓸 수 있는지를 나타내는 writable속성을 추가적으로 포함할 수도 있다. 데이터 접근기술은 getter-setter쌍의 함수로 기술된다. 속성기술자에서는 반드시 이 두 가지 타입 중 한 가지로 기술되어야한다; 동시에 두 가지 타입을 기술할 수는 없다.

즉, descriptor로 속성의 기술를 정의할 수있는데 두가지 방식이 있는 것. 하나는 value와 writable, 하나는 getter, setter인 것. 그리고 getter, setter는 객체를 생성할 때 `get propertyName() {}`로 선언하거나, 객체 생성 뒤 `Object.defineProperty(obj, key, { get() {}, set() {} })`로 선언 해 준다.

## Prototype

 상속은 [[prototype]] 속성으로 이루어진다. 그러나 이속성은 비공개맴버이다. 따라서 직접 접근할 수는 없다. 하지만 `__proto__`속성을통해서 읽고 쓸 수 있다. `__proto__`는 [[prototype]]의 getter, setter이다. [[prototype]]은 원형 객체를 가리키고있지 그 객체를 '가지고'있는 것이 아니다. 따라서 원형이 변한다면 객체도 변할 것이다. 이것을 통하여 상속을 표현할 수 있다. js는 객체에서 찾을 수 없는 속성을 prototype 채인을 타고 올라가며 찾는다.
  
 모든 객체는 다 [[prototype]]을 가진다. 자신의 원형이 존재한다. 이 원형을 변경하려면 proto를 사용하는 것이다. 그런데 코드를 보면 `__proto__`를 사용하는 코드는 그리 많지 않다. 그보다는 더 오래된 방식인 `prototype`속성을 이용한다. 이 `prototype`속성은 constructor function의 속성이다. 즉 constructor가 가지는 속성이다. 모든 객체는 이 constructor function을 가지고 있다. `constructor.prototype`은 constructor function을 가지는 객체의 원형을 가리키고있다. 즉, `obj.__proto__`를 가리키고있다. 
 
 ```javascript
 a.__proto__ === a.constructor.prototype // true
 ```
### `prototype`속성은 object 타입에 따라 다른원형을 갖게 된다.
 [문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain) 에는 다음과 같은 예가 나와있다.

```javascript
var o = {a: 1};

// o 객체는 프로토타입으로 Object.prototype 을 가진다.
// 이로 인해 o.hasOwnProperty('a') 같은 코드를 사용할 수 있다.
// hasOwnProperty 라는 속성은 Object.prototype 의 속성이다.
// Object.prototype 의 프로토타입은 null 이다.
// o ---> Object.prototype ---> null

var a = ["yo", "whadup", "?"];

// Array.prototype을 상속받은 배열도 마찬가지다.
// (이번에는 indexOf, forEach 등의 메소드를 가진다)
// 프로토타입 체인은 다음과 같다.
// a ---> Array.prototype ---> Object.prototype ---> null

function f(){
  return 2;
}

// 함수는 Function.prototype 을 상속받는다.   우리가 많이보던 `ƒ () { [native code] }`이다. 
// (이 프로토타입은 call, bind 같은 메소드를 가진다)
// f ---> Function.prototype ---> Object.prototype ---> null

```

{}를 대입연산자와 함께 사용하면 객체가 가리키던 모든 prototype을 소멸하고 초기화시킨다. 즉 상속도 사라진다. 

### 실험. 

 - 처음 선언을 할 때 defineProperty 로 선언한 것은 바꿀 수없다?

중요한 사실은 객체가 선언언된 상태에서 defineProperty하는 것과 객체가 선언되지 않은 상태에서 defineProperty하는 것과는 다르다는 사실이다. 첫번째 경우는 바꿀수 있지만, 두번째 경우에는 바꿔지지 않는다. 두번째 경우에는 재정의 오류가 뜬다. 

## 더 알아볼 사항

 - prototupe 으로 클래스설계시  class로 설계시 비교하기
 - js에서 추상 함수를 구현하는 방법은 다음과 같이 하는 것이다. [참고](https://medium.com/@yuribett/javascript-abstract-method-with-es6-5dbea4b00027)

B.prototype = Object.create(A.prototype)
B.prototype = A.prototype
이둘은 서로 다르다.

```javascript
class Foo {
   constructor(text){
      this._text 
      = text;
   }

   /**
    * Implementation optional
    */
   genericMethod() {
       console.log('running from super class. Text: '+this._text);
   }
   
   /**
    * Implementation required
    */
   doSomething() {
      throw new Error('You have to implement the method doSomething!');
   }
}
```

 내 개인적인 생각에는 function 코드가 자체가 바뀌는 것이아니라 런타임에 prototype을 수정함으로 가능하게 한것 같다. 
 그리고 function 자체가 바뀌지 않는다고 한 이유는 이미 생성된 객체의 constructor가 바뀌는지 확인해 보면 알 수 있다.
 function을 같은 이름으로 제정의한다고 객체의 constructor가 바뀌지는 않는다. 
    
### constructor & prototype

프로토타잎 체인에 인스턴스화된 객체가 들어가는 것이다! 인스턴스 객체안에 프로토타입이 있는 것이아니다(닭이 먼저냐 계란이 먼저냐...ㅎ) 따라서 객체는 프로토타입을 가지지 않는다. 그러나 모든 객체는 `__proto__`를 갖는다. 그리고 이 속성은 클래스의 prototype을 갖는다.

```javascript
 function A() {
     this.foo();
 }

 A.prototype.foo =function() {
     this.test= "test!";
 }
 
 // at this point A.prototype does not have `test`
 // It can not have `test` untill `new A()` to be called. 
 // But If it's called without assigning to valuable, It will make sort of virtual object.
 // So, just calling `new A()` does not effect anything on `A.prototype`
 // Only when `let a = new A()` is called, `A.prototype` will have `test` property.

 function B(){
     A.prototype.foo();
 }
 
 // This also does not effect on `B`. There would be no property created by invoking A.protoype.foo().
 // 
```

 모든 A클래스의 인스턴스는 결국 같은 원형을 참조하고있다. 그래서 만약 원형을 변경하면 모든객체를 변경하는 꼴이 된다. 원형이 따로 복사되어 상속되거나 변수에 할당되는 것이아니라 참조를 갖는 것이다.  

이것을 고려해 볼때 js를 비롯한 ECMAScript를 비롯한 prototypal inheritance language 참으로 자유로운 언어이다. 이 특성을 이용하면 메타프로그래밍이 매우 간단해지며 동적으로 코드 자체를 수정하는 것이 가능하다. 코드 자체가 곧 객체이기 때문이다. 굳이 복잡하게 메타프로그래밍을 구현하지 않아도 js는 간단하게 prototype을 동적으로 수정함으로서 이것을 가능하게 만든다.  

실행시점에 prototype을 바꿈으로서 모든객체의 특성을 한거번에 변경할 수 있다는 것은 큰 매력인것같다.  

## 요약

es6에서는 클래스 키워드를 사용하여 클래스 선언이 가능해졌다. 

동시에 function을 통해 클래스 선언도 가능하다. 

function을 통해 클래스를 선언하는 경우:

function F(){} 

F는 클래스가 아니라, F라고 이름하는 클래스의 constructor이다.

어떤 객체의 constructor는 자신을 만든 클래스의 constructor를 가리킨다. 

이 constructor는 다시말하지만 function F 이다. 

constructor는 prototype을 가지고있다. 

이 prototype 은 해당 클래스가 인스터스화 된것이다. 

(여기서 우리는 js에서 클래스는 모두 기본적으로 싱글톤으로 클래스 자기 자신을 단하나만 인스턴스화한다는 것을 알 수있다.이것이 prototype이다. 그리고 다른 모든 인스턴스들도 이 객체를 참조로 가진다. 이때문에 모든 하위객체들이 단하나의 prototype을 가지는 것이다.) 

그리고 new 키워드를 사용하여 F객체를 만들면

먼저 contructor를 한번 실행시킨다.

 **이때 constructor안에 this의 관계 주의**

그리고는 [[prototype]]비공개 속성을 F.prorotype으로 설정한다. 

`__proto__`속성이 바로 이 [[prototype]] private속성의 getter, setter이다. 그래서 

생성된 객체의 `__proto__` 가 F.prototype이 된다.

또다른 객체를 new F()를 통하여 생성하면 같은 과정이 반복된다. 즉 또다른 객체도 같은 prototype을 갖게된다.

 보통은 클래스 코드에서 상속이 이루어지는데 js는 클래스의 인스턴스를 통해 상속이 이루어지는 것이다. 그리고 모든 자식은 공통의 부모 단 하나를 갖는 것.

prototype의 속성들은 상속받는 겍체에서 `.`연산으로 바로 접근할 수 있다.
