# 디렉토리/파일 설명

## root

+ .gitignore => git에 올릴 필요 없는 파일이나 폴더 추가하는 파일
+ README.md => 설명문서

## backend

+ server.py => api 서버 코드 파일

## frontend

+ .next => 빌드가 된 파일이 들어감 (자동생성)

+ node_modules => 라이브러리들이 들어감

+ pages => 웹페이지들이 들어감
  + _app.tsx => 모든 페이지가 거쳐가는 페이지
  + _documents.tsx => 웹페이지의 기본 뼈대

+ src => 각종 소스파일들이 들어감
  + @types => 타입설정 관련 파일 들어감
  + components => 웹페이지에 들어가는 컴포넌트들이 들어감
  + constants => 상수가 정의된 파일들이 들어감 (삭제가능)
  + redux => 리덕스 관련 파일들이 들어감
    + reducers => 리덕스 리듀서들이 모여있음
    + services => http api 들이 모여있음
    + actions.ts => 리덕스 액션들이 모여있음
    + saga.ts => 리덕스 사가들이 모여있음
    + store.ts => 리덕스 스토어 관련 파일
  + shared => 재사용이 가능한 것들이 모여있음
    + components => 아주 작은 기능들이 모여있는 도구들
    + config => 설정파일 들어감
    + helper => 각종 헬퍼함수들이 들어감

+ static => 웹페이지에서 제공하는 정적 파일들이 들어감(이미지, 문서 등등)

+ .babelrc => 바벨설정파일
+ next.config.js => 넥스트 설정파일
+ package.json => 프로젝트에 관련된 설정파일
+ server.ts => 웹서버 코드 파일
+ tsconfig.json => 타입스크립트 설정파일


# 라이브러리 설명

```"dependencies": {
    "axios": "^0.18.0", // http(GET, POST 등) 통신을 위해서 사용
    "bootstrap": "4.0.0", // 부트스트랩 CSS 스타일링 도구
    "classnames": "^2.2.5", // 조건이 들어가는 클래스명 작성을 도와주는 도구
    "date-fns": "latest", // 날짜, 시간 표시형식, 조작을 돕는 도구
    "es6-promise": "4.1.1", // ES6 문법 promise를 지원하지 않는 브라우저에서 쓸 수 있게 해주는 도구
    "immutability-helper": "latest", // 기존 객체를 변형하지 건들지않고 필요한 부분만 변경할 수 있게 도와주는 도구
    "isomorphic-unfetch": "latest", // fetch api(http 통신도구)를 쓸 수 있게 해주는 도구
    "jsonwebtoken": "^8.2.2", // json 웹토큰을 쓸 수 있게 해주는 도구
    "lodash": "^4.17.10", // 자바스크립트를 쉽게 쓸 수 있게 해주는 도구
    "lodash.debounce": "latest", // 함수를 지정된 시간동안 여러번 클릭할 수 없게 막는 도구
    "lodash.findindex": "^4.6.0", // 배열에서 인덱스를 쉽게 찾아주는 도구
    "moment": "^2.22.2", // 날짜, 시간 표시형식, 조작을 돕는 도구
    "next": "^6.1.1", // 리액트 서버사이드 랜더링을 쉽게 할 수 있게 해주는 도구
    "next-redux-saga": "3.0.0-beta.1", // next에서 리덕스 사가를 쓸 수 있게 해주는 도구
    "next-redux-wrapper": "2.0.0-beta.6", // next에서 리덕스를 쓸 수 있게 해주는 도구
    "normalizr": "latest", // 객체 모양을 일관화 시켜주는 도구
    "nprogress": "latest", // 로딩바 만들어 주는 도구
    "rc-slider": "^8.6.1", // 슬라이더 만들 주는 도구
    "react": "^16.4.1", // 자바스크립트로 아주 빠른 웹사이트를 만들 수 있게 도와주는 도구
    "react-dom": "^16.4.1", // 리액트에서 돔을 다루는 도구
    "react-google-charts": "^1.6.6", // 구글 차트를 리액트에서 쉽게 쓸 수 있게 해주는 도구
    "react-redux": "^5.0.7", // 리액트에서 리덕스를 쓸 수 있게 해주는 도구
    "react-toastify": "^4.1.0", // 알람창 띄우는 도구
    "reactstrap": "^6.0.1", // 부트스트랩을 리액트에서 쉽게 쓸 수 있게 해주는 도구
    "redux": "3.7.2", // 리덕스를 쓸 수 있게 해주는 도구
    "redux-form": "^7.3.0", // 리덕스 환경에서 폼을 쉽게 다룰 수 있게 해주는 도구
    "redux-form-saga": "^0.2.0", // 리덕스 사가에서 리덕스 폼을 쓸 수 있게 해주는 도구
    "redux-saga": "0.15.4" // 리덕스 사가를 쓸 수 있게 해주는 도구
  },
  "devDependencies": {
    "@types/classnames": "^2.2.3", // 클래스네임을 타입스크립트에서 쓸 수 있게 해주는 도구
    "@types/lodash": "^4.14.108", // 로다쉬를 타입스크립트에서 쓸 수 있게 해주는 도구
    "@types/next": "^6.0.4", // 넥스트를 타입스크립트에서 쓸 수 있게 해주는 도구
    "@types/nprogress": "0.0.29", // 엔프로그래스를 타입스크립트에서 쓸 수 있게 해주는 도구
    "@types/react": "^16.4.6", // 리액트를 타입스크립트에서 쓸 수 있게 해주는 도구
    "@types/react-redux": "^5.0.19", // 리액트 리덕스를 타입스크립트에서 쓸 수 있게 해주는 도구
    "@types/reactstrap": "^5.0.26", // 리액트스트랩을 타입스크립트에서 쓸 수 있게 해주는 도구
    "@zeit/next-css": "0.0.7", // 넥스트에서 제공하는 스타일링을 할 수 있게 해주는 도구
    "@zeit/next-typescript": "^1.1.0", // 넥스트에서 제공하는 타입스크립트를 쓸 수 있게 도구
    "babel-plugin-module-resolver": "latest", // 파일경로를 절대경로로 쓸 수 있게 해주는 도구
    "cookie-parser": "^1.4.3", // 쿠키를 쓸 수 있게 도와주는 도구
    "express": "latest", // nodejs 로 웹서버를 띄울 수 있게 도와주는 도구
    "redux-devtools-extension": "2.13.2", // 리덕스 내용을 볼 수 있는 도구
    "tslint": "^5.10.0", // 타입스크립트 맞춤법 도구
    "typescript": "^2.7.1" // 타입스크립트를 쓸 수 있게 해주는 도구
  }
```
