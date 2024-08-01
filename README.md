# npm-auth

##사용법

1. 설치하기
~~~
npm install @ahhaohho/auth
~~~

2. 모듈추가
~~~
//authenticate > API키 또는 Bearer 토큰인증모듈
//authorize > Role&Permission 확인 및 인가모듈 
const { authorize, authenticate } = require('@ahhaohho/auth')
~~~

사용예시
~~~
const { authorize, authenticate } = require('@ahhaohho/auth')

app.get('/challenge/authTest', authenticate, authorize, (req, res) => { res.send('ok') });
~~~

3. 요청헤더
- API키 : ```x-api-key, device-id```
- Bearer Token : ```authorization```