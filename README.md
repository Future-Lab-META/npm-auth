# npm-auth

##사용법

1. 설치하기
~~~
npm install @ahhaohho/auth
~~~

2. 모듈추가
~~~
const { authorize, authenticate } = require('@ahhaohho/auth')
~~~

3. 요청헤더
- API키 : ```x-api-key, device-id```
- Bearer Token : ```authorization```