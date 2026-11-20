# 개발 안내

모바일 앱은 `mobile/`, FastAPI 서버와 SQLite 기본 데이터베이스는 `backend/`에 있습니다. 토리(`forest`)와 나루(`ocean`)만 새 대화 공간으로 지원합니다.

## 실행

- 앱: `cd mobile`, `npm.cmd ci`, `npm.cmd start`
- API 서버: `backend/README.md`의 서버 실행 절차를 사용합니다.
- 그림 작업자: API와 별도 터미널에서 `python -m app.worker`를 실행합니다.

폰에서 로컬 API를 쓸 때는 `localhost` 대신 개발 PC의 LAN 주소를 설정합니다. 실제 AI 키는 `backend/.env`에만 두고 앱이나 `EXPO_PUBLIC_` 설정에 넣지 않습니다.

## 데이터와 과거 기록

모바일 로컬 저장은 AsyncStorage, 서버 데이터는 `backend/storage/`에 보관됩니다. 이 정리에서는 기존 DB·이미지·대화 기록을 삭제하지 않습니다. 이전 카페·산사·정원·성당 대화는 데이터에 남지만 새 대화 목록에서 숨기고, 해당 공간에서는 새 답변을 만들지 않습니다. 기록 보존이 필요하면 `backend/storage/`를 백업하세요.

## 주요 코드 경계

- `mobile/src/config/assets.ts`: 토리·나루 UI 자산과 음원
- `mobile/src/storage/model.ts`: 로컬 데이터 검증 및 이전 공간 선택값 복구
- `mobile/src/services/mock.ts`, `mobile/src/services/api.ts`: 시연 및 API 서비스
- `backend/app/ai.py`, `backend/app/prompts/`: 서버 대화 지침
- `backend/app/main.py`: 계정·대화·그림 API
- `backend/app/worker.py`: 비동기 그림 생성
