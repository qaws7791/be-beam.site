#!/bin/bash

# React Router Vercel preset 빌드 후 server 폴더 정리 스크립트

# build/server 디렉토리로 이동
cd build/server

# nodejs_로 시작하는 폴더 찾기 (랜덤 이름 폴더)
RANDOM_FOLDER=$(find . -maxdepth 1 -type d -name "nodejs_*" | head -1)

if [ -z "$RANDOM_FOLDER" ]; then
    echo "❌ nodejs_로 시작하는 폴더를 찾을 수 없습니다."
    exit 1
fi

echo "📁 발견된 폴더: $RANDOM_FOLDER"

# 랜덤 폴더 내의 모든 파일과 폴더를 현재 위치로 이동
echo "🔄 파일 이동 중..."

# 숨김 파일 포함하여 모든 내용 이동
shopt -s dotglob
mv "$RANDOM_FOLDER"/* .
shopt -u dotglob

# 빈 랜덤 폴더 삭제
rmdir "$RANDOM_FOLDER"

echo "✅ 완료! 파일들이 build/server 폴더로 이동되었습니다."
echo "📋 이동된 파일 목록:"
ls -la