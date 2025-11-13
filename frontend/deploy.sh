#!/bin/bash

# E-Commerce Frontend Vercel 배포 스크립트

echo "🚀 E-Commerce Frontend Vercel 배포를 시작합니다..."

# 현재 디렉토리 확인
if [ ! -f "package.json" ]; then
    echo "❌ package.json 파일을 찾을 수 없습니다. frontend 디렉토리에서 실행해주세요."
    exit 1
fi

# Node.js 버전 확인
NODE_VERSION=$(node -v)
echo "📦 Node.js 버전: $NODE_VERSION"

# 의존성 설치
echo "📥 의존성을 설치합니다..."
npm install

# 타입 체크
echo "🔍 TypeScript 타입 체크를 실행합니다..."
npm run type-check
if [ $? -ne 0 ]; then
    echo "❌ TypeScript 타입 체크에 실패했습니다."
    exit 1
fi

# 린트 체크
echo "🧹 ESLint 체크를 실행합니다..."
npm run lint
if [ $? -ne 0 ]; then
    echo "⚠️  ESLint 경고가 있습니다. 계속 진행합니다..."
fi

# 로컬 빌드 테스트
echo "🔨 로컬 빌드 테스트를 실행합니다..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 빌드에 실패했습니다. 오류를 수정한 후 다시 시도해주세요."
    exit 1
fi

echo "✅ 로컬 빌드가 성공했습니다!"

# Vercel CLI 설치 확인
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI를 설치합니다..."
    npm install -g vercel
fi

# 환경 변수 확인
echo "🔧 환경 변수를 확인합니다..."
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local 파일이 없습니다. .env.example을 참고하여 생성해주세요."
fi

# 배포 옵션 선택
echo "🚀 배포 옵션을 선택해주세요:"
echo "1) 프리뷰 배포 (개발/테스트용)"
echo "2) 프로덕션 배포"
read -p "선택 (1 또는 2): " choice

case $choice in
    1)
        echo "🔄 프리뷰 배포를 시작합니다..."
        vercel
        ;;
    2)
        echo "🚀 프로덕션 배포를 시작합니다..."
        vercel --prod
        ;;
    *)
        echo "❌ 잘못된 선택입니다. 1 또는 2를 입력해주세요."
        exit 1
        ;;
esac

echo "✅ 배포가 완료되었습니다!"
echo "📱 Vercel 대시보드에서 배포 상태를 확인할 수 있습니다: https://vercel.com/dashboard"