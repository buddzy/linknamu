# 링크나무

내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하는 서비스입니다.

## 시작하기

```bash
npm install
cp .env.example .env.local   # MONGODB_URI 입력
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 구조

- `src/data/profile.ts` — 이름, 소개, 프로필 사진, 링크 목록 (여기만 수정하면 됩니다)
- `src/components/` — `ProfileHeader`, `LinkList`, `LinkCard`, `ThemeToggle`
- `src/app/api/clicks/route.ts` — 클릭 수 조회(GET) / 기록(POST), MongoDB `clicks` 컬렉션 사용
- `public/profile.svg` — 기본 프로필 이미지 (원하는 사진으로 교체)

`MONGODB_URI`가 없으면 페이지는 정상 표시되고 클릭 수만 기록되지 않습니다.

## 배포 (Vercel)

Vercel 프로젝트 환경 변수에 `MONGODB_URI`, `MONGODB_DB`를 설정한 뒤 배포하세요.
