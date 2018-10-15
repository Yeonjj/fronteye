# Javascript 스터디

 - `let`과 `get`은 다르다.

## Property value shorthand

이미 변수이름으로 사용한 이름을 프로터티의 이름으로 사용할 수 있다. `name:name`도 가능하다. 

~~~javascript
function makeUser(name, age) {
  return {
    name: name, 
    age: age
    // ...other properties
  };
}

//이 코드는 다음과 같다.

function makeUser(name, age) {
  return {
    name, // same as name: name
    age   // same as age: age
    // ...
  };
}

let user = makeUser("Jo1hn", 30);
alert(user.name); // John
~~~

이때 프로퍼티의 이름이 인자값으로 바꿀 수 있는 것이아니라 값이 바뀌는 것이다. 

## `in` 연산자

`in` 연산자는 오브젝트안에 해당 키의 프로퍼티가 존재하는지를 불리언으로 알려준다. `key in object`로 사용하는데 key는 항상 string이다. 만약 큰따옴표로 key를 쓰지않으면 변수로 간주하고 변수값을 이용하여 검색한다. **검색이아니라 참조하고 싶을 때**는 for루프안에서서 `let key`로 객체의 모든 오브젝트에 접근할 수 있다. why? 그냥 key만써도 되던데....

### Copying by reference 

primitive 변수를 복사할 때는 값을 참조한다. 하지만 object를 복사할 때는 주소를 참조한다. 

 - `let a = "a"; let b = a;` : 두 개의 다른 string을 a,b 각각가진다. 
 - `let obj = { a:"c"}; let obj2 = obj;` : obj, ojb2는 같은 프로퍼티 a를 참조한다.
 

## Const 

`const`는 오브젝트의 경우에 참로를 바꾸지 못하게 하지 프로퍼티는 바꿀 수 있다. 

## Garbage collection

### Reachable
javascript의 메모리관리는 Reachable한지 안한지에의해 결정된다. 즉, 쉽게 말하면 **root**에서 접근할 수 없게되면 메모리에서 삭제된다. 
기본적으로 지워질 수 있는 메모리와 지워질 수 없는 메모리가 있는데 root는 지워질 수 없는 메모리이다.

 - 현제 함수의 로컬 변수들와 인자들. 이들은 언제나 접근이 가능하다.
 - 현제 함수 콜체인에서 다른 함수들의 변수들과 인자들. 이들은 나중에 콜이 끝나고 돌아갈때까지 반드시 유지되어야한다.
 - 글로벌 변수

~~~javascript
function marry(man, woman) {
    woman.husband = man;
    man.wife = woman;

    return {
        father: man,
        mother: woman
    };
};

let family = marry({
    name: "John"
}, {
    name: "Ann"
});
~~~

[이런점](http://javascript.info/garbage-collection)에서 js가 관계형데이터베이스를 쉽게 표현 할 수 있을 것같다. 오브젝트이름은 관계이며 프로퍼티는 데이터튜플로 생각하면 된다.

### 메모리 삭제 알고리즘

글로벌 변수 family 보든 객체를 참조할 수있는 상위의 객체가 반드시 존재해야한다. 이것이 **root**이다. js는 그래프 자료구조에서 root에 연결되지 않는 scc(strong connected component)가 아닌 그래프를 찾아내는 알고리즘을 이용하여 메모리를 삭제한다.


## Symbol type
객체의 프로퍼티는 오직 string과  symbol뿐이다. symbol를 제외한 나머지가 키로 쓰일때는 모두 string으로 변환된다.
만약 내가 쓰려는 외부 코드의 오브첵트가 이미 id라는 key를 가지고 있음에도 `let obj.id = "other"`를 쓰게되면 당현이 원본코드에 의도치않은 피해를 준다. 그래서 symbol를 사용하여 id를 등록해 두었다면, 기존의 id를 overwriting하지 않을 것이다. symbol프로퍼티는 for..in으로 검색되지 않는다. 일종의 private값인 것. 그러나 `Object.assign`를 이용한다면 심볼도 모두 복사된다.  
Symbol은 두가지 용도로 사용된다.

 - 숨겨진 프로퍼티 
 - 내장된 기능를 사용하기 위함 

숨겨져 있지만 접근 할 수 있는 방법들이 있다. 

### symbol 사용법
[추가자료](https://medium.com/@hyunwoojo/javascript-symbol-%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C-6aa5903fb6f1) : Symbol대한 다른 article.

 - `let id = Symbol("id")` 
 - `let user = { [id]: 123 }`
 - `Symbol.for()` : 글로벌 심볼, 같은 description의 같은 심볼을 만든다.
 - `Symbol.keyFor(sym)` : 글로벌 심볼의 description을 가져온다.
 
## this
 
`use strict`를 사용하라. 그렇지않은 의도치않게 객체를 생성할 수 있다.

### method 

 - `user.f()` or `user['f']()`

다음 애러코드를 보면,
~~~javascript
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // John (the simple call works)

// now let's call user.hi or user.bye depending on the name
(user.name == "John" ? user.hi : user.bye)(); // Error!
~~~

어째서 애러가 날까?  
잘보면 위의 코드는 여러가지를 하나에 코드라인에 넣었지만 실은 몇가지과정을 함축하고 있다. 

 1. `'.'` 연산은  obj.method를 끌어온다.
 2. 그다음 `()`실행한다. 

~~~javascript
let hi = user.hi;
hi();
~~~

즉 `this`가 갈 곳이 없어진것이다. 내부적으로 js에서 `.`는 함수를 반환하는 것이 아니다. Reference Type을 반환한다. `(base, name, strict)`의 형태로 반환하는데 여기에 ()연산을 하게 되면, 이정보를 모두얻기 때문에 this를 확실히 할 수 있다.
하지만, `hi = user.hi`와 같이 호출하면 이때는 Reference Type을 반환하는 것이 아니라 function을 반환받아서 넘긴다. 그래서 this를 잃는 것이다.(base정보가 없기 때문에) 


### 오브젝트 변환

오브젝트를 스트링으로 변환하는 것은시리얼라이제이션과 로깅을 위함이다.

