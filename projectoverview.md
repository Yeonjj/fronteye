# RDSC(Reusable Differential Synchronization Component) project

## 개요

 단 하나의 자료를 다수의 접속자가 동시에 수정이 가능하도록하는 재사용 가능한 컴포넌트 설계. 다시 말해, Google Docs의 문서공유와 같은 기술을 구현하고 문서뿐아니라 특정 조건을 갖춘 객체를 가져와서 재사용이 가능하도록 라이브러리를 설계하는 것이 목표이다. 
 실재로 이 기술은 매우 Robust하다. 그러나 실재 google docs에서는 이 알고리즘을 사용하고 있지않다. Operational Transformation알고리즘을 사용한다. 그러나 동시 수정 알고리즘이 OT만 잘 작동하는 솔루션은 아니다. 따라서 시도해 볼만하다.
 
## 시작전

 - nodejs 디버깅환경 구축하기.
 - (option)DS 문서 번역

## Task1. 개발 방식

 - 문서 작성 
   - 주단위 개발일지 쓰기.
   - 설계방식 관련 문서(혹시라도 다른 사람의 contribution을 위해 개발자용 문서).
   - api 사용 문서.
 - notion 코업 앱사용

사용기술 : nodejs, express, ajax, 

하나의 빈 페이지에서 텍스트입력이 가능하도록하고 2개 이상의 클라이언트에서 접속하여 동시 수정이 가능한 페이지 개발.

 1. DS를 여러 모듈, 클래스 단위로 쪼개서 설계한다. 
 2. 클래스 모듈 단위로 테스트 케이스를 작성한다. 
 3. 테스트 케이스를 바탕으로 테스팅 코드 작성한다.
 4. 각자 원하는 모듈 개발을 맡는다. - 모듈을 개발할때는 테스팅코드를 수시로 돌려가며 안정성 확보한다.
 5. 각 모듈(또는 클래스)을 하나의 기능으로 합친다.
 
 
1번 설계시 각 모듈이 이후에 잘 결합될 수 있도록 일종의 클래스간 통신(?)프로토콜이 존재하여 이후 각자 개발을 마친뒤에 잘 합칠 수 있도록 한다.

2번 테스트 모듈 : Nodeunit, 
테스팅 방식은 TDD로 진행. "작성이 되기 전의 소스를 테스트하는 방식"
4번의 경우는 각자 다른 클래스가 아닌 모두 하나의 클래스를 함께 개발 할 수도 있을 것 같다.



## Task2. Differential Synchronization 구현(local DS algorithm)

on network로 작동하는 알고리즘 구현을 위해서 전체적인 outline를 잡기위해 필요한 작업이다.

화면구성

 - textarea창 두개를 만들고 한쪽은 서버 한쪽은 클라이언트로 구성.
 - 두 개의 text창 가운데에는 common Shadow 만들기.

테스트결과

 - text1에서 입력시 text2에 그대로 입력이 된다.
 - text2에서 setInterval로 정기적으로 문자열을 수정(추가/제거/수정)한다. 
 - text1는 text2에 추가되는 문자열을 문제없이 받아 **실시간으로** 표시한다.
 - text1, text2에서 동기에 실패할 경우 각각 실패지점 이후단계에서 복원된다.
 - common showdow도 실시간으로 업데이트 된다.

text1, text2 정의, text1에 addEvent keypressed로 타이핑 감지. 콜백함수로 알고리즘 정의. 
1번

## Task3. Differential Synchronization 구현(on network DS algorithm)

 - vue로 작성하기 전에 ajax를 사용하기.

## Task4. text editor 제작

### XMLHttpRequest and AJAX

XMLHttpRequest는 브라우저에서 http request를 보낼수있게 하는 내장객체이다.

 - open : request의 성질을 정한다. 실재로 연결을 열지는 않는다.
 - send([body]) : 실재로 연결을 수행 한다. get/post에 따라 body를 받는다. 
 
비동기 연결일 경우 브라우져는 request를 보낸 뒤 다른 javascript코드를 수행한다. request가 보내진후 xhr는 event를 만들기 시작한다. 그리고 `addEventListerner`나 `on<event>`를 사용하여 그 event들을 다룰 수 있다.` 


