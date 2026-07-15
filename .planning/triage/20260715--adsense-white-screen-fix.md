# 광고 코드 누락으로 인한 흰 화면 현상 수정

- **날짜**: 2026-07-15
- **사이트**: kitchen.informationhot.kr
- **프로젝트**: kitchen-hugo

## 증상

브라우저에서 포스트 페이지가 하얗게 보임. 크롤러(curl/HTTP GET)로는 본문이 정상 출력됨. 브라우저 콘솔에 에러 없음.

## 원인 (2가지 복합)

1. **`adsbygoogle.js` 스크립트 누락**
   - `layouts/partials/extend-head.html`에 애드센스 스크립트가 없었음
   - `<ins class="adsbygoogle">` 태그가 초기화되지 않아 빈 상태로 렌더링
   - `single.html`이 본문 단락마다 `in-article.html` partial을 2회 삽입하므로 빈 박스가 2개 생성됨

2. **`custom.css`의 `.ad-inarticle { min-height: 250px }`**
   - 초기화 안 된 빈 `<ins>` 태그가 250px 높이 흰 박스로 본문을 밀어냄
   - 본문이 안 보이는 것처럼 보이는 주원인

## 해결

**파일 1**: `layouts/partials/extend-head.html`에 애드센스 스크립트 추가

**파일 2**: `assets/css/custom.css`에서 `.ad-inarticle` min-height/min-width 제거
- 수정 전: min-height: 250px, min-width: 300px 있었음
- 수정 후: 두 속성 제거

## 배포 후 확인

- 배포 완료 후에도 동일 현상 → 브라우저 캐시 문제
- 시크릿 창(Cmd+Shift+N)으로 확인하니 정상 렌더링 확인

## 교훈

- adsbygoogle.js 없이 ins.adsbygoogle 태그만 있으면 초기화 안 됨
- min-height를 광고 슬롯에 지정하면 광고 미게재 시 빈 흰 박스로 남음 → 지정 금지
- 배포 후 변경사항 확인은 반드시 시크릿 창으로 할 것
- 크롤러/curl로 정상이고 콘솔 에러도 없으면 CSS 렌더링 문제 의심

## 영향 범위

CUAP 전체 블로그 중 extend-head.html에 adsbygoogle.js가 없는 사이트는 동일 문제 발생 가능.
신규 사이트 설정 시 반드시 확인 필요.
