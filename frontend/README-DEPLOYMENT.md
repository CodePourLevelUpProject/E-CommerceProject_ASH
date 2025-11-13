# Vercel 배포 가이드

## 1. 사전 준비

### 필수 계정
- [Vercel 계정](https://vercel.com) 생성
- GitHub 계정 (코드 저장소)

### 환경 변수 준비
배포 전에 다음 환경 변수들을 준비해주세요:

```bash
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
KAKAO_CLIENT_ID=your-kakao-client-id
KAKAO_CLIENT_SECRET=your-kakao-client-secret
NAVER_CLIENT_ID=your-naver-client-id
NAVER_CLIENT_SECRET=your-naver-client-secret
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

## 2. GitHub 저장소 설정

1. GitHub에 새 저장소 생성
2. 로컬 프로젝트를 GitHub에 푸시:

```bash
cd frontend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

## 3. Vercel 배포

### 방법 1: Vercel 웹사이트에서 배포

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. "New Project" 클릭
3. GitHub 저장소 선택
4. 프로젝트 설정:
   - Framework Preset: Next.js
   - Root Directory: `frontend` (만약 루트가 아니라면)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. 환경 변수 설정:
   - Settings → Environment Variables에서 위의 환경 변수들 추가

6. "Deploy" 클릭

### 방법 2: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 프론트엔드 디렉토리로 이동
cd frontend

# Vercel 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

## 4. 배포 후 설정

### OAuth 리다이렉트 URL 업데이트
각 OAuth 제공자의 설정에서 리다이렉트 URL을 업데이트:

- **Google**: `https://your-domain.vercel.app/api/auth/callback/google`
- **Kakao**: `https://your-domain.vercel.app/api/auth/callback/kakao`
- **Naver**: `https://your-domain.vercel.app/api/auth/callback/naver`

### 도메인 설정 (선택사항)
1. Vercel 대시보드 → Settings → Domains
2. 커스텀 도메인 추가
3. DNS 설정 업데이트

## 5. 자동 배포 설정

GitHub 저장소에 코드를 푸시할 때마다 자동으로 배포되도록 설정됩니다:

- `main` 브랜치 → 프로덕션 배포
- 다른 브랜치 → 프리뷰 배포

## 6. 모니터링 및 로그

- Vercel 대시보드에서 배포 상태 확인
- Functions → Logs에서 서버 로그 확인
- Analytics에서 성능 모니터링

## 7. 트러블슈팅

### 빌드 실패 시
1. 로컬에서 `npm run build` 실행하여 오류 확인
2. 환경 변수 설정 확인
3. Vercel 빌드 로그 확인

### 환경 변수 관련 오류
1. Vercel 대시보드에서 환경 변수 재확인
2. `NEXT_PUBLIC_` 접두사가 필요한 변수 확인
3. 배포 후 재배포 필요

### 성능 최적화
1. 이미지 최적화: Next.js Image 컴포넌트 사용
2. 코드 분할: dynamic import 활용
3. 캐싱 전략: Vercel Edge Network 활용