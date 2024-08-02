# ahhaohho 인증/인가 모듈

API 키 또는 Bearer 토큰 인증과 Role & Permission 기반 인가 기능을 제공하는 Node.js 모듈입니다.

## 설치

npm을 사용하여 패키지를 설치할 수 있습니다:

```bash
npm install @ahhaohho/auth
```

## 사용 방법

authenticate와 authorize 함수를 import하여 사용할 수 있습니다:

```javascript
const { authenticate, authorize } = require('@ahhaohho/auth');

// 인증 미들웨어 사용 예시
app.use(authenticate);

// 인가 미들웨어 사용 예시
app.use(authorize);
```

## 주요 기능

- `authenticate`: API 키 또는 Bearer 토큰을 사용한 인증
- `authorize`: Role & Permission 기반 인가

## 예제

Express.js와 함께 사용하는 예제:

```javascript
const express = require('express');
const { authenticate, authorize } = require('@ahhaohho/auth');

const app = express();

app.get('/challenge/authTest', authenticate, authorize, (req, res) => {
  res.send('인증 및 인가 성공');
});

app.listen(3000, () => console.log('서버가 3000번 포트에서 실행 중입니다.'));
```

## 요청 헤더

클라이언트는 다음 헤더를 사용하여 인증 정보를 전송해야 합니다:

- API 키 인증: `x-api-key`, `device-id`
- Bearer 토큰 인증: `authorization`

## 작성자

정두수 (dsoojung@smilegate.com)

---

이 README는 프로젝트의 기본적인 정보를 제공합니다. 작성자에 문의해 주세요.