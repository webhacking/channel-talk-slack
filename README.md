## 채널톡 x 슬랙

여러 채널에 참고해야할 내용들이 분산되는 것만큼 업무를 방해하는 요소가 없다고 생각합니다.
슬랙이라는 하나의 채널에서 모든 내용들을 정제하기위해 간단하게 작성한 코드 입니다

## 설치

```
npm i channel-talk-slack
```

## 설정

- Slack Bot, Slack Outgoing Webhook 을 생성해주세요.
- Channel Talk 에서  Webhook 과 API 인증 키를 생성해주세요.

위 두 과정이 끝났다면 아래 값을 복사하여 `.env` 파일에 알맞은 값을 넣어주세요.

```
DEFAULT_RECEIVE_PORT = 4000
CHANNEL_TALK_HOOK_TOKEN = // 발급 받은 채널톡 웹훅 토큰
CHANNEL_TALK_ACCESS_KEY = // API 인증 키에서 발급 받은 Access Key 
CHANNEL_TALK_ACCESS_SECRET = // API 인증 키에서 발급 받은 Access Secret Key
SLACK_HOOK_TOKEN = // Slack Outgoing Webhook 생성 후 발급 받은 토큰 값
SLACK_BOT_TOKEN = // 슬랙 봇 토큰
SLACK_BOT_NAME = CS-BOT
RECEIVE_CHANNEL_NAME = // 수신 받을 채널
```

> 주의: `RECEIVE_CHANNEL_NAME` 설정한 채널에 꼭 Slack Outgoing Webhook 이 존재해야합니다.


## 시작

```
npm run serve
```


